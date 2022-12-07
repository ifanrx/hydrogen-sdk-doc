# 代码格式

在云函数中使用 Node.js 编程，需要定义一个 Node.js 函数作为入口，一个简单的函数定义如下：

```js
exports.main = function helloWorld(event, callback) {
  let name = event.data.name
  callback(null, 'hello ' + name)
}
```

> **info**
> 云函数已支持 async/await 语法，请参考[文档](/cloud-function/node-sdk/start/async-await.md)

> 云函数执行与返回机制，请参考[Node.js 事件循环](/cloud-function/node-sdk/start/nodejs-event-loop.md)

## 参数介绍

**event**

类型: `Object`

此参数包含了触发事件的相关数据:

| 包含字段         | 类型             | 说明                                                                                                                        |
| :--------------- | :--------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| data             | 任何 js 合法类型 | 在用户调用云函数时传入的参数                                                                                                |
| eventType        | String           | 提供给用户的触发来源的信息，包括 sdk/open_api/user_dash/cloud_function/[api_gateway](/support/practice/api-gateway.md) 等   |
| jobId            | Number           | 当前函数执行的 id                                                                                                           |
| memoryLimitInMB  | Number           | 当前函数的内存资源限制                                                                                                      |
| miniappId        | Number           | 云函数所属小程序 id                                                                                                         |
| request          | Object           | 若云函数请求来自 BaaS SDK, 此处存储请求用户及其他客户端信息                                                                 |
| timeLimitInMS    | Number           | 当前函数的 timeout 时间                                                                                                     |
| signKey          | string           | 密钥，用于获取微信小程序的 access token 时解密，使用参考：[获取微信 ACCESS_TOKEN](/cloud-function/node-sdk/access-token.md) |
| flex_schema_name | String           | 当数据表触发器触发执行云函数时，其值为触发执行的数据表名称，其他情况没有此字段                                              |
| env              | Object           | 若云函数属于测试环境，则此处传入环境 ID 及名称                                                                                                          |


request 结构说明

| 参数            | 类型    | 描述                               |
| :-------------- | :------ | :--------------------------------- |
| meta.ip_address | String  | 发起云函数请求的 IP                |
| meta.user_agent | String  | 发起云函数请求设备的 userAgent     |
| user.avatar_url | String  | 发起云函数请求的用户头像           |
| user.nickname   | String  | 发起云函数请求的用户昵称           |
| user.openid     | String  | 发起云函数请求的用户的微信 openid  |
| user.uniond     | String  | 发起云函数请求的用户的微信 unionid |
| user.id         | Integer | 发起云函数请求的用户 ID            |

request 示例如下

```json
{
  "meta": {
    "ip_address": "123.61.205.211",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.2 Safari/605.1.15"
  },
  "user": {
    "avatar_url": "http://cdn.ifanr.cn/ifanr/default_avatar.png",
    "id": 135570997,
    "nickname": "ifanr",
    "openid": null,
    "unionid": null
  }
}
```

env 结构说明

| 参数            | 类型    | 描述                               |
| :-------------- | :------ | :--------------------------------- |
| id              | String  | 环境 ID                           |
| name            | String  | 环境名称                           |

env 示例如下

```json
{
  "id": "a4d2d62965ddb57fa4xx",
  "name": "test"
}
```

**callback**

类型: `(err: any, data: any) => void`

可选项。使用此参数用于将你所希望的信息返回给调用方。格式如 `callback(err, data)`，err 为错误信息，可为 Error 类型或字符串，没有出错的情况下，可设置为 null；data 为函数成功执行的结果信息。


## 日志

你可以在程序中使用如下几种不同的日志级别来完成日志输出:

```js
console.log(message)
console.error(message)
console.warn(message)
console.info(message)
```

日志格式为：ISOString + 日志级别 + message，如下示例：

```
2017-07-05T05:13:35.920Z INFO hello world
```

## 已包含的库及使用方法

目前支持在云函数中对知晓云中的数据，内容和文件进行操作，同时也支持调用其它云函数，发送邮件和模板消息等功能，使用如下：

```js
exports.main = function (event, callback) {
  let AddressBook = new BaaS.TableObject(7)

  AddressBook.get('591c2b89ae63c874d6e37bc7').then(res => {
    callback(null, res.data)
  }, err => {
    callback(err)
  })
}
```

如需其他第三方库，请使用[本地代码打包](/cloud-function/packaging.md)并使用[命令行工具](/cloud-function/cli.md)上传
