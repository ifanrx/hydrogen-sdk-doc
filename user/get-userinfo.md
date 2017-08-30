# 获取用户信息

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

### 注意事项

- `userID` 和 `user_id__in` 参数必选一