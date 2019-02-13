# 快速入门

## 如何使用

一般云函数主要会涉及创建和触发两个操作

1.如何创建和编写云函数：

开发者可以登录到知晓云控制台，进入到**引擎-云函数**界面，知晓云提供了一个在线代码编辑器，你可以在上面编写你的云函数。目前编写云函数的渠道只有这里，后续我们会提供命令行功能上传云函数等渠道。

创建完云函数后为其编写逻辑代码，目前支持的编程语言仅有 `Node.js`，后续我们也会增加对其它语言的支持。

编写完代码，点击提交，你的第一个云函数就诞生啦。

2.如何触发云函数

写云函数的目的不过是供我们的应用进行调用，这就涉及到了如何触发云函数的问题。知晓云提供了多种方式触发云函数，包括在小程序中使用我们的 JS SDK 进行触发；在知晓云控制台中定义触发器，指定触发类型为云函数；定时任务定时触发等。

下面，我们通过创建和使用一个 helloWorld 云函数，来了解一下如何使用知晓云的云函数吧。

## hello world 示例

### 在控制台创建云函数

进入知晓云控制台，选择一个应用进入，依次点击「 引擎 」、「 云函數 」、「 添加 」。

![进入云函数控制台面板](/1.x/images/cloud-function/dashboard-into.png)

在弹出添加云函数模态框中，选择 `Hello world` 模板，函数命名为 `helloWorld`，点击确认，即可完成云函数的创建。

![创建 hello world 函数](/1.x/images/cloud-function/dashboard-hello-world.png)

创建好云函数后，在代码编辑器中，默认会添加以下一段代码，它的作用是当调用该方法后，函数会返回 'hello world'。

```js
exports.main = function helloWorld(event, callback) {
  callback(null, "hello world")
}
```


### 在小程序中触发云函数

云函数创建好后，就可以在你的微信小程序代码中，触发该函数了。在此之前，你得先下载我们的 JS SDK，导入项目并进行初始化，关于这块的内容，可以查看我们的 [JS SDK 文档](/1.x/js-sdk/README.md)。触发云函数的示例代码如下：

```js
wx.BaaS.invokeFunction('helloWorld').then(res => {
  console.log(res.data)  // 'hello world'
})
```

### 云函数中使用 Node.js SDK

上面只是简单地返回了一个 'hello world' 字符串，现在让我们使用知晓云的数据存储功能，做些更有意义的事吧。

按照上面创建云函数的方法，我们创建一个 `getArticles` 的函数。然后在数据面板创建一张 article 表，为它添加几条记录，调用我们的云函数 `getArticles` 获取 article 表中的记录。

修改云函数的代码如下：

```js
exports.main = function getArticles(event, callback) {
  let tableID = 212
  let Article = new BaaS.TableObject(tableID)

  Article.limit(100).find().then(res => {
    callback(null, res.data.objects)
  }, err => {
    callback(err)
  })
}
```

修改小程序中的代码：

```js
wx.BaaS.invokeFunction('getArticles').then(res => {
  console.log(res.data) // articles
})
```

### 云函数中 event 包含的可用参数

参数说明

| 参数      | 类型   | 描述 | 示例 |
| :-------- | :----- | :--- | :--- |
| data      | Object | 触发云函数的 data，若从 SDK 触发，则为 invokeFunction 中的 params, 若为触发器触发，则为触发触发器的数据行。| {"id": "SnHzr40rtAufDke2r6FJ7xxE"} |
| eventType | String | 触发云函数的类型 | SDK |
| jobId     | String | 云函数任务的唯一标记 ID | "a83ec181e20c4d50b83093157c8283a1" |
| request   | Object | 如果云函数由小程序端触发，此处记录请求用户的信息 | 见下面 request 示例 |

request 示例
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