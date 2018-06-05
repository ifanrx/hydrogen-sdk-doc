# 文档内容历史

> **info**
> 此历史包含的是对文档内容变更的历史。

## 获取历史列表

**接口**

`GET <SHIMO_API>/files/:guid/changes`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| from | Number | Y   | 从哪一个版本开始查找 |
| to | Number | N   | 到哪一个版本结束查找 |

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/JyRX1679PL86rbTk/changes', {
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
[{
  "baseRev": 0,
  "clientId": null,
  "fileGuid": "JyRX1679PL86rbTk",
  "fileId": 33339005,
  "userId": 4069620,
  "deletedAt": null,
  "updatedAt": "2018-06-04T07:57:01.000Z",
  "createdAt": "2018-06-04T07:57:01.000Z",
  "id": 1626314426,
  "delta": "[[10, \"\\n\", \"line:\\\"init\\\"\"]]"
}]
```

## 获取历史

**接口**

`GET <SHIMO_API>/files/:guid/changes/:id`

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/JyRX1679PL86rbTk/changes/1626314426', {
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
  "baseRev": 0,
  "clientId": null,
  "fileGuid": "JyRX1679PL86rbTk",
  "fileId": 33339005,
  "userId": 4069620,
  "deletedAt": null,
  "updatedAt": "2018-06-04T07:57:01.000Z",
  "createdAt": "2018-06-04T07:57:01.000Z",
  "id": 1626314426,
  "delta": "[[10, \"\\n\", \"line:\\\"init\\\"\"]]"
}
```

## 创建历史

**接口**

`POST <SHIMO_API>/files/:guid/changes`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| baseRev | Number | Y   | 基础版本号 |
| rev | Number | Y   | 待写入的版本号 |
| delta | String | Y   | 待写入的内容 |
| userId | Number | Y   | 用户 ID |
| clientId | String | N   | 发起请求的客户端 ID |

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/JyRX1679PL86rbTk/changes', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer 716570ab11db4b349051e570ac2dff13'
  },
  body: JSON.stringify({
    baseRev: 0,
    rev: 1,
    delta: '[[10, \"\\n\", \"line:\\\"init\\\"\"]]'
  })
})
  .then(res => res.json())
  .then(body => console.log(body.data))
```

{% endtabs %}

**返回示例**

```json
{
  "baseRev": 0,
  "rev": 1,
  "clientId": null,
  "fileGuid": "JyRX1679PL86rbTk",
  "fileId": 33339005,
  "userId": 4069620,
  "deletedAt": null,
  "updatedAt": "2018-06-04T07:57:01.000Z",
  "createdAt": "2018-06-04T07:57:01.000Z",
  "id": 1626314426,
  "delta": "[[10, \"\\n\", \"line:\\\"init\\\"\"]]"
}
```
