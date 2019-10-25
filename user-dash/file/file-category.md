# 文件分类操作

## 创建文件分类

**接口**

`POST https://cloud.minapp.com/userve/v1/file-category/`

**参数说明**

Content-Type: `application/json`

| 参数  | 类型   | 必填 | 说明 |
| :--- | :----- | :-- | :-- |
| name | String | Y   | 文件分类的名称 |

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.post('https://cloud.minapp.com/userve/v1/file-category/', {name: 'Category'}).then(res => {
  console.log(res.data)
})
```

**状态码说明**

`201` 写入成功


## 获取分类详情

**接口**

`GET https://cloud.minapp.com/userve/v1/file-category/:category_id/`

其中 `:category_id` 需替换为你的文件分类 ID

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.get('https://cloud.minapp.com/userve/v1/file-category/5a1bb2ed7026d950ca7d2a78/').then(res => {
  console.log(res.data)
})
```

**返回示例**

```json
{
  "files": 0,
  "id": "5a1bb2ed7026d950ca7d2a78",
  "name": "Category 1",
  "created_at": 1511761847,
  "parent": null,
  "subcategories": []
}
```


## 获取文件分类列表

**接口**

`GET https://cloud.minapp.com/userve/v2.2/file-category/`

**参数说明**

Content-Type: `application/json`

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| order_by | String | N   | 排序（支持 `created_at` 进行排序）|
| limit    | Number | N   | 限制返回资源的个数，默认为 20 条，最大可设置为 1000 |
| offset   | Number | N   | 设置返回资源的起始偏移值，默认为 0 |
| return_total_count   | Number | N   | 返回结果 meta 中是否返回 total_count，1 为返回，0 为不返回，默认不返回 |

若开发者只需要获取对象总数，则可以通过设置 `limit=1` 以及 `return_total_count=1` 来达到该效果，total_count 可从返回的 meta 中获取

请求示例：

```
https://cloud.minapp.com/userve/v2.2/file-category/?limit=1&return_total_count=1
```

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.get('https://cloud.minapp.com/userve/v2.2/file-category/').then(res => {
  console.log(res.data)
})
```

**返回示例**

```json
{
  "meta": {
    "files": 7,
    "limit": 20,
    "next": null,
    "offset": 0,
    "previous": null,
    "total_count": 1
  },
  "objects": [
    {
      "files": 0,
      "id": "5a1bb2ed7026d950ca7d2a78",
      "name": "Category 1",
      "created_at": 1511761847
    }
  ]
}
```

字段 `files` 在返回中有两个地方出现；在 `meta` 中表示应用上传文件的数量总和；在 `objects` 中表示每个分类下的上传文件的数量，同时字段 `files` 从 v2.2 版本开始仅在 return_total_count 为 1 时返回。


## 修改文件分类

**接口**

`PUT https://cloud.minapp.com/userve/v1/file-category/:category_id/`

其中 `:category_id` 需替换为你的文件分类 ID

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.put('https://cloud.minapp.com/userve/v1/file-category/5a1bb2ed7026d950ca7d2a78/', {name: 'Category'}).then(res => {
  console.log(res.data)
})
```

**返回示例**

```json
{
  "files": 0,
  "id": "5a1bb2ed7026d950ca7d2a78",
  "name": "category",
  "created_at": 1511761847
}
```

**状态码说明**

`200` 修改成功


## 删除文件分类

**接口**

`DELETE https://cloud.minapp.com/userve/v1/file-category/:category_id/`

其中 `:category_id` 需替换为你的文件分类 ID

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.delete('https://cloud.minapp.com/userve/v1/file-category/5a1ba9c1fff1d651135e5ff1/').then(res => {
  console.log(res.data)
})
```

**状态码说明**

`204` 删除成功
