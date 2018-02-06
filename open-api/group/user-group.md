# 用户组的操作

本文档所描述的接口均需要经认证授权后才可使用，认证授权请参考 [授权认证](../authentication.md)。

## 获取用户组列表

**接口**

`GET https://cloud.minapp.com/oserve/v1/user-group/`

**参数说明**

Content-Type: `application/json`

| 参数          | 类型   | 必填 | 说明 |
| :------------| :----- | :-- | :-- |
| parent_id    | String | N   | 用户组的组集 ID |
| offset       | String | N   | 返回资源的起始偏移值 |
| limit        | String | N   | 返回资源的个数（默认为 20，最大可设置为 1000 |

**代码示例**

{% tabs userGroupCurl="Curl", userGroupNode="Node" %}

{% content "userGroupCurl" %}

```
curl -X GET \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
-G \
-d parent_id=1 \
https://cloud.minapp.com/oserve/v1/user-group/
```

{% content "userGroupNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/user-group/',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  qs: {     // query string, 被附加到uri的参数
    parent_id: "234565423456787645xx",   // 可选, 没有用户组的组集 ID, 可以设置为 null 或者不设置
    offset: 0,         // 可选
    limit: 20          // 可选
  }
}

request(opt, function(err, res, body) {
    console.log(body)
})
```

{% endtabs %}

**返回参数**

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
            "id": 47,
            "members": 0,
            "name": "User Group",
            "parent": {
                "id": 1,
                "name": "Super Group"
            }
        }
    ]
}
```

- `members` 表示在用户组下的用户数量
- `parent` 表示用户组的组集

## 获取用户组详情

**接口**

`GET https://cloud.minapp.com/oserve/v1/user-group/:group_id/`

`group_id` 是用户组的 ID

**代码示例**

{% tabs userGroupDetailCurl="Curl", userGroupDetailNode="Node" %}

{% content "userGroupDetailCurl" %}

```
curl -X GET \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/user-group/47/
```

{% content "userGroupDetailNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/user-group/655',  // 655 对应 :group_id
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
  }
}

request(opt, function(err, res, body) {
    console.log(body)
})
```

{% endtabs %}

**返回参数**

```json
{
    "id": 47,
    "members": 0,
    "name": "User Group",
    "parent": {
        "id": 1,
        "name": "Super Group"
    }
}
```

## 创建用户组

**接口**

`POST https://cloud.minapp.com/oserve/v1/user-group/`

**参数说明**

Content-Type: `application/json`

| 参数          | 类型   | 必填 | 说明 |
| :------------| :----- | :-- | :-- |
| name    | String | Y   | 用户组的名称 |
| parent       | String | N   | 组集 ID |

**代码示例**

{% tabs createUserGroupCurl="Curl", createUserGroupNode="Node" %}

{% content "createUserGroupCurl" %}

```
curl -X POST \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
-d '{"name": "User Group"}' \
https://cloud.minapp.com/oserve/v1/user-group/
```

{% content "createUserGroupNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/user-group/',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  json: {   // 指定 data 以 "Content-Type": 'application/json' 传送
    name: 'testGroup'
  }
}

request(opt, function(err, res, body) {
    console.log(res.statusCode, body)
})
```

{% endtabs %}

**状态码说明**

- `201` 写入成功

## 修改用户组

**接口**

`PUT https://cloud.minapp.com/oserve/v1/user-group/:group_id/`

`group_id` 是用户组的 ID

**代码示例**

{% tabs updateGroupCurl="Curl", updateGroupNode="Node" %}

{% content "updateGroupCurl" %}

```
curl -X PUT \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
-d '{"name": "user group"}' \
https://cloud.minapp.com/oserve/v1/user-group/47/
```

{% content "updateGroupNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/user-group/655/',  // 655 对应 :group_id
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  json: {   // 指定 data 以 "Content-Type": 'application/json' 传送
    name: 'testGroup_3'   // 修改后的用户组名
  }
}

request(opt, function(err, res, body) {
    console.log(res.statusCode)
})
```

{% endtabs %}

**返回参数**

```json
{
    "id": 47,
    "members": 0,
    "name": "user group",
    "parent": {
        "id": 1,
        "name": "Super Group"
    }
}
```

**状态码说明**

- `200` 修改成功

## 删除用户组

**接口**

`DELETE https://cloud.minapp.com/oserve/v1/user-group/:group_id/`

**代码示例**

{% tabs deleteGroupCurl="Curl", deleteGroupNode="Node" %}

{% content "deleteGroupCurl" %}

```
curl -X DELETE \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/user-group/47/
```

{% content "deleteGroupNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/user-group/655/',  // 655 对应 :group_id
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`,
  }
}

request(opt, function(err, res, body) {
    console.log(res.statusCode)
})
```

{% endtabs %}

**状态码说明**

- `204` 删除成功

## 批量删除用户组

**接口**

`DELETE https://cloud.minapp.com/oserve/v1/user-group/?id__in=:group_id,group1_id`

**代码示例**

{% tabs patchDeleteGroupCurl="Curl", patchDeleteGroupNode="Node" %}

{% content "patchDeleteGroupCurl" %}

```
curl -X DELETE \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/user-group/?id__in=48,50
```

{% content "patchDeleteGroupNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/user-group/?id__in=652,653',  // id__in=652,653 对应 id__in=:group_id,group1_id
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`,
  }
}

request(opt, function(err, res, body) {
    console.log(res.statusCode)
})
```

{% endtabs %}

**状态码说明**

- `204` 删除成功