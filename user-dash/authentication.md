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
