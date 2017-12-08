# 用户组与用户的操作

本文档所描述的接口均需要经认证授权后才可使用，认证授权请参考 [授权认证](./authentication.md)。

## 用户 加入／移除 用户组操作

### 接口地址

`https://cloud.minapp.com/oserve/v1/miniapp/group/membership/`

### 请求方法

`PATCH`

### 提交参数

提交的数据是一个数组，数组中包含一系列由下面参数组成的操作。

- `op` 将要执行的操作，即 `add` 为将用户加入用户组；`remove` 将用户从用户组中移除
- `path` 访问的路径，默认为 `/membership`
- `users` 用户的 user_id 列表，列表不能为空
- `groups` 用户组 ID 列表，列表不能为空

### 请求示例

```
curl -X PATCH \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
-d '[
      {"op": "add", "path": "/membership", "users": [5, 6], "groups": [53,54]},
      {"op": "remove", "path": "/membership", "users": [5, 6], "groups":[53,54]}
    ]' \
https://cloud.minapp.com/oserve/v1/miniapp/group/membership/
```

### 状态码说明

- `204` 修改成功
- `400` 参数错误
