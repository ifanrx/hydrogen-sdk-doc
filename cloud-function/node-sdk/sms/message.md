# 短信通知

该接口支持向特定手机号码发送短信通知。

> **info**
> SDK 发送短信需要在知晓云控制台开通并开启发送短信权限，操作步骤请参考本页面末尾

## 发送短信通知
`BaaS.sendSmsMessage(data)`

### 参数说明

data 是 Object 类型，它包括以下几个属性

| 参数             | 类型   | 必填  | 说明 |
| :-------------- | :----- | :--- | :-- |
| recipient_type  | String | 是   | 推送类型，可选值： 'phone_number'、'user_list'、'user_group'、'schema_user'  |
| `<recipient_params>` | Array、Integer、String、Object | 是   | 根据recipientType来填写不同的参数名， 详见下方表格说明 |
| template_name     | String | 是   | 模板名称 |
| keywords        | Object | 是   | 关键字（可在 [知晓云-短信](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]sms/setting) 配置）|
| schema_name     | String | 否   | 数据表名，如果 recipient_type 为 schema_user 则为必填项，表示对该表名的数据表进行用户筛选  |


| recipient_type 类型 | recipient_params     | 类型          | 说明                        |
|:--------------------|:---------------------|:--------------|:----------------------------|
| 'phone_number'      | phone_number         | String        | 推送单个用户                |
| 'user_list'         | user_list            | Integer Array | 推送批量用户，传入用户 id 列表           |
| 'user_group'        | user_group_name      | String        | 用户组名，注意这里是提交用户组名称，而不是用户组 id |
| 'schema_user'       | user_profile_filters | String        | 对指定数据表的查询条件，用于筛选用户        |

### 示例代码

**请求示例 - phone_number**

```javascript
let data = {
  recipient_type: 'phone_number',
  phone_number: '150********',
  template_name: 'test',
  keywords: {
    name: "书籍",
    price: "50.5",
  }
}
BaaS.sendSmsMessage(data).then(res => {
  // success
}).catch(e => {
  // err
})
```

**请求示例 - user_list**

```javascript
let data = {
  recipient_type: 'user_list',
  user_list: [123, 456, 789],
  template_name: 'test',
  keywords: {
    name: "书籍",
    price: "50.5",
  }
}
BaaS.sendSmsMessage(data).then(res => {
  // success
}).catch(e => {
  // err
})
```

> **info**
> user_list 的长度不能超过 1000

**请求示例 - user_group**

```js
let data = {
  recipient_type: 'user_group',
  user_group_name: '运营人员',
  template_name: 'test',
  keywords: {
    name: "书籍",
    price: "50.5",
  }
}
BaaS.sendSmsMessage(data).then(res => {
  // success
}).catch(e => {
  // err
})
```

**请求示例 - schema_user**

schema_user 允许同时存在 user_profile_filters 和 user_group_name 参数

> **info**
> 如果 `recipient_type` 为 `schema_user` 且参数中包含 `user_group_name` 字段，
> 则 `user_profile_filters` 字段中，最外层的 `$and` 或 `$or` 不能省略。

```js
let data = {
  recipient_type: 'schema_user',
  user_group_name: '运营人员',
  schema_name: 'bookshelf',
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
  template_name: 'test',
  keywords: {
    name: "书籍",
    price: "50.5",
  }
}
BaaS.sendSmsMessage(data).then(res => {
  // success
}).catch(e => {
  // err
})
```

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


## 短信发送频次

> **info**
> 对同一手机号码在 1 分钟内只能发送 1 条短信

> 对同一手机号码在 1 天内不能发送超过 10 条短信

## 开通短信通知功能

{% include "/js-sdk/frag/_enable_sms.md" %}

### 配置短信模版

![](/images/dashboard/sms-message-config.png)
