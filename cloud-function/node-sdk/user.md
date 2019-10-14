# 获取用户信息

`let MyUser = new BaaS.User()`

## 获取指定用户信息

`MyUser.get(userID)`

**参数说明**

| 参数    | 类型   | 必填 | 说明 |
| :----- | :----- | :-- | :---- |
| userID | Number | 是  | 用户 ID (对应 _userprofile 表中的 id 字段) |

**返回字段说明**

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
| _provider.alipay |Object |  支付宝平台的用户信息，见下方说明  |

**支付宝平台的用户信息对象说明**

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
> 如果有自定义字段，则一并返回

**请求示例**

```js
let MyUser = new BaaS.User()
let userID = 36395395
MyUser.get(userID).then(res => {
  // success
}, err => {
  // err
})
```

**返回示例**

```json
{
  "status": 200,
  "data": {
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
}
```

### 筛选返回字段

select 使用方法可以参考[数据表 - 字段过滤](./schema/select-and-expand.md)小节

### 扩展字段

expand 使用方法可以参考[数据表 - 字段扩展](./schema/select-and-expand.md)小节

**请求示例**

假设 _userprofile 表中有一个类型为 pointer 的字段，名称为 `pointer_test_oder`, 指向了 test_order 表

```javascript
let MyUser = new BaaS.User()
MyUser.expand(['pointer_test_oder']).select(['nickname', 'pointer_test_order']).get(123456).then((res) => {
// success
}, (err) => {
// err
})
```

**请求结果**
```json
{
  "status": 200,
  "data": {
    "pointer_test_order": {
      "created_at": 1538966895,
      "_table": "test_order",
      "id": "5bbac56fbd66033df7fd0aa2",
      "created_by": 61736923,
      "updated_at": 1538966895
    },
    "nickname": "ifanrx"
  }
}
```

```javascript
let MyUser = new wx.BaaS.User()
MyUser.expand(['pointer_test_oder']).select(['nickname', 'pointer_test_order']).find().then((res) => {
// success
}, (err) => {
// err
})

```

**请求结果**

```json
{
  "status": 200,
  "data": {
    "meta": {
      "next": null,
      "offset": 0,
      "total_count": 1,
      "limit": 20,
      "previous": null
    },
    "objects": [
      {
        "pointer_test_order": {
          "id": "5bbac56fbd66033df7fd0aa2",
          "_table": "test_order",
          "created_by": 61736923,
          "updated_at": 1538966895
        },
        "nickname": "ifanrx"
      }
    ]
  }
}
```

微信目前对小程序获取用户信息有两个小时的缓存设定，因此，如果一个用户修改了个人信息如头像、昵称等，需两个小时才能重新授权拿到最新的信息。


### 更新用户信息

更新用户信息与[数据表更新数据项](./schema/update-record.md)方法基本一致。这里只支持对 _userprofile 表中自定义的字段进行更新。

**请求示例**

```js
let MyUser = new BaaS.User()
let userID = 36395395
let user = MyUser.getWithoutData(userID)

// age 为自定义字段
user.set('age', 30).update().then(res => {
  // success
}, err => {
  // err
})
```

### 设置账号信息

`UserRecord.setAccount({username, email, password})`

通过微信、支付宝授权登录用户，可以设置用户名、邮箱、密码，以便下次通过用户名或邮箱登录。

**参数说明**

| 名称      | 类型    |  必填   | 说明 |
| :-------- | :-------|-----  | :------ |
| username  | String  | N | 用户名      |
| email     | String  | N | 邮箱        |
| password  | String  | N | 密码    |

**示例代码**

```javascript
const MyUser = new BaaS.User()
const userRecord = MyUser.getWithoutData(userID)
userRecord.setAccount({
  email: 'foo@gmail.com',
  username: 'bar',
  password: 'baz',
}).then(res => {
  // success
}).catch(err => {
  // err
})
```

**返回示例**

```json
{
  "status": 200,
  "data": {
    "email": "foo@gmail.com",
    "email_verified": false,
    "username": "bar"
  }
}
```

## 批量修改用户自定义字段

通过设置自定义查询条件 Query，将符合条件的用户自定义字段进行批量更新操作

> 注意：由于条件查询可能命中非常多的数据，默认情况下，限制为最多更新前 1000 条数据。
> 如需要一次性更新更多数据，请通过维护分页来进行。

其中：
 - `Query` 对象的使用请查看 [查询数据项](./query.md) 章节

 - `limit` 和 `offset` 的使用请查看 [分页和排序](./limit-and-order.md) 章节

**请求示例**

{% tabs batchUpdateAsync="async/await", batchUpdatePromise="promise" %}
{% content "batchUpdateAsync" %}
```js
async function batchUpdate() {
  try {
    let User = new BaaS.User()
    let query = new BaaS.Query()

    // 设置查询条件（比较、字符串包含、组合等）
    ...

    // limit、offset 可以指定按条件查询命中的数据分页
    let userRecords = User.limit(10).offset(0).getWithoutData(query)

    // 与更新特定记录一致
    userRecords.set(key1, value1)
    userRecords.incrementBy(key2, value2)
    userRecords.append(key3, value3)

    let res = await userRecords.update().then(res => {}, err => {})

    console.log(res)
    // success
    return res
  } catch(err) {
    //err 为 HError 对象
    throw err
  }
}
```

{% content "batchUpdatePromise" %}
```js
// 知晓云后台设置的触发器将不会被触发
function batchUpdate() {
  let User = new BaaS.User()
  let query = new BaaS.Query()

  // 设置查询条件（比较、字符串包含、组合等）
  ...

  // limit、offset 可以指定按条件查询命中的数据分页
  let userRecords = User.limit(10).offset(0).getWithoutData(query)

  // 与更新特定记录一致
  userRecords.set(key1, value1)
  userRecords.incrementBy(key2, value2)
  userRecords.append(key3, value3)

  userRecords.update().then(res => {
    console.log(res)
    callback(null, res)
  }, err => {
    //err 为 HError 对象
    callback(err)
  })
}
```
{% endtabs %}


### 批量修改用户自定义字段不触发触发器

> **info**
> 不触发触发器，limit <= 1000 时，操作记录为同步执行。超过则会转为异步执行并移除限制，变成操作全部

{% tabs batchUpdateWithoutTriggerAsync="async/await", batchUpdateWithoutTriggerPromise="promise" %}
{% content "batchUpdateWithoutTriggerAsync" %}
```js
async function batchUpdate() {
  try {
    let User = new BaaS.User()
    let query = new BaaS.Query()

    // 设置查询条件（比较、字符串包含、组合等）
    ...

    // limit、offset 可以指定按条件查询命中的数据分页
    let userRecords = User.limit(10).offset(0).getWithoutData(query)

    // 与更新特定记录一致
    userRecords.set(key1, value1)
    userRecords.incrementBy(key2, value2)
    userRecords.append(key3, value3)

    let res = await userRecords.update({enableTrigger: false}).then(res => {}, err => {})

    console.log(res)
    // success
    return res
  } catch(err) {
    //err 为 HError 对象
    throw err
  }
}
```

{% content "batchUpdateWithoutTriggerPromise" %}
```js
// 知晓云后台设置的触发器将不会被触发
function batchUpdate() {
  let User = new BaaS.User()
  let query = new BaaS.Query()

  // 设置查询条件（比较、字符串包含、组合等）
  ...

  // limit、offset 可以指定按条件查询命中的数据分页
  let userRecords = User.limit(10).offset(0).getWithoutData(query)

  // 与更新特定记录一致
  userRecords.set(key1, value1)
  userRecords.incrementBy(key2, value2)
  userRecords.append(key3, value3)

  userRecords.update({enableTrigger: false}).then(res => {
    console.log(res)
    callback(null, res)
  }, err => {
    //err 为 HError 对象
    callback(err)
  })
}
```
{% endtabs %}

## 删除用户

`MyUser.delete(userID)`

**参数说明**

| 名称      | 类型    | 必填    | 说明    |
| :-------- | :------ | :------ | :------ |
| userID    | Number  | Y       | 用户 ID |

**示例代码**

```javascript
const MyUser = new BaaS.User()
User.delete(userID).then(res => {
  // success
}).catch(err => {
  // err
})
```

**返回示例**

```json
{
  "status": 204,
  "data": ""
}
```

## 查询，获取用户列表

用户查询与[数据表查询](./schema/query.md)方法一致

**请求示例**

```js
let MyUser = new BaaS.User()

// 查找所有用户
MyUser.find()

// 查询 nickname 中包含 like 的用户
let query = new BaaS.Query()
query.contains('nickname', 'like')
MyUser.setQuery(query).find().then(res => {
  // success
}, err => {
  // err
})
```

### 查询用户组下的用户

> **info**
> _group 是一个系统定义的特殊字段，可以通过 _group 来查询指定用户组下的用户，目前只支持 in 查询。
> 该字段仅支持查询，不支持删除和修改。

```js
let MyUser = new BaaS.User()
let query = new BaaS.Query()

// 查询用户组 [123, 456, 789] 下的用户
query.in('_group', [123, 456, 789])

MyUser.setQuery(query).find().then(res => {
  // success
}, err => {
  // err
})
```

**返回示例**

成功时 res 结构如下

```json
{
  "status": 200,
  "data": {
    "meta": {
      "limit": 20,
      "next": null,
      "offset": 0,
      "previous": null,
      "total_count": 3
    },
    "objects": [
      {
        "age": 40,
        "avatar": "https://media.ifanrusercontent.com/tavatar/f1/e8/f1e8da860635ec7386102a4a9bb5e45857c9369e.jpg",
        "city": "Guangzhou",
        "country": "China",
        "created_at": 1513326300,
        "created_by": 36476036,
        "gender": 1,
        "id": 36476036,
        "is_authorized": true,
        "language": "zh_CN",
        "nickname": "yuky123123",
        "openid": "xxxxxxx",
        "province": "Guangdong",
        "unionid": null,
        "updated_at": 1524146181,
        "_group": [123],
        "user_id": 36476036
      }
    ]
  }
}
```

## 排序

用户查询排序与[数据表排序](./schema/limit-and-order.md)方法一致，不包含在返回数据里的字段不支持排序，如 created_at。

**请求示例**

```js
let MyUser = new BaaS.User()

MyUser.orderBy('-nickname').find().then()
```

## 分页

用户查询分页与[数据表分页](./schema/limit-and-order.md)方法一致。

**请求示例**

```js
let MyUser = new BaaS.User()

MyUser.limit(5).offset(10).find().then()
```
## pointer 引用

使用 `wx.BaaS.User().getWithoutData` 可以创建一个 _userprofile 指定数据行的引用。主要配合 pointer 功能使用

```js
let user = new BaaS.User().getWithoutData(123456)
```
具体使用方法请参考 [数据表-添加 pointer 类型数据](./schema/create-record.md) 小节
