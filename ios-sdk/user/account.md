 # currentUser

## 获取 currentUser 对象

开发者可以调用 `User.currentUser`(Swift)，或 `BAASUser.currentUser`(Objective-C), 获取 `currentUser` 对象，通过该对象进而对当前用户进行管理。同时登录注册等接口也会返回 `currentUser` 对象。

若当前为未登录状态，则会返回 nil。

## currentUser 对象说明

currentUser 代表了当前登录的用户，开发者可以通过浏览 currentUser 上的字段来获取当前用户的信息，通过调用 currentUser 上的方法来更新用户信息。

该对象关联 `_userprofile` 表中 id 为当前用户 ID 的数据行。currentUser 字段包含了 `_userprofile` 表的所有的*内置字段*。

**获取内置字段**

{% tabs swift1_1="Swift", oc1_1="Objective-C" %}
{% content "swift1_1" %}
```
User.currentUser?.username      // 用户名
User.currentUser?.gender        // 性别
useUser.currentUser?r.city      // 城市
...                             // 其他内置字段类似方式获取
```
{% content "oc1_1" %}
```
BAASUser.currentUser.username  // 用户名
BAASUser.currentUser.gender    // 性别
BAASUser.currentUser.city      // 城市
...                            // 其他内置字段类似方式获取
```
{% endtabs %}

获取自定义字段：

{% tabs swift1_2="Swift", oc1_2="Objective-C" %}
{% content "swift1_2" %}
```
User.currentUser?.get(key: "keyName")
```
{% content "oc1_2" %}
```
[BAASUser.currentUser getWithKey:@"keyName"];
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
User.currentUser?.updateUsername("test_new") { (success, error) in
                    
}
```
{% content "oc1" %}
```
[BAASUser.currentUser updateUsername:@"test_new" completion:^(BOOL success, NSError * _Nullable error) {

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
| success   | Bool           | 是否更新成功 |
| error   |  HError(Swift) / NSError(OC) |  错误信息     |

更新成功后，currentUser.username 将被更新为新的用户名。

err 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

### 设置邮箱

> **info**
> 匿名用户无法调用

> 邮箱中的英文字母会被强制转换为小写。例如 iFanrX@Hello.com 会被转换成 ifanrx@hello.com 。

**示例代码**
{% tabs swift2="Swift", oc2="Objective-C" %}
{% content "swift2" %}
```
User.currentUser?.updateEmail("test_new@ifanr.com") { (success, error) in
                    
}
```
{% content "oc2" %}
```
[BAASUser.currentUser updateEmail:@"test_new@ifanr.com" completion:^(BOOL success, NSError * _Nullable error) {

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
| success   | Bool           | 是否更新成功 |
| error   |  HError(Swift) / NSError(OC) |  错误信息     |

更新成功后，currentUser.email 将被更新为新的邮箱地址。

err 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

### 设置密码

> **info**
> 匿名用户无法调用

> 邮箱中的英文字母会被强制转换为小写。例如 iFanrX@Hello.com 会被转换成 ifanrx@hello.com 。

**示例代码**
{% tabs swift3="Swift", oc3="Objective-C" %}
{% content "swift3" %}
```
User.currentUser?.updatePassword("111", newPassword: "1111") { (success, error) in

}
```
{% content "oc3" %}
```
[BAASUser.currentUser updatePassword:@"111" newPassword:@"123" completion:^(BOOL success, NSError * _Nullable error) {

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
| success   | Bool           | 是否更新成功 |
| error   |  HError(Swift) / NSError(OC) |  错误信息     |

err 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

### 更新用户自定义字段

> 邮箱中的英文字母会被强制转换为小写。例如 iFanrX@Hello.com 会被转换成 ifanrx@hello.com 。

**示例代码**
{% tabs swift4="Swift", oc4="Objective-C" %}
{% content "swift4" %}
```
User.currentUser?.updateUserInfo(["age": 18]) { (success, error) in

}
```
{% content "oc4" %}
```
[BAASUser.currentUser updateUserInfo:@{@"age": @18} completion:^(BOOL success, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

参数说明：

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| userInfo | Dictionary(Swift) / NSDictionary(OC)     | 用户自定义字段信息 |


**结果返回**

| 名称       | 类型           | 说明 |
| :-------- | :------------  | :------ |
| success   | Bool           | 是否更新成功 |
| error   |  HError(Swift) / NSError(OC) |  错误信息     |

更新成功后，新的用户信息将被更新到 currentUser。

err 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

### 邮箱验证

> **info**
> 匿名用户无法调用

当用户通过邮箱注册后或者修改了邮箱后，开发者可能希望对用户填写的邮箱真实性进行校验，
调用该 API 后，知晓云会向当前用户发送一封验证邮件，用户可以打开邮件并进行验证操作。

**示例代码**
{% tabs swift5="Swift", oc5="Objective-C" %}
{% content "swift5" %}
```
User.currentUser?.requestEmailVerification() { (success, error) in

}
```
{% content "oc5" %}
```
[BAASUser.currentUser requestEmailVerification:^(BOOL success, NSError * _Nullable error) {

}];
```
{% endtabs %}

**结果返回**

| 名称       | 类型           | 说明 |
| :-------- | :------------  | :------ |
| success   | Bool           | 是否已发送邮件 |
| error   |  HError(Swift) / NSError(OC) |  错误信息     |

err 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

## 忘记密码

### 通过邮件找回密码

当用户忘记了登录密码，可以通过邮件找回密码。

> **info**
> 只有通过验证的邮箱才能使用邮件找回密码功能

**示例代码**

{% tabs swift6="Swift", oc6="Objective-C" %}
{% content "swift6" %}
```
User.currentUser?.resetPassword(email: "test@ifanr.com") { (success, error) in

}
```
{% content "oc6" %}
```
[BAASUser.currentUser resetPasswordWithEmail:@"test@ifanr.com" completion:^(BOOL success, NSError * _Nullable error) {

}];
```
{% endtabs %}

**结果返回**

| 名称       | 类型           | 说明 |
| :-------- | :------------  | :------ |
| success   | Bool           | 是否已发送邮件 |
| error   |  HError(Swift) / NSError(OC) |  错误信息     |

err 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)