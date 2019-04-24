## 分页

使用 limit 和 offset 来控制分页数据：

- `limit`  指定该请求返回的结果个数
- `offset`  偏移量，指定该请求返回的结果的起始位置

默认 limit 为 20, offset 为 0，我们也可以手动指定 limit 和 offset 来控制。例如，每页展示 100 条数据，需要获取第五页的数据，将 limit  设置为 100、offset 设置为 400 即可。limit 最大可设置为 1000。

**请求示例**

获取从第 5 条起，最多的 10 条的数据表记录
```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{服务器域名}}/hserve/v2.0/table/952728/record?limit=10&offset=5
```

# 排序

查询接口默认按**创建时间倒序**的顺序来返回数据列表，你也可以通过设置 order_by 参数来实现。

order_by 的值必须为 table 表中的字段，可支持多重排序，字段之间用 `,` 隔开，以下是 order_by 的一些例子:

* `https://{{服务器域名}}/hserve/v2.0/table/:table_name/record/?order_by=created_at`: 按照 `created_at` 升序排序
* `https://{{服务器域名}}/hserve/v2.0/table/:table_name/record/?order_by=-created_at`: 按照 `created_at` 倒序排序
* `https://{{服务器域名}}/hserve/v2.0/table/:table_name/record/?order_by=-created_at,id`: 多重排序，先按照 `created_at` 降序，再按照 `id` 升序排序

**请求示例**
{% tabs getRecordUseCurl="curl", getRecordUsePython="python" %}

{% content "getRecordUseCurl" %}

```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{服务器域名}}/hserve/v2.0/table/952728/record/?order_by=-created_at
```

{% content "getRecordUsePython" %}

```python
import json
import urllib

import requests


table_name = ''
BASE_API = r'https://{{服务器域名}}/hserve/v2.0/table/%s/record/' % table_name

TOKEN = ''
HEADERS = {
  'Authorization': 'Hydrogen-r1 %s' % TOKEN
}

where_ = {
  'price': {'$gt': 100},
}

query_ = urllib.urlencode({
  'where': json.dumps(where_),
  'order_by': '-created_at',
  'limit': 10,
  'offset': 0,
})

API = '?'.join((BASE_API, query_))

resp_ = requests.get(API, headers=HEADERS)
print resp_.content
```
{% endtabs %}
