# 用户

## User 类

### 用户属性

`User` 类关联 `_userprofile` 表中 `id` 为用户 `id` 的数据行。`User` 类包含了 `_userprofile` 表的所有的**内置字段**。

| 参数      | 类型   | 说明 |
| :-------       | :----- | :-- |
| id             | String | 用户 id (对应 _userprofile 表中的 id 字段) |
| username       | String | 用户名（用于用户以用户名 & 密码登录） |
| phone          | String | 手机号码 |
| avatar         | String | 用户头像 |
| city           | String | 用户所在城市 |
| country        | String | 用户所在国家 |
| gender         | String | 用户的性别，值为 1 时是男性，值为 2 时是女性，值为 0 时是未知 |
| language       | String | 用户的语言，简体中文为 zh_CN |
| nickname       | String | 用户昵称 |
| openid         | String | 用户唯一标识，由微信生成 |
| province       | String | 用户所在省份 |
| email          | String | 用户邮箱（用于用户以邮箱 & 密码登录） |
| emailVerified  | Boolean | 用户邮箱是否已经通过验证（已验证邮箱才能找回密码）|

### 访问用户信息

* 访问内置字段

```Dart
currentUser.username;      // 用户名
currentUser.gender;        // 性别
currentUser.city;      // 城市
...                  // 其他内置字段类似方式获取
```

* 访问自定义字段

通过自定义 `key` 来访问自定义信息。

```Dart
currentUser.get("keyName");
```

如果访问了**不存在**的属性，会返回 **null**。

## 获取指定用户

通过指定用户 `id` 获取对应用户的信息。

`User.getUser(String userId, {List<String> expand, List<String> select})`

**示例代码**

```Dart
try {
  let userId = "36845**9853014";
  User user = await User.getUser(userId);
  // 操作成功
} on HError catch(e) {
  // 操作失败
}
```

**参数说明**

| 参数      | 类型           | 必填 | 说明 |
| :------- | :-----         | :-- | :-- |
| userId   | String         | Y   | 用户 Id |
| select   | `List<String>` |  N  | 指定筛选的字段，详见[数据表 - 字段过滤](/flutter-sdk/schema/select-and-expand.md)章节 |
| expand   | `List<String>` |  N  | 指定扩展的字段，详见[数据表 - 字段扩展](/flutter-sdk/schema/select-and-expand.md)章节 |

**返回结果**

| 名称       | 类型           | 说明 |
| :-------- | :------------  | :------ |
| user      | User           | 用户实例|

HError 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

## 查询用户

`User.find([Query query])`

通过设置查询条件，获取所有符合条件的用户。以下实例代码查询所有年龄小于 25 岁的用户:

**示例代码**

```Dart
try {
  Where where = Where.compare("age", '=', 25);
  let query = Query();
  query.where(where);
  UserList users = await User.find(query);
}
```

**参数说明**

|  参数   |  类型 | 必填 | 说明 |
| :----- | :---- | :-- | :-- |
| query  | Query |  N  | 查询条件，详见[数据表 - 查询](/flutter-sdk/schema/query.md) |

**返回结果**
 
| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| userList  | UserList | 用户列表|

HError 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

## UserList 类

`UserList` 表示一次查询数据库所返回的用户列表以及元数据。

| 属性          |  类型        |  说明 |
| :---------   | :---         | :----   |
| limit        | Int          | 一次请求返回记录的最大个数   |
| offset       | Int          | 返回记录的起始偏移值 |
| totalCount   | Int          | 记录总数 |
| next         | String       | 下一页地址，若值为 `null`，表示当前为最后一页 |
| previous     | String       | 上一页地址，若值为 `null`，表示当前为第一页 |
| users        | List<User>   | 用户数组，每个元素为 User 类型 |

> **info**
> 返回结果默认不包含 totalCount，如需获取该值可以在设置查询条件 `Query` 时，通过设置 `query.withTotalCount(true)` 来获取 totalCount。详见[获取记录总数](../schema/limit-and-order.md)