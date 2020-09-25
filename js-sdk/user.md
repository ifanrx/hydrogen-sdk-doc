{% import "/js-sdk/macro/total_count.md" as totalCount %}

# 获取用户信息

{% ifanrxCodeTabs comment="目前会自动将 wx.BaaS 替换为 window 和 my"  %}

`let MyUser = new wx.BaaS.User()`

{% endifanrxCodeTabs %}

## 获取指定用户信息

`MyUser.get(userID)`

**参数说明**

| 参数    | 类型   | 必填 | 说明 |
| :----- | :----- | :--- | :---- |
| userID | Number | 是  | 用户 ID (对应 _userprofile 表中的 id 字段) |

**返回字段说明**

当查询的用户为非当前用户时：

| 参数      | 类型   | 说明 |
| :------- | :----- | :-- |
| avatar   | String | 用户头像 |
| id       | Number | 用户 ID (对应 _userprofile 表中的 id 字段) |
| nickname | String | 用户昵称 |

当查询的用户为当前用户时：

| 参数      | 类型   | 说明 |
| :------- | :----- | :--- |
| avatar   | String | 用户头像 |
| city     | String | 用户所在城市 |
| country  | String | 用户所在国家 |
| gender   | Number | 用户的性别，值为 1 时是男性，值为 2 时是女性，值为 0 时是未知 |
| id       | Number | 用户 ID (对应 _userprofile 表中的 id 字段) |
| language | String | 用户的语言，简体中文为 zh_CN |
| nickname | String | 用户昵称 |
| openid   | String | 用户唯一标识，由微信提供 |
| province | String | 用户所在省份 |
| _email | String | 用户邮箱（用于用户以邮箱 & 密码登录） |
| _username | String | 用户名（用于用户以用户名 & 密码登录） |
| _email_verified | Boolean | 用户邮箱是否已经通过验证（已验证邮箱才能找回密码） |
| _provider |Object |  用户在平台方的用户信息  |
| _provider.alipay |Object |  支付宝平台的用户信息，见下方说明  |

**支付宝平台的用户信息对象说明**

| 参数      | 类型   | 说明 |
| :--------- | :----- | :--- |
| user_id     |  string |  支付宝小程序用户 user_id |
| is_student  |  boolean |  用户是否是学生 |
| user_type   |  string |  用户类型，包括：company_account(公司账户)以及 personal_account (个人账户) |
| user_status |  boolean |  用户状态，包括：registered(快速注册用户)、authenticated(已认证用户)、frozen(被冻结用户) 以及inactive(已注册，未激活用户) |
| verified    |  boolean |  用户是否通过实名认证，当且仅当该值为 true 时gender 值才保证准确性 |
| avatar      |  string |  支付宝小程序用户头像 |
| province    |  string |  支付宝小程序用户省份 |
| city        |  string |  支付宝小程序用户市名称 |
| nickname    |  string | 支付宝小程序用户昵称 |
| gender      |  string |  支付宝小程序用户性别，female 为女性，male 为男性 |

> **info**
> 如果有自定义字段，则一并返回（以上两种情况皆是如此）。

**微信网页登录/微信公众号登录 UnionID 机制说明**

应用使用微信网页登录/微信公众号登录后，当用户资料中有 unionid 返回时，知晓云会将其存储到内置字段 ``_provider.wechat_unionid`` 中。
在重新进行微信网页登录/微信公众号登录时，知晓云会优先通过 ``_provider.wechat_unionid`` 查找用户，从而实现微信网页登录/微信公众号登录之间的用户身份打通。

> **info**
> 微信小程序暂未支持

**请求示例**

{% ifanrxCodeTabs comment="目前会自动将 wx.BaaS 替换为 window 和 my"  %}

```js
let MyUser = new wx.BaaS.User()
let userID = 36395395
MyUser.get(userID).then(res => {
  // success
}, err => {
  // err
})
```

{% endifanrxCodeTabs %}

**返回示例**

非当前用户：
```json
{
  "statusCode": 200,
  "data": {
    "avatar": "https://media.ifanrusercontent.com/media/tavatar/9a/1d/9a1db7592d6a325a845548f2fecbfb4516e138d0.jpg",
    "id": 36395394,
    "nickname": "hip hop man"
  }
}
```

当前用户：
```json
{
  "statusCode": 200,
  "data": {
      "id": 5123461461,
      "avatar": "http://cdn.ifanr.cn/ifanr/default_avatar.png",
      "nickname": "riDGldYXLHouWIYx",
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
          "gender": "female"
        }
      }
    }
}
```

## 筛选返回字段

select 使用方法可以参考[数据表 - 字段过滤](/js-sdk/schema/select-and-expand.md)小节

## 扩展字段

expand 使用方法可以参考[数据表 - 字段扩展](/js-sdk/schema/select-and-expand.md)小节

**请求示例**

假设 _userprofile 表中有一个类型为 pointer 的字段，名称为 `pointer_test_oder`, 指向了 test_order 表

{% ifanrxCodeTabs comment="目前会自动将 wx.BaaS 替换为 window 和 my"  %}

```javascript
let MyUser = new wx.BaaS.User()
MyUser.expand(['pointer_test_oder']).select(['nickname', 'pointer_test_order']).get(123456).then((res) => {
// success
}, (err) => {
// err
})
```
{% endifanrxCodeTabs %}

**请求结果**
```json
{
  "statusCode": 200,
  "data": {
    "pointer_test_order": {
      "created_at": 1538966895,
      "_table": "test_order",
      "id": "5bbac56fbd66033df7fd0aa2",
      "created_by": 61736923,
      "updated_at": 1538966895
    },
    "nickname": "ifanrx"
  }
}
```

{% ifanrxCodeTabs comment="目前会自动将 wx.BaaS 替换为 window 和 my"  %}

```javascript
let MyUser = new wx.BaaS.User()
MyUser.expand(['pointer_test_oder']).select(['nickname', 'pointer_test_oder']).find().then((res) => {
// success
}, (err) => {
// err
})

```
{% endifanrxCodeTabs %}

**请求结果**

```json
{
  "statusCode": 200,
  "data": {
    "meta": {
      "next": null,
      "offset": 0,
      "total_count": 1,
      "limit": 20,
      "previous": null
    },
    "objects": [
      {
        "pointer_test_order": {
          "id": "5bbac56fbd66033df7fd0aa2",
          "_table": "test_order",
          "created_by": 61736923,
          "updated_at": 1538966895
        },
        "nickname": "ifanrx"
      }
    ]
  }
}
```

## 获取符合筛选条件的用户总数

`MyUser.count()`

> **info**
> SDK v3.0 新增

{% ifanrxCodeTabs comment="目前会自动将 wx.BaaS 替换为 window 和 my"  %}
```js
let MyUser = new wx.BaaS.User()

// 查找所有用户
MyUser.find()

// 查询 nickname 中包含 like 的用户
let query = new wx.BaaS.Query()
query.contains('nickname', 'like')
MyUser.setQuery(query).count().then(num => {
  // success
  console.log(num)  // 10
}, err => {
  // err
})
```
{% endifanrxCodeTabs %}

## 查询，获取用户列表

> **info**
> 因为安全性考虑，仅支持 nickname、id 字段的查询，如需查询更多字段，可通过[云函数 node sdk](/cloud-function/node-sdk/user.html#查询，获取用户列表) 进行。

`MyUser.find(options)`

**参数说明**

options:

| 参数          | 类型    | 必填 | 默认 | 说明 |
| :------------ | :------ | :--- | :--- |:--- |
| withCount     | boolean |  否  | `false` | 是否返回 total_count |

{{totalCount.withCountTips()}}

用户查询与[数据表查询](./schema/query.md)方法一致

**请求示例**

{% ifanrxCodeTabs comment="目前会自动将 wx.BaaS 替换为 window 和 my"  %}
```js
let MyUser = new wx.BaaS.User()

// 查找所有用户
MyUser.find()

// 查询 nickname 中包含 like 的用户
let query = new wx.BaaS.Query()
query.contains('nickname', 'like')
MyUser.setQuery(query).find().then(res => {
  // success
}, err => {
  // err
})
```
{% endifanrxCodeTabs %}

## 排序

用户查询排序与[数据表排序](./schema/limit-and-order.md)方法一致，不包含在返回数据里的字段不支持排序，如 created_at。

**请求示例**

{% ifanrxCodeTabs comment="目前会自动将 wx.BaaS 替换为 window 和 my"  %}
```js
let MyUser = new wx.BaaS.User()

MyUser.orderBy('-nickname').find().then()
```
{% endifanrxCodeTabs %}

## 分页

用户查询分页与[数据表分页](./schema/limit-and-order.md)方法一致。

**请求示例**

{% ifanrxCodeTabs comment="目前会自动将 wx.BaaS 替换为 window 和 my"  %}
```js
let MyUser = new wx.BaaS.User()

MyUser.limit(5).offset(10).find().then()
```
{% endifanrxCodeTabs %}

## pointer 引用

使用 `BaaS.User().getWithoutData` 可以创建一个 _userprofile 指定数据行的引用。主要配合 pointer 功能使用

{% ifanrxCodeTabs comment="目前会自动将 wx.BaaS 替换为 window 和 my"  %}
```js
let user = new wx.BaaS.User().getWithoutData(123456)
```
{% endifanrxCodeTabs %}
具体使用方法请参考 [数据表-添加 pointer 类型数据](./schema/create-record.md) 小节
