'use strict';(0,require('./fixbug/appendFiles/index.js').AppendFilesToReactNativeSync)(),require('@react-native-community/cli');var e=require('path'),r=(require("fs"),require("./config/common")),t=r.project_dir,o=r.API_LEVEL,s=(r.SUPPORTED_ASSET_FILE_TYPES,r.IDX_MOD,r.DEV),i=s;s&&process.argv.length>2&&"--test"==process.argv[2]&&(i=!1,console.log("run as real sdk for github"));var n=i||process.argv.includes("--reset-cache")||process.argv.includes("-r"),u=e.join(t,"miot-sdk","native");if(!i){var a=require("metro-resolver");a._miot_resolve=a.resolve,a.resolve=function(r,t,o){return r._miot_dirExists||(r._miot_dirExists=r.dirExists,r.dirExists=function(e){return!!e.startsWith(u)||r._miot_dirExists(e)},r._miot_doesFileExist=r.doesFileExist,r.doesFileExist=function(t){if(t.startsWith(u)){var o=e.relative(u,t);return!(o.indexOf(".")!=o.lastIndexOf(".")||!o.endsWith(".js")||o.startsWith("android.")||o.startsWith("ios.")||o.startsWith("common."))}return r._miot_doesFileExist(t)}),a._miot_resolve(r,t,o)}}var c=require("@react-native-community/cli/node_modules/metro/src/node-haste/DependencyGraph.js");function l(e){for(var r=process.argv,t=0;t<r.length;t++)if(e==r[t]){if(++t==r.length)return!1;var o=r[t];return!!(o&&o.length>0)&&('-'==o.charAt(0)?null:o)}return!1}c._miot_load=c.load,c.load=function(e){return c._miot_load(e).then(function(e){if(!i){var r=e._moduleCache;r._miot_getModule=r.getModule,r.getModule=function(e){var t=r._miot_getModule(e);return null==t._sourceCode&&e.startsWith(u)&&(t._sourceCode=""),t}}return console.log('node server ready!'),console.log("\n    \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n    \u2502                                                                              \u2502\n    \u2502  MIOT SDK API_LEVEL is "+o+"                                                 \u2502\n    \u2502  please open the MiHome(MIJIA) App for debug from your mobile                \u2502\n    \u2502  connect your device and setup then start to debug your plugin projects      \u2502\n    \u2502                                                                              \u2502\n    \u2502  https://github.com/MiEcosystem/miot-plugin-sdk                              \u2502\n    \u2502                                                                              \u2502\n    \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518"),e})};var d=l("--host")||l("-h"),_=l("--port")||l("-p");process.argv=["","","start"],n&&process.argv.push("--reset-cache"),d&&process.argv.push("--host",d),_&&process.argv.push("--port",_),require('@react-native-community/cli').run();