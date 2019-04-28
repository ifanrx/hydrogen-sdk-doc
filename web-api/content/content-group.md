# 内容库操作

## 获取内容库详情

**接口**

`GET /hserve/v1/content/group/:content_group_id/`

其中 `content_group_id` 是内容库的 ID

**请求示例**

```shell
curl -X GET \
-H "Authorization: Hydrogen-r1 {{AccessToken}}" \
-H "X-Hydrogen-Client-ID: {{ClientID}}" \
-H "Content-Type: application/json" \
https://{{服务器域名}}/hserve/v1/content/group/1/
```

**返回示例**

```json
{
  "id": 1,
  "name": "内容库"
}
```

## 获取内容库列表

**接口**

`GET /hserve/v1/content/group/`

**请求示例**

```shell
curl -X GET \
-H "Authorization: Hydrogen-r1 {{AccessToken}}" \
-H "X-Hydrogen-Client-ID: {{ClientID}}" \
-H "Content-Type: application/json" \
https://{{服务器域名}}/hserve/v1/content/group/
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
      "name": "内容库",
    }
  ]
}
```
