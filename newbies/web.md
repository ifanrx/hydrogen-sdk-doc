# 新手入门

**新手入门**章节将会带领大家如何**从零开始**将知晓云接入小程序中。

在本章节中，你将会学到以下内容：

- 知晓云账号注册

- 创建第一个接入知晓云的小程序


## 知晓云账号注册

开发者在微信公众平台申请到自己的小程序后，接下来就可注册并获取知晓云账号，完成相关信息绑定与服务配置后，即可使用知晓云提供的后端服务。

### 注册并完成相关信息绑定

前往[知晓云](https://cloud.minapp.com/)注册知晓云账号。

成功注册后，页面将跳转至控制台，需要用户进一步完成**邮箱激活验证**和**企业信息设置**等步骤。

完成以上步骤，即可进入知晓云 dashboard 页。

>**danger**
> 如果注册或邮件激活失败，请开发者根据失败提示进行后续操作。如果开发者认为是服务提供方方面导致的失败，请邮件联系 `mincloud@ifanr.com`，我们会第一时间处理您的邮件。


## 第一个接入知晓云的小程序

下面，我们以**我的书架**小程序 demo 为例，创建第一个接入知晓云的小程序。

### 知晓云的初始化配置

首先，打开代码编辑器，将[演示 demo](https://github.com/ifanrx/hydrogen-demo.git) 的 `web-sdk-demo` 文件夹添加入项目中。

![创建项目](/images/newbies/web-sdk-init-project.png)

接下来我们就以 `web-sdk-demo` 为范例来讲解如何使用知晓云 JSSDK

#### 在 HTML 中引入 SDK

```html
<!-- index.html -->
<script src="https://dl.ifanr.cn/hydrogen/sdk/sdk-web-latest.js"></script>
```

通过 `script` 标签引入 SDK 后，可以通过 `window.BaaS` 获取 BaaS 对象的引用

##### 在 index.js 文件中完成 SDK 的初始化

通过初始化 [SDK](/js-sdk/download-sdk.md)，知晓云服务可以验证当前的应用是否是有效合法的，只有通过验证的应用才能使用 [SDK](/js-sdk/download-sdk.md) 提供的全部功能。

在知晓云后台 - [**设置模块的小程序面板**](https://cloud.minapp.com/dashboard/#/app/settings/app/)，可获取要接入知晓云服务的小程序 `ClientID`, 按照如下方式进行 [SDK](/js-sdk/download-sdk.md) 初始化:

![复制 clientID](/images/newbies/get-client-id.png)

初次打开 demo，页面会提示输入 clientID，输入 clientID 后就可以初始化 BaaS 对象了。

```js
// index.js
    if (!localStorage.getItem(cacheKey)) {
      let clientID = window.prompt('请输入 clientID')  // 从 BaaS 后台获取 ClientID
      localStorage.setItem(cacheKey, clientID) // 若输入了错误的 clientID，可以清空 localStorage
    }
    BaaS.init(localStorage.getItem(cacheKey))  // 初始化 BaaS 对象
```

### 创建数据表

完成知晓云的初始化配置后，开发者就可以根据自身应用的业务逻辑，确定所需的数据表，确定好后即可在**知晓云后台 >> 数据管理模块**开始数据表的创建工作。

以**我的书架**为例，在数据管理模块，创建一张名为 `bookshelf` 的数据表，并添加一个名为 `bookName` 的数据列。

![创建表](/images/newbies/table-creation.jpeg)

![添加列](/images/newbies/column-addition.jpeg)

### 用户注册与登录

我们编写一个注册模态框和登录模态框，以便用户在使用此应用时可以注册和登录账号：

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

用户登录后，就有权限读取和写入数据了。

### SDK 数据操作接口使用示例

完成数据表的创建和用户登录后，我们现在就可以使用知晓云的数据管理模块的功能，对数据进行 CRUD 操作。

**创建第一本书**

```js
// index.js
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

同时，我们可以在数据管理模块看到新增的数据项。

![bookshelf 数据表](/images/newbies/bookshelf-schema.jpeg)

至于更新书名和删除书籍等操作，其接口调用过程大致和创建书籍一样，这里就不再赘述，详见[**演示 demo**](https://github.com/ifanrx/hydrogen-demo.git)的源码。



