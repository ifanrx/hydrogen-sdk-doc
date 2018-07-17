# 导入导出

> **info**
> 文档导入导出目前仅支持 docx 文件格式
> 表格导入导出目前仅支持 xlsx 文件格式

## 导入

**接口**

`POST <SHIMO_API>/files/import`

**鉴权信息**

`scope`: `write`。

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| name | String | N   | 文档标题，默认`无标题` |
| type | String | Y   | 导入文件类型，文档为 `document/richdoc` 表格为 `sheet/modoc` |
| fileBase64 | String | Y   | 文件 base64 字符串 |

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/import', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <Access Token>'
  },
  body: {
    type,
    fileBase64: fs.readFileSync(file.path).toString('base64'),
    name: file.name
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

## 导出

**接口**

`GET <SHIMO_API>/files/:guid/export`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| name | String | N   | 导出的文件名，默认`无标题` |
| toType | String | Y  | 导出类型，文档为 `docx`，表格为 `xlsx` |

**鉴权信息**

`scope`: `read`。

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/:guid/export?toType=docx', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer <Access Token>'
  },
  body: {
    type,
    fileBase64: fs.readFileSync(file.path).toString('base64'),
    name: file.name
  }
})
  .then(res => res.json())
  .then(body => console.log(body.data))
```

{% endtabs %}

**返回示例**

```json
{
  "downloadUrl": "file download url"
}
```
