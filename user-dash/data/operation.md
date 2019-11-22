# 数据导入导出操作

数据的导入、导出任务一旦成功建立，结果将以邮件的形式发送到创建任务的用户邮箱里。

## 数据导出

**接口**

`POST https://cloud.minapp.com/userve/v1.5/table/:table_id/export/`

其中 `table_id` 是数据表的 ID

**请求参数**

|       参数     |       类型    | 必填  | 说明 |
| :------------ | :-----------  | :--- | :--- |
| file_type     | String        |  是  | 导出文件的格式，支持 csv、json、xlsx 格式 |
| mode          | String        |  是  | 导出任务的模式 |
| where | Object | 否 | 构造与 [数据操作：查询数据](https://doc.minapp.com/user-dash/data/record.html#%E6%9F%A5%E8%AF%A2%E6%95%B0%E6%8D%AE) 中 where 查询方式相同，无需转换为字符串 |
| exclude_keys  | Array         |  否  | 导出数据时排除的字段列表 |
| include_keys  | Array         |  否  | 导出数据时包含的字段列表 |
| order_by      | Array         |  否  | 导出数据时需要进行排序的字段列表 |
| csv_customize_headers   | Array         |  否  | 导出数据为 CSV 时，可指定列名 |
| timestamp_convert_keys  | Array         |  否  | 导出数据时需要进行时间类型转换的字段列表 |

导出任务支持两种模式：

|    值   |    说明      |
| :-----  | :---------  |
| all     |  导出全部数据 |
| part    |  导出部分数据 |

order_by 排序支持指定正序或者倒序，在字段前面加 "-" 表示倒序，目前支持排序的字段类型有 5 种，分别是：

1. boolean
2. date
3. integer
4. number
5. string

**代码示例**

```
var axios = require('axios').create({
  withCredentials: true
})

axios.post('https://cloud.minapp.com/userve/v1.5/table/1/export/',
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
  "status": "ok",
  "job_id": "xxxxxxxxxxxxxxxxxxxx"
}
```

**状态码说明**

`201`: 导出任务创建成功

`400`: 1min 内多次创建任务；数据量超过 100W；数据格式错误

## 获取单个导出任务信息

**接口**

`GET https://cloud.minapp.com/userve/v1.5/table/:table_id/export/:job_id/`

其中 `:table_id` 需替换为数据表 ID，`:job_id` 需替换为建立导出任务时返回的 job_id。

**返回参数说明**

| 字段名称 | 类型 | 说明 |
| :-----  | :----- | :-- |
| job_id | String | 导出任务 ID |
| status | String | 任务状态，等待处理：pending、正在处理：ready、已完成：finish |
| operation | String | 操作类型，固定为：export | 
| file_name | String | 文件名 |
| file_type | String | 文件类型 | 
| download_url | String | 下载链接 |
| created_at | Integer | 任务创建时间戳 |
| updated_at | Integer | 最近一次任务更新时间戳 |

**代码示例**

```
var axios = require('axios').create({
  withCredentials: true
})

axios.get('https://cloud.minapp.com/userve/v1.5/table/1/export/RcnyXjPH8zLSsUYrIlPsG5qnBERYFrGF/').then(res => {
  console.log(res.data)
})
```

**返回示例**

```json
{
  "created_at": 1574405175,
  "download_url": null,
  "file_name": null,
  "file_type": "json",
  "job_id": "RcnyXjPH8zLSsUYrIlPsG5qnBERYFrGF",
  "operation": "export",
  "status": "pending",
  "updated_at": 1574405175
}
```

**状态码说明**

`200`: 成功

`404`: 找不到 job_id 对应的任务

## 批量获取导出任务信息

**接口**

`GET https://cloud.minapp.com/userve/v1.5/table/:table_id/export/`

其中 `:table_id` 需替换为你的数据表 ID。

**代码示例**

```
var axios = require('axios').create({
  withCredentials: true
})

axios.get('https://cloud.minapp.com/userve/v1.5/table/1/export/').then(res => {
  console.log(res.data)
})
```

**返回示例**

```json
{
  "meta": {
    "limit": 20,
    "next": null,
    "offset": 0,
    "previous": null,
    "total_count": 1
  },
  "objects": [
    {
      "created_at": 1574405175,
      "download_url": null,
      "file_name": null,
      "file_type": "json",
      "job_id": "RcnyXjPH8zLSsUYrIlPsG5qnBERYFrGF",
      "operation": "export",
      "status": "pending",
      "updated_at": 1574405175
    }
  ]
}
```

**状态码说明**

`200`: 成功

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
