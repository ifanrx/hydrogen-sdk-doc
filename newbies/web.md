# 新手入门

**新手入门**章节将会带领大家如何**从零开始**将知晓云接入Web 应用中。

在本章节中，你将会学到以下内容：

- 知晓云账号注册

- 创建第一个接入知晓云的 Web 应用


## 知晓云账号注册

### 注册并完成相关信息绑定

前往[知晓云](https://cloud.minapp.com/)注册知晓云账号。

成功注册后，页面将跳转至控制台，需要用户进一步完成**邮箱激活验证**和**企业信息设置**等步骤。

完成以上步骤，即可进入知晓云 dashboard 页。

>**danger**
> 如果注册或邮件激活失败，请开发者根据失败提示进行后续操作。如果开发者认为是服务提供方方面导致的失败，请邮件联系 `mincloud@ifanr.com`，我们会第一时间处理您的邮件。

## 配置安全域名
进入知晓云 [设置页面](https://cloud.minapp.com/dashboard/#/app/settings/app/) 配置安全域名，只有在指定域名下，才能正常的请求知晓云数据：
![配置安全域名](/images/newbies/web-sdk-secure-domain.png)

假设我们将 web 应用架设在 `http://localhost:8080/`，则在安全域名配置框中输入 `http://localhost:8080` 即可

## 第一个接入知晓云的 Web 应用

下面，我们以[**我的书架** demo](https://github.com/ifanrx/hydrogen-demo/tree/master/web-sdk-demo) 为例，讲解如何在 web 中接入知晓云 SDK。你可以[点击这里体验示例应用](https://codesandbox.io/s/zq3q291wo3)（需要先在 dashboard 中[配置相应安全域名](https://cloud.minapp.com/dashboard/#/app/settings/sdk/)，比如对于此示例应用需填入 `https://zq3q291wo3.csb.app`，并在示例应用中填写 ClientID，ClientID 可在 dashboard [设置-应用页](https://cloud.minapp.com/dashboard/#/app/settings/info/)中获取）。

### 知晓云的初始化配置

首先，打开代码编辑器，将[演示 demo](https://github.com/ifanrx/hydrogen-demo/tree/master/web-sdk-demo) 的 `web-sdk-demo` 文件夹添加入项目中。

![创建项目](/images/newbies/web-sdk-init-project.png)


#### 在 HTML 中引入 SDK
首先我们看在 `index.html` 中如何引入 SDK 文件：

```html
<!-- index.html -->
<script src="https://dl.ifanr.cn/hydrogen/sdk/sdk-web-latest.js"></script>
```

这里我们使用 `script` 标签引入 SDK 后，接下来就可以使用 `window.BaaS` 获取 BaaS 对象的引用。
如果你的项目使用了 `webpack` 等打包工具，也可以通过 `var BaaS = require('minapp-sdk')` 的方式引入 SDK

##### 在 index.js 文件中完成 SDK 的初始化
引入 SDK 后，我们需要完成 SDK 的初始化。

通过初始化 [SDK](/js-sdk/download-sdk.md)，知晓云服务可以验证当前的应用是否是有效合法的，只有通过验证的应用才能使用 [SDK](/js-sdk/download-sdk.md) 提供的全部功能。

在知晓云后台 - [**设置模块**](https://cloud.minapp.com/dashboard/#/app/settings/app/)，可获取要接入知晓云服务的 `ClientID`, 按照如下方式进行 [SDK](/js-sdk/download-sdk.md) 初始化:

![复制 clientID](/images/newbies/get-client-id1.jpeg)

![复制 clientID](/images/newbies/get-client-id2.jpeg)

初次打开 demo，页面会提示输入 clientID，输入 clientID 后就可以初始化 BaaS 对象了，初始化 BaaS 对象的逻辑如下：

```js
// index.js
    if (!localStorage.getItem(cacheKey)) {
      let clientID = window.prompt('请输入 clientID')  // 从 BaaS 后台获取 ClientID
      localStorage.setItem(cacheKey, clientID) // 若输入了错误的 clientID，可以清空 localStorage
    }
    BaaS.init(localStorage.getItem(cacheKey))  // 初始化 BaaS 对象
```

### 创建数据表

完成知晓云的初始化配置后，我们就可以根据自身应用的业务逻辑，确定所需的数据表，确定好后即可在**知晓云后台 >> 数据管理模块**开始数据表的创建工作。

以**我的书架**为例，在数据管理模块，创建一张名为 `bookshelf` 的数据表，并添加一个名为 `bookName` 的数据列。

![创建表](/images/newbies/table-creation.jpeg)

![添加列](/images/newbies/column-addition.jpeg)

### 用户注册与登录

默认情况下，知晓云不允许未登录用户获取和修改数据表中的数据，因此我们需要编写一个注册模态框和登录模态框，以便用户在页面上可以注册和登录账号：

![登录模态框](/images/newbies/web-sdk-login.png)

```html
<!--登录模态框-->
<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">登录</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <input v-model="loginForm.email" type="email" class="form-control" aria-describedby="emailHelp" placeholder="请输入邮箱">
          </div>
          <div class="form-group">
            <input v-model="loginForm.password" type="password" class="form-control" placeholder="请输入密码">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="openRegisterModal" data-dismiss="modal">去注册</button>
          <button type="button" class="btn btn-primary" @click="handleLogin">登录</button>
        </div>
      </div>
    </div>
  </div>
```

handleLogin 代码如下：
```javascript
      BaaS.auth.login(this.loginForm).then(() => {
        $('#loginModal').modal('hide')
        this.init()
      })

```

![注册模态框](/images/newbies/web-sdk-register.png)

注意这里和注册知晓云账号（开发者的账号）是不同的

```html
<!--注册模态框-->
<div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">注册</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <input v-model="registerForm.email" type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email">
          </div>
          <div class="form-group">
            <input v-model="registerForm.password" type="password" class="form-control" placeholder="Password">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="openLoginModal" data-dismiss="modal">去登录</button>
          <button type="button" class="btn btn-primary" @click="handleRegister">注册</button>
        </div>
      </div>
    </div>
  </div>
```
handleRegister 代码如下：
```javascript
      BaaS.auth.register(this.registerForm).then(() => {
        $('#registerModal').modal('hide')
        this.init()
      })
```

用户登录后，就有权限读取和写入数据了。已注册的用户可以在 [用户列表 - 用户](https://cloud.minapp.com/dashboard/#/app/user/list/)页面看到

### SDK 数据操作接口使用示例

完成数据表的创建和用户登录后，我们现在就可以使用知晓云的数据管理模块的功能，对数据进行 CRUD 操作。

**创建第一本书**

```js
// index.js
var BookShelf = new window.BaaS.TableObject('bookshelf')

new Vue({
  el: '#root',
  data() {
    return {
      bookList: [],
      creatingBookName: '',
    }
  },
  methods: {
    createBook() { 
      if (!this.creatingBookName) return false
      let record = BookShelf.create()
      record.set({
        bookName: this.creatingBookName
      }).save().then(res => {
        this.creatingBookName = ''
        this.bookList.push({
          id: res.data.id,
          bookName: res.data.bookName,
          disabled: true,
        })
      })
    },
  },
})
```
在 demo 中新增的书籍后，我们可以在数据管理模块同时看到新增的数据项。

![bookshelf 数据表](/images/newbies/bookshelf-schema.jpeg)

### 浏览示例应用

这里我们可以使用 `nginx` 等工具帮助我们启动一个 http 静态文件服务器，以便我们浏览 demo，这里我们将服务器启动在 `http://localhost:40034/`， 
用浏览器访问 `http://localhost:40034/` 即可看到如下界面：

![我的书架](/images/newbies/web-sdk-demo.png)

至于更新书名和删除书籍等操作，其接口调用过程大致和创建书籍一样，这里就不再赘述，详见[**演示 demo**](https://github.com/ifanrx/hydrogen-demo/tree/master/web-sdk-demo)的源码。

**在线编辑示例**

[![Edit static](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/zq3q291wo3)