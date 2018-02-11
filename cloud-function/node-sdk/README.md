# 云函数 Node.js SDK

目前知晓云云函数支持的 Node.js 开发语言包括如下版本：
- Node.js 8.9


## 代码编写格式

在云函数中使用 Node.js 编程，需要定义一个 Node.js 函数作为入口，一个简单的函数定义如下：

```js
exports.main = function helloWorld(event, callback) {
  let name = event.data.name
  callback(null, 'hello ' + name)
}
```

## 参数介绍

**event**

此参数包含了触发事件的相关数据:

| 包含字段         | 类型            | 说明 |
| :-------------- | :------------- | :-- |
| data            | 任何 js 合法类型 | 在用户调用云函数时传入的参数 |
| eventType       | String         | 提供给用户的触发来源的信息，包括http-call/event-payment/event-data/event-schedule |
| jobId           | Number         | 当前函数执行的 id |
| memoryLimitInMB | Number         | 当前函数的内存资源限制 |
| miniappId       | Number         | 云函数所属小程序 id |
| request         | Object         | 若云函数请求来自 BaaS SDK, 此处存储请求用户及其他客户端信息 |
| ssl_cert        | String         | 容器用于外部网络请求的 certificate |
| ssl_key         | String         | 容器用于外部网络请求的 key |
| timeLimitInMS   | Number         | 当前函数的 timeout 时间 |
| token           | String         | 云函数所属小程序的 token，用于在云函数中处理 BaaS 数据时的验证 |


**callback**

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