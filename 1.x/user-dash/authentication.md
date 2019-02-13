# 授权认证

## 鉴权方式

用户管理后台 API 采用的 Cookie-base 的授权方式来实现用户身份的授权。

运营后台需要知晓云管理后台的管理员身份进行操作，因此，运营后台不需要关心用户的登录注册流程，只需要保证用户在访问运营后台之前登录了知晓云后台即可。

## 授权接入

开发者需要将以下代码片段放入用户管理后台的 .html 文件中，来完成用户身份的验证:

```html
<!-- 其中 client_id 需替换为您应用的 ClientID -->
<script src="https://cloud.minapp.com/custom-userdash/auth/<client_id>/"></script>
```

示例：

```html
<html>
  <head>
    <!-- 其中 client_id 需替换为您应用的 ClientID -->
    <script src="https://cloud.minapp.com/custom-userdash/auth/<client_id>/"></script>
  </head>
  <body>
  </body>
</html>
```

> **info**
> 上述代码会自动检查用户是否登入知晓云，若未登录则引导其登录。

用户管理后台可能会存在多个管理页面，需要保证每个管理页面的 head 都加入上述代码片段，以确保页面的登录状态。

## 用户管理后台开发与调试

用户管理后台允许开发者进行本地调试开发。流程如下：

1. 下载我们准备的一个包含 index.html 文件的 zip 包。[（点此下载）](https://media.ifanrusercontent.com/hydrogen/user_dash_demo_NiOXXbjVStiKtPLo.zip)

2. 打开知晓云管理后台 - 设置模块（cloud.minapp.com/dashboard/#/app/settings/info/），点击一键部署后台，将上一步下载的 zip 包上传部署，开启部署功能。

2. 启动静态服务器，如 nginx、apache、react 脚手架、vue 脚手架等，使得本地可以通过 localhost、127.0.0.1 访问页面。

3. 在登录了知晓云管理后台（cloud.minapp.com/dashboard/）的浏览器，访问对应的开发页面地址。

4. 即可开始开发和调试。
