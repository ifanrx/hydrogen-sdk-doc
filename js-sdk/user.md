# 获取用户信息

{% tabs first="SDK 1.1.3 及以上版本", second="SDK 1.1.3 以下版本" %}

{% content "first" %}

## SDK 1.1.3 及以上版本

`let MyUser = new wx.BaaS.User()`

### 获取当前用户信息

`wx.BaaS.login()` 方法会返回完成登录后的当前用户信息。

如果用户授权登录过，该方法将返回以下字段：

| 参数       | 类型   | 说明 |
| :-------- | :----- | :-- |
| avatarUrl | String | 用户头像 |
| city      | String | 用户所在城市 |
| country   | String | 用户所在国家 |
| gender    | String | 用户的性别，值为 1 时是男性，值为 2 时是女性，值为 0 时是未知 |
| id        | Number | 用户在用户表中的 ID |
| language  | String | 用户的语言，简体中文为 zh_CN |
| nickName  | String | 用户昵称 (这里的 nickName 由微信登录接口直接返回，注意与 MyUser.get 方法返回的 nickname 字段拼写上的不同) |
| openid    | String | 用户唯一标识，由微信生成 |
| province  | String | 用户所在省份 |
| unionid   | String | 用户在开放平台的唯一标识符，由微信生成 |
| session_expires_at | Integer | 指示当前登录态的过期时间，由知晓云维护。该值为一个 unix 时间戳 (SDK >= 1.11.0) |

微信目前对小程序获取用户信息有两个小时的缓存设定，因此，如果一个用户修改了个人信息如头像、昵称等，需两个小时才能重新授权拿到最新的信息。
如果用户未进行授权登录，将返回空。

> **danger**
> 调用此方法时请确保用户已经同意授权，请参考 [登入登出章节](./signin-signout.md) 中关于 wx.BaaS.handleUserInfo 的使用方法

**示例代码**

```js
wx.BaaS.login().then(res => {
  // success
}, err => {
  // err
})
```

**返回示例**

```json
{
  "nickName": "Larry。",
  "gender": 1,
  "language": "zh_CN",
  "city": "Huizhou",
  "province": "Guangdong",
  "country": "China",
  "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK4QEMnT5dggfh4xpSuOWZicyNagricjH4jzKRI5ZFEiaBPzicp8wcQo23IEJjt8vkuAQ6rYVkYF61FVA/132",
  "id": 11123,
  "openid": "ofo380BgVHDSf3gz0QK1DYP666",
  "unionid": "oUsert59Z0TZHkCQ9f3Po777",
  "session_expires_at": 1546588122840
}
```

### 获取指定用户信息

`MyUser.get(userID)`

**参数说明**

| 参数    | 类型   | 必填 | 说明 |
| :----- | :----- | :-- | :---- |
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
| :------- | :----- | :-- |
| avatar   | String | 用户头像 |
| city     | String | 用户所在城市 |
| country  | String | 用户所在国家 |
| gender   | Number | 用户的性别，值为 1 时是男性，值为 2 时是女性，值为 0 时是未知 |
| id       | Number | 用户 ID (对应 _userprofile 表中的 id 字段) |
| language | String | 用户的语言，简体中文为 zh_CN |
| nickname | String | 用户昵称 |
| openid   | String | 用户唯一标识，由微信提供 |
| province | String | 用户所在省份 |

> **info**
> 如果有自定义字段，则一并返回（以上两种情况皆是如此）。

**请求示例**

```js
let MyUser = new wx.BaaS.User()
let userID = 36395395
MyUser.get(userID).then(res => {
  // success
}, err => {
  // err
})
```

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
    "avatar": "https://media.ifanrusercontent.com/media/tavatar/9a/1d/9a1db7592d6a325a845548f2fecbfb4516e138d0.jpg",
    "city": "Guangzhou",
    "country": "China",
    "gender": 1,
    "id": 36395394,
    "language": "en",
    "nickname": "hip hop man",
    "openid": "oXUfx0HKez4qLqgX-XSwLCpiBYS9",
    "province": "Guangdong"
  }
}
```

### 筛选返回字段（SDK >= 1.12.1）

select 使用方法可以参考[数据表 - 字段过滤](/js-sdk/schema/select-and-expand.md)小节

### 扩展字段 （SDK >= 1.12.1）

expand 使用方法可以参考[数据表 - 字段扩展](/js-sdk/schema/select-and-expand.md)小节

**请求示例**

假设 _userprofile 表中有一个类型为 pointer 的字段，名称为 `pointer_test_oder`, 指向了 test_order 表

```javascript
let MyUser = new wx.BaaS.User()
MyUser.expand(['pointer_test_oder']).select(['nickname', 'pointer_test_order']).get(123456).then((res) => {
// success
}, (err) => {
// err
})
```

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

```javascript
let MyUser = new wx.BaaS.User()
MyUser.expand(['pointer_test_oder']).select(['nickname', 'pointer_test_oder']).find().then((res) => {
// success
}, (err) => {
// err
})

```

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

### 更新当前用户信息

更新用户信息与[数据表更新数据项](./schema/update-record.md)方法基本一致。这里只允许更新当前用户的信息，并且只支持对 _userprofile 表中自定义的字段进行更新。

**请求示例**

```js
let MyUser = new wx.BaaS.User()
let currentUser = MyUser.getCurrentUserWithoutData()

// age 为自定义字段
currentUser.set('age', 30).update().then(res => {
  // success
}, err => {
  // err
})
```

### 查询，获取用户列表

用户查询与[数据表查询](./schema/query.md)方法一致

**请求示例**

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

### 排序

用户查询排序与[数据表排序](./schema/limit-and-order.md)方法一致，不包含在返回数据里的字段不支持排序，如 created_at。

**请求示例**

```js
let MyUser = new wx.BaaS.User()

MyUser.orderBy('-nickname').find().then()
```

### 分页

用户查询分页与[数据表分页](./schema/limit-and-order.md)方法一致。

**请求示例**

```js
let MyUser = new wx.BaaS.User()

MyUser.limit(5).offset(10).find().then()
```

{% content "second" %}

## SDK 1.1.3 以下版本

### 获取当前用户信息

`wx.BaaS.login` 方法会返回完成登录后的当前用户信息，同时，我们也给出 `wx.BaaS.storage.get('userinfo')` 获取存储在 storage 的当前用户信息。

如果用户授权登录过，该方法将返回以下字段：

| 参数       | 类型   | 说明 |
| :-------- | :----- | :-- |
| avatarUrl | String | 用户头像 |
| city      | String | 用户所在城市 |
| country   | String | 用户所在国家 |
| gender    | String | 用户的性别，值为 1 时是男性，值为 2 时是女性，值为 0 时是未知 |
| id        | String | 用户在用户表中的 ID，<span style="color:red">SDK v1.1.0 及以上版本才会返回</span> |
| language  | String | 用户的语言，简体中文为 zh_CN |
| nickName  | String | 用户昵称 (这里的 nickName 由微信登录接口直接返回，注意与 MyUser.get 方法返回的 nickname 字段拼写上的不同) |
| openid    | String | 用户唯一标识，由微信提供，<span style="color:red">SDK v1.1.0 及以上版本才会返回</span> |
| province  | String | 用户所在省份 |
| unionid   | String | 用户在开放平台的唯一标识符，由微信提供，<span style="color:red">SDK v1.1.0 及以上版本才会返回</span> |

微信目前对小程序获取用户信息有两个小时的缓存设定，因此，如果一个用户修改了个人信息如头像、昵称等，需两个小时才能重新授权拿到最新的信息。
如果用户未进行授权登录，将返回空。

此时，可通过 `wx.BaaS.storage.get('uid')` 获取 uid (用户 id), `wx.BaaS.storage.get('openid')` 获取 openid, `wx.BaaS.storage.get('unionid')` 获取 unionid。

> **danger**
> 如果用户已在 SDK v1.1.0 之前版本完成了登录，`wx.BaaS.storage.get('userinfo')` 将不返回 `id`、`openid`、`unionid` 三个字段，请配合使用 `wx.BaaS.storage.get('uid')` 以兼容；或者让用户重新登录一次即可。

### 获取指定用户信息

`wx.BaaS.getUserInfo(OBJECT)`

**OBJECT 参数说明**

| 参数         | 类型   | 必填 | 说明 |
| :---------- | :----- | :-- | :-- |
| userID      | Number | 否  | 用户 ID (对应 _userprofile 表中的 id 字段) |
| user_id__in | String | 否  | 多个用户 ID，用逗号分隔 |

**返回字段说明**
当查询的用户为非当前用户时：

| 参数      | 类型   | 说明 |
| :------- | :----- | :-- |
| avatar   | String | 用户头像 |
| id       | Number | 用户 ID |
| nickname | String | 用户昵称 |

出于安全性考虑，该接口目前只开放了 user id、nickname、avatar 三个字段。如需展示当前用户的完整信息，请参照上方 “获取当前用户信息”。

**请求示例**

```js
// 获取 userID 为 1 的用户信息（单个获取）
wx.BaaS.getUserInfo({
  userID: 1
}).then(res => {
  // success
}, err => {
  // err
})
```

```js
// 获取 userID 为 1、2、3 的用户信息（多个获取）
wx.BaaS.getUserInfo({
  user_id__in: '1,2,3'
}).then(res => {
  // success
}, err => {
  // err
})
```

> **info**
> `userID` 和 `user_id__in` 参数必选一

{% endtabs %}
