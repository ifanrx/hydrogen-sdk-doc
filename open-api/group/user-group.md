# 用户组操作

## 获取用户组详情

**接口**

`GET https://cloud.minapp.com/oserve/v1/user-group/:group_id/`

其中 `:group_id` 需替换为你的用户组 ID

**代码示例**

{% tabs userGroupDetailCurl="Curl", userGroupDetailNode="Node", userGroupDetailPHP="PHP" %}

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

{% content "userGroupDetailPHP"%}

```php
<?php
$group_id = 47; // 用户组 ID
$url = "https://cloud.minapp.com/oserve/v1/user-group/{$group_id}/";
$ch = curl_init ();
curl_setopt ( $ch, CURLOPT_TIMEOUT, 30 );

// 设置头部
$header =
    [
        'Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4',
        'Content-Type: application/json; charset=utf-8',
    ];
curl_setopt ( $ch, CURLOPT_HTTPHEADER, $header );

curl_setopt ( $ch, CURLOPT_URL, $url );
curl_setopt ( $ch, CURLOPT_CUSTOMREQUEST, 'GET');
// 要求结果为字符串且输出到屏幕上
curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, true );
curl_setopt ( $ch, CURLOPT_SSL_VERIFYPEER, true );
$res = curl_exec ( $ch );
curl_close ( $ch );
```

{% endtabs %}

**返回示例**

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

`members` 表示在用户组下的用户数量，`parent` 表示用户组的组集


## 获取用户组列表

**接口**

`GET https://cloud.minapp.com/oserve/v1/user-group/`

**参数说明**

| 参数       | 类型   | 必填 | 说明 |
| :---------| :----- | :-- | :-- |
| parent_id | String | N   | 用户组的组集 ID |
| limit     | Number | N   | 限制返回资源的个数，默认为 20 条，最大可设置为 1000 |
| offset    | Number | N   | 设置返回资源的起始偏移值，默认为 0 |

**代码示例**

{% tabs userGroupCurl="Curl", userGroupNode="Node", userGroupPHP="PHP" %}

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

{% content "userGroupPHP"%}

```php
<?php
$query['parent_id'] = 1; // 用户组的组集 ID
$query['offset'] = 0; // 资源的起始偏移值
$query['limit'] = 20; // 限制返回资源的个数
$query_string = http_build_query($query);
$url = "https://cloud.minapp.com/oserve/v1/user-group/?".$query_string;
$ch = curl_init ();
curl_setopt ( $ch, CURLOPT_TIMEOUT, 30 );

// 设置头部
$header =
    [
        'Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4',
        'Content-Type: application/json; charset=utf-8',
    ];
curl_setopt ( $ch, CURLOPT_HTTPHEADER, $header );

curl_setopt ( $ch, CURLOPT_URL, $url );
curl_setopt ( $ch, CURLOPT_CUSTOMREQUEST, 'GET');
// 要求结果为字符串且输出到屏幕上
curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, true );
curl_setopt ( $ch, CURLOPT_SSL_VERIFYPEER, true );
$res = curl_exec ( $ch );
curl_close ( $ch );
```

{% endtabs %}


## 创建用户组

**接口**

`POST https://cloud.minapp.com/oserve/v1/user-group/`

**参数说明**

Content-Type: `application/json`

| 参数    | 类型   | 必填 | 说明 |
| :----- | :----- | :-- | :-- |
| name   | String | Y   | 用户组的名称 |
| parent | String | N   | 组集 ID |

**代码示例**

{% tabs createUserGroupCurl="Curl", createUserGroupNode="Node", createUserGroupPHP="PHP" %}

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

{% content "createUserGroupPHP" %}
```php
<?php
$param = [
    'name' =>'User Group',
];
$url = 'https://cloud.minapp.com/oserve/v1/user-group/';
$ch = curl_init ();
curl_setopt ( $ch, CURLOPT_TIMEOUT, 30 );
$header =
    [
        'Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4',
        'Content-Type: application/json; charset=utf-8',
    ];
curl_setopt ( $ch, CURLOPT_HTTPHEADER, $header );
curl_setopt ( $ch, CURLOPT_URL, $url );
curl_setopt ( $ch, CURLOPT_POST, true );
curl_setopt ( $ch, CURLOPT_POSTFIELDS, json_encode($param) );
curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, true );
curl_setopt ( $ch, CURLOPT_SSL_VERIFYPEER, true );
$res['response'] = curl_exec ( $ch ); // 反馈结果
$res['status_code'] = curl_getinfo ( $ch, CURLINFO_HTTP_CODE); // 返回状态码
curl_close ( $ch );

```

{% endtabs %}

**状态码说明**

`201` 写入成功


## 修改用户组

**接口**

`PUT https://cloud.minapp.com/oserve/v1/user-group/:group_id/`

其中 `:group_id` 需替换为你的用户组 ID

**代码示例**

{% tabs updateGroupCurl="Curl", updateGroupNode="Node", updateGroupPHP="PHP" %}

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

{% content "updateGroupPHP" %}

```php
<?php
$group_id = 47; // 用户组 ID
$url = "https://cloud.minapp.com/oserve/v1/user-group/{$group_id}/";
$param = [
    'name' =>'user group'
];
$ch = curl_init ();
curl_setopt ( $ch, CURLOPT_TIMEOUT, 30 );
$header =
   [
       'Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4',
       'Content-Type: application/json; charset=utf-8',
   ];
curl_setopt ( $ch, CURLOPT_HTTPHEADER, $header );
curl_setopt ( $ch, CURLOPT_URL, $url );
curl_setopt ( $ch, CURLOPT_CUSTOMREQUEST, 'PUT');
curl_setopt ( $ch, CURLOPT_POSTFIELDS, json_encode($param) );
curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, true );
curl_setopt ( $ch, CURLOPT_SSL_VERIFYPEER, true );
$res['response'] = curl_exec ( $ch ); // 反馈结果
$res['status_code'] = curl_getinfo ( $ch, CURLINFO_HTTP_CODE); // 状态码
curl_close ( $ch );
```

{% endtabs %}

**状态码说明**

`200` 修改成功


## 删除用户组

**接口**

`DELETE https://cloud.minapp.com/oserve/v1/user-group/:group_id/`

**代码示例**

{% tabs deleteGroupCurl="Curl", deleteGroupNode="Node", deleteGroupPHP="PHP" %}

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

{% content "deleteGroupPHP" %}

```php
<?php
$group_id = 47; // 用户组 ID
$url = "https://cloud.minapp.com/oserve/v1/user-group/{$group_id}/";
$ch = curl_init ();
curl_setopt ( $ch, CURLOPT_TIMEOUT, 30 );
// 设置头部
$header =
    [
        'Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4',
        'Content-Type: application/json; charset=utf-8',
    ];
curl_setopt ( $ch, CURLOPT_HTTPHEADER, $header );
curl_setopt ( $ch, CURLOPT_URL, $url );
curl_setopt ( $ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
// 要求结果为字符串且输出到屏幕上
curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, true );
curl_setopt ( $ch, CURLOPT_SSL_VERIFYPEER, true );
$res['response'] = curl_exec ( $ch ); // 反馈结果
$res['status_code'] = curl_getinfo ( $ch, CURLINFO_HTTP_CODE); // 请求状态码
curl_close ( $ch );
```


{% endtabs %}

**状态码说明**

`204` 删除成功


## 批量删除用户组

**接口**

`DELETE https://cloud.minapp.com/oserve/v1/user-group/?id__in=:group_id,group1_id`

**代码示例**

{% tabs patchDeleteGroupCurl="Curl", patchDeleteGroupNode="Node", patchDeleteGroupPHP="PHP" %}

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

{% content "patchDeleteGroupPHP" %}

```php
<?php
// 用户组 ID 集
$group_id[] = 48;
$group_id[] = 50; 
$url = 'https://cloud.minapp.com/oserve/v1/user-group/?'.implode(',',$group_id);
$ch = curl_init ();
curl_setopt ( $ch, CURLOPT_TIMEOUT, 30 );
// 设置头部
$header =
    [
        'Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4',
        'Content-Type: application/json; charset=utf-8',
    ];
curl_setopt ( $ch, CURLOPT_HTTPHEADER, $header );
curl_setopt ( $ch, CURLOPT_URL, $url );
curl_setopt ( $ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
// 要求结果为字符串且输出到屏幕上
curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, true );
curl_setopt ( $ch, CURLOPT_SSL_VERIFYPEER, true );
$res['response'] = curl_exec ( $ch ); // 反馈结果
$res['status_code'] = curl_getinfo ( $ch, CURLINFO_HTTP_CODE); // 请求状态码
curl_close ( $ch );
```

{% endtabs %}

**状态码说明**

`204` 删除成功