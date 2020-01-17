# currentUser

开发者可以调用 `BaaS.auth.getCurrentUser()` 获取 `currentUser` 对象，通过该对象进而对当前用户进行管理。同时登录注册等接口也会返回 `currentUser` 对象。

## 获取 currentUser 对象

`BaaS.auth.getCurrentUser()`

**示例代码**

{% ifanrxCodeTabs %}
```javascript
wx.BaaS.auth.getCurrentUser().then(user => {
  // user 为 currentUser 对象
}).catch(err => {
  // HError
  if( err.code === 604 ){
    console.log('用户未登录')
  }
})
```
{% endifanrxCodeTabs %}


若当前为未登录状态，则会抛出错误。

## currentUser 对象说明

currentUser 代表了当前登录的用户，开发者可以通过浏览 currentUser 上的字段来获取当前用户的信息，通过调用 currentUser 上的方法来更新用户信息。
该对象关联 `_userprofile` 表中 id 为当前用户 ID 的数据行。currentUser 字段包含了 `_userprofile`表的所有的*内置字段*，自定义字段可以通过 `currentUser.get(key)` 来获取。

```javascript
// currentUser 数据结构
{
  avatar: "...",
  city: "...",
  country: "...",
  created_at: 1557474865,
  created_by: 45768973992321,
  gender: 1,
  get: function (key) {}
  id: 45768973992321,
  is_authorized: true,
  language: "...",
  nickname: "...",
  openid: "...",  // 微信小程序用户的唯一标识，非微信用户将返回空值。同时，微信小程序 openid 也会和其他平台一样，在 _provider 里存储一份。
  province: "...",
  session_expires_at": 1561283491,
  toJSON: function () {},
  unionid: "...",  // 微信开发平台用户的唯一标识，非微信用户将返回空值
  updated_at: 1558691521,
  user_id: 45768973992321,
  _anonymous: false,
  _email_verified : false,
  _provider: {
    alipay: {
      avatar: "...",
      province: "...",
      city: "...",
      nick_name: "...",
      is_student: true,
      user_type: "...",
      user_status: "...",
      verified: true,
      gender: "..."
    },
    wechat: {
      avatar: "...",
      city: "...",
      country: "...",
      gender: 1,
      language: "...",
      nickname: "...",
      openid: "...",
      province: "...",
      unionid: "...",
    }
  }
}

```

### 获取用户自定义字段

开发者可能会在 _userprofile 表中定义一些自定义字段，要拿到这些自定义字段信息，可以通过如下两个 API 来获取：
- `currentUser.get(key)`
- `currentUser.toJSON()`

#### `currentUser.get(key)`

通过 `currentUser.get(key)` 可以获取用户的单个字段(包括内置字段和自定义字段)。

**示例代码**

假设开发者在 _userprofile 表中定义了 `custom_name` 列，并设置当前用户的 `custom_name` 为 `ifanrx`。则在 SDK 中查询当前用户自定义字段代码如下：

{% ifanrxCodeTabs %}
```javascript
wx.BaaS.auth.getCurrentUser().then(user => {
  console.log(user.get('custom_name')) //  ifanrx
})
```
{% endifanrxCodeTabs %}

#### `currentUser.toJSON()`

可以通过 `currentUser.toJSON()` API，来获得一次性获取完整的用户信息。

**示例代码**
假设开发者在 _userprofile 表中定义了 `custom_name` 列，并设置当前用户的 `custom_name` 为 `ifanrx`。则在 SDK 中查询当前用户自定义字段代码如下：

{% ifanrxCodeTabs %}
```javascript
wx.BaaS.auth.getCurrentUser().then(user => {
  console.log(user.toJSON())
})
```
{% endifanrxCodeTabs %}

**返回示例**

```json
{
      "id": 5123461461,
      "avatar": "http://cdn.ifanr.cn/ifanr/default_avatar.png",
      "nickname": "riDGldYXLHouWIYx",
      "_anonymous": false,
      "_username": "myusername",
      "_email": "myemail@somemail.com",
      "_email_verified": false,
      "_provider": {
        "alipay": {
          "avatar": "http://tfsimg.alipay.com/images/partner/T1uIxXXbpXXXXXXXX",
          "province": "安徽省",
          "city": "安庆",
          "nick_name": "支付宝小二",
          "is_student": true,
          "user_type": "company_account",
          "user_status": "authenticated",
          "verified": true,
          "gender": "F"
        }
      }
}
```
字段说明请参考 [获取用户信息小节](user.md)

### 判断用户是否是匿名用户

{% ifanrxCodeTabs %}
```javascript
wx.BaaS.auth.getCurrentUser().then(user => {
  if (user._anonymous) {
    // 匿名用户
  } else {
    // 非匿名用户
  }
})
```
{% endifanrxCodeTabs %}

## 设置用户信息

`currentUser` 对象提供了一些方法，用于修改当前用户信息。

常见使用场景：
- 用户的用户名/邮箱设置有误，需要修改为新的用户名/邮箱。
- 用户使用小程序授权登录后，通过设置用户名或邮箱，以便下次通过用户名或邮箱登录。

> **info**
> 除更新自定义字段外，其他方法匿名用户无法调用

### 初始化账号信息

> **info**
> 匿名用户无法调用

`currentUser.setAccount({username, email, password})`

用户通过微信、支付宝授权登录后，可以设置用户名、邮箱、密码，以便下次通过用户名或邮箱登录。

**参数说明**

| 名称      | 类型     |  必填   | 说明 |
| :-------- | :-------|-----  | :------ |
| username  | String  | N | 用户名      |
| email     | String  | N | 邮箱        |
| password  | String  | Y | 初始密码    |

**示例代码**

{% ifanrxCodeTabs %}
```javascript
// ...
wx.BaaS.auth.getCurrentUser()
  .then(user => {
    return user.setAccount({username: 'hello', email: 'hello@ifanr.com', password: '111111'})
  }).then(user => {
    console.log(user)
  }).catch(err => {
    // HError
  })
```
{% endifanrxCodeTabs %}

### 设置用户名

> **info**
> 匿名用户无法调用

> 用户名不区分大小写。当用户设置了 username 为 ifanrx 的账号后，其他人不能再注册诸如 Ifanrx、IfAnrx、IFANRX 等账号了

`currentUser.setUsername(username)`

**参数说明**

| 名称       | 类型           | 说明 |
| :-------- | :------------  | :------ |
| username  | String       | 新用户名 |

**示例代码**

{% ifanrxCodeTabs %}
```javascript
wx.BaaS.auth.getCurrentUser()
  .then(user => {
    return user.setUsername('ifanrx_new')
  }).then(user => {
    console.log(user)
  }).catch(err => {
    // HError
  })
```
{% endifanrxCodeTabs %}

**返回结果说明**

user 为 currentUser 对象，该对象的说明见上文

err 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)


### 设置邮箱

> **info**
> 匿名用户无法调用

> 邮箱中的英文字母会被强制转换为小写。例如 iFanrX@Hello.com 会被转换成 ifanrx@hello.com

`currentUser.setEmail(email, {sendVerificationEmail})`

**参数说明**

| 名称                     | 类型        | 必填   | 说明 |
| :-----------------------| :---------- | ----- | :------ |
| email                   | String      | Y     |  新邮箱 |
| sendVerificationEmail   | Boolean     | N     |  是否发送验证邮件，默认为 false |


**示例代码**

{% ifanrxCodeTabs %}
```javascript
wx.BaaS.auth.getCurrentUser()
  .then(user => {
    return user.setEmail('ifanrx_new@ifanr.com', {sendVerificationEmail: true})
  }).then(user => {
    console.log(user)
  }).catch(err => {
    // HError
  })
```
{% endifanrxCodeTabs %}

**返回结果说明**

user 为 currentUser 对象，该对象的说明见上文

err 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)


### 设置手机号

> **info**
> 匿名用户无法调用
>
> 重新设置手机号后，需要重新验证手机号。

`currentUser.setMobilePhone(mobilePhone)`

**参数说明**

| 名称                    | 类型        | 必填  | 说明      |
| :-----------------------| :---------- | ----- | :-------- |
| mobilePhone             | String      | Y     |  新手机号 |

**示例代码**

{% ifanrxCodeTabs %}
```javascript
wx.BaaS.auth.getCurrentUser()
  .then(user => {
    return user.setMobilePhone('15000000000')
  }).then(user => {
    console.log(user)
  }).catch(err => {
    // HError
  })
```
{% endifanrxCodeTabs %}

**返回结果说明**

user 为 currentUser 对象，该对象的说明见上文

err 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)


### 验证手机号

> **info**
> 匿名用户无法调用
>
> 短信验证码 smsCode 通过接口 `BaaS.sendSmsCode()` 获取，请查看[文档](/js-sdk/sms.md)

`currentUser.verifyMobilePhone(smsCode)`

**参数说明**

| 名称                | 类型        | 必填  | 说明        |
| :-------------------| :---------- | ----- | :---------- |
| smsCode             | String      | Y     |  短信验证码 |

**示例代码**

{% ifanrxCodeTabs %}
```javascript
wx.BaaS.auth.getCurrentUser()
  .then(user => {
    return user.verifyMobilePhone('123456')
  }).then(user => {
    console.log(user)
  }).catch(err => {
    // HError
  })
```
{% endifanrxCodeTabs %}

**返回结果说明**

user 为 currentUser 对象，该对象的说明见上文

err 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)


### 更新密码

> **info**
> 匿名用户无法调用

`currentUser.updatePassword({password, newPassword})`

参数说明：

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| password      | String  | 用户密码 （若用户当前密码为空则为`空`） |
| newPassword   | String  | 新用户密码 (若用户当前密码为空则为`必填`） |

**示例代码**

{% ifanrxCodeTabs %}
```javascript
wx.BaaS.auth.getCurrentUser()
  .then(user => {
    return user.updatePassword({password: '111111', newPassword: '222222'})
  }).then(user => {
    console.log(user)
  }).catch(err => {
    // HError
  })
```
{% endifanrxCodeTabs %}

**返回结果说明**

user 为 currentUser 对象，该对象的说明见上文
err 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

### 更新用户自定义字段

更新用户信息与[数据表更新数据项](schema/update-record.md)方法基本一致。这里只允许更新 `_userprofile` 表中自定义的字段。

**请求示例**

{% ifanrxCodeTabs %}
```js
wx.BaaS.auth.getCurrentUser()
  .then(user => {
    // age 为自定义字段
    return user.set('age', 30).update()
  }).then(user => {
    // success
  }).catch(err => {
    // err 为 HError 对象
  })
```
{% endifanrxCodeTabs %}


## 邮箱验证

> **info**
> 匿名用户无法调用

`currentUser.requestEmailVerification()`

当用户通过邮箱注册后或者修改了邮箱后，开发者可能希望对用户填写的邮箱真实性进行校验，
调用该 API 后，知晓云会向当前用户发送一封验证邮件，用户可以打开邮件并进行验证操作。

**示例代码**

{% ifanrxCodeTabs %}
```js
wx.BaaS.auth.getCurrentUser()
  .then(user => {
    return user.requestEmailVerification()
  }).then(res => {
    console.log(res)
  }).catch(err => {
    // HError
  })
```
{% endifanrxCodeTabs %}

**返回结果**

成功时 res 结构如下
```json
{
  "statusCode": 201,
  "data": { "status": "ok" }
}
```

err 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

# 同步第一层级用户信息

2.x 支持多平台登录，第三方登录（微信小程序中使用微信登录与支付宝小程序中使用支付宝登录，都属于第三方登录）
后获取到的用户信息保存在 userpofile 记录的 `_provider` 字段（参照上文 currentUser 中的 `_provider` 字段）中，
而 1.x 的用户数据保存在与 `_provider` 同一层级（即第一层级）的字段中，为了使相关代码能平滑升级到 2.x，
第一层级的用户信息字段被保留了下来，并提供了接口让开发者决定是否在用户授权的时候，同步第一层级的用户信息。

支持的接口：

1. [微信登录](/js-sdk/wechat/signin-signout.md)
  1. `wx.BaaS.loginWithWechat(data, {syncUserProfile})`
  2. `UserRecord.linkWechat(data, {syncUserProfile})`
2. [支付宝登录](/js-sdk/alipay/signin-signout.md)
  1. `my.BaaS.loginWithAlipay({forceLogin, syncUserProfile})`
  2. `UserRecord.linkAlipay({forceLogin, syncUserProfile})`

支持同步的字段：

1. nickname: 昵称
2. avatar: 头像
3. gender: 性别（仅微信）
4. language: 语言
5. city: 城市
6. province: 省份
7. country: 国家
