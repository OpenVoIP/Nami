# NAMI-CC

[nami-cc](https://github.com/OpenVoIP/Nami) 是一个 node 连接 asterisk 的 ami 库。 根据CC项目 Fork [Nami](https://github.com/marcelog/Nami)

- 修改package.json,  重命名 nami-cc  发布到 NAM.
- 添加相关 action
- 删除冗余日志

## 安装

``` bash
npm install nami-cc
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

## 快速开始

```sh
 mkdir testnami
 cd testnami
 npm install nami
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
