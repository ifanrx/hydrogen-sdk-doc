# 内容操作

本文档介绍了内容的获取（包括内容表的自定义字段）和内容的创建、编辑和删除等操作

## 获取内容详情

**接口**

`GET https://cloud.minapp.com/userve/v1/content/:content_group_id/text/:text_id/`

其中 `content_group_id` 是内容库的 ID, `text_id` 是内容的 ID

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.get('https://cloud.minapp.com/userve/v1/content/1/text/1/').then(res => {
  console.log(res.data)
})
```

**返回示例**

```json
{
  "id": 1,
  "title": "Title",
  "content": "",
  "cover": null,
  "description": "",
  "group_id": 1,
  "categories": [
    {
      "id": 1,
      "name": "category",
      "parent": null
    }
  ],
  "created_at": 1516950540,
  "updated_at": 1517800400
}
```

**返回参数说明**

|      参数    |     类型     |   说明 |
| :---------- | :----------- | :---- |
| id          | Integer      |  内容 ID |
| title       | String       |  内容标题 |
| content     | String       |  详细容 |
| cover       | String       |  封面图 |
| description | String       |  内容摘要 |
| group_id    | Integer      |  内容库 ID |
| categories  | Object Array |  内容所属分类 |
| created_at  | Integer      |  内容创建时间 |
| updated_at  | Integer      |  内容更新时间 |


## 获取内容列表

**接口**

`GET https://cloud.minapp.com/userve/v2.2/content/:content_group_id/text/`

> **info**
> 该接口支持通过参数 return_total_count 指定是否返回查询对象总数，以协助不关心对象总数只关心查询结果列表的开发者提升接口响应速度。
同时，从 v2.2 版本开始该接口默认不返回查询对象总数，欲获取总数的开发者需要显式指定 return_total_count 参数。

**提交参数**

内容查询与[数据表接口](../data/record.md)查询保持一致

若开发者只需要获取对象总数，则可以通过设置 `limit=1` 以及 `return_total_count=1` 来达到该效果，total_count 可从返回的 meta 中获取

请求示例：

```
https://cloud.minapp.com/userve/v2.2/content/:content_group_id/text/?limit=1&return_total_count=1
```

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.get('https://cloud.minapp.com/userve/v1/content/2.2/text/').then(res => {
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
      "id": 1,
      "title": "Title",
      "content": "",
      "cover": null,
      "description": "",
      "group_id": 1,
      "categories": [
        {
          "id": 1,
          "name": "category",
          "parent": null
        }
      ],
      "created_at": 1516950540,
      "updated_at": 1517800400
    }
  ]
}
```

## 创建内容

**接口**

`POST https://cloud.minapp.com/userve/v1/content/:content_group_id/text/`

**参数说明**

Content-Type: `application/json`

内容表内置字段：

|      参数    |    类型       | 说明    |
| :---------- | :----------   | :----  |
| id          | Integer       | 内容 ID |
| title       | String        | 内容标题 |
| content     | String        | 详细容 |
| cover       | File          | 封面图 |
| description | String        | 内容摘要 |
| group_id    | Integer       | 内容库 ID |
| categories  | Integer Array | 内容所属分类 |
| created_at  | Integer       | 内容创建时间 |
| updated_at  | Integer       | 内容更新时间 |

内容接口参数格式将与[数据表接口](../data/record.md)保持一致

> **danger**
> 字段 group_id 将会被接口自动赋值，所以即使提交的数据中有 group_id 也将会被覆盖

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.post('https://cloud.minapp.com/userve/v1/content/1/text/', {"title": "Test Title"}).then(res => {
  console.log(res.data)
})
```

**返回示例**

```json
{
  "id": 2,
  "title": "Test Title",
  "group_id": 1,
  "categories": [],
  "created_at": 1519960085,
  "updated_at": 1519960085
}
```

> **info**
> 在发送创建内容的请求没有对一些内置字段如 content、description 或自定义字段赋值时，接口返回的字段将不会包含这些未被赋值的字段；若希望接口返回所有的字段，可以在创建内容的请求中携带所有的字段；
<br></br>
>接口会根据字段在数据表中定义的类型对提交的数据进行强类型的判断，提交的数据类型不合法，接口将会过滤掉这些字段，只存储合法的字段

**状态码说明**

`201`: 创建成功

`400`: 提交数据为空；提交的数据都不合法


## 编辑内容

**接口**

`PUT https://cloud.minapp.com/userve/v1/content/:content_group_id/text/:text_id/`


**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.put('https://cloud.minapp.com/userve/v1/content/1/text/2/', {"name": "Test name"}).then(res => {
  console.log(res.data)
})
```

**返回示例**

```json
{
  "id": 2,
  "title": "Test Title",
  "group_id": 1,
  "categories": [],
  "created_at": 1519960085,
  "updated_at": 1519960085
}
```

**状态码说明**

`200`: 修改成功

`400`: 提交数据为空；提交的数据都不合法


## 删除内容

**接口**

`DELETE https://cloud.minapp.com/userve/v1/content/:content_group_id/text/:text_id/`


**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.delete('https://cloud.minapp.com/userve/v1/content/1/text/1/').then(res => {
  console.log(res.data)
})
```

**状态码说明**

`204`: 删除成功
