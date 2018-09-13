# 用户组操作

## 获取用户组详情
`userGroup.get(groupID)`

**参数说明**

| 参数    | 类型   | 必填 | 说明 |
| :----- | :----- | :-- | :-- |
| groupID   | integer | Y   | 用户组 ID |

**示例代码**
```javascript
exports.main = async function (e, cb) {
  let g = new BaaS.UserGroup()
  cb(null, await g.get(123))
}
```

**返回示例**
```json
{
  "id": 47,
  "members": 0,
  "name": "User Group",
  "parent": {
    "id": 1,
    "name": "Super Group"
  }
}
```

`members` 表示在用户组下的用户数量，`parent` 表示用户组的组集


## 获取用户组列表
`userGroup.getUserGroupList({parentID})`

**参数说明**
| 参数       | 类型   | 必填 | 说明 |
| :---------| :----- | :-- | :-- |
| parentID | integer | N   | 用户组的组集 ID |

**示例代码**

```javascript
exports.main = async function (e, cb) {
  let g = new BaaS.UserGroup()
  cb(null, await g.offset(10).limit(20).getUserGroupList({parentID: '11'}))
}
```


## 创建用户组
`userGroup.create({name,parent})`

**参数说明**

| 参数    | 类型   | 必填 | 说明 |
| :----- | :----- | :-- | :-- |
| name   | String | Y   | 用户组的名称 |
| parent | integer | N   | 组集 ID |

**示例代码**
```javascript
exports.main = async function (e, cb) {
  let g = new BaaS.UserGroup()
  console.log(await g.create({name: '测试',parent:'11'}))
  cb(null)
}
```

## 修改用户组
`userGroup.update(groupID, {name})`

**参数说明**

| 参数    | 类型   | 必填 | 说明 |
| :-----  | :----- | :-- | :-- |
| name    | String | Y   | 用户组的名称 |
| groupID | integer | Y   | 用户组 ID |

**示例代码**
```javascript
exports.main = async function (e, cb) {
  let g = new BaaS.UserGroup()
  await g.update(12, {name: '888'})
  cb(null)
}
```

## 批量删除用户组
`userGroup.delete([id,...])`

**参数说明**

| 参数    | 类型   | 必填 | 说明 |
| :-----  | :----- | :-- | :-- |
| id | integer | Y   | 用户组 ID |

**示例代码**
```javascript
exports.main = async function (e, cb) {
  let g = new BaaS.UserGroup()
  await g.delete([12, 13])
  cb(null)
}
```

## 将用户添加至用户组
`userGroup.addUserIntoGroup(users, groups)`

**参数说明**

| 参数    | 类型   | 必填 | 说明 |
| :-----  | :----- | :-- | :-- |
| users | integer Array | Y   | 用户 ID 数组|
| groups | integer Array | Y   | 用户组 ID 数组|

**示例代码**
```javascript
exports.main = async function (e, cb) {
  let g = new BaaS.UserGroup()
  await g.addUserIntoGroup([1092612, 1092601], [8, 9])
  cb(null)
}
```

## 将用户移除用户组
`userGroup.removeUserFromGroup(users, groups)`

**参数说明**

| 参数    | 类型   | 必填 | 说明 |
| :-----  | :----- | :-- | :-- |
| users | integer Array | Y   | 用户 ID 数组|
| groups | integer Array | Y   | 用户组 ID 数组|

```javascript
exports.main = async function (e, cb) {
  let g = new BaaS.UserGroup()
  await g.removeUserFromGroup([1092612], [8, 9])
  cb(null)
}
```