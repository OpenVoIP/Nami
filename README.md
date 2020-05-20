# NAMI-CC

nami-cc 是一个 node 连接 asterisk 的 ami 库。 根据CC项目 Fork Nami
-  修改package.json,  重命名 nami-cc  发布到 NAM.
-  添加相关 action
    SIPpeerstatus
    UpdateConfig
-  删除冗余日志

## Events used in Nami

 ** `namiConnected`: Emitted when nami could successfully connect and logged in to
an AMI server.

 ** `namiConnection`: Emitted for all connection related events. Listen to this
generic event for the status of the socket connection.

 ** `namiConnection(EventName)`: Emitted for the status of the connection. States
include: `Connect`, `End`, `Error`, `Timeout`, and `Close`. The `Error` event
will emit right before the `Close` event and includes the error that was thrown.
The `Close` event includes a boolean value (`had_error`) if an error was thrown.

 ** namiEvent: Emitted for all events. Listen to this generic event if you want
to catch any events.

 ** `namiEvent(EventName)`: These events are thrown based on the event name
received. Let's say nami gets an event named "Dial", "VarSet", or "Hangup".
This will emit the events: "namiEventDial", "namiEventVarSet", and
"NamiEventHangup".

 ** `namiLoginIncorrect`: Emitted when the login action fails (wrong password,
etc).

 ** `namiInvalidPeer`: Emitted if nami tried to connect to anything that did not
salute like an AMI 1.1, 1.2, or 1.3.

Internal Nami events
--------------------
 ** `namiRawMessage`: Whenever a full message is received from the
AMI (delimited by double crlf), this is emitted to invoke the decode routine.
After namiRawMessage, the decodification routine runs to properly identify this
message as a response, an event that belongs to a response, or an async event
from server.
 ** `namiRawEvent`: Emitted when the decodification routine
classified the received message as an async event from server.
 ** `namiRawResponse`: Emitted when the decodification routine classified the
received message as a response to an action.

## 安装

```sh
$ npm install nami-cc
```

 -or-
Download it from this repo :)

## 配置

Nami expects a configuration object, very much like this:

```js
let namiConfig = {
    host: "amihost",
    port: 5038,
    username: "admin",
    secret: "secret"
};
```

## Quickstart

```sh
$ mkdir testnami
$ cd testnami
$ npm install nami
```

```js
var nami = new (require("nami").Nami)(namiConfig);
nami.on('namiEvent', function (event) { });
nami.on('namiEventDial', function (event) { });
nami.on('namiEventVarSet', function (event) { });
nami.on('namiEventHangup', function (event) { });
process.on('SIGINT', function () {
    nami.close();
    process.exit();
});
nami.on('namiConnected', function (event) {
    nami.send(new namiLib.Actions.CoreShowChannelsAction(), function(response){
        console.log(' ---- Response: ' + util.inspect(response));
    });
});
nami.open();
```

Adding variables to actions
---------------------------
Use the property 'variables' in the actions:

```js
var action = new namiLib.Actions.Status();
action.variables = {
    'var1': 'val1'
};
nami.send(action, function(response) {
    ...
});
```



## Multiple server support
-----------------------
See [this gist](https://gist.github.com/4063103) for an example of how to
connect to multiple asterisk boxes.

## Supported Actions (Check the api for details)
---------------------------------------------
 - Login
 - Logoff
 - Ping
 - Hangup
 - CoreShowChannels
 - CoreStatus
 - CoreSettings
 - Status
 - DahdiShowChannels
 - ListCommands
 - AbsoluteTimeout
 - SipShowPeer
 - SipShowRegistry
 - SipQualifyPeer
 - SipPeers
 - AgentLogoff
 - Agents
 - AttendedTransfer
 - ChangeMonitor
 - Command
 - CreateConfig
 - DahdiDialOffHook
 - DahdiDndOff
 - DahdiDndOn
 - DahdiHangup
 - DahdiRestart
 - DbDel
 - DbDeltree
 - DbGet
 - DbPut
 - ExtensionState
 - GetConfig
 - GetConfigJson
 - GetVar
 - SetVar
 - JabberSend
 - ListCategories
 - PauseMonitor
 - LocalOptimizeAway
 - Reload
 - PlayDtmf
 - Park
 - ParkedCalls
 - Monitor
 - ModuleCheck
 - ModuleLoad
 - ModuleReload
 - ModuleUnload
 - MailboxCount
 - MailboxStatus
 - VoicemailUsersList
 - Originate
 - Redirect
 - Bridge
 - UnpauseMonitor
 - StopMonitor
 - ShowDialPlan
 - SendText
 - Queues
 - QueueUnpause
 - QueuePause
 - QueueSummary
 - QueueStatus
 - QueueRule
 - QueueRemove
 - QueueAdd
 - QueueLog
 - AGI
 - BlindTransfer
 - Filter
 - Events

Thanks to
--------

 * Joshua Elson for his help in trying and debugging in loaded asterisk servers
and testing with node 0.6.5 and newer npm versions
 * Jon Hoult for his help in testing with AMI 1.2
 * Jonathan Nicholson (rooftopsparrow) for working on exposing connection events,
making reconnections a breeze.
 * Moshe Brevda for his contributions
