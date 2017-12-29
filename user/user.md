# 获取用户信息

<p style='color:red'>* sdk version >= v1.1.3</p>

`let MyUser = new wx.BaaS.User()`

### 获取当前用户信息

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
  "id": "36395395",
  "openid": "xxxxx",
  "unionid": "xxxxxx"
}
```

微信目前对小程序获取用户信息有两个小时的缓存设定，因此，如果一个用户修改了个人信息如头像、昵称等，需两个小时才能重新授权拿到最新的信息。
如果用户未进行授权登录，将返回空。

此时，可通过 `wx.BaaS.storage.get('uid')` 获取 uid (用户 id), `wx.BaaS.storage.get('openid')` 获取 openid, `wx.BaaS.storage.get('unionid')` 获取 unionid。

### 获取指定用户信息

`MyUser.get(userID)`

##### 参数说明

| 参数名  |  类型   |  必填  |   描述  |
| :---:  | :----: | :----: | :----: |
| userID | Number |   是   | 用户 ID |

##### 请求示例

```
let MyUser = new wx.BaaS.User()
MyUser.get('36395395').then((res) => {
  // success
}, (err) => {
  // err
})
```

##### 返回字段说明

一般情况下，返回字段为 id, user_id, avatar, nickname 这四个系统字段和用户自定义字段，如果 userID 等于当前用户的 user_id ，即查询当前用户信息，则会额外输出 city, country, gender,, language, openid, province 这几个字段

### 更新用户信息

更新用户信息与[数据表更新数据项](../schema/update-record.md)方法一致，只支持对 _userprofile 表中自定义的字段进行更新

##### 请求示例

```
let MyUser = new wx.BaaS.User()
let user = MyUser.getWithoutData(userID)
user.set('age', 30).update().then((res) => {
  // success
}, (err) => {
  // err
})
```

### 查询，获取用户列表

用户查询与[数据表查询](../schema/query.md)方法一致

##### 请求示例

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

### 排序
用户查询排序与[数据表排序](../schema/limit-and-order.md)方法一致，不包含在返回数据里的字段不支持排序，如 created_at

### 分页
用户查询分页与[数据表分页](../schema/limit-and-order.md)方法一致