# 获取内容库

本文档所描述的接口均需要经认证授权后才可使用，认证授权请参考 [授权认证](../authentication.md)。

## 获取内容库列表

**接口**

`GET https://cloud.minapp.com/oserve/v1/content/group/`

**提交参数**

Content-Type: `application/json`

| 参数           | 类型   | 必填 | 说明 |
| :------------ | :----- | :-- | :-- |
| offset        | Number | N   | 返回资源的起始偏移值 |
| limit         | Number | N   | 返回资源的个数（默认为 *20*，最大可设置为 *1000*）|

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

## 获取内容详情

**接口**

`GET https://cloud.minapp.com/oserve/v1/content/group/:content_group_id/`

`content_group_id` 为内容 ID

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