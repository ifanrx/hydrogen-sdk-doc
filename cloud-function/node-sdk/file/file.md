# 文件操作

实例化一个 `BaaS.File` 对象，以下操作都是在该对象上进行操作，如下进行实例化：

`let MyFile = new BaaS.File()`

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
let MyFile = new BaaS.File()

// 指定文件名上传
MyFile.upload('/var/log/test.log').then()

// 使用 Buffer 构建文件内容
MyFile.upload(Buffer.from('this is file content'), {filename: 'test.txt'}).then()

// 上传到指定目录
MyFile.upload('/var/log/test.log', {category_id: 1}).then()
```


## 获取文件详情

`MyFile.get(fileID)`

**参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :-- -- | :-- | :-- |
| fileID | String | Y   | 文件 id |

**返回参数说明**

res.data:

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| category   | Object | 包含文件分类信息，详见以下 |
| created_at | String | 文件上传时间 |
| id         | Object | 文件 ID |
| mime_type  | String | 文件媒体类型 |
| name       | String | 文件名 |
| path       | String | 文件路径 |
| size       | Number | 以字节为单位 |

category 参数说明：

| 参数  | 类型   | 说明 |
| :--- | :----- | :-- |
| id   | String | 分类 ID |
| name | String | 分类名 |

**示例代码**

```js
let MyFile = new BaaS.File()
MyFile.get('5a2fe93308443e313a428c4f').then(res => {
  // success
}, err => {
  // err
})
```

**返回示例**

```json
{
  "category": {
    "id": "5a2fe91508443e3123dbe1cb",
    "name": "科技"
  },
  "created_at": 1507822469,
  "id": "5a2fe93308443e313a428c4f",
  "mime_type": "text/plain; charset=utf-8",
  "name": "tmp_262601706o6zAJs-pmaywKzqHIvzwU97rtiGIe4dd39171563993cf10b12bae2ac30ec.svg",
  "path": "https://baas-hello-world.cloud.ifanrusercontent.com/1fQTn8UCwQYlGFrv.txt",
  "size": 3879
}
```


## 删除文件

`MyFile.delete(fileID)`

**参数说明**

| 参数    | 类型                   | 必填 | 说明 |
| :----- | :--------------------- | :-- | :-- |
| fileID | String or String Array |  Y  | 文件 id (可为数组) |

**示例代码**

```js
let MyFile = new BaaS.File()

MyFile.delete('5a2fe93308443e313a428c4f').then()

MyFile.delete(['5a2fe93308443e313a428c4c', '5a2fe93308443e313a428c4d']).then()
```

> **info**
> 删除单个文件，如果权限不足，会返回 401；删除多个文件，如果权限不足，则直接跳过该文件


## 查询，获取文件列表

文件查询与[数据表查询](../schema/query.md)方法一致，但只支持以下指定字段的筛选

| 支持字段       |  类型  | 说明 |
| :------------ | :----- | :--- |
| id            | String | 文件 id |
| name          | String | 文件名 |
| size          | Number | 文件大小，以字节为单位 |
| category_id   | String | 文件分类 id |
| category_name | String | 文件分类名 |
| created_at    | Integer| 创建时间 （格式为 unix 时间戳） |

**示例代码**

```js
let MyFile = new BaaS.File()

// 查找所有文件
MyFile.find()

let query = new BaaS.Query()
// 查询某一文件分类下的所有文件
query.compare('category_name', '=', categoryName)
// 查询文件名包含指定字符串的文件
query.contains('name', substr)
MyFile.setQuery(query).find()
```

```js
let MyFile = new BaaS.File()

// 查找所有文件
MyFile.find()

// 按创建时间范围查询: 2018年10月24日17时10分57秒 至今上传的文件
let query = BaaS.Query.and(new BaaS.Query().compare('created_at', '<=', Math.ceil(Date.now() / 1000)), new BaaS.Query().compare('created_at', '>=', 1540372257)),

MyFile.setQuery(query).find()
```

## 排序
文件查询排序与[数据表排序](../schema/limit-and-order.md)方法一致，但只支持对以下指定字段进行排序

| 支持字段       |  类型   | 说明 |
| :-----------  | :----- | :--- |
| name          | String | 文件名 |
| size          | Number | 文件大小，以字节为单位 |
| created_at    | Number | 文件上传时间 |

**示例代码**

```js
let MyFile = new BaaS.File()
MyFile.orderBy('-created_at').find().then()
```

## 分页
文件查询排序与[数据表分页](../schema/limit-and-order.md)方法一致
