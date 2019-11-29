# 工具

## 获取服务器时间

**接口**

`GET /hserve/v2.2/server/time/`


**请求示例**
```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: [[client_id]]" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -G \
  --data-urlencode 'status=success' \
  https://{{服务器域名}}/hserve/v2.2/server/time/
```

**返回实例**
```json
{
  "time": "2019-11-22T16:09:26.903210+08:00"
}
```

**状态码说明**

`200`: 查询成功
