# 获取数据项详情

{% tabs first="SDK 1.1.0 及以上版本", second="SDK 1.1.0 以下版本" %}

{% content "first" %}

## SDK 1.1.0 及以上版本

**请求示例**

```js
let tableID = 10
let recordID = '59897882ff650c0477f00485'

let Product = new wx.BaaS.TableObject(tableID)

Product.get(recordID).then( (res) => {
  // success
}, (err) => {
  // err
})
```

**返回示例** (res.statusCode === 200)

res.data:
```js
{
  "_id": "59a3c2b5afb7766a5ec6e84e",
  "amount": 0,
  "created_at": 1503904437,
  "created_by": 36395395,
  "desc": ["good"],
  "id": "59a3c2b5afb7766a5ec6e84e",
  "name": "apple",
  "price": 1.0,
  "read_perm": ["user:*"],
  "updated_at": 1503904437,
  "write_perm": ["user:*"]
}
```

{% content "second" %}

## SDK 1.1.0 以下版本

> **info**
> 该写法在 sdk v2.0 前仍然有效

`wx.BaaS.getRecord(OBJECT)`

**OBJECT 参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------  | :----- | :-- | :-- |
| tableID  | Number | 是  | 数据表 ID |
| recordID | String | 是  | 数据项 ID |

**请求示例**

```js
let tableID = 10
let recordID = '59897882ff650c0477f00485'
let objects = {
  tableID,
  recordID
};
wx.BaaS.getRecord(objects).then( (res) => {
  // success
}, (err) => {
  // err
})
```

**返回参数**

| 参数        | 类型    | 说明 |
| :--------- | :------ | :-- |
| id         | String  | 数据项 ID |
| created_at | Integer | 创建时间 |
| is_admin   | Boolean | 自定义字段 |
| name       | String  | 自定义字段 |
| price      | Number  | 自定义字段 |
| tags       |  Array  | 自定义字段 |

**返回示例**

```js
{
  "created_at": 1487053095,
  "id": "59897882ff650c0477f00485",
  "is_admin": false,
  "name": "JlpvHdheLh",
  "price": 89,
  "tags": [
    "xGHt",
    "hHqz"
  ]
}
```

{% endtabs %}