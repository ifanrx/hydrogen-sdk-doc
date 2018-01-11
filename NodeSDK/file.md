# 文件操作

`let MyFile = new BaaS.File()`

### 获取文件详情

`MyFile.get(fileID)`

##### 参数说明

| 参数名  | 类型    | 是否必填 | 参数描述   |
| :----- | :----- | :-----: | :------- |
| fileID | Number |    Y    |  文件 id  |

##### 示例代码

```
let MyFile = new BaaS.File()
MyFile.get('5a2fe93308443e313a428c4f').then((res) => {
  // success
}, (err) => {
  // err
})
```

##### 返回示例

res.data
```
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


### 删除文件

`MyFile.delete(fileID)`

##### 参数说明

| 参数名    | 类型                    | 是否必填 | 参数描述           |
| :------- | :--------------------  | :-----: | :----------------|
| fileID   | Number or Number Array |    Y    | 文件 id (可为数组) |

##### 示例代码

```
let MyFile = new BaaS.File()

MyFile.delete('5a2fe93308443e313a428c4f').then()

MyFile.delete(['5a2fe93308443e313a428c4c', '5a2fe93308443e313a428c4d']).then()
```

注：删除单个文件，如果权限不足，会返回 401；删除多个文件，如果权限不足，则直接跳过该文件