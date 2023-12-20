"use strict";(self.webpackChunkrxdb=self.webpackChunkrxdb||[]).push([[7987],{6846:(e,r,o)=>{o.r(r),o.d(r,{assets:()=>d,contentTitle:()=>s,default:()=>l,frontMatter:()=>n,metadata:()=>i,toc:()=>c});var t=o(5893),a=o(1151);const n={title:"Worker RxStorage \ud83d\udc51",slug:"rx-storage-worker.html"},s="Worker RxStorage",i={id:"rx-storage-worker",title:"Worker RxStorage \ud83d\udc51",description:"With the worker plugin, you can put the RxStorage of your database inside of a WebWorker (in browsers) or a Worker Thread (in node.js). By doing so, you can take CPU load from the main process and move it into the worker's process which can improve the perceived performance of your application. Notice that for browsers, it is recommend to use the SharedWorker instead to get a better performance.",source:"@site/docs/rx-storage-worker.md",sourceDirName:".",slug:"/rx-storage-worker.html",permalink:"/rx-storage-worker.html",draft:!1,unlisted:!1,editUrl:"https://github.com/pubkey/rxdb/tree/main/docs-src/docs/rx-storage-worker.md",tags:[],version:"current",frontMatter:{title:"Worker RxStorage \ud83d\udc51",slug:"rx-storage-worker.html"},sidebar:"tutorialSidebar",previous:{title:"Remote RxStorage",permalink:"/rx-storage-remote.html"},next:{title:"SharedWorker RxStorage \ud83d\udc51",permalink:"/rx-storage-shared-worker.html"}},d={},c=[{value:"On the worker process",id:"on-the-worker-process",level:2},{value:"On the main process",id:"on-the-main-process",level:2},{value:"Pre-build workers",id:"pre-build-workers",level:2},{value:"One worker per database",id:"one-worker-per-database",level:2}];function h(e){const r={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,a.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.h1,{id:"worker-rxstorage",children:"Worker RxStorage"}),"\n",(0,t.jsxs)(r.p,{children:["With the worker plugin, you can put the ",(0,t.jsx)(r.code,{children:"RxStorage"})," of your database inside of a WebWorker (in browsers) or a Worker Thread (in node.js). By doing so, you can take CPU load from the main process and move it into the worker's process which can improve the perceived performance of your application. Notice that for browsers, it is recommend to use the ",(0,t.jsx)(r.a,{href:"/rx-storage-shared-worker.html",children:"SharedWorker"})," instead to get a better performance."]}),"\n",(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.strong,{children:"NOTICE:"})," This plugin is part of ",(0,t.jsx)(r.a,{href:"/premium",children:"\ud83d\udc51 RxDB premium"}),". It is not part of the default RxDB module."]}),"\n",(0,t.jsx)(r.h2,{id:"on-the-worker-process",children:"On the worker process"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:"// worker.ts\n\nimport { exposeWorkerRxStorage } from 'rxdb-premium/plugins/storage-worker';\nimport { getRxStorageLoki } from 'rxdb/plugins/storage-lokijs';\n\nexposeWorkerRxStorage({\n    /**\n     * You can wrap any implementation of the RxStorage interface\n     * into a worker.\n     * Here we use the LokiJS RxStorage.\n     */\n    storage: getRxStorageLoki()\n});\n"})}),"\n",(0,t.jsx)(r.h2,{id:"on-the-main-process",children:"On the main process"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:"import {\n    createRxDatabase\n} from 'rxdb';\nimport { getRxStorageWorker } from 'rxdb-premium/plugins/storage-worker';\n\nconst database = await createRxDatabase({\n    name: 'mydatabase',\n    storage: getRxStorageWorker(\n        {\n            /**\n             * Contains any value that can be used as parameter\n             * to the Worker constructor of thread.js\n             * Most likely you want to put the path to the worker.js file in here.\n             * \n             * @link https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker\n             */\n            workerInput: 'path/to/worker.js',\n            /**\n             * (Optional) options\n             * for the worker.\n             */\n            workerOptions: {\n                type: 'module',\n                credentials: 'omit'\n            }\n        }\n    )\n});\n"})}),"\n",(0,t.jsx)(r.h2,{id:"pre-build-workers",children:"Pre-build workers"}),"\n",(0,t.jsxs)(r.p,{children:["The ",(0,t.jsx)(r.code,{children:"worker.js"})," must be a self containing JavaScript file that contains all dependencies in a bundle.\nTo make it easier for you, RxDB ships with pre-bundles worker files that are ready to use.\nYou can find them in the folder ",(0,t.jsx)(r.code,{children:"node_modules/rxdb-premium/dist/workers"})," after you have installed the ",(0,t.jsx)(r.a,{href:"/premium",children:"\ud83d\udc51 RxDB Premium Plugin"}),". From there you can copy them to a location where it can be served from the webserver and then use their path to create the ",(0,t.jsx)(r.code,{children:"RxDatabase"}),"."]}),"\n",(0,t.jsxs)(r.p,{children:["Any valid ",(0,t.jsx)(r.code,{children:"worker.js"})," JavaScript file can be used both, for normal Workers and SharedWorkers."]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:"import {\n    createRxDatabase\n} from 'rxdb';\nimport { getRxStorageWorker } from 'rxdb-premium/plugins/storage-worker';\nconst database = await createRxDatabase({\n    name: 'mydatabase',\n    storage: getRxStorageWorker(\n        {\n            /**\n             * Path to where the copied file from node_modules/rxdb/dist/workers\n             * is reachable from the webserver.\n             */\n            workerInput: '/lokijs-incremental-indexeddb.worker.js'\n        }\n    )\n});\n"})}),"\n",(0,t.jsx)(r.h2,{id:"one-worker-per-database",children:"One worker per database"}),"\n",(0,t.jsxs)(r.p,{children:["Each call to ",(0,t.jsx)(r.code,{children:"getRxStorageWorker()"})," will create a different worker instance so that when you have more then one ",(0,t.jsx)(r.code,{children:"RxDatabase"}),", each database will have its own JavaScript worker process."]}),"\n",(0,t.jsxs)(r.p,{children:["To reuse the worker instance in more than one ",(0,t.jsx)(r.code,{children:"RxDatabase"}),", you can store the output of ",(0,t.jsx)(r.code,{children:"getRxStorageWorker()"})," into a variable an use that one. Reusing the worker can decrease the initial page load, but you might get slower database operations."]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:"// Call getRxStorageWorker() exactly once\nconst workerStorage = getRxStorageWorker({\n    workerInput: 'path/to/worker.js'\n});\n\n// use the same storage for both databases.\nconst databaseOne = await createRxDatabase({\n    name: 'database-one',\n    storage: workerStorage\n});\nconst databaseTwo = await createRxDatabase({\n    name: 'database-two',\n    storage: workerStorage\n});\n\n"})})]})}function l(e={}){const{wrapper:r}={...(0,a.a)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},1151:(e,r,o)=>{o.d(r,{Z:()=>i,a:()=>s});var t=o(7294);const a={},n=t.createContext(a);function s(e){const r=t.useContext(n);return t.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function i(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),t.createElement(n.Provider,{value:r},e.children)}}}]);