# 通用注册登录

 `Auth` 模块集合了用户注册登录相关操作。

## 注册

> **info**
> 注册成功后会自动登录，调用注册方法之前需先前往[设置](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]settings/info/)打开该登录方法
>
> 登录成功后，会保持登录状态，直到用户登出或 `token` 过期。

### 通过邮箱注册

> **info**
> 邮箱中的英文字母会被强制转换为小写。例如 `iFanrX@Hello.com` 会被转换成 `ifanrx@hello.com`

**示例代码**

```Dart
try {
  CurrentUser currentUser = await Auth.registerWithEmail(email: "test@ifanr.com", password: "111");
  // 操作失败
} on HEroor catch(e) {
  // 操作失败
}
```

**参数说明**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| email    | String         | 用户邮箱 |
| password | String         | 密码     |

**返回结果**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| currentUser| CurrentUser         | 当前用户实例，详见 [当前用户](./account.md) |

HError 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

### 通过用户名注册

**示例代码**
```Dart
try {
  CurrentUser currentUse = await Auth.registerWithUsername(username: "test", password: "111");
  // 操作成功
} on HError catch(e) {
  // 操作成功
}
```

**参数说明**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| username    | String      | 用户名 |
| password | String         | 密码     |

**返回结果**

| 名称            | 类型           | 说明 |
| :-------       | :------------  | :------ |
| currentUser    | CurrentUser    | 当前用户实例，详见 [当前用户](./account.md)|

HError 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

### 通过手机号注册

**示例代码**
```Dart
try {
  CurrentUser currentUse = await Auth.registerWithPhone(phone: "13812345678", password: "111");
  // 操作成功
} on HError catch(e) {
  // 操作成功
}
```

**参数说明**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| phone    | String         | 手机号码 |
| password | String         | 密码     |

**返回结果**

| 名称            | 类型                | 说明 |
| :-------       | :------------       | :------ |
| currentUser    | CurrentUser         | 当前用户实例，详见 [当前用户](./account.md)|

HError 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

## 登录

> **info**
> 调用登录方法之前需先前往[设置](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]settings/sdk/)打开该登录方法

### 通过邮箱登录

**示例代码**
```Dart
try {
  CurrentUser currentUser = await Auth.loginWithEmail(email: "test@ifanr.com", password: "111");
  // 操作成功
} on HError catch(e) {
  // 操作失败
}
```

**参数说明**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| email    | String         | 用户邮箱 |
| password | String         | 密码     |


**返回结果**

| 名称            | 类型           | 说明 |
| :-------       | :------------  | :------ |
| currentUser    | CurrentUser    | 当前用户实例，详见 [当前用户](./account.md)|

HError 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

### 通过用户名登录

**示例代码**
```Dart
try {
  CurrentUser currentUser = await Auth.loginWithUsername(username: "test", password: "111");
  // 操作成功
} on HError catch(e) {
  // 操作失败
}
```

**参数说明**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| username    | String      | 用户名 |
| password | String         | 密码     |

**返回结果**

| 名称            | 类型                | 说明 |
| :-------       | :------------       | :------ |
| currentUser    | CurrentUser         | 当前用户实例，详见 [当前用户](./account.md) |

HError 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

### 通过手机号码登录

**示例代码**
```Dart
try {
  CurrentUser currentUser = await Auth.loginWithPhone(phone: "13812345678", password: "111");
  // 操作成功
} on HError catch(e) {
  // 操作失败
}
```

**参数说明**

| 名称         | 类型           | 说明 |
| :-------    | :------------  | :------ |
| phone       | String         | 手机号码 |
| password    | String         | 密码     |

**返回结果**

| 名称            | 类型                | 说明 |
| :-------       | :------------       | :------ |
| currentUser    | CurrentUser         | 当前用户实例，详见 [当前用户](./account.md) |

HError 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

### 创建临时用户

往数据表里添加数据，需要有一个用户身份（这样才能保障数据来源可回溯）。
如果不希望强制用户在一开始就进行注册，可以使用临时用户，让应用不提供注册步骤也能使得当前用户可以往 ACL 权限设置为“允许所有人（临时用户 + 登录用户）可写” 的数据>表内添加数据。

> 临时用户使用场景举例：假如开发者希望应用内的文章，所有人可以在登录前阅读、点赞，
> 而且仅在调用特定接口时才需要登录，比如发布文章、评论文章。这时可以先使用临时用户，
> 之后再使用其他登录方式登录（这里可能需要进行合并用户数据操作）。

临时用户转换为正式用户（创建临时用户后再使用其他登录方式登录），开发者需要考虑以下情况（以用户名为例）：

1. 不需要进行用户数据合并

    创建临时用户后，使用用户名注册返回的 `user_id` 与之前临时用户的 `user_id` 是一致的
    （也就是直接把临时用户转变为了正式用户），所以不需要数据合并。

2. 需要进行用户数据合并

    创建临时用户后，使用用户名登录，登录成功后，返回的 `user_id` 必定与之前临时用户的 `user_id` 不一致，所以需要数据合并。

> **info**
> 最终进不进行数据合并，由开发者自己考量决定。合并操作需要开发者自己进行。

**示例代码**
```Dart
try {
  CurrentUser currentUser = await Auth.anonymousLogin();
  // 操作失败
} on HError catch(e) {
  // 操作失败
}
```

**返回结果**

| 名称            | 类型                 | 说明 |
| :-------       | :------------       | :------ |
| currentUser    | CurrentUser         | 当前用户实例，详见 [当前用户](./account.md) |

HError 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

# 其他方式登录

## 手机号 + 短信验证码登录

在知晓云控制台开通 **手机号 + 短信验证码登录** 权限，步骤如下：

1. **设置** -> **应用**

![设置](/images/ios/login_sms_1.png)

2. 开通 **手机号+验证码登录**

![设置](/images/ios/login_sms_2.png)

> **info**
> 通过接口 `sendSmsCode({@required String phone, String signatrueID})` 获取短信验证码，请查看[文档](/flutter-sdk/sms.md)

**示例代码**

```Dart
try {
  // 1. 发送验证码
  await sendSmsCode(phone: "150****7274");
  // 2. 手机号 + 验证码登录
  Auth.loginWithSmsVerificationCode("150****7274", code: "12345", createUser: true);
  // 操作成功
} on HError catch(e) {
  // 操作失败
}
```

**参数说明**

| 名称         | 类型   | 说明    |
| :---------- | :----- | :------ |
| phone       | String | 手机号码 |
| code        | String | 短信验证码 |
| createUser  | Bool   | 是否创建用户，默认为 `true`，可选 |

`createUser` 参数决定了一个新手机号用户第一次登录时的服务端处理行为。
默认为 `true`，服务端会有该用户创建一个知晓云用户记录。
当 `createUser` 为 `false` 时，服务端会终止登录过程，返回 404 错误码，开发者可根据该返回结果进行多平台账户绑定的处理。

**返回结果**

| 名称            | 类型                | 说明 |
| :-------       | :------------       | :------ |
| currentUser    | CurrentUser         | 当前用户实例，详见 [当前用户](./account.md) |

HError 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

# 登出

清理客户端存储的用户授权信息。

**示例代码**

```Dart
try {
  await Auth.logout();
  // 操作成功
}on HError catch(e) {
  // 操作失败
}
```

HError 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

# 忘记密码

### 通过邮件找回密码

用户忘记了登录密码，可以通过邮件找回密码。

`Auth.requestPasswordReset(String emial)`

> **info**
> 只有通过验证的邮箱才能使用邮件找回密码功能。

**示例代码**

```Dart
try {
  await Auth.requestPasswordReset('abc@def.com');
  // 操作成功
}on HError catch(e) {
  // 操作失败
}
```

HError 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

# 获取 currentUser 对象

请参考[获取 currentUser 对象小节](./account.md)
