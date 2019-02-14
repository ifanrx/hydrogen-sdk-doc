# 云函数使用必读

## 权限

在云函数中执行的代码权限等级为超级管理员权限，不受数据表 ACL 的限制。
因此开发者可以在云函数中执行一些特权操作，比如：
- 批量修改用户信息
- 写入一张所有人不可写的数据表
- 删除数据表

## 云函数中 event 结构说明

一个典型的云函数代码结构如下：

```javascript
exports.main = function getArticles(event, callback) {
  console.log(event)
 callback(null, 'test')
}
```

我们可以通过 event 对象，获取很多重要信息，说明如下：


| 参数      | 类型   | 描述 | 示例 |
| :-------- | :----- | :--- | :--- |
| data      | Object | 触发云函数的 data，若从 SDK 触发，则为 invokeFunction 中的 params, 若为触发器触发，则为触发触发器的数据行。| {"id": "SnHzr40rtAufDke2r6FJ7xxE"} |
| eventType | String | 触发云函数的类型 | SDK |
| jobId     | String | 云函数任务的唯一标记 ID | "a83ec181e20c4d50b83093157c8283a1" |
| request   | Object | 如果云函数由小程序端触发，此处记录请求用户的信息 | 见下面 request 示例 |

request 结构说明

| 参数             | 类型   | 描述 | 
| :-------------- | :----- | :--- | 
| meta.ip_address | Object | 发起云函数请求的 IP   |
| meta.user_agent | String | 发起云函数请求设备的 userAgent |
| user.avatar_url | String | 发起云函数请求的用户头像  |
| user.nickname   | Object | 发起云函数请求的用户昵称 | 
| user.id         | Object | 发起云函数请求的用户 ID | 

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
    "nickname": "ifanr"
  }
}
```

## 任务调度策略

当前版本的云函数并发限制为 10，即只能同时运行 10 个云函数任务，若在应用正在运行 10 个云函数任务时接收到新任务，将会按照以下策略进行调度：

1. 同步云函数任务：
在 3 秒内会重试几次进行调度执行，如果每次调度时应用都已经有 10 个云函数任务在运行，则调度失败，云函数任务不会被运行。

2. 异步云函数任务：
在 5 分钟内在重试几次进行调度执行，如果每次调度时应用都已经有 10 个云函数任务在运行，则调度失败，云函数任务不会被运行。