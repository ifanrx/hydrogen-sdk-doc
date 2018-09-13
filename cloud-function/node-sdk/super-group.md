## 用户组集操作


## 创建组集
`userSuperGroup.create({name, children})`

**参数说明**

| 参数    | 类型   | 必填 | 说明 |
| :----- | :----- | :-- | :-- |
| name   | string | Y   | 用户组集名称 |
| children   | integer array | N   | 用户组 ID 数组|

**示例代码**

```javascript
exports.main = async function (event, callback) {
  let userSuperGroup = new BaaS.UserSuperGroup()
  callback(null, await userSuperGroup.create({name: 'aa2', children: [8]}))
}
```

## 获取组集详情
`userSuperGroup.get(superGroupID)`

**参数说明**

| 参数    | 类型   | 必填 | 说明 |
| :----- | :----- | :-- | :-- |
| superGroupID   | integer | Y   | 用户组集 ID |

**示例代码**

```javascript
exports.main = async function (event, callback) {
  let userSuperGroup = new BaaS.UserSuperGroup()
  callback(null, await userSuperGroup.get(11))
}
```
**返回示例**

```json
{"children": 1, "id": 16, "name": "a2222", "user_group": [{"id": 17, "name": "vvv"}]}
```

## 修改组集
`userSuperGroup.get(superGroupID)`

> **danger**
> 该操作会清除掉旧有的组集和用户组的关系，重新与传入的用户组建立关系

**参数说明**

| 参数    | 类型   | 必填 | 说明 |
| :----- | :----- | :-- | :-- |
| name   | string | Y   | 用户组集名称 |
| children   | integer array | Y   | 用户组 ID 数组|

**示例代码**

```javascript
exports.main = async function (event, callback) {
  let userSuperGroup = new BaaS.UserSuperGroup()
  callback(null, await userSuperGroup.update(16, {name: 'a2222', children: [17]}))
}
```

## 获取组集列表
`userSuperGroup.getUserSuperGroupList()`

**示例代码**

```javascript
exports.main = async function (event, callback) {
  let userSuperGroup = new BaaS.UserSuperGroup()
  callback(null, await userSuperGroup.getUserSuperGroupList())
}
```
**返回示例**

```json
{"meta": {"limit": 20, "next": null, "offset": 0, "previous": null, "total_count": 2}, "objects": [{"children": 1, "id": 16, "name": "a2222", "user_group": [{"id": 17, "name": "vvv"}]}, {"children": 3, "id": 11, "name": "sup", "user_group": [{"id": 9, "name": "产品经理"}, {"id": 10, "name": "总经理"}, {"id": 13, "name": "测试"}]}]}
```

## 删除组集
`userSuperGroup.delete([id,...])`

**参数说明**

| 参数    | 类型   | 必填 | 说明 |
| :----- | :----- | :-- | :-- |
| id   | integer | Y   | 用户组集 ID |

**示例代码**

```javascript
exports.main = async function (event, callback) {
  let userSuperGroup = new BaaS.UserSuperGroup()
  callback(null, await userSuperGroup.delete([15, 16]))
}
```