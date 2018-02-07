# 文件操作

实例化一个 wx.BaaS.File 对象，以下操作都是在该对象上进行操作，如下进行实例化：

`let MyFile = new wx.BaaS.File()`

## 获取文件详情

`MyFile.get(fileID)`

**参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :-- -- | :-- | :-- |
| fileID | Number |  Y  | 文件 id |

**返回参数说明**

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
MyFile.get('5a2fe93308443e313a428c4f').then((res) => {
  // success
}, (err) => {
  // err
})
```

**返回示例**

res.data
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
MyFile.delete('5a2fe93308443e313a428c4f').then()

MyFile.delete(['5a2fe93308443e313a428c4c', '5a2fe93308443e313a428c4d']).then()
```

> **info**
> 删除单个文件，如果权限不足，会返回 401；删除多个文件，如果权限不足，则直接跳过该文件
