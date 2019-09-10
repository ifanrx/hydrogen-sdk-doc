# 新手入门

本章节将带领大家从零开始完成知晓云接入小程序或 Web 应用的基本流程。请选择以下一种平台类型，查看详细的新手入门指南。

- [微信小程序](./wechat.md)
- [Web](./web.md)
- [支付宝小程序](./alipay.md)

通过上面的文章，我们了解到去哪里注册小程序、知晓云的注册以及相关信息的绑定与授权，并引导大家快速搭建起一个采用知晓云作为后端服务的小程序或 Web 应用。至此，我们就可以基于以上的基本概念，在接下来的小程序或 Web 开发中实现开发效率的显著提升。

此外我们还提供了在各个平台中使用知晓云的更详细的接入指南，请移步以下章节查看

- [微信小程序接入指南](/js-sdk/wechat/README.md)
- [QQ 小程序接入指南](/js-sdk/qq/README.md)
- [Web 接入指南](/js-sdk/web/README.md)
- [支付宝小程序接入指南](/js-sdk/alipay/README.md)
- [Android 应用接入指南](/android-sdk/install.md)
- [iOS 应用接入指南](/ios-sdk/install.md)
- [百度小程序接入指南](/js-sdk/baidu/README.md)

## 使用场景介绍

知晓云提供了丰富的 SDK 和 API 支持，每个都有其适用的使用场景，结合不同的 SDK 和 API，可以覆盖绝大部分的日常使用场景。

### JS SDK

![使用知晓云 JS SDK](/images/newbies/using-js-sdk-demo.png)

JS SDK 可以覆盖绝大部分小程序和 Web 开发的使用场景：开发者把知晓云 JS SDK 集成到小程序或 Web 应用中，方便快捷地完成用户注册，信息提交，支付等业务逻辑。

### 云函数 Node.js SDK

![使用 Node.js SDK](/images/newbies/using-node-sdk.png)

Node.js SDK 在云函数中使用，可以完成某些在前端不方便完成的操作，比如计算密钥，修改不对外公开的数据表等敏感操作。

#### 例子

现在有一张 `product` 表，表中有名为 `hash`，`name`, `price` 三个字段，`hash` 字段是根据该数据行的 `name`, `price` 计算出来的，计算方式为 md5(`name` + `price` + `'pwd'`)

|name|price|hash           |
|----|---- |---------------|
|abc |123  | md5(abc123pwd)| 

如果我们在小程序端计算 `hash` 的话，`hash` 的计算方法和密钥 `'pwd'` 被破译的几率较大，不安全。
更好的方法是我们在云函数中编写计算 hash 的逻辑，然后小程序调用对应的云函数来获取 hash。最后提交到 product 表中。

更多关于云函数，Node.js SDK 的文档，请[移步这里](/cloud-function/README.md)

[云函数实战教程请移步这里](/support/practice/cloud-function.md)

### OPEN API

![使用 OPEN API](/images/newbies/using-open-api.png)

通过 OPEN API，你可以在自己的服务器上，使用 php、nodejs、python 等编程语言或 curl 等工具来操作在知晓云上的数据。

#### 例子

假设有这样的需求: 每天 0 点在服务器上遍历知晓云上的 `product` 数据表, 生成 excel 报表。
那么我们可以在服务器上添加一个 `cron` 任务，定时调用 OPEN API 来获取 `product` 表的数据以便生成报表。

更多请参考 [OPEN API 文档](/open-api/README.md)

### 运营后台 API

![自定义运营后台](/images/newbies/using-user-dashboard.png)

知晓云控制台现有的功能复杂且强大，对开发人员友好，但对于运营人员来说，上手使用的难度较大，
因此如果你希望针对业务需求开发出一个定制版本的控制台，那么使用运营后台 API 是你最好的选择。
目前开发者可以选择自动生成运营后台或者上传运营后台代码，如果你需要自己编写运营后台，可以参考这个 [demo](https://github.com/ifanrx/user-dashboard-antd-demo) 

#### 例子

公司的运营同事希望查看知晓云上某张表的数据，但是为了安全起见，
不能给予其编辑和删除表的权限，以防误操作导致生产事故，但是目前知晓云的权限限制的粒度没有这么细，无法做到上面的权限控制。
这时候我们可以结合运营后台 API ，搭建一个页面来展示表数据，同时页面上不提供编辑功能，这样既可以满足运营同事的需求，又可以保证数据安全。

更多请参考[运营后台 API 文档](/user-dash/README.md)
