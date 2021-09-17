 # 当前用户

 ## CurrentUser 类

`CurrentUser` 继承于 `User`。`currentUser` 实例代表了当前登录的用户，开发者可以通过访问 `currentUser` 上的属性来获取当前用户的信息，通过调用 `currentUser` 上的方法来更新用户信息。

## 获取 currentUser 对象

通过当前用户对象进而对当前用户进行管理，为了保证本地当前用户信息与服务器的用户信息一致，开发者只能通过两种方式获取到当前用户对象：

1. 通过注册、登录后将获取当前用户对象。
2. 通过以下方法获取当前用户：

```Dart
try {
  CurrentUser currentUser = await Auth.getCurrentUser();
  // 操作成功
} on HError catch(e) {
  // 操作失败
}
```

HError 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

## 设置用户信息

`currentUser` 对象提供了一些方法，用于修改当前用户信息。

常见使用场景：
- 用户的用户名/邮箱设置有误，需要修改为新的用户名/邮箱。

> **info**
> 除更新自定义字段外，其他方法临时用户无法调用。

### 设置用户名

> **info**
> 临时用户无法调用

> 用户名不区分大小写。当用户设置了 username 为 ifanrx 的账号后，其他人不能再注册诸如 Ifanrx、IfAnrx、IFANRX 等账号了。

**示例代码**

```Dart
try {
  await currentUser.setUsername("test_new");
  // 操作成功
} on HError catch(e) {
  // 操作失败
}
```

**参数说明**

| 名称       | 类型           | 说明        |
| :-------- | :------------  | :------    |
| username  | String         | 新的用户名   |

HError 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

### 设置用户头像

> **danger**
> 该操作适用于 SDK version >= 1.0.0-alpha-5

<!-- 分隔两个 info -->

> **info**
> 临时用户无法调用

**示例代码**

```Dart
try {
  String avatarUrl = 'https://cdn.ifanr.cn/ifanr/default_avatar.png?ssl=1';
  await currentUser.setAvatar(avatarUrl);
  // 操作成功
} on HError catch(e) {
  // 操作失败
}
```

**参数说明**

| 名称       | 类型           | 说明        |
| :-------- | :------------  | :------    |
| avatar  | String         | 新的用户头像链接   |

HError 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

### 设置邮箱

`currentUser.setEmail(String email, {bool sendVerificationEmail = false})`

> **info**
> 临时用户无法调用

> 邮箱中的英文字母会被强制转换为小写。例如 iFanrX@Hello.com 会被转换成 ifanrx@hello.com 。

**示例代码**

```Dart
try {
  await currentUser.setEmail("test_new@ifanr.com");
  // 操作成功
}on HError catch(e) {
  // 操作失败
}
```

**参数说明**

| 名称                       | 类型           | 说明        |
| :--------                 | :------------  | :------    |
| email                     | String         | 新的邮箱地址   |
| sendVerificationEmail     | bool           | 是否发送验证邮件，默认 false   |

HError 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

### 设置密码

`currentUser.updatePassword(String password, String newPassword)`

> **info**
> 临时用户无法调用

**示例代码**
```Dart
try {
  await currentUser.updatePassword("111", "2222");
  // 操作成功
} on HError catch(e) {
  // 操作失败
}
```

**参数说明**

参数说明：

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| password      | String  | 用户密码 （若用户当前密码为空则为`空`） |
| newPassword   | String  | 新用户密码 (若用户当前密码为空则为`必填`） |

HError 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

### 设置手机号

`currentUser.setMobilePhone(String phone)`

**示例代码**
```Dart
try {
  await currentUser.updatePhone("150****7274");
  // 操作成功
} on HError catch(e) {
  // 操作失败
}
```

**参数说明**

参数说明：

| 名称      | 类型       | 说明     |  必填 |
| :------- | :-------  | :------  | :---- |
| phone    | String    | 用户手机号 |  Y   |

HError 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

### 验证当前用户手机号

`currentUser.verifyMobilePhone(String code)`

> **info**
> 匿名用户无法调用

用户登录后，可以验证手机号。验证后用户表的 `_phone_verified` 会被置为 `true`。若用户更新了手机号，`_phone_verified` 会被重置为 `false`。

**验证步骤**
1. 调用 `sendSmsCode` 发送手机短信验证码。

2. 在验证手机号之前，若未设置手机号，需要先调用 `currentUser.setMobilePhone` 接口给用户设置手机号。

3. 获取验证码，验证手机号

**示例代码**
```Dart
try {
  // 1. 发送手机短信验证码
  await sendSmsCode(phone: "150****7274");

  // 2. 若用户未设置手机号，需要先设置手机号
  await currentUser?.setMobilePhone("150****7274");

  // 3. 验证手机号
  await currentUser?.verifyMobilePhone("12345");
}
```

参数说明：

| 名称      | 类型     | 说明       | 必填  |
| :------- | :-----  | :------     | :--- |
| code     | String  | 手机短信验证码 | Y   |

HError 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

### 更新用户自定义字段

`currentUser.updateUserInfo(Map<String, dynamic> userInfo)`

**示例代码**

```Dart
try {
  await currentUser.updateUserInfo({"age": 18});
  // 操作成功
} on HError catch(e) {
  // 操作失败
}
```

**参数说明**

参数说明：

| 名称      | 类型                       | 说明 |
| :------- | :------------              | :------ |
| userInfo | `Map<String, dynamic>`     | 用户自定义字段信息 |

HError 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

### 邮箱验证

`currentUser.requestEmailVerifcation()`

> **info**
> 临时用户无法调用

当用户通过邮箱注册后或者修改了邮箱后，开发者可能希望对用户填写的邮箱真实性进行校验，
调用该 API 后，知晓云会向当前用户发送一封验证邮件，用户可以打开邮件并进行验证操作。

**示例代码**
```Dart
try {
  await currentUser.requestEmailVerification();
  // 操作成功
} on HError catch(e) {
  // 操作失败
}
```

HError 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)
