# 获取用户信息

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
  "id": "36395395", // 需 SDK v1.1.0 及以上版本
  "openid": "xxxxx", // 需 SDK v1.1.0 及以上版本
  "unionid": "xxxxxx" // 需 SDK v1.1.0 及以上版本
}
```

如果用户未进行授权登录，将返回空。

此时，可通过 `wx.BaaS.storage.get('uid')` 获取 uid (用户 id), `wx.BaaS.storage.get('openid')` 获取 openid, `wx.BaaS.storage.get('unionid')` 获取 unionid。

**注意** ： 如果用户已在 SDK 1.1.0 之前版本完成了登录，`wx.BaaS.storage.get('userinfo')` 将不返回 `id`、`openid`、`unionid` 三个字段，请配合使用 `wx.BaaS.storage.get('uid')` 以兼容；或者让用户重新登录一次即可。

### 获取指定用户信息

`wx.BaaS.getUserInfo(OBJECT)`

##### OBJECT 参数说明

| 参数名 | 类型   | 必填| 描述 |
| :---:  | :----: | :----: | :----: |
| userID | Number | 否 | 用户 ID |
| user_id__in | String | 否 | 多个用户 ID，用逗号分隔 |

##### 请求示例

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

##### 返回字段说明

出于安全性考虑，该接口目前只开放了 user id、nickname、avatar 三个字段。如需展示当前用户的完整信息，请参照上方 “获取当前用户信息”。

### 注意事项

- `userID` 和 `user_id__in` 参数必选一