# 文件操作

## 获取文件详情

**接口**

`GET https://cloud.minapp.com/userve/v1/file/:file_id/`

其中 `:file_id` 需替换为你的文件 ID

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.get('https://cloud.minapp.com/userve/v1/file/5a1ba9c1fff1d651135e5ff1/').then(res => {
  console.log(res.data)
})
```

**返回示例**

```json
{
  "categories": [
    {
      "id": "5a1ba7b708443e7fc5f2fb18",
      "name": "Category",
    }
  ],
  "cdn_path": "1eJCS1MFGdvaaBoV.png",
  "created_at": 1511762369,
  "id": "5a1ba9c1fff1d651135e5ff1",
  "media_type": "image",
  "mime_type": "image/png",
  "name": "box_close.png",
  "path": "https://cloud-minapp-287.cloud.ifanrusercontent.com/1eJCS1MFGdvaaBoV.png",
  "size": 3652,
  "status": "success"
}
```


## 获取文件列表

**接口**

`GET https://cloud.minapp.com/userve/v1/file/`

**参数说明**

Content-Type: `application/json`

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| order_by | String | Y   | 排序（支持 `created_at` 进行排序）|
| limit    | Number | N   | 限制返回资源的个数，默认为 20 条，最大可设置为 1000 |
| offset   | Number | N   | 设置返回资源的起始偏移值，默认为 0 |

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.get('https://cloud.minapp.com/userve/v1/file/', {
  params: {
    order_by: '-created_at',
    category: '5a1ba7b708443e7fc5f2fb18'
  }
}).then(res => {
  console.log(res.data)
})
```

## 删除文件

**接口**

`DELETE https://cloud.minapp.com/userve/v1/file/:file_id/`

其中 `:file_id` 需替换为你的文件 ID

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.delete('https://cloud.minapp.com/userve/v1/file/5a1ba9c1fff1d651135e5ff1/').then(res => {
  console.log(res.data)
})
```
**状态码说明**

`204` 删除成功


## 批量删除文件

**接口**

`DELETE https://cloud.minapp.com/userve/v1/file/?id__in=:file1_id,:file2_id`

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.delete('https://cloud.minapp.com/userve/v1/file/', {
  params: {
    id__in: '5a1ba9c1fff1d651135e5ff1,59ca3d275f281f58523fc47a'
  }
}).then(res => {
  console.log(res.data)
})
```

**状态码说明**

`204` 删除成功
