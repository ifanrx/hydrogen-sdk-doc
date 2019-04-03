# 通用注册登录

 `Auth` 模块集合了和平台无关的用户注册登录相关操作。

## 注册

> **info**
> 注册成功后会自动登录

### 通过邮箱注册

> **info**
> 邮箱中的英文字母会被强制转换为小写。例如 iFanrX@Hello.com 会被转换成 ifanrx@hello.com 

**示例代码**
{% tabs swift1="Swift", oc1="Objective-C" %}
{% content "swift1" %}
```
Auth.register(email: "test@ifanr.com", password: "111") { (user, error) in

}
```
{% content "oc1" %}
```
[BAASAuth registerWithEmail:@"test@ifanr.com" password:@"111" completion:^(BAASUser * _Nullable user, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| email    | String         | 用户邮箱 |
| password | String         | 密码     |

**返回结果**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| user    | User         | 当前用户，也可以用 User.currentUser 获取|
| error   |  HError(Swift) / NSError(OC) |  错误信息     |

err 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

### 通过用户名注册

**示例代码**
{% tabs swift2="Swift", oc2="Objective-C" %}
{% content "swift2" %}
```
Auth.register(username: "test", password: "111") { (user, error) in

}
```
{% content "oc2" %}
```
[BAASAuth registerWithUsername:@"test" password:@"111" completion:^(BAASUser * _Nullable user, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| username    | String      | 用户邮箱 |
| password | String         | 密码     |

**返回结果**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| user    | User         | 当前用户，也可以用 User.currentUser 获取|
| error   |  HError(Swift) / NSError(OC) |  错误信息     |

err 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

## 登录

### 通过邮箱登录

**示例代码**
{% tabs swift3="Swift", oc3="Objective-C" %}
{% content "swift3" %}
```
Auth.login(email: "test@ifanr.com", password: "111") { (user, error) in

}
```
{% content "oc3" %}
```
[BAASAuth loginWithEmail:@"test@ifanr.com" password:@"111" completion:^(BAASUser * _Nullable user, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| email    | String         | 用户邮箱 |
| password | String         | 密码     |


**返回结果**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| user    | User         | 当前用户，也可以用 User.currentUser 获取|
| error   |  HError(Swift) / NSError(OC) |  错误信息     |

err 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

### 通过用户名登录

**示例代码**
{% tabs swift4="Swift", oc4="Objective-C" %}
{% content "swift4" %}
```
Auth.login(username: "test", password: "111") { (user, error) in

}
```
{% content "oc4" %}
```
[BAASAuth loginWithUsername:@"test" password:@"111" completion:^(BAASUser * _Nullable user, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| username    | String      | 用户邮箱 |
| password | String         | 密码     |

err 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

**返回结果**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| user    | User         | 当前用户，也可以用 User.currentUser 获取|
| error   |  HError(Swift) / NSError(OC) |  错误信息     |

### 匿名登录

往数据表里添加数据，需要有一个用户身份（这样才能保障数据来源可回溯）。
如果不希望强制用户在一开始就进行注册，可以使用匿名用户，让应用不提供注册步骤也能创建临时用户。
以使得当前用户可以往 ACL 权限设置为“允许所有人（匿名用户 + 登录用户）可写” 的数据表内添加数据。

> 匿名登录使用场景举例：假如开发者希望应用内的文章，所有人可以在登录前阅读、点赞，
> 而且仅在调用特定接口时才需要登录，比如发布文章、评论文章。这时可以先使用匿名登录，
> 之后再使用其他登录方式登录（这里可能需要进行合并用户数据操作）。

匿名用户转换为正式用户（匿名登录后再使用其他登录方式登录），开发者需要考虑以下情况（以用户名为例）：

1. 不需要进行用户数据合并

    匿名登录后，使用用户名注册返回的 user_id 与之前匿名登录的 user_id 是一致的
    （也就是直接把匿名用户转变为了正式用户），所以不需要数据合并。

2. 需要进行用户数据合并

    匿名登录后，使用用户名登录，登录成功后，返回的 user_id 必定与之前匿名登录的 user_id 不一致，所以需要数据合并。

> **info**
> 最终进不进行数据合并，由开发者自己考量决定。合并操作需要开发者自己进行。

**示例代码**
{% tabs swift5="Swift", oc5="Objective-C" %}
{% content "swift5" %}
```
Auth.anonymousLogin { (user, error) in

}
```
{% content "oc5" %}
```
[BAASAuth anonymousLogin:^(BAASUser * _Nullable user, NSError * _Nullable error) {

}];
```
{% endtabs %}

**返回结果**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| user    | User         | 当前用户，也可以用 User.currentUser 获取|
| error   |  HError(Swift) / NSError(OC) |  错误信息     |

err 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

### 登出

清理客户端存储的用户授权信息。

**示例代码**
{% tabs swift6="Swift", oc6="Objective-C" %}
{% content "swift6" %}
```
Auth.logout { (success, error) in

}
```
{% content "oc6" %}
```
[[BAASAuth logout:^(BOOL success, NSError * _Nullable error) {

}];
```
{% endtabs %}

**返回结果**
 
| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| success  | Bool           | 是否登出成功 |
| error   |  HError(Swift) / NSError(OC) |  错误信息  |

err 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)
