# 数据导入导出操作

数据的导入、导出任务一旦成功建立，结果将以邮件的形式发送到创建任务的用户邮箱里。

## 数据导出

**接口**

`POST https://cloud.minapp.com/userve/v1/table/:table_id/export/`

其中 `table_id` 是数据表的 ID

**请求参数**

|       参数     |       类型    | 必填  | 说明 |
| :------------ | :-----------  | :--- | :--- |
| file_type     | String        |  是  | 导出文件的格式，支持 csv、json 格式 |
| mode          | String        |  是  | 导出任务的模式 |
| start         | Integer       |  否  | 导出部分数据的起始时间（时间戳） |
| end           | Integer       |  否  | 导出部分数据的结束时间（时间戳)  |

导出任务支持两种模式：

|    值   |    说明      |
| :-----  | :---------  |
| all     |  导出全部数据 |
| part    |  导出部分数据 |

> **info**
> 选择部分数据导出任务时，将会根据数据的创建时间进行筛选，即 created_at 在 **[start, end)** 的区间内

**代码示例**

```
var axios = require('axios').create({
  withCredentials: true
})

axios.post('https://cloud.minapp.com/userve/v1/table/:table_id/export/',
  {
    file_type: "csv",
    mode: "all"
  }).then(res => {
  console.log(res.data)
})
```

**返回示例**

```json
{
  "status": "ok"
}
```

**状态码说明**

`201`: 导出任务创建成功

`400`: 1min 内多次创建任务；数据量超过 100W；数据格式错误


## 数据导入

**接口**

`POST https://cloud.minapp.com/userve/v1/table/:table_id/import/`

**提交参数**

Content-Type: `multipart/form-data`

| 参数           | 类型   | 必填 | 说明 |
| :------------ | :----- | :-- | :-- |
| file          | String | Y   | 上传的文件流 |

>**info**
>支持 csv、json 文件导入，格式请于[帮助中心](http://support.minapp.com/hc/kb/article/1079263/?from=draft)查看

**代码示例**

```
var axios = require('axios').create({
  withCredentials: true
})

var fileInput = document.getElementById('fileInput')
var fd = new FormData()
fd.append('file', fileInput.files[0])

axios.post('https://cloud.minapp.com/userve/v1/table/:table_id/import/', fd).then(res => {
  console.log(res.data)
})
```

**返回示例**

```json
{
  "status": "ok"
}
```

**状态码说明**

`201`: 导入任务创建成功

`400`: 无效的文件
