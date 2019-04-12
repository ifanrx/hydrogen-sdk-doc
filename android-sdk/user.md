# 获取用户信息

## 获取指定用户信息

`Users.user(id)`

**参数说明**

| 参数    | 类型   | 必填 | 说明 |
| :----- | :----- | :--- | :---- |
| id | Number | 是  | 用户 ID (对应 _userprofile 表中的 id 字段) |

**返回字段说明**

各个字段的值，用户可以通过 `getXXX` 方法拿到，比如：

当查询的用户为非当前用户时：

| 参数      | 类型   | 说明 |
| :------- | :----- | :-- |
| User.AVATAR   | String | 用户头像 |
| User.ID       | Number | 用户 ID (对应 _userprofile 表中的 id 字段) |
| User.NICKNAME | String | 用户昵称 |

当查询的用户为当前用户时：

| 参数      | 类型   | 说明 |
| :------- | :----- | :--- |
| User.AVATAR  | String | 用户头像 |
| User.CITY     | String | 用户所在城市 |
| User.COUNTRY  | String | 用户所在国家 |
| User.GENDER   | Number | 用户的性别，值为 1 时是男性，值为 2 时是女性，值为 0 时是未知 |
| User.ID       | Number | 用户 ID (对应 _userprofile 表中的 id 字段) |
| User.LANGUAGE | String | 用户的语言，简体中文为 zh_CN |
| User.NICKNAME | String | 用户昵称 |
| User.OPENID   | String | 用户唯一标识，由微信提供 |
| User.PROVINCE | String | 用户所在省份 |
| User.EMAIL | String | 用户邮箱（用于用户以邮箱 & 密码登录） |
| User.USERNAME | String | 用户名（用于用户以用户名 & 密码登录） |
| User.EMAIL_VERIFIED | Boolean | 用户邮箱是否已经通过验证（已验证邮箱才能找回密码） |
| User.PROVIDER | JSONObject |  用户在平台方的用户信息  |

**User.PROVIDER 支付宝平台的用户信息对象说明**

| 参数      | 类型   | 说明 |
| :--------- | :----- | :--- |
| user_id     |  string |  支付宝小程序用户 user_id |
| is_student  |  boolean |  用户是否是学生 |
| user_type   |  string |  用户类型，包括：company_account(公司账户)以及 personal_account (个人账户) |
| user_status |  boolean |  用户状态，包括：registered(快速注册用户)、authenticated(已认证用户)、frozen(被冻结用户) 以及inactive(已注册，未激活用户) |
| verified    |  boolean |  用户是否通过实名认证，当且仅当该值为 true 时gender 值才保证准确性 |
| avatar      |  string |  支付宝小程序用户头像 |
| province    |  string |  支付宝小程序用户省份 |
| city        |  string |  支付宝小程序用户市名称 |
| nickname    |  string | 支付宝小程序用户昵称 |
| gender      |  string |  支付宝小程序用户性别，female 为女性，male 为男性 |

> **info**
> 如果有自定义字段，则一并返回（以上两种情况皆是如此）。

**请求示例**

```java
try {
  User potter = Users.user(15549039403);
  potter.getString(User.AVATAR);
  potter.getInt(User.ID);
  // 操作成功
} catch (Exception e) {
  Log.d(TAG, e.getMessage(), e);
  // 操作失败
}
```

**返回示例**

非当前用户：
```json
{
  "avatar": "https://media.ifanrusercontent.com/media/tavatar/9a/1d/9a1db7592d6a325a845548f2fecbfb4516e138d0.jpg",
  "id": 36395394,
  "nickname": "hip hop man"
}
```

当前用户：
```json
{
  "id": 5123461461,
  "avatar": "http://cdn.ifanr.cn/ifanr/default_avatar.png",
  "nickname": "riDGldYXLHouWIYx",
  "_username": "myusername",
  "_email": "myemail@somemail.com",
  "_email_verified": false,
  "_provider": {
    "alipay": {
      "avatar": "http://tfsimg.alipay.com/images/partner/T1uIxXXbpXXXXXXXX",
      "province": "安徽省",
      "city": "安庆",
      "nick_name": "支付宝小二",
      "is_student": true,
      "user_type": "company_account",
      "user_status": "authenticated",
      "verified": true,
      "gender": "female"
    }
  }  
}
```

## 筛选返回字段

select 使用方法可以参考[数据表 - 字段过滤](./schema/select-and-expand.md)小节

## 扩展字段 

expand 使用方法可以参考[数据表 - 字段扩展](./schema/select-and-expand.md)小节

## 查询，获取用户列表

用户查询与[数据表查询](./schema/query.md)方法一致

**请求示例**

```java
try {

  // 获取所有用户
  PagedList<User> all = Users.users(null);

  // 获取第一页的用户
  Query query = new Query();
  query.offset(10);
  query.limit(10);
  PagedList<User> pageTwo = Users.users(query);

  // 操作成功
} catch (Exception e) {
  Log.d(TAG, e.getMessage(), e);
  // 操作失败
}
```

## 排序

用户查询排序与[数据表排序](./schema/limit-and-order.md)方法一致，不包含在返回数据里的字段不支持排序，如 created_at。

**请求示例**

```java
Query query = new Query().orderBy("-nickname");
PagedList<User> all = Users.users(query);
```

## 分页

用户查询分页与[数据表分页](./schema/limit-and-order.md)方法一致。

**请求示例**

```java
Query query = new Query();
query.offset(10);
query.limit(5);
PagedList<User> pageTwo = Users.users(query);
```

## pointer 引用

创建一个 _userprofile 指定数据行的引用。主要配合 pointer 功能使用

```java
new Table(Const.TABLE_USER_PROFILE).fetchWithoutData("xxxxxxx")
```
具体使用方法请参考 [数据表-添加 pointer 类型数据](./schema/create-record.md) 小节