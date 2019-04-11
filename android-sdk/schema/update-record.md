# 更新数据项

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

try {
    record.put("price", 1);
    record.save();
    // 操作成功
} catch (Exception e) {
    // 操作失败
}
```

异常请参考[异常](../error-code.md)

常见错误 HttpException.code ：

| code | 可能的原因       |
|----------------|-----------------|
| 400            | 1. 提交的数据不合法、2. 重复创建数据（设置了唯一索引）    |
| 403            | 没有权限更新数据    |
| 404            | 数据行不存在    |


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
    Record user = Users.userWithoutData("69147880");
    
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
