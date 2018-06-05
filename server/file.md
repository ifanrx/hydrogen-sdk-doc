# 文档

## 创建文档

**接口**

`POST <SHIMO_API>/files`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| name | String | N   | 文档名，默认`无标题` |
| type | String | N   | 文档类型，默认`document` |
| folder   | String | N   | 文档所在的目录 GUID |
| content   | String | N   | 文档内容 |

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files', {
  method: 'POST',
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
  "data": {
    "isDelete": 0,
    "isFolder": 0,
    "parentId": 0,
    "userId": 4069620,
    "updatedAt": "2018-05-29T09:40:01.000Z",
    "updatedBy": 4069620,
    "createdAt": "2018-05-29T09:06:25.000Z",
    "id": 32347865,
    "guid": "JyRX1679PL86rbTk",
    "name": "无标题",
    "type": "newdoc",
    "sortName": ["wu", "biao", "ti"]
  },
  "code": 0
}
```

## 获取文档

**接口**

`GET <SHIMO_API>/files/:guid`

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/JyRX1679PL86rbTk', {
  method: 'GET',
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
  "isDelete": 0,
  "isFolder": 0,
  "parentId": 0,
  "userId": 4069620,
  "updatedAt": "2018-05-29T09:40:01.000Z",
  "updatedBy": 4069620,
  "createdAt": "2018-05-29T09:06:25.000Z",
  "id": 32347865,
  "guid": "JyRX1679PL86rbTk",
  "name": "无标题",
  "type": "newdoc",
  "sortName": ["wu", "biao", "ti"]
}
```

## 删除文档

**接口**

`DELETE <SHIMO_API>/files/:guid`

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/JyRX1679PL86rbTk', {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer 716570ab11db4b349051e570ac2dff13'
  }
})
  .then(res => res.json())
  .then(body => console.log(body.data))
```

{% endtabs %}

**状态码说明**

`204` 删除成功

> **info**
> 带有内容的文档将会进入回收站，空内容的文档（夹）会彻底删除

## 修改文档信息

**接口**

`PATCH <SHIMO_API>/files/:guid`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| name | String | N   | 修改文档标题 |
| userId | Number | N   | 将文档转让给指定用户 |
| content   | String | N   | 新的文档内容 |

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/JyRX1679PL86rbTk', {
  method: 'PATCH',
  headers: {
    'Authorization': 'Bearer 716570ab11db4b349051e570ac2dff13'
  },
  body: JSON.stringify({
    name: '无标题2'
  })
})
  .then(res => res.json())
  .then(body => console.log(body.data))
```

{% endtabs %}

**返回示例**

```json
{
  "isDelete": 0,
  "isFolder": 0,
  "parentId": 0,
  "userId": 4069620,
  "updatedAt": "2018-05-29T09:40:01.000Z",
  "updatedBy": 4069620,
  "createdAt": "2018-05-29T09:06:25.000Z",
  "id": 32347865,
  "guid": "JyRX1679PL86rbTk",
  "name": "无标题2",
  "type": "newdoc",
  "sortName": ["wu", "biao", "ti", "2"]
}
```

## 撰写文档


**接口**

`POST <SHIMO_API>/files/:guid/compose`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| clientId | String | Y   | 当前客户端的唯一 ID |
| rev | String | Y   | 该次改动的版本号 |
| changeset | String | Y   | 对文档的改动 |
| apool   | String | N   | |
| uuid   | String | N   | 该次改动的唯一 ID，用于同步文档改动信息 |
| sync | String | N   | |
| resend   | String | N   | |

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/JyRX1679PL86rbTk', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer 716570ab11db4b349051e570ac2dff13'
  },
  body: JSON.stringify({
  "fileId": "JyRX1679PL86rbTk",
  "clientId": "03caa56f-c900-4e79-b80f-fd050d68be3e",
  "rev": 11,
  "changeset": "[[20,\"H\",\"26:\\\"10676\\\"\"]]",
  "uuid": "888e62a71284483db9c306ae8383b3aa"
  })
})
```

{% endtabs %}

**状态码说明**

`204` 操作成功

## 还原文档


**接口**

`POST <SHIMO_API>/files/:guid/revert`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| docHistoryId | Numbber | Y   |  |
| before | String | N   | 值为 `true` / `false` |
| sync | String | N   | |

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/JyRX1679PL86rbTk/revert', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer 716570ab11db4b349051e570ac2dff13'
  },
  body: JSON.stringify({
    "docHistoryId": 478035
  })
})
```

{% endtabs %}

**返回示例**

```json
{
  "data": null,
  "code": 0
}
```

## 获取文档历史

**接口**

`GET <SHIMO_API>/files/:guid/pull`

> **info**
> 该接口采用长轮询方式持续返回最新的文档历史

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| clientId | String | Y   | 当前客户端的唯一 ID |
| timeout | Numbber | N   | 请求中止的时间，单位为毫秒，默认是 12000 |
| rev | Number | N   | 该接口以此版本号为基础查询新的历史 |
| sync | String | N   | |

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/JyRX1679PL86rbTk/pull?clientId=03caa56f-c900-4e79-b80f-fd050d68be3e&rev=11', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer 716570ab11db4b349051e570ac2dff13'
  }
})
```

{% endtabs %}

**返回示例**

该接口返回的类型是 `text/event-stream`

```
event: changes
data: []

event: ping
data: "pong"
```

## 同步文档离线改动

**接口**

`POST <SHIMO_API>/files/:guid/sync`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| clientId | String | Y   | 当前客户端的唯一 ID |
| rev | Number | N   | 基础版本号 |
| committingCS | String | N   | 待同步的内容 |
| committingApool | String | N   | |
| uuid | String | N   | 该次改动的唯一 ID，用于同步文档改动信息 |
| userCS | String | N   | 用户的 changeset |

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/JyRX1679PL86rbTk/sync', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer 716570ab11db4b349051e570ac2dff13'
  },
  body: JSON.stringify({

  })
})
```

{% endtabs %}

**状态码说明**

`204` 操作成功
