# 更新数据项

`Record.save(SaveOptions)`

**参数说明**

SaveOptions:

| 字段          | 类型    | 必填 | 默认 | 说明 |
| :------------ | :------ | :--- | :--- |:--- |
| enableTrigger | Boolean |  否  | null | 是否触发触发器 |
| withCount     | Boolean |  否  | null | 是否返回 total_count |
| expand        | List |  否  | null | 是否返回对应字段扩展 |


## 操作步骤

1.通过 `tableName` 实例化一个 `Table` 对象，操作该对象即相当于操作对应的数据表

`Table product = new Table("product");`

2.通过数据行 id（以下用 `recordID` 参数名表示） 设置指定数据行

`Record record = product.fetchWithoutData("recordID");`

3.调用 put 或 unset 修改指定记录的数据

a. put 操作

为某个字段赋值

`product.put(key, value)` 或 `product.putAll(record)`

**参数说明**

| 参数  | 类型              | 必填 | 说明 |
| :---- | :---------------- | :-- | :-- |
| key   | String            | 是  | 在数据表中的类型必须是 Number 或 Integer |
| value | any               | 是  | 与 key 字段的类型保持一致 |
| record| Record            | 是  | 一次性赋值的键值对对象 |

b. unset 操作

将某个字段的值清空

`product.unset(key)`

> **info**
> 1.对同一字段进行多次 `set` 操作，后面的数据会覆盖掉前面的数据
>
> 2.不可同时用 `set` 与 `unset` 操作同一字段，否则会报 605 错误

4.将修改后的记录保存到服务器

1.`record.save()`
2.`record.saveInBackground(cb)`

> **info**
对于所有的 CURD 操作，都提供 `xxxInBackground` 的异步版本

通过上面的四个步骤，即完成了一条记录的插入，具体操作阅读以下内容。


## 普通数据更新

**请求示例**
```java
// 更新 tableName 为 'product' 的数据表中 id 为 59897882ff650c0477f00485 的数据行的 price 字段
Table product = new Table("product");
Record record = product.fetchWithoutData("59897882ff650c0477f00485");

// 同步的方式
try {
    record.put("price", 1);
    record.save();
    // 操作成功
} catch (Exception e) {
    // 操作失败
}

// 异步的方式
record.saveInBackground(new Callback<Record>() {
   @Override
   public void onSuccess(@Nullable Record record) {
       // 保存成功
   }
   @Override
   public void onFailure(Exception e) {
       // 保存失败
   }
);
```

异常请参考[异常](../error-code.md)

常见错误 HttpException.code ：

| code | 可能的原因       |
|----------------|-----------------|
| 400            | 1. 提交的数据不合法、2. 重复创建数据（设置了唯一索引）    |
| 403            | 没有权限更新数据    |
| 404            | 数据行不存在    |


## 更新 object 类型内的属性
```java
Record.patchObject("obj1", record);
```

**参数说明**

| 参数   | 类型                | 必填 | 说明 |
| :---- | :------------------ | :-  | :-- |
| key   | String              | 是  | 在数据表中的类型必须是 Object |
| value | Record              | 是  | 更新的对象 |

> **info**
> 该操作的效果浅合并，也就是只合并第一层，嵌套的属性仍然是被替换。
> 对象内的属性名只能包含字母、数字和下划线，必须以字母开头，比如 `{$ifanr.x: 123}` 和 `{知晓云: "test"}` 是错误的

**请求示例**
假设数据表 Product 中有数据行如下
```javascript
[{
   id: "7",
   obj1: {a: [1, 2, 3], b: 666, c: {age: 100}}
}]
```

```java
Table product = new Table("Product");
Record record = product.fetchWithoutData("7");
Record patch = product.createRecord();
patch.put("a", new int[]{222});
patch.put("b", 555);
patch.put("d", 888);
record.patchObject("obj1", patch);

```
执行结果

```javascript
[
  {
    id: '7',
    obj1: {a: [222], b: 555, c: {age: 100}, d: 888}
  }
]
```


## 更新 pointer 类型字段

假设有 product 表, product 表部分字段如下:

| 字段名          | 字段类型          | 说明                 |
|----------------|------------------|----------------------|
| customer       |  pointer         | 指向了 `customer` 表     |
| user           |  pointer         | 指向了 `_userprofile` 表     |


现在需要更新 product 表中 id 为 `5bdfaf068asd123123asd` 的数据行

**示例代码**

```java
try {
    Table comments = new Table("Comment");
    Table articles = new Table("Article");

    // 5bad87ab0769797b4fb27a1b 为 Comment 表中某行数据的 id
    Record comment = comments.fetchWithoutData("5bad87ab0769797b4fb27a1b");
    // 69147880 为 _userprofile 表中某行数据的 id
    Record user = Users.userWithoutData(69147880);
    // 针对当前登录用户，可用以下方法
    // CurrentUser user = Auth.currentUserWithoutData();

    Record article = articles.createRecord();
    article.put("comment", comment);
    article.put("user", user);
    article.save();
    // 操作成功
} catch (Exception e) {
    // 操作失败
}
```


## 计数器原子性更新

对数字类型的字段进行原子性增减操作。当请求同时对一个数据进行增减时，原子性使得冲突和覆盖导致的数据不正确的情况不会出现。

`Record.incrementBy(key, value)`

**参数说明**

| 参数   | 类型              | 必填 | 说明 |
| :---- | :---------------- | :-- | :-- |
| key   | String            | 是  | 在数据表中的类型必须是 Number 或 Integer |
| value | Number            | 是  | 与 key 的类型保持一致 |

**请求示例**

```java
record.incrementBy('amount', 1);
record.save();
```


## 数组原子性更新

### 将 _待插入的数组_ 加到原数组末尾

`Record.append(key, value)`

**参数说明**

| 参数   | 类型                | 必填 | 说明 |
| :---- | :------------------ | :-- | :--- |
| key   | String              | 是  | 在数据表中的类型必须是 Array |
| value | Array               | 是  | - |

**请求示例**

```java
record.append('desc', Arrays.asList("big"));
```

### 将 _待插入的数组_ 中不包含在原数组的数据加到原数组末尾

`Record.appendUnique(key, value)`

**参数说明**

| 参数   | 类型                | 必填 | 说明 |
| :---- | :------------------ | :-- | :-- |
| key   | String              | 是  | 在数据表中的类型必须是 Array |
| value | Array               | 是   | - |

**请求示例**

```java
product.uAppend('desc', Arrays.asList("big"))
```

### 从原数组中删除指定的值

`product.remove(key, value)`

**参数说明**

| 参数   | 类型                | 必填 | 说明 |
| :---- | :------------------ | :-  | :-- |
| key   | String              | 是  | 在数据表中的类型必须是 Array |
| value | Array               | 是  | 如果元素类型是 object、file，则只能是 Array item，或 length 为 1 的 Array |

**请求示例**

```java
product.remove('desc', Arrays.asList("big"))
```

> **info**
> 对**同一字段**设置多次 `append` 或 `remove` 操作后进行 `update` 操作，则只有最后一次进行的 `append` 或 `remove` 是有效的；如果同时对**同一字段**进行 `set`、`remove` 和 `append` 操作，则只有最后执行的操作是有效的。

<span class="attention">注：</span> 设置的数据要与预先在知晓云平台设定的数据类型一致，当仅更新一个字段，并且数据不合法时，将无法成功保存，请求返回 `Failed to save record, type conflict on fields` 错误，如果更新多个字段，其中有一个或一个以上字段数据合法，则请求成功，但其中数据不合法的字段将不会成功保存，如下示例：

```java
/*
* 同时设置 amount 和 date 字段，其中 date 为日期类型，这里为其赋了一个字符串类型的值，
* 该请求会返回 200，但只有 amount 被成功设置为 10
*/

Record record = table.fetchWithoutData(orderID)
record.put('amount', 10)
record.put('date', 'abc')
record.save()
```

### 从原数组中删除最后一项

`Record.pop(key)`

**参数说明**

| 参数   | 类型                | 必填 | 说明 |
| :---- | :------------------ | :-- | :-- |
| key   | String              | 是  | 在数据表中的类型必须是 Array |

**请求示例**

```java
Table table = new Table("product");
Record record = table.fetchWithoutData("59897882ff650c0477f00485");
record.pop("array_i");  // array_i: [1, 2, 3, 4]
record.saveInBackground(new BaseCallback<Record>() {
    @Override
    public void onSuccess(Record record) {
        // array_i: [1, 2, 3]
    }

    @Override
    public void onFailure(Throwable e) {}
});
```

**返回示例**
```json
{
  "status": 200,
  "data": {
    "_id": "59897882ff650c0477f00485",
    "created_at": 1541744690,
    "created_by": 3,
    "id": "59897882ff650c0477f00485",
    "array_i": [1, 2, 3]
}
```

### 从原组中删除第一项

`Record.shift(key)`

**参数说明**

| 参数   | 类型                | 必填 | 说明 |
| :---- | :------------------ | :-- | :-- |
| key   | String              | 是  | 在数据表中的类型必须是 Array |

**请求示例**

```java
Table table = new Table("product");
Record record = table.fetchWithoutData("59897882ff650c0477f00485");
record.shift("array_i");  // array_i: [1, 2, 3, 4]
record.saveInBackground(new BaseCallback<Record>() {
    @Override
    public void onSuccess(Record record) {
        // array_i: [2, 3, 4]
    }

    @Override
    public void onFailure(Throwable e) {}
});
```

**返回示例**
```json
{
  "status": 200,
  "data": {
    "_id": "59897882ff650c0477f00485",
    "created_at": 1541744690,
    "created_by": 3,
    "id": "59897882ff650c0477f00485",
    "array_i": [2, 3, 4]
}
```


## 按条件批量更新数据项

> 注意：由于条件查询可能命中非常多的数据，默认情况下，限制为最多更新前 1000 条数据。
> 如需要一次性更新更多数据，请参考下一个章节：不触发触发器的更新，或者通过维护分页来进行。

其中：
 - `Query` 对象的使用请查看 [查询数据项](./query.md) 章节

 - `limit` 和 `offset` 的使用请查看 [分页和排序](./limit-and-order.md) 章节

**请求示例**

```java
Table table = new Table("my_horses");

// 设置查询条件（比较、字符串包含、组合等）
//...
Query query = new Query();

// 与更新特定记录一致
Record updateOption = table.createRecord();
updateOption.put("name", "peter");
updateOption.put("age", 25);

table.batchUpdateInBackground(query, updateOption, new BaseCallback<BatchResult>() {
    @Override
    public void onSuccess(BatchResult batchResult) {
        // success
    }
    @Override
    public void onFailure(Throwable e) {
        // fail
    }
});
```

**返回示例**

then 回调中的 res 对象结构如下：

```json
{
  "statusCode": 200, // 200 表示更新成功, 注意这不代表所有数据都更新成功，具体要看 operation_result 字段
  "data": {
    "succeed": 8, // 成功更新记录数
    "total_count": 10,  // where 匹配的记录数，包括无权限操作记录
    "offset": 0,
    "limit": 1000,
    "next": null, // 下一次更新 url，若为 null 则表示全部更新完毕
    "operation_result": [  // 创建的详细结果
       {
         "success": {      // 成功时会有 success 字段
           "id": "5bffbab54b30640ba8135650",
           "updated_at": 1543486133
         }
       },
       {
         "success": {
           "id": "5bffbab54b30640ba8135651",
           "updated_at": 1543486133
         }
       },
       {
         "error": {     // 失败时会有 error 字段
           "code": 16837,
           "err_msg": "数据更新失败，具体错误信息可联系知晓云微信客服：minsupport3 获取。"
         }
       }
     ]
  }
}
```

catch 回调中的 err 对象:

请参考[异常](/android-sdk/error-code.md)

**状态码说明**

200 更新成功，400 请求数据非法

### 批量更新时不触发触发器

不触发触发器的情况下会有以下的行为:

- 当更新命中总条目 <= 1000 时，无论 limit 设置为多少，均为同步更新，将返回每一条更新的 id 和更新结果，详见下方返回示例中同步执行部分。
- 当更新命中总条目 > 1000 时，根据设置 limit 的不同，将有下方两种行为：
  - limit <= 1000 时，操作记录为同步执行
  - limit > 1000 或未设置时，则会转为异步执行并移除 limit 限制，变成操作全部

```java
Table table = new Table("my_horses");

// 设置查询条件（比较、字符串包含、组合等）
//...
Query query = new Query();

// 与更新特定记录一致
Record updateOption = table.createRecord();
updateOption.put("name", "peter");
updateOption.put("age", 25);

// 知晓云后台设置的触发器将不会被触发
query.enableTrigger(false);

table.batchUpdateInBackground(query, updateOption, new BaseCallback<BatchResult>() {
    @Override
    public void onSuccess(BatchResult batchResult) {
        // success
    }
    @Override
    public void onFailure(Throwable e) {
        // fail
    }
});
```

**返回结构的 json 示例**

同步执行时，返回数据结构如下：

```json
{
    "succeed": 8, // 成功更新记录数
    "total_count": 10,  // where 匹配的记录数，包括无权限操作记录
    "offset": 0,
    "limit": 1000,
    "next": null, // 下一次更新 url，若为 null 则表示全部更新完毕
    "operation_result": [  // 创建的详细结果
       {
         "success": {      // 成功时会有 success 字段
           "id": "5bffbab54b30640ba8135650",
           "updated_at": 1543486133
         }
       },
       {
         "success": {
           "id": "5bffbab54b30640ba8135651",
           "updated_at": 1543486133
         }
       },
       {
         "error": {     // 失败时会有 error 字段
           "code": 16837,
           "err_msg": "数据更新失败，具体错误信息可联系知晓云微信客服：minsupport3 获取。"
         }
       }
     ]
}
```

异步执行时，返回数据结构如下：

```json
{
    "statys": "ok",
    "operation_id": 1 // 可以用来查询到最终执行的结果
}
```

> **info**
> 获取异步执行结果，请查看接口[文档](/android-sdk/async-job.md)

