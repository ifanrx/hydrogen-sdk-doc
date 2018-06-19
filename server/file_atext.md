# 文档 AText

## 获取 AText

**接口**

`GET <SHIMO_API>/files/:guid/atexts`

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/JyRX1679PL86rbTk/atexts', {
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
  "id": 1,
  "fileGuid": "JyRX1679PL86rbTk",
  "fileId": 33339005,
  "userId": 4069620,
  "updatedAt": "2018-06-04T07:57:01.000Z",
  "createdAt": "2018-06-04T07:57:01.000Z",
  "content": "{"text":"...","attribs":"..."}"
}
```

## 创建 AText

**接口**

`POST <SHIMO_API>/files/:guid/atexts`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| content | String | Y   | AText 内容 |

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/JyRX1679PL86rbTk/atexts', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <Access Token>'
  },
  body: JSON.stringify({
    content: '{"text":"...","attribs":"..."}'
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
  "fileGuid": "JyRX1679PL86rbTk",
  "fileId": 33339005,
  "userId": 4069620,
  "updatedAt": "2018-06-04T07:57:01.000Z",
  "createdAt": "2018-06-04T07:57:01.000Z",
  "content": "{"text":"...","attribs":"..."}"
}
```

## 更新 AText

**接口**

`PATCH <SHIMO_API>/files/:guid/atexts`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| content | String | Y   | AText 内容 |

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/JyRX1679PL86rbTk/atexts', {
  method: 'PATCH',
  headers: {
    'Authorization': 'Bearer <Access Token>'
  },
  body: JSON.stringify({
    content: '{"text":"...","attribs":"..."}'
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
  "fileGuid": "JyRX1679PL86rbTk",
  "fileId": 33339005,
  "userId": 4069620,
  "updatedAt": "2018-06-04T07:57:01.000Z",
  "createdAt": "2018-06-04T07:57:01.000Z",
  "content": "{"text":"...","attribs":"..."}"
}
```
