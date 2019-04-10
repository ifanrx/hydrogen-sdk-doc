 # currentUser

## 获取 currentUser 对象

通过当前用户对象进而对当前用户进行管理，开发者只能通过两种方式获取到当前用户对象：

1. 通过注册、登录后将获取当前用户对象。
2. 通过以下方法获取当前用户：
    {% tabs swift0="Swift", oc0="Objective-C" %}
{% content "swift0" %}
```
// 用户管理对象
Auth.getCurrentUserInfo { (currentUser, error) in

}
```
{% content "oc0" %}
```
// 用户管理对象
[BaaSAuth getCurrentUserInfo:^(BaaSCurrentUser * _Nullable currentUser, NSError * _Nullable error) {

}];
```
{% endtabs %}


## currentUser 对象说明

currentUser 代表了当前登录的用户，开发者可以通过浏览 currentUser 上的字段来获取当前用户的信息，通过调用 currentUser 上的方法来更新用户信息。

该对象关联 `_userprofile` 表中 id 为当前用户 ID 的数据行。currentUser 字段包含了 `_userprofile` 表的所有的*内置字段*。

| 参数      | 类型   | 说明 |
| :------- | :----- | :-- |
| avatar   | String | 用户头像 |
| city     | String | 用户所在城市 |
| country  | String | 用户所在国家 |
| gender   | String | 用户的性别，值为 1 时是男性，值为 2 时是女性，值为 0 时是未知 |
| id       | Number | 用户 ID (对应 _userprofile 表中的 id 字段) |
| language | String | 用户的语言，简体中文为 zh_CN |
| nickname | String | 用户昵称 |
| openid   | String | 用户唯一标识，由微信生成 |
| province  | String | 用户所在省份 |
| unionid  | String | 用户在开放平台的唯一标识符，由微信生成 |
| _email | String | 用户邮箱（用于用户以邮箱 & 密码登录） |
| _username | String | 用户名（用于用户以用户名 & 密码登录） |
| _email_verified | Boolean | 用户邮箱是否已经通过验证（已验证邮箱才能找回密码） |
| _provider |Object |  用户在平台方的用户信息  |
| _provider.alipay |Object |  支付宝平台的用户信息，见下方说明  |

**获取内置字段**

{% tabs swift1_1="Swift", oc1_1="Objective-C" %}
{% content "swift1_1" %}
```
currentUser.username      // 用户名
currentUser.gender        // 性别
currentUser.city      // 城市
...                  // 其他内置字段类似方式获取
```
{% content "oc1_1" %}
```
currentUser.username  // 用户名
currentUser.gender    // 性别
currentUser.city      // 城市
...                   // 其他内置字段类似方式获取
```
{% endtabs %}

获取自定义字段：

{% tabs swift1_2="Swift", oc1_2="Objective-C" %}
{% content "swift1_2" %}
```
currentUser.get(key: "keyName")
```
{% content "oc1_2" %}
```
[currentUser getWithKey:@"keyName"];
```
{% endtabs %}

## 设置用户信息

`currentUser` 对象提供了一些方法，用于修改当前用户信息。

常见使用场景：
- 用户的用户名/邮箱设置有误，需要修改为新的用户名/邮箱。

> **info**
> 除更新自定义字段外，其他方法匿名用户无法调用。

### 设置用户名

> **info**
> 匿名用户无法调用

> 用户名不区分大小写。当用户设置了 username 为 ifanrx 的账号后，其他人不能再注册诸如 Ifanrx、IfAnrx、IFANRX 等账号了。

**示例代码**
{% tabs swift1="Swift", oc1="Objective-C" %}
{% content "swift1" %}
```
currentUser.updateUsername("test_new") { (result, error) in
                    
}
```
{% content "oc1" %}
```
[currentUser updateUsername:@"testoc_new" completion:^(NSDictionary<NSString *,id> * _Nullable result, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

| 名称       | 类型           | 说明        |
| :-------- | :------------  | :------    |
| username  | String         | 新的用户名   |

**结果返回**

| 名称       | 类型           | 说明 |
| :-------- | :------------  | :------ |
| result   | Dictionary           | 被更新的信息 |
| error   |  HError(Swift) / NSError(OC) |  错误信息     |

error 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

### 设置邮箱

> **info**
> 匿名用户无法调用

> 邮箱中的英文字母会被强制转换为小写。例如 iFanrX@Hello.com 会被转换成 ifanrx@hello.com 。

**示例代码**
{% tabs swift2="Swift", oc2="Objective-C" %}
{% content "swift2" %}
```
currentUser.updateEmail("test_new@ifanr.com") { (result, error) in
                    
}
```
{% content "oc2" %}
```
[currentUser updateEmail:@"test_new@ifanr.com" completion:^(NSDictionary<NSString *,id> * _Nullable result, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

| 名称       | 类型           | 说明        |
| :-------- | :------------  | :------    |
| username  | String         | 新的邮箱地址   |

**结果返回**

| 名称       | 类型           | 说明 |
| :-------- | :------------  | :------ |
| result   | Dictionary           | 被更新的信息 |
| error   |  HError(Swift) / NSError(OC) |  错误信息     |

更新成功后，currentUser.email 将被更新为新的邮箱地址。

error 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

### 设置密码

> **info**
> 匿名用户无法调用

> 邮箱中的英文字母会被强制转换为小写。例如 iFanrX@Hello.com 会被转换成 ifanrx@hello.com 。

**示例代码**
{% tabs swift3="Swift", oc3="Objective-C" %}
{% content "swift3" %}
```
currentUser.updatePassword("111", newPassword: "1111") { (result, error) in

}
```
{% content "oc3" %}
```
[currentUser updatePassword:@"111" newPassword:@"123" completion:^(NSDictionary<NSString *,id> * _Nullable result, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

参数说明：

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| password      | String  | 用户密码 （若用户当前密码为空则为`空`） |
| newPassword   | String  | 新用户密码 (若用户当前密码为空则为`必填`） |

**结果返回**

| 名称       | 类型           | 说明 |
| :-------- | :------------  | :------ |
| result   | Dictionary           | 被更新的信息 |
| error   |  HError(Swift) / NSError(OC) |  错误信息     |

error 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

### 更新用户自定义字段

> 邮箱中的英文字母会被强制转换为小写。例如 iFanrX@Hello.com 会被转换成 ifanrx@hello.com 。

**示例代码**
{% tabs swift4="Swift", oc4="Objective-C" %}
{% content "swift4" %}
```
currentUser.updateUserInfo(["age": 18]) { (result, error) in

}
```
{% content "oc4" %}
```
[currentUser updateUserInfo:@{@"age": @18} completion:^(NSDictionary<NSString *,id> * _Nullable result, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

参数说明：

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| userInfo | Dictionary     | 用户自定义字段信息 |


**结果返回**

| 名称       | 类型           | 说明 |
| :-------- | :------------  | :------ |
| result   | Dictionary           | 被更新的信息 |
| error   |  HError(Swift) / NSError(OC) |  错误信息     |

更新成功后，新的用户信息将被更新到 currentUser。

error 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

### 邮箱验证

> **info**
> 匿名用户无法调用

当用户通过邮箱注册后或者修改了邮箱后，开发者可能希望对用户填写的邮箱真实性进行校验，
调用该 API 后，知晓云会向当前用户发送一封验证邮件，用户可以打开邮件并进行验证操作。

**示例代码**
{% tabs swift5="Swift", oc5="Objective-C" %}
{% content "swift5" %}
```
currentUser.requestEmailVerification() { (success, error) in

}
```
{% content "oc5" %}
```
[currentUser requestEmailVerification:^(BOOL success, NSError * _Nullable error) {

}];
```
{% endtabs %}

**结果返回**

| 名称       | 类型           | 说明 |
| :-------- | :------------  | :------ |
| success   | Bool           | 是否已发送邮件 |
| error   |  HError(Swift) / NSError(OC) |  错误信息     |

error 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

## 忘记密码

### 通过邮件找回密码

当用户忘记了登录密码，可以通过邮件找回密码。

> **info**
> 只有通过验证的邮箱才能使用邮件找回密码功能

**示例代码**

{% tabs swift6="Swift", oc6="Objective-C" %}
{% content "swift6" %}
```
currentUser.resetPassword(email: "test@ifanr.com") { (success, error) in

}
```
{% content "oc6" %}
```
[currentUser resetPasswordWithEmail:@"test@ifanr.com" completion:^(BOOL success, NSError * _Nullable error) {

}];
```
{% endtabs %}

**结果返回**

| 名称       | 类型           | 说明 |
| :-------- | :------------  | :------ |
| success   | Bool           | 是否已发送邮件 |
| error   |  HError(Swift) / NSError(OC) |  错误信息     |

error 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)