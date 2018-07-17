# 导入导出

> **info**
> 文档导入目前仅支持 docx 文件格式，导出仅支持 docx 和 pdf 文件格式
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
static async importFile ({ userId, type, file}) {
    const { data: { accessToken } } = await axios({
        url: `${config.shimo.url}/oauth2/token/`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
            clientId: config.shimo.clientId,
            clientSecret: config.shimo.clientSecret,
            clientUserId: userId,
            grantType: 'client_credentials',
            userId: userId,
            info: JSON.stringify({
                filePermissions: {
                    editable: true,
                    readonly: true,
                    writable: true
                }
            })
        }
    })

    const { data } = await axios({
        url: `${config.shimo.url}/files/import`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
            accessToken,
            type,
            fileBase64: fs.readFileSync(file.path).toString('base64'),
            name: file.name
        }
    })

    return data
}
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
| toType | String | Y  | 导出类型，文档可以为 `docx` 和 `pdf`，表格为 `xlsx` |

**鉴权信息**

`scope`: `read`。

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
static async exportFile (file, userId, toType) {
    // 获取 accessToken
    const accessToken = await this.getToken({
        user: { id: userId },
        fileGuid: file.guid,
        permission: { editable: true, readonly: true }
    })

    const { data } = await axios({
        url: `${config.shimo.url}/files/${file.guid}/export`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        params: {
            accessToken,
            name: file.title,
            toType
        }
    })

    return data
}
```

{% endtabs %}

**返回示例**

```json
{
  "downloadUrl": "file download url"
}
```
