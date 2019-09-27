 # 当前用户

 ## CurrentUser 类

`CurrentUser` 继承于 `User`。`currentUser` 实例代表了当前登录的用户，开发者可以通过访问 `currentUser` 上的属性来获取当前用户的信息，通过调用 `currentUser` 上的方法来更新用户信息。

## 获取 currentUser 对象

通过当前用户对象进而对当前用户进行管理，为了保证本地当前用户信息与服务器的用户信息一致，开发者只能通过两种方式获取到当前用户对象：

1. 通过注册、登录后将获取当前用户对象。
2. 通过以下方法获取当前用户：

{% tabs swift0="Swift", oc0="Objective-C" %}
{% content "swift0" %}
```
// 用户管理对象
Auth.getCurrentUser { (currentUser, error) in

}
```
{% content "oc0" %}
```
// 用户管理对象
[BaaSAuth getCurrentUser:^(BaaSCurrentUser * _Nullable currentUser, NSError * _Nullable error) {

}];
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
| error   |  NSError |  错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md)     |

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
| error   |  NSError |  错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md)     |

### 设置密码

> **info**
> 匿名用户无法调用

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
| error   |  NSError |  错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md)     |

### 更新用户自定义字段

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
| error   |  NSError |  错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md)     |

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
| error   |  NSError |  错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md)     |

### 通过邮件重置密码

当用户忘记了登录密码，可以通过邮件重置密码。

> **info**
> 只有通过验证的邮箱才能使用邮件重置密码功能

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
| error   |  NSError |  错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md)     |
