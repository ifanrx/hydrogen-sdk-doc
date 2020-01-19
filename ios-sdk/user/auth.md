# 通用注册登录

 `Auth` 模块集合了用户注册登录相关操作。

## 注册

> **info**
> 注册成功后会自动登录。
>
> 登录成功后，会保持登录状态，直到用户登出或 `token` 过期。

### 通过邮箱注册

> **info**
> 邮箱中的英文字母会被强制转换为小写。例如 `iFanrX@Hello.com` 会被转换成 `ifanrx@hello.com`

**示例代码**

{% tabs swift1="Swift", oc1="Objective-C" %}
{% content "swift1" %}
```
Auth.register(email: "test@ifanr.com", password: "111") { (currentUser, error) in

}
```
{% content "oc1" %}
```
[BaaSAuth registerWithEmail:@"test@ifanr.com" password:@"111" completion:^(BaaSCurrentUser * _Nullable currentUser, NSError * _Nullable error) {

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
| currentUser| CurrentUser         | 当前用户实例，详见 [当前用户](./account.md) |
| error   |  NSError |  错误信息，详见[错误处理和错误码](/ios-sdk/error-code.md)|

### 通过用户名注册

**示例代码**
{% tabs swift2="Swift", oc2="Objective-C" %}
{% content "swift2" %}
```
Auth.register(username: "test", password: "111") { (currentUser, error) in

}
```
{% content "oc2" %}
```
[BaaSAuth registerWithUsername:@"test" password:@"111" completion:^(BaaSCurrentUser * _Nullable currentUser, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| username    | String      | 用户名 |
| password | String         | 密码     |

**返回结果**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| currentUser    | CurrentUser         | 当前用户实例，详见 [当前用户](./account.md)|
| error   |  NSError |  错误信息，详见[错误处理和错误码](/ios-sdk/error-code.md)    |

## 登录

### 通过邮箱登录

**示例代码**
{% tabs swift3="Swift", oc3="Objective-C" %}
{% content "swift3" %}
```
Auth.login(email: "test@ifanr.com", password: "111") { (currentUser, error) in

}
```
{% content "oc3" %}
```
[BaaSAuth loginWithEmail:@"test@ifanr.com" password:@"111" completion:^(BaaSCurrentUser * _Nullable currentUser, NSError * _Nullable error) {

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
| currentUser    | CurrentUser         | 当前用户实例，详见 [当前用户](./account.md)|
| error   |  NSError |  错误信息，详见[错误处理和错误码](/ios-sdk/error-code.md)     |

### 通过用户名登录

**示例代码**
{% tabs swift4="Swift", oc4="Objective-C" %}
{% content "swift4" %}
```
Auth.login(username: "test", password: "111") { (currentUser, error) in

}
```
{% content "oc4" %}
```
[BaaSAuth loginWithUsername:@"test" password:@"111" completion:^(BaaSCurrentUser * _Nullable currentUser, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| username    | String      | 用户名 |
| password | String         | 密码     |

**返回结果**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| currentUser    | CurrentUser         | 当前用户实例，详见 [当前用户](./account.md) |
| error   |  NSError |  错误信息，详见[错误处理和错误码](/ios-sdk/error-code.md)     |

### 匿名登录

往数据表里添加数据，需要有一个用户身份（这样才能保障数据来源可回溯）。
如果不希望强制用户在一开始就进行注册，可以使用匿名用户，让应用不提供注册步骤也能创建临时用户。
以使得当前用户可以往 `ACL` 权限设置为“允许所有人（匿名用户 + 登录用户）可写” 的数据表内添加数据。

> 匿名登录使用场景举例：假如开发者希望应用内的文章，所有人可以在登录前阅读、点赞，
> 而且仅在调用特定接口时才需要登录，比如发布文章、评论文章。这时可以先使用匿名登录，
> 之后再使用其他登录方式登录（这里可能需要进行合并用户数据操作）。

匿名用户转换为正式用户（匿名登录后再使用其他登录方式登录），开发者需要考虑以下情况（以用户名为例）：

1. 不需要进行用户数据合并

    匿名登录后，使用用户名注册返回的 `user_id` 与之前匿名登录的 `user_id` 是一致的
    （也就是直接把匿名用户转变为了正式用户），所以不需要数据合并。

2. 需要进行用户数据合并

    匿名登录后，使用用户名登录，登录成功后，返回的 `user_id` 必定与之前匿名登录的 `user_id` 不一致，所以需要数据合并。

> **info**
> 最终进不进行数据合并，由开发者自己考量决定。合并操作需要开发者自己进行。

**示例代码**
{% tabs swift5="Swift", oc5="Objective-C" %}
{% content "swift5" %}
```
Auth.anonymousLogin { (currentUser, error) in

}
```
{% content "oc5" %}
```
[BaaSAuth anonymousLogin:^(BaaSCurrentUser * _Nullable currentUser, NSError * _Nullable error) {

}];
```
{% endtabs %}

**返回结果**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| currentUser    | CurrentUser         | 当前用户实例，详见 [当前用户](./account.md) |
| error   |  NSError |  错误信息，详见[错误处理和错误码](/ios-sdk/error-code.md)     |

# 其他方式登录

## 手机号 + 短信验证码登录

在知晓云控制台开通 **手机号 + 短信验证码登录** 权限，步骤如下：

1. **设置** -> **应用**

![设置](/images/ios/login_sms_1.png)

2. 开通 **手机号+验证码登录**

![设置](/images/ios/login_sms_2.png)

> **info**
> 通过接口 `BaaS.sendSmsCode(phone:completion:)` 获取短信验证码，请查看[文档](/ios-sdk/sms.md)

**示例代码**

{% tabs swift6="Swift", oc6="Objective-C" %}
{% content "swift6" %}
```
Auth.signInWithSMS(phone: "150****7274", code: "12345", createUser: true) { (currentUser, error) in

}
```
{% content "oc6" %}
```
[BaaSAuth signInWithSMSWithPhone:@"150****7274" code:@"12345" createUser:YES completion:^(BaaSCurrentUser * _Nullable currentUser, NSError * _Nullable error) {
                    
}];
```
{% endtabs %}

**参数说明**

| 名称        | 类型   | 说明    |
| :---------- | :----- | :------ |
| phone | String | 手机号码 |
| code     | String | 短信验证码 |
| createUser  | Bool | 是否创建用户，默认为 `true`，可选 |

`createUser` 参数决定了一个新手机号用户第一次登录时的服务端处理行为。
默认为 `true`，服务端会有该用户创建一个知晓云用户记录。
当 `createUser` 为 `false` 时，服务端会终止登录过程，返回 404 错误码，开发者可根据该返回结果进行多平台账户绑定的处理。详见 [多平台用户统一登录](#多平台用户统一登录)

**返回结果**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| currentUser    | CurrentUser         | 当前用户实例，详见 [当前用户](./account.md) |
| error   |  NSError |  错误信息，详见[错误处理和错误码](/ios-sdk/error-code.md)     |

## 微信登录

SDK 提供了快速接入微信登录的接口，省去了使用微信登录接口时获取 code，access_token 等操作。

接入步骤如下：

1. 在[微信开放平台](https://wiki.open.qq.com/index.php?title=%E5%BE%AE%E4%BF%A1%E5%BC%80%E6%94%BE%E5%B9%B3%E5%8F%B0%E8%8E%B7%E5%8F%96%E5%BA%94%E7%94%A8AppID%E5%8F%8AAppSecret)申请应用 AppID 及 AppSecret

2. 在知晓云控制台开通**微信移动端登录**。如下图

    1）**设置** -> **应用**

    ![设置](/images/ios/login_sms_1.png)

    2）输入微信 AppId 及 AppSecret，并开通微信移动端登录

    ![设置](/images/ios/login_wechat.png)

3. Xcode 操作

    接入微信登录，需要在 xcode 配置微信 APP 白名单，设置 URL Scheme等操作，具体步骤可参照：[微信支付](../payment/wechat-pay.md)

4. 检测是否已经安装微信 App

{% tabs swift6_1="Swift", oc6_1="Objective-C" %}
{% content "swift6_1" %}
```
let installed = BaaS.isWXAppInstalled()
```
{% content "oc6_1" %}
```
BOOL installed = [BaaS isWXAppInstalled];
```
{% endtabs %}

在使用微信登录前，需要检测用户是否已经安装微信 App。

**示例代码**

{% tabs swift7="Swift", oc7="Objective-C" %}
{% content "swift7" %}
```
Auth.signIn(with: .wechat, createUser: true, syncUserProfile: .sentx) { (user, error) in

}

其中 signType 说明如下：

| 类型            | 说明      |
| :--------------| :-----------------|
| .wechat            | 微信      |

```
{% content "oc7" %}
```
[BaaSAuth signInWith:SignTypeWechat createUser:YES syncUserProfile:SyncUserProfileTypeSetnx completion:^(BaaSCurrentUser * _Nullable currentUser, NSError * _Nullable error) {
    
}];

其中 signType 说明如下：

| 类型            | 说明      |
| :--------------| :-----------------|
| SignTypeWechat | 微信      |

```
{% endtabs %}

**参数说明**

| 名称        | 类型   | 说明    |
| :---------- | :----- | :------ |
| signType | SignType | 第三方平台类型 |
| createUser | Bool | 是否为新用户创建账号 |
| syncUserProfile | SyncUserProfileType | 详见[同步第三方平台用户信息的方式](#同步第三方平台用户信息) |

> **info**
>
>   1. `createUser` 参数决定了一个新的微信用户第一次登录时的服务端处理行为。 默认为 true，服务端会有该用户创建一个知晓云用户记录。 当 `createUser` 为 false 时，服务端会终止登录过程，返回 404 错误码，开发者可根据该返回结果进行多平台账户绑定的处理。详见[多平台用户统一登录](#多平台用户统一登录)

> **info**
> 目前第三方平台仅支持微信登录，近期将增加对新浪微博以及苹果登录。

**返回结果**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| currentUser    | CurrentUser         | 当前用户实例，详见 [当前用户](./account.md) |
| error   |  NSError |  错误信息，详见[错误处理和错误码](/ios-sdk/error-code.md) |

### 关联微信账号

通过此方法可将通用注册登录用户（在已登录状态下）关联微信账号，以便下次可以通过微信登录。

**示例代码**

{% tabs swift8="Swift", oc8="Objective-C" %}
{% content "swift8" %}
```
Auth.associate(with: .wechat, syncUserProfile: .sentx) { (currentUser, error) in

}

其中 signType 说明如下：

| 类型            | 说明      |
| :--------------| :-----------------|
| .wechat            | 微信登录      |

```
{% content "oc8" %}
```
[BaaSAuth associateWith:SignTypeWechat syncUserProfile:SyncUserProfileTypeSetnx completion:^(BaaSCurrentUser * _Nullable currentUser, NSError * _Nullable error) {

}];

其中 signType 说明如下：

| 类型            | 说明      |
| :--------------| :-----------------|
| SignTypeWechat | 微信登录      |
```
{% endtabs %}

**参数说明**

| 名称        | 类型   | 说明    |
| :---------- | :----- | :------ |
| signType | SignType | 第三方平台类型 |
| syncUserProfile | SyncUserProfileType | 详见[同步第三方平台用户信息的方式](#同步第三方平台用户信息) |

> **info**
> 目前第三方平台仅支持微信登录，近期将增加对新浪微博以及苹果登录。

**返回结果**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| currentUser    | CurrentUser         | 当前用户实例，详见 [当前用户](./account.md) |
| error   |  NSError |  错误信息，详见[错误处理和错误码](/ios-sdk/error-code.md) |

### 同步第三方平台用户信息

第三方登录（微信、微博、苹果）后获取到的用户信息自动保存在 userprofile 表的 `_provider` 字段。同时开发者可以设置 `SyncUserProfileType` 同步方式将第三方平台的用户信息同步到相应字段，支持同步的字段如下：
* `nickname`
* `avatar`
* `gender`（仅微信）
* `language`
* `city`

其中同步方式 `SyncUserProfileType` 如下：

{% tabs swift9="Swift", oc9="Objective-C" %}
{% content "swift9" %}
```
| 类型            | 说明      |
| :--------------| :-----------------|
| .overwrite            | 强制更新      |
| .sentx                | 仅当字段从未被赋值时才更新  |
| .flase                 | 不更新      |
```
{% content "oc9" %}
```
| 类型            | 说明      |
| :--------------| :-----------------|
| SyncUserProfileTypeOverwrite            | 强制更新      |
| SyncUserProfileTypeSentx                | 仅当字段从未被赋值时才更新  |
| SyncUserProfileTypeFlase                 | 不更新      |
```
{% endtabs %}

# 登出

清理客户端存储的用户授权信息。

**示例代码**

{% tabs swift10="Swift", oc10="Objective-C" %}
{% content "swift10" %}
```
Auth.logout { (success, error) in

}
```
{% content "oc10" %}
```
[[BaaSAuth logout:^(BOOL success, NSError * _Nullable error) {

}];
```
{% endtabs %}

**返回结果**
 
| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| success  | Bool           | 是否登出成功 |
| error   |  NSError |  错误信息，详见[错误处理和错误码](/ios-sdk/error-code.md)  |

# 多平台用户统一登录

开发者可以决定第三方平台登录用户（微信、微博、苹果），以及手机 + 验证码登录用户，在第一次登录时，是否需要关联到知晓云通用账号。如果不关联，知晓云将会为第三方平台及手机+验证码的登录用户创建新账号。如果需要关联，服务端会终止登录过程，返回 404 错误码，开发者可根据该返回结果进行多平台账户绑定的处理。

假设开发者现在同时支持**微信**和**用户名**登录，需要微信新用户关联到已经注册好的用户账户，才能登录成功。 可以通过 signIn(with: .wechat) 的参数 createUser 设置为 false，此时，服务端会判断该用户是否已经有账户记录， 如果没有，则返回 404 状态码。开发者可根据此状态码，跳转到需要填写用户名密码页面，进行已有账户的关联或新的账户的创建， 完成后，调用 associate(with: .wechat) 方法完成当前微信用户与账户的绑定。下一次用户再次微信登录时，则会直接登录成功。
