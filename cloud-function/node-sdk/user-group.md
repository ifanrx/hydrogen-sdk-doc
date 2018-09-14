# 用户组操作

## 获取用户组详情
`userGroup.get(groupID)`

**参数说明**

| 参数    | 类型   | 必填 | 说明 |
| :----- | :----- | :-- | :-- |
| groupID   | integer | Y   | 用户组 ID |

**示例代码**
```javascript
exports.main = async function (event, callback) {
  let userGroup = new BaaS.UserGroup()
  callback(null, await userGroup.get(123))
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
exports.main = async function (event, callback) {
  let userGroup = new BaaS.UserGroup()
  callback(null, await userGroup.offset(10).limit(20).getUserGroupList({parentID: '11'}))
}
```

```javascript
// 查询所有用户组
userGroup.offset(10).limit(20).getUserGroupList({})
```

**返回示例**
```json
{"meta": {"limit": 20, "next": null, "offset": 0, "previous": null, "total_count": 5}, "objects": [{"id": 17, "members": 0, "name": "vvv", "parent_id": 16, "super_group": {"id": 16, "name": "a2222"}}, {"id": 13, "members": 0, "name": "测试", "parent_id": 11, "super_group": {"id": 11, "name": "sup"}}, {"id": 10, "members": 19, "name": "总经理", "parent_id": 11, "super_group": {"id": 11, "name": "sup"}}, {"id": 9, "members": 2, "name": "产品经理", "parent_id": 11, "super_group": {"id": 11, "name": "sup"}}, {"id": 8, "members": 6, "name": "程序员", "parent_id": null, "super_group": {"id": null, "name": null}}]}
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
exports.main = async function (event, callback) {
  let userGroup = new BaaS.UserGroup()
  console.log(await userGroup.create({name: '测试',parent:'11'}))
  callback(null)
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
exports.main = async function (event, callback) {
  let userGroup = new BaaS.UserGroup()
  await userGroup.update(12, {name: '888'})
  callback(null)
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
exports.main = async function (event, callback) {
  let userGroup = new BaaS.UserGroup()
  await userGroup.delete([12, 13])
  callback(null)
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
exports.main = async function (event, callback) {
  let userGroup = new BaaS.UserGroup()
  await userGroup.addUserIntoGroup([1092612, 1092601], [8, 9])
  callback(null)
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
exports.main = async function (event, callback) {
  let userGroup = new BaaS.UserGroup()
  await userGroup.removeUserFromGroup([1092612], [8, 9])
  callback(null)
}
```