<!-- ex_nonav -->
{% if platform == 'wechat' %}
# 发送微信订阅消息
{% else %}
# 发送 QQ 订阅消息
{% endif %}

该接口给特定的用户发送一个特定的订阅消息

> **info**
> 可以通过查询接口在发送前查询可用订阅

> 智能过滤需要`个人版`及以上套餐版本

{% if platform == 'wechat' %}
`BaaS.wechat.sendSubscribeMessage(data)`
{% else %}
`BaaS.qq.sendSubscribeMessage(data)`
{% endif %}

**参数说明**

data 是 Object 类型，它包括以下几个属性

{% if platform == 'wechat' %}
| 参数            | 类型   | 必填  | 说明 |
| :-------------- | :----- | :--- | :-- |
| recipient_type  | String | 是   | 推送类型，可选值： user_id、user_list、user_group、schema_user |
| `<recipient_params>` | Array、Integer、String、Object | 是   | 根据recipient_type来填写不同的参数名， 详见下方表格说明 |
| template_id     | String | 是   | 模板 ID （微信后台配置）|
| keywords        | Object | 是   | 关键字，请参照 [微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/subscribe-message/subscribeMessage.send.html) |
| schema_name     | String | 否   | 数据表名，如果 recipient_type 为 schema_user 则为必填项，表示对该表名的数据表进行用户筛选  |
| page            | String | 否   | 点击模板卡片后的跳转页面，仅限本小程序内的页面。支持带参数。该字段不填则模板无跳转。|
| can_send_subscription_message  | Boolean | 否   | 是否过滤无效用户  |
| miniprogram_state  | String | 否   | 跳转小程序类型：developer 为开发版；trial 为体验版；formal 为正式版；默认为正式版  |
{% else %}
| 参数            | 类型   | 必填  | 说明 |
| :-------------- | :----- | :--- | :-- |
| recipient_type  | String | 是   | 推送类型，可选值： user_id、user_list、user_group、schema_user |
| `<recipient_params>` | Array、Integer、String、Object | 是   | 根据recipient_type来填写不同的参数名， 详见下方表格说明 |
| template_id     | String | 是   | 模板 ID （QQ 后台配置）|
| keywords        | Object | 是   | 关键字，请参照 [QQ 官方文档](https://q.qq.com/wiki/develop/miniprogram/server/open_port/port_subscribe.html) |
| schema_name     | String | 否   | 数据表名，如果 recipient_type 为 schema_user 则为必填项，表示对该表名的数据表进行用户筛选  |
| page            | String | 否   | 点击模板卡片后的跳转页面，仅限本小程序内的页面。支持带参数。该字段不填则模板无跳转。|
| can_send_subscription_message  | Boolean | 否   | 是否过滤无效用户  |
{% endif %}

| recipient_type 类型 | recipient_params     | 类型            | 说明                          |
|:------------------|:---------------------|:--------------|:----------------------------|
| user_id           | user_id              | Integer       | 推送单个用户，传入用户 ID (对应 _userprofile 表中的 id 字段)              |
| user_list         | user_list            | Integer Array | 推送批量用户，传入用户 id 列表           |
| user_group        | user_group_name      | String        | 用户组名，注意这里是提交用户组名称，而不是用户组 id |
| schema_user       | user_profile_filters | String        | 对指定数据表的查询条件，用于筛选用户        |

RateLimit 类型说明:

| 属性            | 类型   | 必填 | 说明 |
| :-------------- | :----- | :--- | :--- |
| interval        | Number | 是   | 时间间隔  |
| limit           | Number | 是   | 每批次发送条数  |


**请求示例 - user_id**

{% if platform == 'wechat' %}
```js
let data = {
  recipient_type: 'user_id',
  user_id: 23425,
  template_id: "tadfDf23asdi8dfd",
  page: "pages/index/index",
  keywords: {
    thing01: {
      value: "书籍",
    },
    number01: {
      value: "50.5",
    }
  }
}

BaaS.wechat.sendSubscribeMessage(data).then(res => {
  // 发送成功
}, err => {
  // 发送失败
})
```
{% else %}
```js
let data = {
  recipient_type: 'user_id',
  user_id: 23425,
  template_id: "tadfDf23asdi8dfd",
  page: "pages/index/index",
  keywords: {
    thing01: {
      value: "书籍",
    },
    number01: {
      value: "50.5",
    }
  }
}

BaaS.qq.sendSubscribeMessage(data).then(res => {
  // 发送成功
}, err => {
  // 发送失败
})
```
{% endif %}

**请求示例 - user_list**

{% if platform == 'wechat' %}

```js
let data = {
  recipient_type: 'user_list',
  user_list: [123, 456, 789],
  template_id: "tadfDf23asdi8dfd",
  // 其他参数
}

BaaS.wechat.sendSubscribeMessage(data)
```

> **info**
> user_list 的长度不能超过 1000

**请求示例 - user_group**

```js
let data = {
  recipient_type: 'user_group',
  user_group_name: '运营人员',
  template_id: "tadfDf23asdi8dfd",
  // 其他参数
}

BaaS.wechat.sendSubscribeMessage(data)
```
{% else %}

```js
let data = {
  recipient_type: 'user_list',
  user_list: [123, 456, 789],
  template_id: "tadfDf23asdi8dfd",
  // 其他参数
}

BaaS.qq.sendSubscribeMessage(data)
```

> **info**
> user_list 的长度不能超过 1000

**请求示例 - user_group**

```js
let data = {
  recipient_type: 'user_group',
  user_group_name: '运营人员',
  template_id: "tadfDf23asdi8dfd",
  // 其他参数
}

BaaS.qq.sendSubscribeMessage(data)
```
{% endif %}

**请求示例 - schema_user**

schema_user 允许同时存在 user_profile_filters 和 user_group_name 参数

> **info**
> 如果 `recipient_type` 为 `schema_user` 且参数中包含 `user_group_name` 字段，
> 则 `user_profile_filters` 字段中，最外层的 `$and` 或 `$or` 不能省略。

{% if platform == 'wechat' %}

```js
let data = {
  recipient_type: 'schema_user',
  user_profile_filters: {
    "$and": [
      {
        "is_authorize": true
      },
      {
        "array_field": {
          "$in": [
            "value_1",
            "value_2"
          ]
        }
      }
    ]
  },
  user_group_name: ['运营人员', '技术人员'],
  template_id: "tadfDf23asdi8dfd",
  // 其他参数
}

BaaS.wechat.sendSubscribeMessage(data)
```
{% else %}

```js
let data = {
  recipient_type: 'schema_user',
  user_profile_filters: {
    "$and": [
      {
        "is_authorize": true
      },
      {
        "array_field": {
          "$in": [
            "value_1",
            "value_2"
          ]
        }
      }
    ]
  },
  user_group_name: ['运营人员', '技术人员'],
  template_id: "tadfDf23asdi8dfd",
  // 其他参数
}

BaaS.qq.sendSubscribeMessage(data)
```
{% endif %}

{% if platform == 'wechat' %}
其中 keywords 为微信后台中实际关键词对应的键值
{% else %}
其中 keywords 为 QQ 后台中实际关键词对应的键值
{% endif %}

![关键词对应键值示例](/images/cloud-function/subscribe-keywords.png)

## user_profile_filters 语法

| 操作符     	| 示例                                                                                                       	| 示例说明                    	|
|------------	|------------------------------------------------------------------------------------------------------------	|-----------------------------	|
| =          	| { a:{ $eq: '123' } }                                                                                       	| a == '123'       	|
| <          	| { a: { $lt: 22 } }                                                                                         	| a 小于 22                   	|
| <=         	| { a: { $lte: 22 } }                                                                                        	| a 小于等于 22               	|
| >          	| { a: { $gt: 22 } }                                                                                         	| a 大于 22                   	|
| >=         	| { a: { $gte: 22 } }                                                                                        	| a 大于等于 22               	|
| in         	| { a: { $in: [123, 456] } }                                                                                 	| a 存在于 [123, 456] , eg: 123 in [123, 456]      	|
| range      	| { a: { $range: [0, 5] } }                                                                                  	| a 存在于 [0, 1, 2, 3, 4] 中, eg: 1 in [0, 1, 2] 	|
| !=         	| { a: { $ne: '123' } }                                                                                      	| a 不等于 '123', eg '456' != '123'          	|
| not in     	| { a: { $nin: [123, 456] } }                                                                                	| a 不在 [123, 456] 中, eg: 888 不在 [123， 456] 中    	|
| contains   	| { a: { $contains: '123'} }                                                                                 	| a 包含 '123', eg: 'abc123' 包含 ‘123’         	|
| regex      	| { a: { $regex: '123', $options: 'g'} }                                                                     	| a.match(/123/g)             	|
| all        	| { a: { $all: [1, 2, 3] } }                                                                                 	| a 包含了 [1, 2, 3] , eg: [1, 2, 3] 包含了  [1, 2]  	|
| is null    	| { a: { $isnull: true} } }                                                                                  	| a 是否为空                  	|
| center     	| { a: { $center: {"radius": 123, "coordinates": [1, 2]} } }                                                 	| 请参考[withincircle](../../../js-sdk/schema/geo.md)          	|
| intersects 	| { a: { $intersects: {"type": `GEOJSON`, "coordinates": [1, 2]} }}                                          	| 请参考[include](../../../js-sdk/schema/geo.md)                	|
| nearsphere 	| { a: {"$nearsphere":{"geometry":{"type":"Point","coordinates":[1,2]},"min_distance":3,"max_distance":4}} } 	| 请参考[withinRegion](../../../js-sdk/schema/geo.md)           	|
