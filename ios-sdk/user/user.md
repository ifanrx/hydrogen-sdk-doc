# User 相关操作

## User 对象

该对象关联 `_userprofile` 表中 id 为当前用户 ID 的数据行。User 对象包含了 `_userprofile` 表的所有的*内置字段*。

| 参数      | 类型   | 说明 |
| :------- | :----- | :-- |
| avatar   | String | 用户头像 |
| city     | String | 用户所在城市 |
| country  | String | 用户所在国家 |
| gender   | String | 用户的性别，值为 1 时是男性，值为 2 时是女性，值为 0 时是未知 |
| id       | Number | 用户 ID (对应 _userprofile 表中的 id 字段) |
| language | String | 用户的语言，简体中文为 zh_CN |
| nickname | String | 用户昵称 |
| openid   | String | 用户唯一标识，由微信生成 |
| province  | String | 用户所在省份 |
| unionid  | String | 用户在开放平台的唯一标识符，由微信生成 |
| _email | String | 用户邮箱（用于用户以邮箱 & 密码登录） |
| _username | String | 用户名（用于用户以用户名 & 密码登录） |
| _email_verified | Boolean | 用户邮箱是否已经通过验证（已验证邮箱才能找回密码） |
| _provider |Object |  用户在平台方的用户信息  |
| _provider.alipay |Object |  支付宝平台的用户信息  |
| _seesion_expires_at  |  Integer  | 登录 session 过期时间 |

**访问内置字段**

{% tabs swift1="Swift", oc1="Objective-C" %}
{% content "swift1" %}
```
currentUser.username      // 用户名
currentUser.gender        // 性别
currentUser.city      // 城市
...                  // 其他内置字段类似方式获取
```
{% content "oc1" %}
```
currentUser.username  // 用户名
currentUser.gender    // 性别
currentUser.city      // 城市
...                   // 其他内置字段类似方式获取
```
{% endtabs %}

**访问自定义字段**

{% tabs swift2="Swift", oc2="Objective-C" %}
{% content "swift2" %}
```
currentUser.get(key: "keyName")
```
{% content "oc2" %}
```
[currentUser getWithKey:@"keyName"];
```
{% endtabs %}

如果访问了不存在的属性，会返回空值。

## 获取指定用户

通过指定 userId 获取相应的用户信息。

**示例代码**

{% tabs swift3="Swift", oc3="Objective-C" %}
{% content "swift3" %}
```
let userId = 36845**9853014
User.get(userId, select: ["nickname", "gender"]) { (user, error) in

}
```
{% content "oc3" %}
```
long long userId = 36845**9853014;
[BaaSUser get:userId select:@[@"nickname", @"gender"] expand:nil completion:^(BaaSUser * _Nullable user, NSError * _Nullable error) {
                        
}];
```
{% endtabs %}

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| recordId | String | Y  | 记录 Id |
| select | Array<String> |  N  | 指定筛选的字段，详见[数据表 - 字段过滤](/ios-sdk/schema/select-and-expand.md)章节 |
| expand | Array<String> |  N  | 指定扩展的字段，详见[数据表 - 字段扩展](/ios-sdk/schema/select-and-expand.md)章节 |

**返回结果**

| 名称       | 类型           | 说明 |
| :-------- | :------------  | :------ |
| user   | User     | 用户实例|
| error     | NSError | 错误信息   |

error 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

## 查询用户

通过设置查询条件，获取符合条件的用户。

**示例代码**

{% tabs swift4="Swift", oc4="Objective-C" %}
{% content "swift4" %}
```
// 获取年龄小于 25 的用户

let whereArgs = Where.compare(key: "age", operator: .equalTo, value: 25)
let query = Query()
query.setWhere(whereArgs)
User.find(query: query, completion: {_, _ in

})
```
{% content "oc4" %}
```
// 获取年龄小于 25 的用户

BaaSWhere *where = [BaaSWhere compareWithKey:@"price" operator:BaaSOperatorLessThan value:@25];
BaaSQuery *query = [[BaaSQuery alloc] init];
[query setWhere:where];
[BaaSUser findWithQuery:query completion:^(BaaSUserListResult * _Nullable listResult, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :---- | :-- | :-- |
| query | Query |  N  | 查询条件 |

**返回结果**
 
| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| listResult  | UserListResult | 结果列表|
| error   |  NSError |  错误信息  |

error 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

### UserListResult

`UserListResult` 表示一次查询数据库所返回的用户列表以及元数据。

| 属性       |  类型    |  说明 |
| :--------- | :--- | :----   |
| limit     |  Int  |  返回记录的最大个数   |
| offset    | Int  |    返回记录的起始偏移值 |
| totalCount   | Int   |   实际返回的记录总数 |
| users  |   Array<User> | 记录列表，每个元素为 User 类型   |