# 用户

## 创建用户

**接口**

`POST <SHIMO_API>/users`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| name | String | Y   | 用户名 |
| email | String | Y   | 用户邮箱 |
| password   | String | N   | 用户密码 |
| avatar   | String | N   | 用户头像 |
| gender   | Number | N   | 用户性别 |

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/users', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <Access Token>'
  },
  body: JSON.stringify({
    name: '墨客',
    email: 'example@shimo.im'
  })
})
  .then(res => res.json())
  .then(body => console.log(body.data))
```

{% endtabs %}

**返回示例**

```json
{
  "id": 1,
  "name": "墨客",
  "namePinyin": null,
  "email": "shimo@shimo.im",
  "avatar": null,
  "status": 0,
  "gender": 1,
  "teamTime": null,
  "teamRole": null,
  "isSeat": 0,
  "mergedInto": null,
  "createdAt": "2018-06-01T07:45:15.000Z",
  "updatedAt": "2018-06-01T08:33:59.000Z",
  "deletedAt": null,
  "registerTime": null,
  "activateTime": null,
  "lastVisit": null,
  "lastNotificationId": null
}
```

## 获取用户列表

**接口**

`GET <SHIMO_API>/users`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| ids | Number[] | Y   | 用户 ID 数组 |
| size | Number | N   | 单次获取的数量 |
| page | Number | N | 从第几页 |

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/users', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer <Access Token>'
  }
})
  .then(res => res.json())
  .then(body => console.log(body.data))
```

{% endtabs %}

**返回示例**

```json
[{
  "id": 1,
  "name": "墨客",
  "namePinyin": null,
  "email": "shimo@shimo.im",
  "avatar": null,
  "status": 0,
  "gender": 1,
  "teamTime": null,
  "teamRole": null,
  "isSeat": 0,
  "mergedInto": null,
  "createdAt": "2018-06-01T07:45:15.000Z",
  "updatedAt": "2018-06-01T08:33:59.000Z",
  "deletedAt": null,
  "registerTime": null,
  "activateTime": null,
  "lastVisit": null,
  "lastNotificationId": null
}]
```

## 获取用户

**接口**

`GET <SHIMO_API>/users/:id`

`GET <SHIMO_API>/users/email?email=`

`GET <SHIMO_API>/users/client_user_id?client_user_id=`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| email | String | Y   | 用户邮箱 |
| client_user_id | String | Y   | 客户系统的用户标识 |

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/users/email?email=example@shimo.im', {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer <Access Token>'
  }
})
  .then(res => res.json())
  .then(body => console.log(body.data))
```

{% endtabs %}

**返回示例**

```json
{
  "id": 1,
  "name": "墨客",
  "namePinyin": null,
  "email": "shimo@shimo.im",
  "avatar": null,
  "status": 0,
  "gender": 1,
  "teamTime": null,
  "teamRole": null,
  "isSeat": 0,
  "mergedInto": null,
  "createdAt": "2018-06-01T07:45:15.000Z",
  "updatedAt": "2018-06-01T08:33:59.000Z",
  "deletedAt": null,
  "registerTime": null,
  "activateTime": null,
  "lastVisit": null,
  "lastNotificationId": null
}
```

## 修改用户信息

**接口**

`PATCH <SHIMO_API>/users/me`

`PATCH <SHIMO_API>/users/client_user_id?clientUserId=`

`PATCH <SHIMO_API>/users/:id`

使用 `me` 时等同于当前登录用户的 `id`。

使用 `client_user_id` 则以 `clientUserId` 查找登录用户，用于第三方集成时使用。

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| name | String | N   | 用户名 |
| email | String | N   | 用户邮箱 |
| avatar   | String | N   | 用户头像 |
| gender   | Number | N   | 用户性别 |

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/users/me', {
  method: 'PATCH',
  headers: {
    'Authorization': 'Bearer <Access Token>'
  },
  body: JSON.stringify({
    name: '石墨文档'
  })
})
  .then(res => res.json())
  .then(body => console.log(body.data))
```

{% endtabs %}

**返回示例**

```json
{
  "id": 1,
  "name": "石墨文档",
  "namePinyin": null,
  "email": "shimo@shimo.im",
  "avatar": null,
  "status": 0,
  "gender": 1,
  "teamTime": null,
  "teamRole": null,
  "isSeat": 0,
  "mergedInto": null,
  "createdAt": "2018-06-01T07:45:15.000Z",
  "updatedAt": "2018-06-01T08:33:59.000Z",
  "deletedAt": null,
  "registerTime": null,
  "activateTime": null,
  "lastVisit": null,
  "lastNotificationId": null
}
```
