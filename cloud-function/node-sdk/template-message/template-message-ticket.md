<!-- ex_nonav -->

# 获取 formId

调用该接口，会返回当前可用的 formId 列表。可以用来统计当前可用的 formId 数量与模版消息可送达的用户数量。


`BaaS.getTemplateMsgTicket({userID, submissionType, offset, limit})`

**参数说明**

| 参数            | 类型   | 必填  | 说明 |
| :-------------- | :----- | :--- | :-- |
| userID  | Integer | 否   | 用户 ID  |
| submissionType | String | 否   | 提交场景 `form_id` 或者 `prepay_id` |
| offset        | Integer | 否   | 偏移量，指定该请求返回的结果的起始位置（默认 0）|
| limit         | Integer | 否   | 指定该请求返回的结果个数（默认 20）|


**请求示例**

```js
BaaS.getTemplateMsgTicket({
  userID: 12345,
  submissionType: "form_id",
  offset: 10,
  limit: 10,
}).then(res => {
  // success
}).catch(e => {
  // err
})
```


**返回示例**
```js
{
  "meta": {
    "limit": 20,
    "next": null,
    "offset": 0,
    "previous": null,
    "total_count": 3
  },
  "objects": [
    {
      "created_at": 1539359457,
      "id": 3883154,
      "openid": null,
      "remaining_count": 1,
      "source": null,
      "submission_type": "form_id",
      "submission_value": "7a7c56ca241634c0bc7cdd181e7a6fd0",
      "updated_at": "2018-10-12T23:50:57.262400",
      "user_id": 123456,
      "user_name": "test_user"

    },
    {
      "created_at": 1539359453,
      "id": 3883153,
      "openid": null,
      "remaining_count": 1,
      "source": null,
      "submission_type": "form_id",
      "submission_value": "69e1bec42fbec61e85628bc466227146",
      "updated_at": "2018-10-12T23:50:53.109030",
      "user_id": 123456,
      "user_name": "test_user"

    },
    {
      "created_at": 1539244028,
      "id": 3863154,
      "openid": null,
      "remaining_count": 1,
      "source": null,
      "submission_type": "form_id",
      "submission_value": "ddd",
      "updated_at": "2018-10-11T15:47:08.670404",
      "user_id": 123456,
      "user_name": "test_user"
    }
  ]
}
```
