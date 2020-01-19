{% import "/cloud-function/node-sdk/macro/total_count.md" as totalCount %}

# 删除数据项

删除单条数据：

`BaaS.TableObject#delete(recordID, options)`

删除多条数据：

`BaaS.TableObject#delete(query, options)`

**参数说明**

| 参数     | 类型   | 必填 | 说明    |
| :------- | :----- | :--- |:------- |
| recordID | string |  是  | 记录 ID |
| query    | Query  |  是  | Query 查询条件对象 |

options（类型：Object，批量删除时需要设置），属性说明:

| 属性          | 类型    | 必填 | 默认 | 说明 |
| :------------ | :------ | :--- | :--- |:--- |
| enableTrigger | boolean |  否  | true | 是否触发触发器 |
| withCount     | boolean |  否  | true | 是否返回 total_count |

{{totalCount.withCountTips()}}

## 操作步骤

1.通过 `数据表名` 实例化一个 `TableObject` 对象，操作该对象即相当于操作对应的数据表

`let MyTableObject = new BaaS.TableObject(tableName)`

**参数说明**

tableName 二选一，不能同时存在

| 参数名    | 类型    | 说明                                 |
|-----------|---------|--------------------------------------|
| tableName | string  | 数据表名                             |

2.指定数据行 id（以下用 `recordID` 参数名表示） 执行删除操作

`MyTableObject.delete(recordID)`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :---|
| recordID | String | 是  | 数据行 id |


## 示例

**请求示例**
{% tabs deleteRecordAsync="async/await", deleteRecordPromise="promise" %}
{% content "deleteRecordAsync" %}
```js
// 删除 tableName 为 product 的数据表中数据行 id 为 '59897882ff650c0477f00485' 的数据项
async function deleteRecord() {
  try {
    let tableName = 'product'
    let recordID = '59897882ff650c0477f00485'

    let Product = new BaaS.TableObject(tableName)
    let res = await Product.delete(recordID)
    // success
    return res
  } catch(err) {
    // error
    throw err
  }
}
```

{% content "deleteRecordPromise" %}
```js
// 删除 tableName 为 product 的数据表中数据行 id 为 '59897882ff650c0477f00485' 的数据项
function deleteRecord() {
  let tableName = 'product'
  let recordID = '59897882ff650c0477f00485'

  let Product = new BaaS.TableObject(tableName)
  Product.delete(recordID).then(res => {
    // success
    callback(null, res)
  }).catch(err => {
    // error
    callback(err)
  })
}
```
{% endtabs %}

**返回示例**

回调中的 res 对象结构如下：

```json
{
  "status": 204,
  "statusText": "No Content",
  "data": ""
}
```

err 对象结构请参考[错误码和 HError 对象](../error.md)

常见错误：

| 错误码 err.code | 可能的原因       |
|----------------|-----------------|
| 404            | 数据行不存在      |
| 403            | 没有权限删除数据   |

## 批量删除数据项

通过设置查询条件，将符合条件的数据进行批量删除操作。

其中：
 - `Query` 对象的使用请查看 [查询数据项](./query.md) 章节

 - `limit` 和 `offset` 的使用请查看 [分页和排序](./limit-and-order.md) 章节

**请求示例**
{% tabs deleteRecordsAsync="async/await", deleteRecordsPromise="promise" %}
{% content "deleteRecordsAsync" %}
```js
async function deleteRecords() {
  try {
    let MyTableObject = new BaaS.TableObject(tableName)

    let query = new BaaS.Query()

    // 设置查询条件（比较、字符串包含、组合等）
    //...

    let res = await MyTableObject.limit(10).offset(0).delete(query)
    // success
    return res
  } catch(err) {
    // error
    throw err
  }
}
```

{% content "deleteRecordsPromise" %}
```js
function deleteRecords() {
  let MyTableObject = new BaaS.TableObject(tableName)

  let query = new BaaS.Query()

  // 设置查询条件（比较、字符串包含、组合等）
  //...

  MyTableObject.limit(10).offset(0).delete(query).then(res => {
    // success
    callback(null, res)
  }).catch(err => {
    // error
    callback(err)
  })
}
```
{% endtabs %}

**返回示例**

回调中的 res 对象结构如下：

```json
{
  "status": 200,
  "statusText": "OK",
  "data": {
    "succeed": 8, // 成功删除记录数
    "total_count": 10, // where 匹配的记录数，包括无权限操作记录
    "offset": 0,
    "limit": 10,
    "next": null // 下一次删除 url，若为 null 则表示全部删除完毕
  }
}
```

err 对象结构请参考[错误码和 HError 对象](../error.md)

常见错误：

| 错误码 err.code | 可能的原因       |
|----------------|-----------------|
| 404            | 数据行不存在      |
| 403            | 没有权限删除数据   |

### 批量删除时不触发触发器

批量删除不触发触发器的情况下会有以下的行为（暂不支持指定同步/异步操作）:

- 当数据表中的数据总数未超过 1000 的时，无论的 limit 设置多少，均为同步更新。
- 当数据表中的数据总数超过 1000 的时，其操作则分为三种：
  - limit <= 1000 时，操作记录为同步执行
  - limit > 1000 或未设置时，则会转为异步执行并移除限制，变成操作全部

{% tabs batchDeleteAsync="async/await", batchDeletePromise="promise" %}
{% content "batchDeleteAsync" %}
```js
async function batchDelete() {
  try {
    let res = await MyTableObject.delete(query, {enableTrigger: false})
    console.log(res)
    // success
    return res
  } catch(err) {
    //err 为 HError 对象
    throw err
  }
}
```

{% content "batchDeletePromise" %}
```js
// 知晓云后台设置的触发器将不会被触发
function batchDelete() {
  MyTableObject.delete(query, {enableTrigger: false}).then(res => {
    console.log(res)
    callback(null, res)
  }).catch(err => {
    //err 为 HError 对象
    callback(err)
  })
}
```
{% endtabs %}

**返回示例**

同步操作时，回调中的 res 对象结构如下：

```json
{
  "status": 200,
  "statusText": "OK",
  "data": {
    "succeed": 8, // 成功删除记录数
    "total_count": 10, // where 匹配的记录数，包括无权限操作记录
    "offset": 0,
    "limit": 10,
    "next": null // 下一次删除 url，若为 null 则表示全部删除完毕
  }
}
```

异步操作时，回调中的 res 对象结构如下：

```json
{
  "status": 200,
  "statusText": "OK",
  "data": {
    "statys": "ok",
    "operation_id": 1 // 可以用来查询到最终执行的结果
  }
}
```

> **info**
> 获取异步执行结果，请查看接口[文档](/cloud-function/node-sdk/async-job.md)
