<!-- ex_nonav -->

# 数据表

数据存储是知晓云提供的核心功能之一，借助它，你可以省去自己搭建数据库，维护数据库及优化数据库查询等麻烦操作。通过以下操作，便可以向在控制台创建的数据表添加一条记录：

要操作数据表，需要借助 `Table` 对象，每个 Table 实例对应一张数据表，通过 Table 实例，你可以对数据表进行增删改查的操作。

当我们需要创建一行新的数据时，使用 `createRecord()` 方法, 该方法无需传入参数，`createRecord()` 方法 返回值为 `Record` 对象。

通过 `Record` 实例的 `put` 和 `save` 方法，可以完成数据行的创建。

```java
try {
    // 通过 `tableName` 实例化一个 `Table` 对象，操作该对象即相当于操作对应的数据表
    Table product = new Table("product");
    // 本地创建一条空记录
    Record record = product.createRecord();
    record.put("name", "apple");
    record.put("price", 1);
    record.put("desc", Arrays.asList("good"));
    record.put("amout", 0);
    // 为上面创建的空记录赋值，并保存到服务器
    record.save();
    // 操作成功
} catch (Exception e) {
    // 操作失败
}
```

**返回示例**

record 具有以下字段：

```json
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


数据表支持多种类型的数据，包括数组类型，时间日期类型，和文件类型，并且支持原子操作等高级功能，如下，既是对产品数量的进行原子性减 1 操作：

通过 `Table` 实例上的 `fetchWithoutData()` 方法，我们得到一个 `Record` 实例，该实例指向了 id 为 `recordID` 的数据行，接下来的对该 `Record` 实例的操作会修改数据表中对应数据行的内容。


```java
Record record = product.fetchWithoutData("recordID");
record.incrementBy("amout", 1);
record.save();
```


同时，SDK 提供了多种复杂查询操作，包括数组查询，甚至是与或的组合查询

阅读以下章节，了解更多数据表操作接口：

* [数据类型](./data-type.md)
* [新增数据项](./create-record.md)
* [更新数据项](./update-record.md)
* [删除数据项](./delete-record.md)
* [获取数据项](./get-record-detail.md)
* [查询数据项](./query.md)
* [分页和排序](./limit-and-order.md)
* [地理位置操作](./geo.md)
