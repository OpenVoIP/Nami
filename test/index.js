const namiLib = require("nami-cc");
const util = require('util');

let namiConfig = {
    host: "192.168.12.187",
    port: 5038,
    username: "xxx",
    secret: "xxx"
};


let nami = new (namiLib.Nami)(namiConfig);

nami.on('namiEvent', function (event) { });
nami.on('namiEventDial', function (event) { });
nami.on('namiEventVarSet', function (event) { });
nami.on('namiEventHangup', function (event) { });

process.on('SIGINT', function () {
    nami.close();
    process.exit();
});

nami.on('namiConnected', function (event) {
    nami.send(new namiLib.Actions.QueueStatus(), function (response) {
        console.log(' ---- Response: ' + util.inspect(response));
    });
});

nami.open();