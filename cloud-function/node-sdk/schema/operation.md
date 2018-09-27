# 数据导入导出操作

数据的导入、导出任务一旦成功建立，结果将以邮件的形式发送到创建任务的用户邮箱里。

通过 `数据表 ID` 或 `数据表名` 实例化一个 `TableObject` 对象，以下操作都是在该对象上进行操作：

`let MyTableObject = new BaaS.TableObject(param)`

**参数说明**

| 参数  | 类型   | 必填 | 说明 |
| :---- | :----- | :-- | :---|
| param | Number / String |  是 | 数据表 ID / 数据表名 |

## 数据导出

`MyTableObject.exportData(fileType, mode, start, end)`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :-----   | :-----  | :-- | :---|
| fileType | String  |  是 | 导出文件的格式，支持 csv、json 格式 |
| mode     | String  |  是  | 导出任务的模式|
| start    | Integer / Date / String |  否  | 导出部分数据的起始时间 |
| end      | Integer / Date / String |  否  | 导出部分数据的结束时间 |

导出任务支持两种模式：

|    值   |    说明      |
| :-----  | :---------  |
| all     |  导出全部数据 |
| part    |  导出部分数据 |

**示例代码**

```js

let MyTableObject = new BaaS.TableObject(tableID)
MyTableObject.exportData('json', 'all').then(res => {
  // success
}, err => {
  // err
})
```

**返回示例** (res.statusCode === 200)

res.data:
```js
{
  "status": "ok"
}
```


## 数据导入

`MyTableObject.importData({dataFileUrl, dataFilePath}, fileType)`

**参数说明**

| 参数         | 类型     | 必填 | 说明 |
| :-----      | :-----  | :-- | :---|
| dataFileUrl | String  |  否  | 准备导入的备份数据 url （dataFileUrl 与 dataFile 两者必须指定一个） |
| dataFile    | String / Buffer |  否  | 文件路径（目前仅支持沙箱环境的 tmp 目录） / 文件 Buffer |
| fileType    | String  |  是 | 导入文件的格式，支持 csv、json 格式 |

**示例代码**

```js
/* url */
let MyTableObject = new BaaS.TableObject(tableID)
MyTableObject.importData({dataFileUrl: dataUrl}, 'csv').then(res => {
  // success
}, err => {
  // err
})

/* 本地文件路径 */
const fs = require('fs')
const file = fs.createWriteStream('/tmp/data.csv')
BaaS.request.get(dataUrl).then(res => {
  file.write(res.data)
  file.end()
  let MyTable = new BaaS.TableObject(tableID)
  MyTable.importData({dataFile: '/tmp/data.csv'}, 'csv').then(res => {
    // success
  }, err => {
    // err
  })
})

/* Buffer */
BaaS.request.get(dataUrl).then(res => {
  let MyTable = new BaaS.TableObject(tableID)
  MyTable.importData({dataFile: Buffer.from(res.data)}, 'csv').then(res => {
    // success
  }, err => {
    // err
  })
})
```

**返回示例** (res.statusCode === 200)

res.data:
```js
{
  "status": "ok"
}
```

