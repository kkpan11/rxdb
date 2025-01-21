"use strict";(self.webpackChunkrxdb=self.webpackChunkrxdb||[]).push([[1558],{9544:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>a,default:()=>h,frontMatter:()=>s,metadata:()=>o,toc:()=>l});var r=t(4848),i=t(8453);const s={title:"RxServer",slug:"rx-server.html"},a="RxDB Server",o={id:"rx-server",title:"RxServer",description:'The RxDB Server Plugin makes it possible to spawn a server on top of a RxDB database that offers multiple types of endpoints for various usages. It can spawn basic CRUD REST endpoints or even realtime replication endpoints that can be used by the client devices to replicate data. The RxServer plugin is designed to be used in Node.js but you can also use it in Deno, Bun or the Electron "main" process. You can use it either as a standalone server or add it on top of an existing http server (like express) in nodejs.',source:"@site/docs/rx-server.md",sourceDirName:".",slug:"/rx-server.html",permalink:"/rx-server.html",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"RxServer",slug:"rx-server.html"},sidebar:"tutorialSidebar",previous:{title:"NATS Replication",permalink:"/replication-nats.html"},next:{title:"RxServer Scaling",permalink:"/rx-server-scaling.html"}},d={},l=[{value:"Starting a RxServer",id:"starting-a-rxserver",level:2},{value:"Using RxServer with Fastify",id:"using-rxserver-with-fastify",level:3},{value:"Using RxServer with Koa",id:"using-rxserver-with-koa",level:3},{value:"RxServer Endpoints",id:"rxserver-endpoints",level:2},{value:"Replication Endpoint",id:"replication-endpoint",level:2},{value:"REST endpoint",id:"rest-endpoint",level:2},{value:"CORS",id:"cors",level:2},{value:"Auth handler",id:"auth-handler",level:2},{value:"Query modifier",id:"query-modifier",level:2},{value:"Change validator",id:"change-validator",level:2},{value:"Server-only indexes",id:"server-only-indexes",level:2},{value:"Server-only fields",id:"server-only-fields",level:2},{value:"Readonly fields",id:"readonly-fields",level:2},{value:"$regex queries not allowed",id:"regex-queries-not-allowed",level:2},{value:"Conflict handling",id:"conflict-handling",level:2},{value:"FAQ",id:"faq",level:2}];function c(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components},{Details:t}=n;return t||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"rxdb-server",children:"RxDB Server"}),"\n",(0,r.jsxs)(n.p,{children:["The RxDB Server Plugin makes it possible to spawn a server on top of a RxDB database that offers multiple types of endpoints for various usages. It can spawn basic CRUD REST endpoints or even realtime replication endpoints that can be used by the client devices to replicate data. The RxServer plugin is designed to be used in Node.js but you can also use it in Deno, Bun or the ",(0,r.jsx)(n.a,{href:"/electron-database.html",children:"Electron"}),' "main" process. You can use it either as a ',(0,r.jsx)(n.strong,{children:"standalone server"})," or add it on top of an ",(0,r.jsx)(n.strong,{children:"existing http server"})," (like express) in nodejs."]}),"\n",(0,r.jsx)(n.h2,{id:"starting-a-rxserver",children:"Starting a RxServer"}),"\n",(0,r.jsxs)(n.p,{children:["To create an ",(0,r.jsx)(n.code,{children:"RxServer"}),", you have to install the ",(0,r.jsx)(n.code,{children:"rxdb-server"})," package with ",(0,r.jsx)(n.code,{children:"npm install rxdb-server --save"})," and then you can import the ",(0,r.jsx)(n.code,{children:"createRxServer()"})," function and create a server on a given ",(0,r.jsx)(n.a,{href:"/rx-database.html",children:"RxDatabase"})," and adapter."]}),"\n",(0,r.jsxs)(n.p,{children:["After adding the endpoints to the server, do not forget to call ",(0,r.jsx)(n.code,{children:"myServer.start()"})," to start the actually http-server."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"import { createRxServer } from 'rxdb-server/plugins/server';\n\n/**\n * We use the express adapter which is the one that comes with RxDB core\n */\nimport { RxServerAdapterExpress } from 'rxdb-server/plugins/adapter-express';\n\nconst myServer = await createRxServer({\n    database: myRxDatabase,\n    adapter: RxServerAdapterExpress,\n    port: 443\n});\n\n// add endpoints here (see below)\n\n// after adding the endpoints, start the server\nawait myServer.start();\n"})}),"\n",(0,r.jsx)(n.h3,{id:"using-rxserver-with-fastify",children:"Using RxServer with Fastify"}),"\n",(0,r.jsxs)(n.p,{children:["There is also a ",(0,r.jsx)(n.a,{href:"/premium/",children:"RxDB Premium \ud83d\udc51"})," adapter to use the RxServer with ",(0,r.jsx)(n.a,{href:"https://fastify.dev/",children:"Fastify"})," instead of express. Fastify has shown to have better performance and in general is more modern."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"import { createRxServer } from 'rxdb-server/plugins/server';\nimport { RxServerAdapterFastify } from 'rxdb-premium/plugins/server-adapter-fastify';\n\nconst myServer = await createRxServer({\n    database: myRxDatabase,\n    adapter: RxServerAdapterFastify,\n    port: 443\n});\nawait myServer.start();\n"})}),"\n",(0,r.jsx)(n.h3,{id:"using-rxserver-with-koa",children:"Using RxServer with Koa"}),"\n",(0,r.jsxs)(n.p,{children:["There is also a ",(0,r.jsx)(n.a,{href:"/premium/",children:"RxDB Premium \ud83d\udc51"})," adapter to use the RxServer with ",(0,r.jsx)(n.a,{href:"https://koajs.com/",children:"Koa"})," instead of express. Koa has shown to have better compared to express."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"import { createRxServer } from 'rxdb-server/plugins/server';\nimport { RxServerAdapterKoa } from 'rxdb-premium/plugins/server-adapter-koa';\n\nconst myServer = await createRxServer({\n    database: myRxDatabase,\n    adapter: RxServerAdapterKoa,\n    port: 443\n});\nawait myServer.start();\n"})}),"\n",(0,r.jsx)(n.h2,{id:"rxserver-endpoints",children:"RxServer Endpoints"}),"\n",(0,r.jsxs)(n.p,{children:["On top of the RxServer you can add different types of ",(0,r.jsx)(n.strong,{children:"endpoints"}),". An endpoint is always connected to exactly one ",(0,r.jsx)(n.a,{href:"/rx-collection.html",children:"RxCollection"})," and it only serves data from that single collection."]}),"\n",(0,r.jsxs)(n.p,{children:["For now there are only two endpoints implemented, the ",(0,r.jsx)(n.a,{href:"#replication-endpoint",children:"replication endpoint"})," and the ",(0,r.jsx)(n.a,{href:"#rest-endpoint",children:"REST endpoint"}),". Others will be added in the future."]}),"\n",(0,r.jsxs)(n.p,{children:["An endpoint is added to the server by calling the add endpoint method like ",(0,r.jsx)(n.code,{children:"myRxServer.addReplicationEndpoint()"}),". Each needs a different ",(0,r.jsx)(n.code,{children:"name"})," string as input which will define the resulting endpoint url."]}),"\n",(0,r.jsxs)(n.p,{children:["The endpoint urls is a combination of the given ",(0,r.jsx)(n.code,{children:"name"})," and schema ",(0,r.jsx)(n.code,{children:"version"})," of the collection, like ",(0,r.jsx)(n.code,{children:"/my-endpoint/0"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"const myEndpoint = server.addReplicationEndpoint({\n    name: 'my-endpoint',\n    collection: myServerCollection\n});\n\nconsole.log(myEndpoint.urlPath) // > 'my-endpoint/0'\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Notice that it is ",(0,r.jsx)(n.strong,{children:"not required"})," that the server side schema version is equal to the client side schema version. You might want to change server schemas more often and then only do a ",(0,r.jsx)(n.a,{href:"/migration-schema.html",children:"migration"})," on the server, not on the clients."]}),"\n",(0,r.jsx)(n.h2,{id:"replication-endpoint",children:"Replication Endpoint"}),"\n",(0,r.jsxs)(n.p,{children:["The replication endpoint allows clients that connect to it to replicate data with the server via the RxDB ",(0,r.jsx)(n.a,{href:"/replication.html",children:"replication protocol"}),". There is also the ",(0,r.jsx)(n.a,{href:"/replication-server",children:"Replication Server"})," plugin that is used on the client side to connect to the endpoint."]}),"\n",(0,r.jsxs)(n.p,{children:["The endpoint is added to the server with the ",(0,r.jsx)(n.code,{children:"addReplicationEndpoint()"})," method. It requires a specific collection and the endpoint will only provided replication for documents inside of that collection."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"// > server.ts\nconst endpoint = server.addReplicationEndpoint({\n    name: 'my-endpoint',\n    collection: myServerCollection\n});\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Then you can start the ",(0,r.jsx)(n.a,{href:"/replication-server",children:"Server Replication"})," on the client:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"// > client.ts\nconst replicationState = await replicateServer({\n    collection: usersCollection,\n    replicationIdentifier: 'my-server-replication',\n    url: 'http://localhost:80/my-endpoint/0',\n    push: {},\n    pull: {}\n});\n"})}),"\n",(0,r.jsx)(n.h2,{id:"rest-endpoint",children:"REST endpoint"}),"\n",(0,r.jsx)(n.p,{children:"The REST endpoint exposes various methods to access the data from the RxServer with non-RxDB tools via plain HTTP operations. You can use it to connect apps that are programmed in different programming languages than JavaScript or to access data from other third party tools."}),"\n",(0,r.jsx)(n.p,{children:"Creating a REST endpoint on a RxServer:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"const endpoint = await server.addRestEndpoint({\n    name: 'my-endpoint',\n    collection: myServerCollection\n});\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"// plain http request with fetch\nconst request = await fetch('http://localhost:80/' + endpoint.urlPath + '/query', {\n    method: 'POST',\n    headers: {\n        'Accept': 'application/json',\n        'Content-Type': 'application/json'\n    },\n    body: JSON.stringify({ selector: {} })\n});\nconst response = await request.json();\n"})}),"\n",(0,r.jsxs)(n.p,{children:["There is also the ",(0,r.jsx)(n.code,{children:"client-rest"})," plugin that provides typesave interactions with the REST endpoint:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"// using the client (optional)\nimport { createRestClient } from 'rxdb-server/plugins/client-rest';\nconst client = createRestClient('http://localhost:80/' + endpoint.urlPath, {/* headers */});\nconst response = await client.query({ selector: {} });\n"})}),"\n",(0,r.jsx)(n.p,{children:"The REST endpoint exposes the following paths:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"query [POST]"}),": Fetch the results of a NoSQL query."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"query/observe [GET]"}),": Observe a query's results via ",(0,r.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events",children:"Server Send Events"}),"."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"get [POST]"}),": Fetch multiple documents by their primary key."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"set [POST]"}),": Write multiple documents at once."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"delete [POST]"}),": Delete multiple documents by their primary key."]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"cors",children:"CORS"}),"\n",(0,r.jsxs)(n.p,{children:["When creating a server or adding endpoints, you can specify a ",(0,r.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS",children:"CORS"})," string.\nEndpoint cors always overwrite server cors. The default is the wildcard ",(0,r.jsx)(n.code,{children:"*"})," which allows all requests."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"const myServer = await startRxServer({\n    database: myRxDatabase,\n    cors: 'http://example.com'\n    port: 443\n});\nconst endpoint = await server.addReplicationEndpoint({\n    name: 'my-endpoint',\n    collection: myServerCollection,\n    cors: 'http://example.com'\n});\n"})}),"\n",(0,r.jsx)(n.h2,{id:"auth-handler",children:"Auth handler"}),"\n",(0,r.jsxs)(n.p,{children:["To authenticate users and to make user-specific data available on server requests, an ",(0,r.jsx)(n.code,{children:"authHandler"})," must be provided that parses the headers and returns the actual auth data that is used to authenticate the client and in the ",(0,r.jsx)(n.a,{href:"#query-modifier",children:"queryModifier"})," and ",(0,r.jsx)(n.a,{href:"#change-validator",children:"changeValidator"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["An auth handler gets the given headers object as input and returns the auth data in the format ",(0,r.jsx)(n.code,{children:"{ data: {}, validUntil: 1706579817126}"}),".\nThe ",(0,r.jsx)(n.code,{children:"data"})," field can contain any data that can be used afterwards in the queryModifier and changeValidator.\nThe ",(0,r.jsx)(n.code,{children:"validUntil"})," field contains the unix timestamp in milliseconds at which the authentication is no longer valid and the client will get disconnected."]}),"\n",(0,r.jsxs)(n.p,{children:["For example your authHandler could get the ",(0,r.jsx)(n.code,{children:"Authorization"})," header and parse the ",(0,r.jsx)(n.a,{href:"https://jwt.io/",children:"JSON web token"})," to identify the user and store the user id in the ",(0,r.jsx)(n.code,{children:"data"})," field for later use."]}),"\n",(0,r.jsx)(n.h2,{id:"query-modifier",children:"Query modifier"}),"\n",(0,r.jsx)(n.p,{children:"The query modifier is a JavaScript function that is used to restrict which documents a client can fetch or replicate from the server.\nIt gets the auth data and the actual NoSQL query as input parameter and returns a modified NoSQL query that is then used internally by the server.\nYou can pass a different query modifier to each endpoint so that you can have different endpoints for different use cases on the same server."}),"\n",(0,r.jsxs)(n.p,{children:["For example you could use a query modifier that get the ",(0,r.jsx)(n.code,{children:"userId"})," from the auth data and then restricts the query to only return documents that have the same ",(0,r.jsx)(n.code,{children:"userId"})," set."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"function myQueryModifier(authData, query) {\n    query.selector.userId = { $eq: authData.data.userid };\n    return query;\n}\n\nconst endpoint = await server.addReplicationEndpoint({\n    name: 'my-endpoint',\n    collection: myServerCollection,\n    queryModifier: myQueryModifier\n});\n"})}),"\n",(0,r.jsx)(n.p,{children:"The RxServer will use the queryModifier at many places internally to determine which queries to run or if a document is allowed to be seen/edited by a client."}),"\n",(0,r.jsx)(n.admonition,{type:"note",children:(0,r.jsxs)(n.p,{children:["For performance reasons the ",(0,r.jsx)(n.code,{children:"queryModifier"})," and ",(0,r.jsx)(n.code,{children:"changeValidator"})," ",(0,r.jsx)(n.strong,{children:"MUST NOT"})," be ",(0,r.jsx)(n.code,{children:"async"})," and return a promise. If you need async data to run them, you should gather that data in  the ",(0,r.jsx)(n.code,{children:"RxServerAuthHandler"})," and store it in the auth data to access it later."]})}),"\n",(0,r.jsx)(n.h2,{id:"change-validator",children:"Change validator"}),"\n",(0,r.jsx)(n.p,{children:"The change validator is a JavaScript function that is used to restrict which document writes are allowed to be done by a client.\nFor example you could restrict clients to only change specific document fields or to not do any document writes at all.\nIt can also be used to validate change document data before storing it at the server."}),"\n",(0,r.jsxs)(n.p,{children:["In this example we restrict clients from doing inserts and only allow updates. For that we check if the change contains an ",(0,r.jsx)(n.code,{children:"assumedMasterState"})," property and return false to block the write."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"\nfunction myChangeValidator(authData, change) {\n    if(change.assumedMasterState) {\n        return false;\n    } else {\n        return true;\n    }\n}\n\nconst endpoint = await server.addReplicationEndpoint({\n    name: 'my-endpoint',\n    collection: myServerCollection,\n    changeValidator: myChangeValidator\n});\n"})}),"\n",(0,r.jsx)(n.h2,{id:"server-only-indexes",children:"Server-only indexes"}),"\n",(0,r.jsxs)(n.p,{children:["Normal RxDB schema indexes get the ",(0,r.jsx)(n.code,{children:"_deleted"})," field prepended because all ",(0,r.jsx)(n.a,{href:"/rx-query.html",children:"RxQueries"})," automatically only search for documents with ",(0,r.jsx)(n.code,{children:"_deleted=false"}),".\nWhen you use RxDB on a server, this might not be optimal because there can be the need to query for documents where the value of ",(0,r.jsx)(n.code,{children:"_deleted"})," does not matter. Mostly this is required in the ",(0,r.jsx)(n.a,{href:"/replication.html#checkpoint-iteration",children:"pull.stream$"})," of a replication when a ",(0,r.jsx)(n.a,{href:"#query-modifier",children:"queryModifier"})," is used to add an additional field to the query."]}),"\n",(0,r.jsxs)(n.p,{children:["To set indexes without ",(0,r.jsx)(n.code,{children:"_deleted"}),", you can use the ",(0,r.jsx)(n.code,{children:"internalIndexes"})," field of the schema like the following:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'  {\n    "version": 0,\n    "primaryKey": "id",\n    "type": "object",\n    "properties": {\n        "id": {\n            "type": "string",\n            "maxLength": 100\n        },\n        "name": {\n            "type": "string",\n            "maxLength": 100\n        }\n    },\n    "internalIndexes": [\n        ["name", "id"]\n    ]\n}\n'})}),"\n",(0,r.jsx)(n.admonition,{type:"note",children:(0,r.jsxs)(n.p,{children:["Indexes come with a performance burden. You should only use the indexes you need and make sure you ",(0,r.jsx)(n.strong,{children:"do not"})," accidentally set the ",(0,r.jsx)(n.code,{children:"internalIndexes"})," in your client side ",(0,r.jsx)(n.a,{href:"/rx-collection.html",children:"RxCollections"}),"."]})}),"\n",(0,r.jsx)(n.h2,{id:"server-only-fields",children:"Server-only fields"}),"\n",(0,r.jsxs)(n.p,{children:["All endpoints can be created with the ",(0,r.jsx)(n.code,{children:"serverOnlyFields"})," set which defines some fields to only exist on the server, not on the clients. Clients will not see that fields and cannot do writes where one of the ",(0,r.jsx)(n.code,{children:"serverOnlyFields"})," is set.\nNotice that when you use ",(0,r.jsx)(n.code,{children:"serverOnlyFields"})," you likely need to have a different schema on the server than the schema that is used on the clients."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"const endpoint = await server.addReplicationEndpoint({\n    name: 'my-endpoint',\n    collection: col,\n    // here the field 'my-secretss' is defined to be server-only\n    serverOnlyFields: ['my-secrets']\n});\n"})}),"\n",(0,r.jsx)(n.admonition,{type:"note",children:(0,r.jsxs)(n.p,{children:["For performance reasons, only top-level fields can be used as ",(0,r.jsx)(n.code,{children:"serverOnlyFields"}),". Otherwise the server would have to deep-clone all document data which is too expensive."]})}),"\n",(0,r.jsx)(n.h2,{id:"readonly-fields",children:"Readonly fields"}),"\n",(0,r.jsxs)(n.p,{children:["When you have fields that should only be modified by the server, but not by the client, you can ensure that by comparing the fields value in the ",(0,r.jsx)(n.a,{href:"#change-validator",children:"changeValidator"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"\nconst myChangeValidator = function(authData, change){\n    if(change.newDocumentState.myReadonlyField !== change.assumedMasterState.myReadonlyField){\n        throw new Error('myReadonlyField is readonly');\n    }\n}\n"})}),"\n",(0,r.jsx)(n.h2,{id:"regex-queries-not-allowed",children:"$regex queries not allowed"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"$regex"})," queries are not allowed to run at the server to prevent ",(0,r.jsx)(n.a,{href:"https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS",children:"ReDos Attacks"}),"."]}),"\n",(0,r.jsx)(n.h2,{id:"conflict-handling",children:"Conflict handling"}),"\n",(0,r.jsxs)(n.p,{children:["To ",(0,r.jsx)(n.a,{href:"/replication.html#conflict-handling",children:"detect and handle conflicts"}),", the conflict handler from the endpoints RxCollection is used."]}),"\n",(0,r.jsx)(n.h2,{id:"faq",children:"FAQ"}),"\n",(0,r.jsxs)(t,{children:[(0,r.jsx)("summary",{children:"Why are the server plugins in a different github repo and npm package?"}),(0,r.jsxs)("div",{children:[(0,r.jsx)(n.p,{children:"The RxServer and its other plugins are in a different github repository because:"}),(0,r.jsxs)("ul",{children:[(0,r.jsx)("li",{children:(0,r.jsx)(n.p,{children:"It has too many dependencies that you do not want to install if you only use RxDB at the client side"})}),(0,r.jsx)("li",{children:(0,r.jsxs)(n.p,{children:["It has a different license ",(0,r.jsx)("a",{href:"https://en.wikipedia.org/wiki/Server_Side_Public_License",children:"(SSPL)"}),' to prevent large cloud vendors from "stealing" the revenue, similar to MongoDB\'s license.']})})]})]})]}),"\n",(0,r.jsxs)(t,{children:[(0,r.jsx)("summary",{children:"Why can't endpoits be added dynamically?"}),(0,r.jsx)("div",{children:(0,r.jsxs)(n.p,{children:["After ",(0,r.jsx)(n.code,{children:"RxServer.start()"})," is called, you can no longer add endpoints. This is because many of the supported\nserver libraries do ",(0,r.jsx)("a",{href:"https://github.com/fastify/fastify/issues/1771",children:"not allow dynamic routing"})," for performance and security reasons."]})})]})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>o});var r=t(6540);const i={},s=r.createContext(i);function a(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);