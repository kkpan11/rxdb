"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RxStorageInstanceMongoDB = void 0;
exports.createMongoDBStorageInstance = createMongoDBStorageInstance;
var _readOnlyError2 = _interopRequireDefault(require("@babel/runtime/helpers/readOnlyError"));
var _rxjs = require("rxjs");
var _rxSchemaHelper = require("../../rx-schema-helper.js");
var _index = require("../../plugins/utils/index.js");
var _mongodb = require("mongodb");
var _rxStorageHelper = require("../../rx-storage-helper.js");
var _mongodbHelper = require("./mongodb-helper.js");
var _utilsRxdbVersion = require("../utils/utils-rxdb-version.js");
var RxStorageInstanceMongoDB = exports.RxStorageInstanceMongoDB = /*#__PURE__*/function () {
  // public mongoChangeStream?: MongoChangeStream<any, ChangeStreamDocument<any>>;

  /**
   * Closing the connection must not happen when
   * an operation is running, otherwise we get an error.
   * So we store all running operations here so that
   * they can be awaited.
   */

  /**
   * We use this to be able to still fetch
   * the objectId after transforming the document from mongo-style (with _id)
   * to RxDB
   */

  function RxStorageInstanceMongoDB(storage, databaseName, collectionName, schema, internals, options, settings) {
    this.changes$ = new _rxjs.Subject();
    this.runningOperations = new _rxjs.BehaviorSubject(0);
    this.writeQueue = _index.PROMISE_RESOLVE_VOID;
    this.mongoObjectIdCache = new WeakMap();
    this.storage = storage;
    this.databaseName = databaseName;
    this.collectionName = collectionName;
    this.schema = schema;
    this.internals = internals;
    this.options = options;
    this.settings = settings;
    if (this.schema.attachments) {
      throw new Error('attachments not supported in mongodb storage, make a PR if you need that');
    }
    this.primaryPath = (0, _rxSchemaHelper.getPrimaryFieldOfPrimaryKey)(this.schema.primaryKey);
    this.inMongoPrimaryPath = this.primaryPath === '_id' ? _mongodbHelper.MONGO_ID_SUBSTITUTE_FIELDNAME : this.primaryPath;
    var mongoOptions = {};
    mongoOptions.driverInfo = {
      name: 'RxDB',
      version: _utilsRxdbVersion.RXDB_VERSION
    };
    this.mongoClient = new _mongodb.MongoClient(storage.databaseSettings.connection, mongoOptions);
    this.mongoDatabase = this.mongoClient.db(databaseName + '-v' + this.schema.version);
    var indexes = (this.schema.indexes ? this.schema.indexes.slice() : []).map(index => {
      var arIndex = (0, _index.isMaybeReadonlyArray)(index) ? index.slice(0) : [index];
      return arIndex;
    });
    indexes.push([this.inMongoPrimaryPath]);
    this.mongoCollectionPromise = this.mongoDatabase.createCollection(collectionName).then(async mongoCollection => {
      await mongoCollection.createIndexes(indexes.map(index => {
        var mongoIndex = {};
        index.forEach(field => mongoIndex[field] = 1);
        return {
          name: (0, _mongodbHelper.getMongoDBIndexName)(index),
          key: mongoIndex
        };
      }));

      /**
       * TODO in a setup where multiple servers run node.js
       * processes that use the mongodb storage, we should propagate
       * events by listening to the mongodb changestream.
       * This maybe should be a premium feature.
       */
      // this.mongoChangeStream = mongoCollection.watch(
      //     undefined, {
      //     batchSize: 100
      // }
      // ).on('change', change => {

      //     const eventBulkId = randomToken(10);
      //     const newDocData: RxDocumentData<RxDocType> = (change as any).fullDocument;
      //     const documentId = newDocData[this.primaryPath] as any;

      //     const eventBulk: EventBulk<RxStorageChangeEvent<RxDocumentData<RxDocType>>, RxStorageDefaultCheckpoint> = {
      //         checkpoint: {
      //             id: newDocData[this.primaryPath] as any,
      //             lwt: newDocData._meta.lwt
      //         },
      //         context: 'mongodb-write',
      //         id: eventBulkId,
      //         events: [{
      //             documentData: newDocData,
      //             documentId,
      //             operation: 'INSERT',
      //             previousDocumentData: undefined,
      //         }],
      //     };

      //     this.changes$.next(eventBulk);
      // });

      return mongoCollection;
    });
  }

  /**
   * Bulk writes on the mongodb storage.
   * Notice that MongoDB does not support cross-document transactions
   * so we have to do a update-if-previous-is-correct like operations.
   * (Similar to what RxDB does with the revision system)
   */
  var _proto = RxStorageInstanceMongoDB.prototype;
  _proto.bulkWrite = function bulkWrite(documentWrites, context) {
    this.writeQueue = this.writeQueue.then(async () => {
      this.runningOperations.next(this.runningOperations.getValue() + 1);
      var mongoCollection = await this.mongoCollectionPromise;
      if (this.closed) {
        return Promise.reject(new Error('already closed'));
      }
      var primaryPath = this.primaryPath;
      var ret = {
        error: []
      };
      var docIds = documentWrites.map(d => d.document[primaryPath]);
      var documentStates = await this.findDocumentsById(docIds, true);
      var documentStatesMap = new Map();
      documentStates.forEach(doc => {
        var docId = doc[primaryPath];
        documentStatesMap.set(docId, doc);
      });
      var categorized = (0, _rxStorageHelper.categorizeBulkWriteRows)(this, primaryPath, documentStatesMap, documentWrites, context);
      var changeByDocId = new Map();
      categorized.eventBulk.events.forEach(change => {
        changeByDocId.set(change.documentId, change);
      });
      ret.error = categorized.errors;

      /**
       * Reset the event bulk because
       * conflicts can still appear after the categorization
       */
      var eventBulk = categorized.eventBulk;
      eventBulk.events = [];
      await Promise.all([
      /**
       * Inserts
       * @link https://sparkbyexamples.com/mongodb/mongodb-insert-if-not-exists/
       */
      Promise.all(categorized.bulkInsertDocs.map(async writeRow => {
        var docId = writeRow.document[primaryPath];
        var writeResult = await mongoCollection.findOneAndUpdate({
          [this.inMongoPrimaryPath]: docId
        }, {
          $setOnInsert: (0, _mongodbHelper.swapRxDocToMongo)(writeRow.document)
        }, {
          upsert: true,
          includeResultMetadata: true
        });
        if (writeResult.value) {
          // had insert conflict
          var conflictError = {
            status: 409,
            documentId: docId,
            writeRow,
            documentInDb: (0, _mongodbHelper.swapMongoToRxDoc)((0, _index.ensureNotFalsy)(writeResult.value)),
            isError: true
          };
          ret.error.push(conflictError);
        } else {
          var event = changeByDocId.get(docId);
          if (event) {
            eventBulk.events.push(event);
          }
        }
      })),
      /**
       * Updates
       */
      Promise.all(categorized.bulkUpdateDocs.map(async writeRow => {
        var docId = writeRow.document[primaryPath];
        var writeResult = await mongoCollection.findOneAndReplace({
          [this.inMongoPrimaryPath]: docId,
          _rev: (0, _index.ensureNotFalsy)(writeRow.previous)._rev
        }, (0, _mongodbHelper.swapRxDocToMongo)(writeRow.document), {
          includeResultMetadata: true,
          upsert: false,
          returnDocument: 'before'
        });
        if (!writeResult.ok) {
          var currentDocState = await this.findDocumentsById([docId], true);
          var currentDoc = currentDocState[0];
          // had insert conflict
          var conflictError = {
            status: 409,
            documentId: docId,
            writeRow,
            documentInDb: (0, _index.ensureNotFalsy)(currentDoc),
            isError: true
          };
          ret.error.push(conflictError);
        } else {
          var event = (0, _index.getFromMapOrThrow)(changeByDocId, docId);
          eventBulk.events.push(event);
        }
      }))]);
      if (categorized.eventBulk.events.length > 0) {
        var lastState = (0, _index.ensureNotFalsy)(categorized.newestRow).document;
        categorized.eventBulk.checkpoint = {
          id: lastState[primaryPath],
          lwt: lastState._meta.lwt
        };
        this.changes$.next(categorized.eventBulk);
      }
      this.runningOperations.next(this.runningOperations.getValue() - 1);
      return ret;
    });
    return this.writeQueue;
  };
  _proto.findDocumentsById = async function findDocumentsById(docIds, withDeleted, session) {
    this.runningOperations.next(this.runningOperations.getValue() + 1);
    var mongoCollection = await this.mongoCollectionPromise;
    var primaryPath = this.primaryPath;
    var plainQuery = {
      [primaryPath]: {
        $in: docIds
      }
    };
    if (!withDeleted) {
      plainQuery._deleted = false;
    }
    var result = [];
    var queryResult = await mongoCollection.find(plainQuery, {
      session
    }).toArray();
    queryResult.forEach(row => {
      result.push((0, _mongodbHelper.swapMongoToRxDoc)(row));
    });
    this.runningOperations.next(this.runningOperations.getValue() - 1);
    return result;
  };
  _proto.query = async function query(originalPreparedQuery) {
    var preparedQuery = (0, _mongodbHelper.prepareMongoDBQuery)(this.schema, originalPreparedQuery.query);
    this.runningOperations.next(this.runningOperations.getValue() + 1);
    await this.writeQueue;
    var mongoCollection = await this.mongoCollectionPromise;
    var query = mongoCollection.find(preparedQuery.mongoSelector);
    if (preparedQuery.query.skip) {
      query = query.skip(preparedQuery.query.skip);
    }
    if (preparedQuery.query.limit) {
      query = query.limit(preparedQuery.query.limit);
    }
    if (preparedQuery.query.sort) {
      query = query.sort(preparedQuery.mongoSort);
    }
    var resultDocs = await query.toArray();
    this.runningOperations.next(this.runningOperations.getValue() - 1);
    return {
      documents: resultDocs.map(d => (0, _mongodbHelper.swapMongoToRxDoc)(d))
    };
  };
  _proto.count = async function count(originalPreparedQuery) {
    var preparedQuery = (0, _mongodbHelper.prepareMongoDBQuery)(this.schema, originalPreparedQuery.query);
    this.runningOperations.next(this.runningOperations.getValue() + 1);
    await this.writeQueue;
    var mongoCollection = await this.mongoCollectionPromise;
    var count = await mongoCollection.countDocuments(preparedQuery.mongoSelector);
    this.runningOperations.next(this.runningOperations.getValue() - 1);
    return {
      count,
      mode: 'fast'
    };
  };
  _proto.cleanup = async function cleanup(minimumDeletedTime) {
    this.runningOperations.next(this.runningOperations.getValue() + 1);
    var mongoCollection = await this.mongoCollectionPromise;
    var maxDeletionTime = (0, _index.now)() - minimumDeletedTime;
    await mongoCollection.deleteMany({
      _deleted: true,
      '_meta.lwt': {
        $lt: maxDeletionTime
      }
    });
    this.runningOperations.next(this.runningOperations.getValue() - 1);
    return true;
  };
  _proto.getAttachmentData = async function getAttachmentData(_documentId, _attachmentId, _digest) {
    await this.mongoCollectionPromise;
    throw new Error('attachments not implemented, make a PR');
  };
  _proto.changeStream = function changeStream() {
    return this.changes$;
  };
  _proto.remove = async function remove() {
    if (this.closed) {
      throw new Error('already closed');
    }
    this.runningOperations.next(this.runningOperations.getValue() + 1);
    var mongoCollection = await this.mongoCollectionPromise;
    await mongoCollection.drop();
    this.runningOperations.next(this.runningOperations.getValue() - 1);
    await this.close();
  };
  _proto.close = async function close() {
    // TODO without this next-tick we have random fails in the tests
    await (0, _index.requestIdlePromise)(200);
    if (this.closed) {
      return this.closed;
    }
    this.closed = (async () => {
      await this.mongoCollectionPromise;
      await (0, _rxjs.firstValueFrom)(this.runningOperations.pipe((0, _rxjs.filter)(c => c === 0)));
      // await ensureNotFalsy(this.mongoChangeStream).close();
      await this.mongoClient.close();
    })();
    return this.closed;
  };
  return RxStorageInstanceMongoDB;
}();
function createMongoDBStorageInstance(storage, params, settings) {
  var instance = new RxStorageInstanceMongoDB(storage, params.databaseName, params.collectionName, params.schema, {}, params.options, settings);
  return Promise.resolve(instance);
}
//# sourceMappingURL=rx-storage-instance-mongodb.js.map