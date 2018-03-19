# 文件操作

实例化一个 `wx.BaaS.File` 对象，以下操作都是在该对象上进行操作，如下进行实例化：

`let MyFile = new wx.BaaS.File()`

## 获取文件详情

`MyFile.get(fileID)`

**参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :-- -- | :-- | :-- |
| fileID | Number | Y   | 文件 id |

**返回参数说明**

res.data:

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| category   | Object | 包含文件分类信息，详见以下 |
| cdn_path   | String | 文件在 cdn 上的路径 |
| created_at | String | 文件上传时间 |
| id         | Object | 文件 ID |
| mime_type  | String | 文件媒体类型 |
| name       | String | 文件名 |
| size       | Number | 以字节为单位 |

category 参数说明：

| 参数  | 类型   | 说明 |
| :--- | :----- | :-- |
| id   | Number | 分类 ID |
| name | String | 分类名 |

**示例代码**

```js
let MyFile = new wx.BaaS.File()
MyFile.get('5a2fe93308443e313a428c4f').then(res => {
  // success
}, err => {
  // err
})
```

**返回示例**

```js
{
  category: {
    id: '5a2fe91508443e3123dbe1cb',
    name: '科技'
  },
  cdn_path: "1e2fVFaWoaoAZPyr.svg",
  created_at: 1507822469,
  id: "5a2fe93308443e313a428c4f",
  mime_type: "text/plain; charset=utf-8",
  name: "tmp_262601706o6zAJs-pmaywKzqHIvzwU97rtiGIe4dd39171563993cf10b12bae2ac30ec.svg",
  size: 3879
}
```


## 删除文件

`MyFile.delete(fileID)`

**参数说明**

| 参数    | 类型                   | 必填 | 说明 |
| :----- | :--------------------- | :-- | :-- |
| fileID | Number or Number Array |  Y  | 文件 id (可为数组) |

**示例代码**

```js
let MyFile = new wx.BaaS.File()

MyFile.delete('5a2fe93308443e313a428c4f').then()

MyFile.delete(['5a2fe93308443e313a428c4c', '5a2fe93308443e313a428c4d']).then()
```

> **info**
> 删除单个文件，如果权限不足，会返回 401；删除多个文件，如果权限不足，则直接跳过该文件


## 上传文件

`MyFile.upload(uploadFile, fileMeta)`

**参数说明**

| 参数        | 类型                   | 必填 | 说明               | 默认值 |
| :--------- | :--------------------- | :--- | :---------------- | ---- |
| uploadFile | String or Buffer       |  Y   | 需要上传的文件      | 无 |
| fileMeta   | Object                 |  N   | 文件 meta 信息，如文件名，分类 ID 等 | `FileMeta对象` |

**FileMeta对象说明**

| 字段名       | 类型   | 必填 | 说明           | 默认值 |
| :---------- | :----- | :-- | :------------- | :---- |
| category_id | String |  N  | 文件分类 ID     | ''    |
| filename    | String |  N  | 文件名          | file.bin |
| filepath    | String |  N  | 文件路径        | /tmp/file.bin |
| contentType | String |  N  | 文件 MIME 类型  | application/octet-stream |

**示例代码**

```js
let MyFile = new wx.BaaS.File()

// 指定文件名上传
MyFile.upload('/var/log/test.log').then()

// 使用 Buffer 构建文件内容
MyFile.upload(Buffer.from('this is file content'), {filename: 'test.txt'}).then()

// 上传到指定目录
MyFile.upload('/var/log/test.log', {category_id: 1}).then()
```