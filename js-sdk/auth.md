# 通用注册登录

 `BaaS.auth` 模块集合了和平台无关的用户注册登录相关操作。

## 注册

开发者可以使用 `BaaS.auth.register(opts)` API 来进行用户的通用注册。

opts 参数说明：

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| opts.username   | String  | 用户名，username 和 email 必选一个 |
| opts.email      | String  | 邮箱，username 和 email 必选一个 |
| opts.password   | String  | 密码 |


### 通过邮箱注册

**示例代码**
```javascript

```


### 邮箱验证

请参考 [邮箱验证小节](./user.md) 


### 通过用户名注册

**示例代码**
```javascript

```


## 登录

开发者可以通过 `BaaS.auth.login(opts)` API 来进行用户的通用登录

opts 参数说明：

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| opts.username   | String  | 用户名，username 和 email 必选一个 |
| opts.email      | String  | 邮箱，username 和 email 必选一个 |
| opts.password   | String  | 密码 |

### 用户名登录

**示例代码**

```javascript

```

### 邮箱登录

**示例代码**

```javascript

```

## 其他方式登录

### 微信小程序登录
请参考[微信小程序登录](./wechat/signin-signout.md)

### 支付宝小程序登录

## 关联小程序账户
用户在完成登录后，可以关联小程序账户，这样用户可以在下次通过多种方式登录同一账户。

### 关联微信小程序
请参考[关联微信小程序](./wechat/signin-signout.md)


### 关联支付宝小程序


## 忘记密码

### 通过邮件找回密码

`BaaS.auth.requestPasswordReset()`

**示例代码**

```javascript

```