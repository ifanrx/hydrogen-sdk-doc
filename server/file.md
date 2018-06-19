# 文档

## 基本数据结构

| 字段名      | 类型   | 说明 |
| :------- | :----- | :-- |
| type   | String | 分为 document、sheet、slide 三种类型 |
| head   | Number | 文档的当前版本号，协同编辑场景下，此版本号会随着每次编辑递增 |
| content   | String | 文档的内容，格式为专用格式，若客户自行保管文档数据，请通过石墨提供的方式生成合法内容，直接修改可能会造成文档内容加载失败 |

## 创建文档

**接口**

`POST <SHIMO_API>/files`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| type | String | N   | 文档类型，默认`document` |
| content   | String | N   | 文档内容 |
| id   | Number | Y   | 文档 ID |
| copy   | Boolean | N   | 不为空时代表该文档是拷贝自其他文档 |

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files', {
  method: 'POST',
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
  "head": 1,
  "guid": "JyRX1679PL86rbTk",
  "type": "document",
  "content": "shimo content"
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
  "head": 1,
  "guid": "JyRX1679PL86rbTk",
  "type": "document",
  "content": "shimo content"
}
```

## 撰写文档

**接口**

`POST <SHIMO_API>/files/:guid/compose`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| clientId | String | Y   | 当前客户端的唯一 ID |
| rev | Number | Y   | 该次改动的版本号 |
| changeset | String | Y   | 对文档的改动 |
| apool   | String | N   | |
| uuid   | String | N   | 该次改动的唯一 ID，用于同步文档改动信息 |
| startTimestamp   | Number | N   | 该次改动发生的时间 |
| responseChannel   | String | N   | 该次改动发布的目标频道，如无必要请留空 |

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/JyRX1679PL86rbTk', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <Access Token>'
  },
  body: JSON.stringify({
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
| docHistoryId | Numbber | Y   | 待还原的历史 ID |
| before | String | N   | 值为 `true` / `false` |
| startTimestamp   | Number | N   | 该次改动发生的时间 |

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/JyRX1679PL86rbTk/revert', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <Access Token>'
  },
  body: JSON.stringify({
    "docHistoryId": 478035
  })
})
```

{% endtabs %}

**状态码说明**

`204` 操作成功

## 获取文档最新历史流

**接口**

`GET <SHIMO_API>/files/:guid/pull`

> **info**
> 该接口采用长轮询方式持续返回最新的文档历史

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| clientId | String | Y   | 当前客户端的唯一 ID |
| rev | Number | Y   | 该接口以此版本号为基础查询新的历史 |
| timeout | Numbber | N   | 请求中止的时间，单位为毫秒，默认是 12000 |

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/JyRX1679PL86rbTk/pull?clientId=03caa56f-c900-4e79-b80f-fd050d68be3e&rev=11', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <Access Token>'
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
| rev | Number | Y   | 基础版本号 |
| committingCS | String | N   | |
| committingApool | String | N   | |
| uuid | String | N   | 该次改动的唯一 ID，用于同步文档改动信息 |
| userCS | String | Y   | |
| userApool | String | N   | |
| startTimestamp   | Number | N   | 该次改动发生的时间 |

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/JyRX1679PL86rbTk/sync', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <Access Token>'
  },
  body: JSON.stringify({

  })
})
```

{% endtabs %}

**状态码说明**

`204` 操作成功
