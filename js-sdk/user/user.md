# 获取用户信息

{% tabs first="SDK 1.1.3 及以上版本", second="SDK 1.1.3 以下版本" %}

{% content "first" %}

`let MyUser = new wx.BaaS.User()`

## 获取当前用户信息

`wx.BaaS.login` 方法会返回完成登录后的当前用户信息，同时，我们也给出 `wx.BaaS.storage.get('userinfo')` 获取存储在 storage 的当前用户信息。

如果用户授权登录过，该方法将返回如下字段：

```
{
  nickName: "hip hop man",
  gender: 1,
  language: "en",
  city: "Guangzhou",
  province: "Guangdong",
  country: "China",
  avatarUrl: "xxxxxx",
  id: "36395395",
  openid: "xxxxx",
  unionid: "xxxxxx"
}
```

微信目前对小程序获取用户信息有两个小时的缓存设定，因此，如果一个用户修改了个人信息如头像、昵称等，需两个小时才能重新授权拿到最新的信息。
如果用户未进行授权登录，将返回空。

此时，可通过 `wx.BaaS.storage.get('uid')` 获取 uid (用户 id), `wx.BaaS.storage.get('openid')` 获取 openid, `wx.BaaS.storage.get('unionid')` 获取 unionid。

## 获取指定用户信息

`MyUser.get(userID)`

**参数说明**

| 参数名  |  类型   |  必填  |   描述  |
| :---:  | :----: | :----: | :----: |
| userID | Number |   是   | 用户 ID |


**请求示例**

```
let MyUser = new wx.BaaS.User()
let userID = 36395395
MyUser.get(userID).then((res) => {
  // success
}, (err) => {
  // err
})
```

**返回字段说明**

一般情况下，返回字段为 id, avatar, nickname 这三个系统字段和用户自定义字段，如果 userID 等于当前用户的 id ，即查询当前用户信息，则会额外输出 city, country, gender, language, openid, province 这几个字段, 如下：

非当前用户：
```
{
  avatar: "https://media.ifanrusercontent.com/media/tavatar/9a/1d/9a1db7592d6a325a845548f2fecbfb4516e138d0.jpg",
  id: 36395394,
  nickname: "hip hop man",
}
```

当前用户：
```
{
  avatar: "https://media.ifanrusercontent.com/media/tavatar/9a/1d/9a1db7592d6a325a845548f2fecbfb4516e138d0.jpg",
  city: "Guangzhou",
  country: "China",
  gender: 1,
  id: 36395394,
  language: "en",
  nickname: "hip hop man",
  openid: "oXUfx0HKez4qLqgX-XSwLCpiBYS9",
  province: "Guangdong"
}
```

## 更新当前用户信息

更新用户信息与[数据表更新数据项](../schema/update-record.md)方法基本一致。这里只允许更新当前用户的信息，并且只支持对 _userprofile 表中自定义的字段进行更新

**请求示例**

```
let MyUser = new wx.BaaS.User()
let currentUser = MyUser.getCurrentUserWithoutData()

// age 为自定义字段
currentUser.set('age', 30).update().then((res) => {
  // success
}, (err) => {
  // err
})
```

## 查询，获取用户列表

用户查询与[数据表查询](../schema/query.md)方法一致

**请求示例**

```
let MyUser = new wx.BaaS.User()

// 查找所有用户
MyUser.find()

// 查询 nickName 中包含 like 的用户
let query = new wx.BaaS.Query()
query.contains('nickName', 'like')
MyUser.setQuery(query).find().then((res) => {
  // success
}, (err) => {
  // err
})
```

## 排序
用户查询排序与[数据表排序](../schema/limit-and-order.md)方法一致，不包含在返回数据里的字段不支持排序，如 created_at

**请求示例**

```
let MyUser = new wx.BaaS.User()

MyUser.orderBy('-nickname').find().then()
```

## 分页
用户查询分页与[数据表分页](../schema/limit-and-order.md)方法一致

**请求示例**

```
let MyUser = new wx.BaaS.User()

MyUser.limit(5).offset(10).find().then()
```

{% content "second" %}

## 获取当前用户信息

`wx.BaaS.login` 方法会返回完成登录后的当前用户信息，同时，我们也给出 `wx.BaaS.storage.get('userinfo')` 获取存储在 storage 的当前用户信息。

如果用户授权登录过，该方法将返回如下字段：

```
{
  "nickName": "hip hop man",
  "gender": 1,
  "language": "en",
  "city": "Guangzhou",
  "province": "Guangdong",
  "country": "China",
  "avatarUrl": "xxxxxx",
  "id": "36395395", // 需 SDK v1.1.0 及以上版本
  "openid": "xxxxx", // 需 SDK v1.1.0 及以上版本
  "unionid": "xxxxxx" // 需 SDK v1.1.0 及以上版本
}
```

微信目前对小程序获取用户信息有两个小时的缓存设定，因此，如果一个用户修改了个人信息如头像、昵称等，需两个小时才能重新授权拿到最新的信息。
如果用户未进行授权登录，将返回空。

此时，可通过 `wx.BaaS.storage.get('uid')` 获取 uid (用户 id), `wx.BaaS.storage.get('openid')` 获取 openid, `wx.BaaS.storage.get('unionid')` 获取 unionid。

> **danger**
> 如果用户已在 SDK v1.1.0 之前版本完成了登录，`wx.BaaS.storage.get('userinfo')` 将不返回 `id`、`openid`、`unionid` 三个字段，请配合使用 `wx.BaaS.storage.get('uid')` 以兼容；或者让用户重新登录一次即可。

## 获取指定用户信息

`wx.BaaS.getUserInfo(OBJECT)`

**OBJECT 参数说明**

| 参数名 | 类型   | 必填| 描述 |
| :---:  | :----: | :----: | :----: |
| userID | Number | 否 | 用户 ID |
| user_id__in | String | 否 | 多个用户 ID，用逗号分隔 |

**请求示例**

```
// 获取 userID 为 1 的用户信息（单个获取）
wx.BaaS.getUserInfo({
  userID: 1
}).then((res) => {
  // success
}, (err) => {
  // err
});
```

```
// 获取 userID 为 1、2、3 的用户信息（多个获取）
wx.BaaS.getUserInfo({
  user_id__in: '1,2,3'
}).then((res) => {
  // success
}, (err) => {
  // err
});
```

**返回字段说明**

出于安全性考虑，该接口目前只开放了 user id、nickname、avatar 三个字段。如需展示当前用户的完整信息，请参照上方 “获取当前用户信息”。

> **info**
> `userID` 和 `user_id__in` 参数必选一

{% endtabs %}