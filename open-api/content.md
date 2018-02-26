# 内容操作

## 内容库

### 获取内容库详情

**接口**

`GET https://cloud.minapp.com/oserve/v1/content/group/:content_group_id/`

其中 `:content_group_id` 需替换为你的内容库 ID

**代码示例**

{% tabs getDetailCurl="Curl", getDetailNode="Node" %}

{% content "getDetailCurl" %}

```
curl -X GET \
-H "Authorization: Bearer token" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/content/group/:content_group_id/
```

{% content "getDetailNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/content/group/15130762111906xx/',  // 15130762111906xx 对应 uri :content_group_id
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`
  }
}

request(opt, function(err, res, body) {
    console.log(body)
})
```

{% endtabs %}

**返回示例**

```json
{
  "id": 1680,
  "name": "内容库 1"
}
```

### 获取内容库列表

**接口**

`GET https://cloud.minapp.com/oserve/v1/content/group/`

**提交参数**

Content-Type: `application/json`

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| limit    | Number | N   | 限制返回资源的个数，默认为 20 条，最大可设置为 1000 |
| offset   | Number | N   | 设置返回资源的起始偏移值，默认为 0 |

**代码示例**

{% tabs getLibraryCurl="Curl", getLibraryNode="Node" %}

{% content "getLibraryCurl"%}

```
curl -X GET \
-H "Authorization: Bearer token" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/content/group/
```

{% content "getLibraryNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/content/group/',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`
  },
  qs: {     // query string, 被附加到uri的参数
    offset: 0, // 可选
    limit: 20  // 可选
  }
}

request(opt, function(err, res, body) {
    console.log(body)
})
```

{% endtabs %}

**返回示例**

```json
{
  "meta": {
    "limit": 10,
    "next": null,
    "offset": 0,
    "previous": null,
    "total_count": 1
  },
  "objects": [
    {
      "id": 1680,
      "name": "内容库 1"
    }
  ]
}
```

## 内容分类

### 获取内容分类详情

**接口**

`GET https://cloud.minapp.com/oserve/v1/content/category/:category_id/`

其中 `:category_id` 需替换为你的内容分类 ID

**代码示例**

{% tabs getDetailCurl="Curl", getDetailNode="Node" %}

{% content "getDetailCurl"%}

```
curl -X GET \
-H "Authorization: Bearer token" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/content/category/:category_id/
```

{% content "getDetailNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/content/category/15130762527104xx/',  // 15130762527104xx 对应 uri :category_id
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`
  }
}

request(opt, function(err, res, body) {
    console.log(body)
})
```

{% endtabs %}

**返回示例**

```json
{
  "id": 1680,
  "name": "分类 1",
  "has_children": true,
  "children": [
    {
      "has_children": false,
      "id": 1708,
      "name": "子分类"
    }
  ]
}
```

### 获取内容分类列表

**接口**

`GET https://cloud.minapp.com/oserve/v1/content/category/`

**参数说明**

Content-Type: `application/json`

| 参数              | 类型   | 必填 | 说明 |
| :--------------- | :----- | :-- | :-- |
| content_group_id | String | Y   | 内容库的 ID|
| limit            | Number | N   | 限制返回资源的个数，默认为 20 条，最大可设置为 1000 |
| offset           | Number | N   | 设置返回资源的起始偏移值，默认为 0 |

**代码示例**

{% tabs getCategoryCurl="Curl", getCategoryNode="Node" %}

{% content "getCategoryCurl" %}

```
curl -X GET \
-H "Authorization: Bearer token" \
-H "Content-Type: application/json" \
-G \
-d order_by=-created_at \
-d content_group_id=content_group_id \
https://cloud.minapp.com/oserve/v1/content/category/?content_group_id=1
```

{% content "getCategoryNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/content/category/',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`
  },
  qs: {     // query string, 被附加到uri的参数
    content_group_id: '15130762111906xx'
  }
}

request(opt, function(err, res, body) {
  console.log(body)
})
```

{% endtabs %}

**返回示例**

```json
{
  "meta": {
    "limit": 10,
    "next": null,
    "offset": 0,
    "previous": null,
    "total_count": 1
  },
  "objects": [
    {
      "id": 1680,
      "name": "分类 1",
      "has_children": true
    }
  ]
}
```

`has_children` 表示该分类是否包含子分类，通过`获取内容分类详情接口`可获得子分类的内容。


## 内容

### 获取内容详情

**接口**

`GET https://cloud.minapp.com/oserve/v1/content/detail/:content_id/`

其中 `:content_id` 需替换为你的内容 ID

**代码示例**

{% tabs getDetailCurl="Curl", getDetailNode="Node" %}

{% content "getDetailCurl"%}

```
curl -X GET \
-H "Authorization: Bearer token" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/content/detail/:content_id/
```

{% content "getDetailNode"%}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/content/detail/15145144732272xx/', // 15145144732272xx 对应 uri :content_id
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`
  }
}

request(opt, function(err, res, body) {
    console.log(body)
})
```

{% endtabs %}

**返回示例**

```json
{
  "content": "<p>\b 该片讲述了伊娅不满父亲的恶作剧</p>",
  "cover": "https://cloud-minapp-1131.cloud.ifanrusercontent.com/1donykIpnuvcRiAX.jpg",
  "created_at": 1504152062,
  "description": "超新约全书摘要",
  "id": 1680,
  "title": "超新约全书"
}
```

### 获取内容列表

**接口**

`GET https://cloud.minapp.com/oserve/v1/content/detail/`

**参数说明**

Content-Type: `application/json`

| 参数               | 类型   | 必填 | 说明 |
| :------------     | :----- | :-- | :-- |
| category_id       | String | Y/N   | 内容分类的 ID |
| content_group_id  | String | Y/N   | 内容库的 ID |
| order_by          | String | N   | 对资源进行排序|
| offset            | Number | N   | 返回资源的起始偏移值）|
| limit             | Number | N   | 返回资源的个数（默认为 *20*，最大可设置为 *1000*）|

> **info**
> 注意：发起请求时需要携带 `category_id` 或 `content_group_id` 参数。

**排序**

接口支持以 `created_at` 字段进行排序，默认是以`创建时间的顺序`进行排序。

通过提交 `order_by` 参数来更改接口的排序；

示例：

```
# 顺序
https://cloud.minapp.com/oserve/v1/content/detail/?order_by=created_at

# 倒序
https://cloud.minapp.com/oserve/v1/content/detail/?order_by=-created_at
```

**代码示例**

{% tabs getContentCurl="Curl", getContentNode="Node" %}

{% content "getContentCurl" %}

```
curl -X GET \
-H "Authorization: Bearer token" \
-H "Content-Type: application/json" \
-G \
-d order_by=-created_at \
-d category_id=category_id \
https://cloud.minapp.com/oserve/v1/content/detail/?content_group_id=1
```

{% content "getContentNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/content/detail/',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`  // token的来源请看”授权认证”章节
  },
  qs: {     // query string, 被附加到uri的参数
    content_group_id: '15130762111906xx',
    category_id: '15130762527104xx'
  }
}

request(opt, function(err, res, body) {
    console.log(body)
})
```

{% endtabs %}

**返回示例**

```json
{
  "meta": {
    "limit": 10,
    "next": null,
    "offset": 0,
    "previous": null,
    "total_count": 1
  },
  "objects": [
    {
      "content": "<p>\b 该片讲述了伊娅不满父亲的恶作剧</p>",
      "cover": "https://cloud-minapp-1131.cloud.ifanrusercontent.com/1donykIpnuvcRiAX.jpg",
      "created_at": 1504152062,
      "description": "超新约全书摘要",
      "id": 1680,
      "title": "超新约全书"
    }
  ]
}
```