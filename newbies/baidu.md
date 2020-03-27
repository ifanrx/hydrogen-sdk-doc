# 新手入门

**新手入门**章节将会带领大家如何**从零开始**将知晓云接入小程序中。

在本章节中，你将会学到以下内容：

- 小程序注册指引

- 知晓云账号注册

- 创建第一个接入知晓云的小程序

## 小程序注册指引

在使用**知晓云**之前，请先确保按照百度小程序官方指引完成[小程序注册流程](https://smartprogram.baidu.com/docs/introduction/enter_application/)。

## 知晓云账号注册

开发者按照百度小程序官方的指引申请到自己的小程序后，接下来就可注册并获取知晓云账号，完成相关信息绑定与服务配置后，即可使用知晓云提供的后端服务。

### 注册并完成相关信息绑定

前往[知晓云](https://cloud.minapp.com/)注册知晓云账号。

成功注册后，页面将跳转至控制台，需要用户进一步完成**邮箱激活验证**和**企业信息设置**等步骤。

完成以上步骤，即可进入知晓云 dashboard 页。

>**danger**
> 如果注册或邮件激活失败，请开发者根据失败提示进行后续操作。如果开发者认为是服务提供方方面导致的失败，请邮件联系 `mincloud@ifanr.com`，我们会第一时间处理您的邮件。

### 小程序第三方授权以及服务器域名配置

为了使用知晓云提供的后端服务，进入 dashboard 后，开发者首先需要为知晓云授权。

知晓云在设置模块提供了**一键授权**功能，用户只需在应用“导览”页中找到百度小程序平台，点击**立即接入**，接着在“设置-百度”页中填写配置信息完成授权即可。

![一键开通](/images/newbies/open-up-baidu.png)

![一键授权](/images/newbies/baidu-setting.png)

### SDK 文件版接入

完成授权后，接下来用户需要进行服务器域名配置，以解锁小程序 [SDK](/js-sdk/download-sdk.md) 服务。

![知晓云服务器域名](/images/newbies/hydrogen-domain-name1.png)

![知晓云服务器域名](/images/newbies/domain-name-config-qq.png)

登录[小程序后台](https://smartprogram.baidu.com/developer/index.html)，进入 “设置 - 开发设置”页面，将知晓云提供给开发者的服务器域名全部配置到百度开发者后台的“服务器域名”配置项中。

## 第一个接入知晓云的小程序

下面，我们以**我的书架**小程序 demo 为例，创建第一个接入知晓云的小程序。

### 1、 知晓云的初始化配置

首先，打开[百度开发者工具](https://smartprogram.baidu.com/docs/develop/devtools/history/)，将先前下载好的[演示 demo](https://github.com/ifanrx/hydrogen-demo.git) 的 `baidu-sdk-demo` 文件夹添加入小程序项目中。

![创建小程序项目](/images/newbies/minapp-creation-baidu.png)

进入项目后，在开发者工具右上角进入项目信息设置，填写 APPID，其中 `APPID` 为小程序的 ID，在 百度小程序后台**设置 >> 开发设置** 中可获取，知晓云也在[**设置模块的小程序面板**](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]settings/baidu/)提供了快速通道获取小程序 ID。。

![开发者 ID](/images/newbies/link-baidu-minapp.png)

接下来，在 `app.js` 中引入 [SDK js 文件](/js-sdk/download-sdk.md)。

<pre>
<code class="lang-js">
// app.js

App({
  onLaunch() {
    // require SDK
    require('./sdk-baidu.{{ book.latestVersionBaidu }}.js')
  }
})
</code>
</pre>


最后，通过初始化 [SDK](/js-sdk/download-sdk.md)，知晓云服务可以验证当前的小程序是否是有效合法的，只有通过验证的小程序才能使用 [SDK](/js-sdk/download-sdk.md) 提供的全部功能。

在知晓云后台 - [**设置模块的小程序面板**](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]settings/info/)，可获取要接入知晓云服务的小程序 `ClientID`, 按照如下方式进行 [SDK](/js-sdk/download-sdk.md) 初始化:

<pre>
<code class="lang-js">
// app.js

App({
  onLaunch() {
    // 引入 SDK
    require('./sdk-baidu.{{ book.latestVersionBaidu }}.js')
    let clientID = '[[client_id]]'  // 应用名称: [[app_name]]
    swan.BaaS.init(clientID)
  }
})
</code>
</pre>

### 2、创建数据表

完成知晓云的初始化配置后，开发者就可以根据自身应用的业务逻辑，确定所需的数据表，确定好后即可在**知晓云后台 >> 数据管理模块**开始数据表的创建工作。

以**我的书架**为例，在数据管理模块，创建一张名为 `bookshelf` 的数据表，并添加一个名为 `bookName` 的数据列。

![创建表](/images/newbies/table-creation.jpeg)

![添加列](/images/newbies/column-addition.jpeg)

### 3、SDK 数据操作接口使用示例

完成数据表的创建后，我们现在就可以使用知晓云的数据管理模块的功能，对数据进行 CRUD 操作。

**创建第一本书**

```js
// pages/index.js
Page({
  data: {
    creatingBookName: '',
  },

  // 绑定添加书目的提交按钮点击事件，向服务器发送数据
  createBook(e) {
    let bookName = this.data.creatingBookName // 缓存在 data 对象中的输入框输入的书名
    let Books = new swan.BaaS.TableObject('bookshelf') //实例化对应 tableName 的数据表对象
    let book = Books.create() // 创建一条记录

  // 调用创建数据项接口，进行数据的持久化存储，详见：https://doc.minapp.com/js-sdk/schema/create-record.html
    book.set({bookName})
      .save()
      .then(() => {
        //...
      })
  }
})
```

> **info**
> 注意，上述代码可能和 `我的书架` 源码有一定的差异，但是代码的逻辑和接口的调用方式基本上是一样。

同时，我们可以在数据管理模块看到新增的数据项。

![bookshelf 数据表](/images/newbies/bookshelf-schema.png)

至于更新书名和删除书籍等操作，其接口调用过程大致和创建书籍一样，这里就不再赘述，详见[**演示 demo**](https://github.com/ifanrx/hydrogen-demo/tree/master/baidu-sdk-demo)的源码。
