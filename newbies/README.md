# 新手入门

**新手入门**章节将会带领大家如何**从零开始**将知晓云接入小程序中。

在本章节中，你将会学到以下内容：

- 小程序注册指引

- 知晓云账号注册

- 创建第一个接入知晓云的小程序

## 小程序注册指引

在使用**知晓云**之前，请先确保按照微信官方指引完成[小程序注册流程](https://developers.weixin.qq.com/miniprogram/dev/)。

## 知晓云账号注册

开发者在微信公众平台申请到自己的小程序后，接下来就可注册并获取知晓云账号，完成相关信息绑定与服务配置后，即可使用知晓云提供的后端服务。

### 注册并完成相关信息绑定

前往[知晓云](https://cloud.minapp.com/)注册知晓云账号。

成功注册后，页面将跳转至控制台，需要用户进一步完成**邮箱激活验证**和**企业信息设置**等步骤。

完成以上步骤，即可进入知晓云 dashboard 页。

>**danger**
> 如果注册或邮件激活失败，请开发者根据失败提示进行后续操作。如果开发者认为是服务提供方方面导致的失败，请邮件联系 `mincloud@ifanr.com`，我们会第一时间处理您的邮件。

### 小程序第三方授权以及服务器域名配置

为了使用知晓云提供的后端服务，进入 dashboard 后，开发者首先需要为知晓云授权。

知晓云在设置模块提供了**一键授权**功能，用户只需点击**立即授权**并在新开授权回调页完成授权即可。

![一键授权](/images/newbies/one-key-authorization.jpeg)

{% tabs SDKPluginConfig="SDK 插件版接入", SDKFileConfig="SDK 文件版接入" %}

{% content "SDKPluginConfig" %}

## 第一个接入知晓云的小程序

下面，我们以**我的书架**小程序 demo 为例，创建第一个接入知晓云的小程序。

### 1、 知晓云的初始化配置

首先，打开[微信开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html?t=201822)，将先前下载好的[演示 demo](https://github.com/ifanrx/hydrogen-demo.git) 的 `hello-world` 文件夹添加入小程序项目中。

![创建小程序项目](/images/newbies/minapp-creation.jpeg)

其中 `AppID` 为小程序的 ID，在微信小程序后台**设置 >> 开发设置** 中可获取，知晓云也在[**设置模块的小程序面板**](https://cloud.minapp.com/dashboard/#/app/settings/app/)提供了快速通道获取小程序 ID。

![开发者 ID](/images/newbies/developer-id.jpg)

#### 在 app.json 中加入插件的引用声明

> **info**
> 插件版 sdk 1.5.1 以上需小程序基础库 2.1.0 及以上。

<pre>
<code class="lang-js">
"plugins": {
    "sdkPlugin": {
      "version": "{{ book.latestVersion }}",
      "provider": "wxc6b86e382a1e3294"
 }
} 
</code>
</pre>

![添加插件引用](/images/newbies/import-plugin.jpg)

##### 在 app.js 文件中完成 SDK 的初始化

通过初始化 [SDK](/js-sdk/download-sdk.md)，知晓云服务可以验证当前的小程序是否是有效合法的，只有通过验证的小程序才能使用 [SDK](/js-sdk/download-sdk.md) 提供的全部功能。

在知晓云后台 - [**设置模块的小程序面板**](https://cloud.minapp.com/dashboard/#/app/settings/app/)，可获取要接入知晓云服务的小程序 `ClientID`, 按照如下方式进行 [SDK](/js-sdk/download-sdk.md) 初始化:

[复制 clientID](/images/newbies/get-client-id.png)

```js
// app.js
App({
  onLaunch: function() {
    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login,
     wx.getUserInfo,
     wx.requestPayment)

    let clientID = '知晓云管理后台获取到的 ClientID'
    wx.BaaS.init(clientID)
  }
})
    
```

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
    let tableID = '1' // 从知晓云后台的数据表中获取到的对应数据表的 ID
    let Books = new wx.BaaS.TableObject(tableID) //实例化对应 tableID 的数据表对象
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
> 注意，上述代码可能和 `hello-world` 源码有一定的差异，但是代码的逻辑和接口的调用方式基本上是一样。

同时，我们可以在数据管理模块看到新增的数据项。

![bookshelf 数据表](/images/newbies/bookshelf-schema.jpeg)

至于更新书名和删除书籍等操作，其接口调用过程大致和创建书籍一样，这里就不再赘述，详见[**演示 demo**](https://github.com/ifanrx/hydrogen-demo.git)的源码。



{% content "SDKFileConfig" %}

完成授权后，接下来用户需要进行服务器域名配置，以解锁小程序 [SDK](/js-sdk/download-sdk.md) 服务。

![知晓云服务器域名](/images/newbies/hydrogen-domain-name.jpeg)

登录[小程序后台](https://mp.weixin.qq.com/wxopen/devprofile?action=get_profile&token=41891845&lang=zh_CN)，进入 “设置 - 开发设置”页面，将知晓云提供给开发者的服务器域名配置到微信开发者后台的“服务器域名”配置项中。

![小程序服务器域名配置](/images/newbies/hydrogen-domain-name-config.jpeg)

## 第一个接入知晓云的小程序

下面，我们以**我的书架**小程序 demo 为例，创建第一个接入知晓云的小程序。

### 1、 知晓云的初始化配置

首先，打开[微信开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html?t=201822)，将先前下载好的[演示 demo](https://github.com/ifanrx/hydrogen-demo.git) 的 `hello-world` 文件夹添加入小程序项目中。

![创建小程序项目](/images/newbies/minapp-creation.jpeg)

其中 `AppID` 为小程序的 ID，在微信小程序后台**设置 >> 开发设置** 中可获取，知晓云也在[**设置模块的小程序面板**](https://cloud.minapp.com/dashboard/#/app/settings/app/)提供了快速通道获取小程序 ID。

![开发者 ID](/images/newbies/developer-id.jpg)

接下来，在 `app.js` 中引入 [SDK js 文件](/js-sdk/download-sdk.md)（ 如果使用**知晓云 SDK 小程序插件**则参考插件的[使用文档](/js-sdk/README.md#引入 SDK 并初始化) ）。

<pre>
<code class="lang-js">
// app.js

App({
  onLaunch() {
    // 引入 SDK
    require('./sdk-v{{ book.latestVersion }}')
  }
})
</code>
</pre>


最后，通过初始化 [SDK](/js-sdk/download-sdk.md)，知晓云服务可以验证当前的小程序是否是有效合法的，只有通过验证的小程序才能使用 [SDK](/js-sdk/download-sdk.md) 提供的全部功能。

在知晓云后台 - [**设置模块的小程序面板**](https://cloud.minapp.com/dashboard/#/app/settings/app/)，可获取要接入知晓云服务的小程序 `ClientID`, 按照如下方式进行 [SDK](/js-sdk/download-sdk.md) 初始化:

<pre>
<code class="lang-js">
// app.js
App({
  onLaunch() {
    // 引入 SDK
    require('./sdk-v{{ book.latestVersion }}')

    // 初始化 SDK
    let clientID = '知晓云管理后台获取到的 ClientID'
    wx.BaaS.init(clientID)
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
    let tableID = '1' // 从知晓云后台的数据表中获取到的对应数据表的 ID
    let Books = new wx.BaaS.TableObject(tableID) //实例化对应 tableID 的数据表对象
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
> 注意，上述代码可能和 `hello-world` 源码有一定的差异，但是代码的逻辑和接口的调用方式基本上是一样。

同时，我们可以在数据管理模块看到新增的数据项。

![bookshelf 数据表](/images/newbies/bookshelf-schema.jpeg)

至于更新书名和删除书籍等操作，其接口调用过程大致和创建书籍一样，这里就不再赘述，详见[**演示 demo**](https://github.com/ifanrx/hydrogen-demo.git)的源码。


{% endtabs %}


## 更多

我们在本章节中，带领大家从零开始完成了知晓云接入小程序的基本流程。

了解到去哪里注册小程序、知晓云的注册以及相关信息的绑定与授权，并引导大家快速搭建起一个采用知晓云作为后端服务的小程序。

至此，我们就可以基于以上的基本概念，在接下来的小程序开发中实现开发效率的显著提升。

## 使用场景介绍

知晓云提供了丰富的 sdk 和 api 支持，每个都有其适用的使用场景，结合不同的 sdk 和 api，可以覆盖绝大部分的日常使用场景。

### JS SDK

![使用知晓云 JS SDK](/images/newbies/using-js-sdk-demo.png)

js sdk 可以覆盖绝大部分小程序开发的使用场景：开发者把知晓云 js sdk 集成到小程序中，方便快捷地完成用户注册，信息提交，支付等业务逻辑。

### 云函数 Node SDK

![使用 Node JS SDK](/images/newbies/using-node-sdk.png)

Node SDK 在云函数中使用，可以完成某些在小程序端不方便完成的操作，比如计算密钥，修改不对外公开的数据表等敏感操作。

#### 例子

现在有一张 `product` 表，表中有名为 `hash`，`name`, `price` 三个字段，`hash` 字段是根据该数据行的 `name`, `price` 计算出来的，计算方式为 md5(`name` + `price` + `'pwd'`)

|name|price|hash           |
|----|---- |---------------|
|abc |123  | md5(abc123pwd)| 

如果我们在小程序端计算 `hash` 的话，`hash` 的计算方法和密钥 `'pwd'` 被破译的几率较大，不安全。
更好的方法是我们在云函数中编写计算 hash 的逻辑，然后小程序调用对应的云函数来获取 hash。最后提交到 product 表中。

更多关于云函数，nodejs sdk 的文档，请[移步这里](/cloud-function/README.md)

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
