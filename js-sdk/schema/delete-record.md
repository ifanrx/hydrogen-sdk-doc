# 删除数据项

{% tabs first="SDK 1.1.0 及以上版本", second="SDK 1.1.0 以下版本" %}

{% content "first" %}

## SDK 1.1.0 及以上版本

### 操作步骤

1.通过 `tableID` 实例化一个 `TableObject` 对象，操作该对象即相当于操作对应的数据表

`let MyTableObject = new wx.BaaS.TableObject(tableID)`

**参数说明**

| 参数     | 类型   | 必填 | 说明 |
| :-----  | :----- | :-- | :---|
| tableID | Number |  是 | 数据表 ID |

> **info**
> SDK 1.2.0 版本已支持通过数据表名实例化 TableObject，如操作数据表名为 'product' 的数据表，可进行如下实例化：new wx.BaaS.TableObject('product')

**返回参数说明**

无数据返回

2.指定 recordID 执行删除操作

`MyTableObject.delete(recordID)`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :---|
| recordID | String | 是  | 记录 ID |


### 示例

**请求示例**
```js
// 删除 tableID 为 10 的数据表中 recordID 为 59897882ff650c0477f00485 的数据项
let tableID = 10
let recordID = '59897882ff650c0477f00485'

let Product = new wx.BaaS.TableObject(tableID)
Product.delete(recordID).then(res => {
  // success
}, err => {
  // err
})
```
**返回示例**

res:
```json
{
  "statusCode": 204,
  "data": ""
}
```


### 批量删除数据项

SDK 1.4.0 及以上版本支持批量删除数据项。可以通过设置查询条件，将符合条件的数据进行批量删除操作。

其中：
 - `Query` 对象的使用请查看 [查询数据项](./query.md) 章节

 - `limit` 和 `offset` 的使用请查看 [分页和排序](./limit-and-order.md) 章节

**请求示例**

```js
let MyTableObject = new wx.BaaS.TableObject(tableID)

let query = new wx.BaaS.Query()

// 设置查询条件（比较、字符串包含、组合等）
...

MyTableObject.limit(10).offset(0).delete(query).then(res => {}, err => {})
```

**返回示例**

res:
```json
{
  "statusCode": 200,
  "data": {
    "succeed": 8, // 成功删除记录数
    "total_count": 10, // where 匹配的记录数，包括无权限操作记录
    "offset": 0,
    "limit": 10,
    "next": null // 下一次删除 url，若为 null 则表示全部删除完毕
  }
}
```

**状态码说明**

200 删除成功，400 请求数据非法

<span class="attention">注：</span> 由于对数据表的增删改均会触发 trigger 动作，为了防止出现严重消耗系统资源的情况，对数据表进行批量操作的数据条目最多不能超过 1000 条。

{% content "second" %}

## SDK 1.1.0 以下版本

> **info**
> 该写法在 sdk v2.0 前仍然有效

`wx.BaaS.deleteRecord(OBJECT)`

**OBJECT 参数说明**

| 参数      | 类型   | 必填  | 说明 |
| :------- | :----- | :--- | :-- |
| tableID  | Number | 是   | 数据表 ID |
| recordID | String | 是   | 数据项 ID |

**返回参数**

无数据返回

**请求示例**

```js
// 删除 tableID 为 10 的数据表中 recordID 为 59897882ff650c0477f00485 的数据项
let tableID = 10
let recordID = '59897882ff650c0477f00485'
let objects = {
  tableID,
  recordID
}
wx.BaaS.deleteRecord(objects).then(res => {
  // success
}, err => {
  // err
})
```

{% endtabs %}
