# 讨论

> **info**
> 讨论是依附于文档的评论，和文档内的内容无关。

## 获取讨论列表

**接口**

`GET <SHIMO_API>/files/:guid/discussions`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| before | String | N   | 获取讨论所在的位置  |
| middle | String | N   | 获取讨论所在的位置  |
| after | String | N   | 获取讨论所在的位置 |
| limit | Number | N   | 每次获取的数量，默认是 20 |
**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/R308EbDjDwwqJ3Q1/discussions', {
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
  "data": {
    "total": 1,
    "viewed_unixus": 1527655391029270,
    "unviewed_count": 0,
    "list": [{
      "id": "5b0e2bdf2576c700016625a2",
      "unixus": 1527655391029270,
      "data": {
        "user": {
          "avatar": "https://assets-cdn.shimo.im/static/unmd5/default-avatar-moke.png",
          "isVerified": false,
          "teamId": null,
          "teamRole": null,
          "id": 10676,
          "name": "墨客",
          "email": "example@shimo.im",
          "team_role": null,
          "team_id": null,
          "isOutsider": null
        },
        "content": "Yay",
        "file": {
          "id": 66371,
          "guid": "R308EbDjDwwqJ3Q1"
        }
      }
    }]
  },
  "code": 0
}
```

## 创建讨论

**接口**

`POST <SHIMO_API>/files/:guid/discussions`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| content | String | Y   | 内容 |
| sheetId | String | N   | 表格工作表 GUID |

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/R308EbDjDwwqJ3Q1/discussions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer 716570ab11db4b349051e570ac2dff13'
  },
  body: JSON.stringify({ content: 'Yay' })
})
  .then(res => res.json())
  .then(body => console.log(body.data))
```

{% endtabs %}

**返回示例**

```json
{
  "data": {
    "id": "5b0e2c752576c700016625a3",
    "unixus": 1527655541278988
  },
  "code": 0
}
```

## 删除讨论

**接口**

`DELETE <SHIMO_API>/files/:guid/discussions/:discussion`

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/R308EbDjDwwqJ3Q1/discussions/5b0e2bdf2576c700016625a2', {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer 716570ab11db4b349051e570ac2dff13'
  }
})
```

{% endtabs %}

**状态码说明**

`204` 操作成功

## 标记讨论已读

**接口**

`POST <SHIMO_API>/files/:guid/discussions/viewed`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| viewedUnixus | Number | Y   | 时间戳，精确到微秒 |

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/R308EbDjDwwqJ3Q1/discussions/viewed', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer 716570ab11db4b349051e570ac2dff13'
  },
  body: JSON.stringify({ viewedUnixus: 1527655809434296 })
})
  .then(res => res.json())
  .then(body => console.log(body.data))
```

{% endtabs %}

**返回示例**

```json
{
  "data": {
    "data":"success"
  },
  "code": 0
}
```
