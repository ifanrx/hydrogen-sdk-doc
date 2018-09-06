# 获取用户信息

`let MyUser = new BaaS.User()`

## 获取指定用户信息

`MyUser.get(userID)`

**参数说明**

| 参数    | 类型   | 必填 | 说明 |
| :----- | :----- | :-- | :---- |
| userID | Number | 是  | 用户 ID |

**返回字段说明**

| 参数      | 类型   | 说明 |
| :------- | :----- | :-- |
| avatar   | String | 用户头像 |
| city     | String | 用户所在城市 |
| country  | String | 用户所在国家 |
| gender   | String | 用户的性别，值为 1 时是男性，值为 2 时是女性，值为 0 时是未知 |
| id       | Number | 用户 ID |
| language | String | 用户的语言，简体中文为 zh_CN |
| nickname | String | 用户昵称 |
| openid   | String | 用户唯一标识，由微信生成 |
| province  | String | 用户所在省份 |
| unionid  | String | 用户在开放平台的唯一标识符，由微信生成 |


> **info**
> 如果有自定义字段，则一并返回

**请求示例**

```js
let MyUser = new BaaS.User()
let userID = 36395395
MyUser.get(userID).then(res => {
  // success
}, err => {
  // err
})
```

**返回示例**

```json
{
  "avatar": "https://xxx.jpg",
  "id": 36395395,
  "is_authorized": true,
  "nickname": "姚凯伦",
  "openid": "xxx",
  "unionid": null,
  ...
}
```

### 筛选返回字段

select 使用方法可以参考[数据表 - 字段过滤]小节(/js-sdk/schema/select-and-expand.md)

**请求示例**

```javascript
let MyUser = new wx.BaaS.User()
MyUser.select('nickname').find().then((res) => {
// success
}, (err) => {
// err
})

```
**请求结果**
```javascript
[{"nickname": "ifanrx"}]
```

微信目前对小程序获取用户信息有两个小时的缓存设定，因此，如果一个用户修改了个人信息如头像、昵称等，需两个小时才能重新授权拿到最新的信息。


### 更新用户信息

更新用户信息与[数据表更新数据项](./schema/update-record.md)方法基本一致。这里只支持对 _userprofile 表中自定义的字段进行更新。

**请求示例**

```js
let MyUser = new BaaS.User()
let userID = 36395395
let user = MyUser.getWithoutData(userID)

// age 为自定义字段
user.set('age', 30).update().then(res => {
  // success
}, err => {
  // err
})
``` 

## 查询，获取用户列表

用户查询与[数据表查询](./schema/query.md)方法一致

**请求示例**

```js
let MyUser = new BaaS.User()

// 查找所有用户
MyUser.find()

// 查询 nickname 中包含 like 的用户
let query = new BaaS.Query()
query.contains('nickname', 'like')
MyUser.setQuery(query).find().then(res => {
  // success
}, err => {
  // err
})
```

## 排序

用户查询排序与[数据表排序](./schema/limit-and-order.md)方法一致，不包含在返回数据里的字段不支持排序，如 created_at。

**请求示例**

```js
let MyUser = new BaaS.User()

MyUser.orderBy('-nickname').find().then()
```

## 分页

用户查询分页与[数据表分页](./schema/limit-and-order.md)方法一致。

**请求示例**

```js
let MyUser = new BaaS.User()

MyUser.limit(5).offset(10).find().then()
```