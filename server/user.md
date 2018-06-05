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
    'Authorization': 'Bearer 716570ab11db4b349051e570ac2dff13'
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

## 获取用户

**接口**

`GET <SHIMO_API>/users/:id`

`GET <SHIMO_API>/users/email/:email`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| email | String | Y   | 用户邮箱 |

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/users/email?example@shimo.im', {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer 716570ab11db4b349051e570ac2dff13'
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

`PATCH <SHIMO_API>/users/:id`

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

fetch('<SHIMO_API>/users/1', {
  method: 'PATCH',
  headers: {
    'Authorization': 'Bearer 716570ab11db4b349051e570ac2dff13'
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
