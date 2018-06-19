# 评论

> **info**
> 评论是依附于文档内具体的内容的评论，当内容被删除时，评论也会被删除。

## 获取评论列表

**接口**

`GET <SHIMO_API>/files/:guid/comments`

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/JyRX1679PL86rbTk/comments', {
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
  "data": [{
    "commentGuid": "43apeltp1CATJF6f",
    "isDelete": 0,
    "selectionGuid": "comment-a2aCRQBPheIVIHhe",
    "selectionTitle": "",
    "targetGuid": "JyRX1679PL86rbTk",
    "targetId": 32347865,
    "targetType": 1,
    "userId": 4069620,
    "updatedAt": "2018-05-29T09:07:51.000Z",
    "createdAt": "2018-05-29T09:07:51.000Z",
    "id": 17683794,
    "content": "hello world",
    "hasRead": true
  }],
  "code": 0
}
```

## 获取划词评论的评论列表

**接口**

`GET <SHIMO_API>/files/:guid/comments/:selectionGuid`

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/JyRX1679PL86rbTk/comments/comment-a2aCRQBPheIVIHhe', {
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
  "data": [{
    "commentGuid": "43apeltp1CATJF6f",
    "isDelete": 0,
    "selectionGuid": "comment-a2aCRQBPheIVIHhe",
    "selectionTitle": "",
    "targetGuid": "JyRX1679PL86rbTk",
    "targetId": 32347865,
    "targetType": 1,
    "userId": 4069620,
    "updatedAt": "2018-05-29T09:07:51.000Z",
    "createdAt": "2018-05-29T09:07:51.000Z",
    "id": 17683794,
    "content": "hello world",
    "hasRead": true
  }],
  "code": 0
}
```

## 创建评论

**接口**

`POST <SHIMO_API>/files/:guid/comments`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| commentGuid | String | Y   | 该条评论的唯一 ID |
| selectionGuid | String | Y   | 评论指向的所选内容的唯一 ID，格式为 `comment-GUID` |
| selectionTitle   | String | Y   | 所选内容的标识 |
| content   | String | Y   | 评论内容 |

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/JyRX1679PL86rbTk/comments', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <Access Token>'
  },
  body: JSON.stringify({
    commentGuid: '3YqYN0QJFFRTss3J',
    content: 'Yay',
    selectionGuid: 'comment-a2aCRQBPheIVIHhe',
    selectionTitle: ''
  })
})
  .then(res => res.json())
  .then(body => console.log(body.data))
```

{% endtabs %}

**返回示例**

```json
{
  "data": {
    "commentGuid": "3YqYN0QJFFRTss3J",
    "isDelete": 0,
    "selectionGuid": "comment-a2aCRQBPheIVIHhe",
    "selectionTitle": "",
    "targetGuid": "JyRX1679PL86rbTk",
    "targetId": 32347865,
    "targetType": 1,
    "userId": 4069620,
    "updatedAt": "2018-05-29T09:40:01.000Z",
    "createdAt": "2018-05-29T09:40:01.000Z",
    "id": 17684337,
    "content": "Yay",
  },
  "code": 0
}
```

## 删除评论

**接口**

`DELETE <SHIMO_API>/files/:guid/comments/:commentGuid`

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/JyRX1679PL86rbTk/comments/3YqYN0QJFFRTss3J', {
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
  "data": {
    "commentGuid": "3YqYN0QJFFRTss3J",
    "isDelete": 0,
    "selectionGuid": "comment-a2aCRQBPheIVIHhe",
    "selectionTitle": "",
    "targetGuid": "JyRX1679PL86rbTk",
    "targetId": 32347865,
    "targetType": 1,
    "userId": 4069620,
    "updatedAt": "2018-05-29T09:40:01.000Z",
    "createdAt": "2018-05-29T09:40:01.000Z",
    "id": 17684337,
    "content": "Yay"
  },
  "code": 0
}
```

## 关闭评论

**接口**

`DELETE <SHIMO_API>/files/:guid/comments/close/:selectionGuid`

> **info**
> 该接口会批量删除该划词评论中所有评论

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/JyRX1679PL86rbTk/comments/close/comment-a2aCRQBPheIVIHhe', {
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
  "data": [1],
  "code": 0
}
```
