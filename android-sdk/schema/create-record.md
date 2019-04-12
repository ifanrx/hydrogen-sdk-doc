# 新增数据记录

## 操作步骤

1.通过 `tableName` 实例化一个 `Table` 对象，操作该对象即相当于操作对应的数据表

```java
Table product = new Table("product");
```

2.本地创建一条空记录

`Record record = product.createRecord()`

3.为上面创建的空记录赋值

`record.put("name", "new arrived")`

该方法支持两种类型的赋值操作：

a.一次性赋值：

```java
Record template = new Record();
template.put("category_id", 999);
template.put("location", "sxz");

Record red = product.createRecord();
red.putAll(template);

Record blue = product.createRecord();
blue.putAll(template);
```

b.逐个赋值

```java
record.put("name", "new arrived");
record.put("price", 999);
```

> **info**
> 对同一字段进行多次 `put` 操作，后面的数据会覆盖掉前面的数据

4.将创建的记录保存到服务器

`record.save()` or `record.saveInBackground(callback)`

通过上面的四个步骤，即完成了一条记录的插入，具体操作阅读以下内容。


## 添加普通数据

**请求示例**

```java
Table fruits = new Table("fruits");

// 设置方式一，每个属性逐个赋值
Record apple = fruits.createRecord().put("name", "apple");

// 设置方式二，构造一个模板保存通用属性，批量赋值
Record template = new Record();
template.put("category_id", 999);
template.put("location", "sxz");
Record banana = fruits.createRecord().put("name", "banana").putAll(template);

// 同步版本的保存
try {
    red.save();
    blue.save();
    // 操作成功
} catch (Exception e) {
    // 操作失败
}

// 异步回调版本
apple.saveInBackground(new Callback<Record>() {
    @Override
    public void onSuccess(@Nullable Record record) {
        // 保存成功
    
    @Override
    public void onFailure(Exception e) {
        // 保存失败
    }
});
banana.saveInBackground(new Callback<Record>() {
    @Override
    public void onSuccess(@Nullable Record record) {
        // 保存成功
    }
    
    @Override
    public void onFailure(Exception e) {
        // 保存失败
    }
});

```

**操作结果**

没有异常抛出则表示操作成功，此时 record 的值已同步至最新。

异常请参考[异常](../error-code.md)

当抛出 `HttpException` 时，`code` 是 http code，常见的有：

| http code | 可能的原因       |
|----------------|------------------|
| 400            | 1. 提交的 ACL 权限不合法 、2. 提交的数据的字段类型不匹配、 3. 提交的数据中没有包含必填项 4. 重复创建数据（设置了唯一索引） |
| 403            | 没有权限写入数据    |
| 404            | 写入的数据表不存在   |


> **info**
> 对于不合法的数据，知晓云会进行过滤。比如开发者尝试在 integer 类型的字段写入 string 类型的数据，该操作不会报错而是会忽略对该字段的修改。
> 执行 `save()` 后，本地的 record 会同步至服务器上的最新版本，因此可以检查本地 record 中对应的字段来判断某些字段是否添加成功。


## 添加日期时间 Calendar 类型的数据

数据表允许添加时间日期类型的列，为该类型的记录赋值，需要使用 `Calendar`，如 Product 表定义一个时间日期类型的列 expiration_time，创建一条记录时，该字段的赋值操作如下：

```js
Calendar expiration = Calendar.getInstance();
expiration.set(Calendar.YEAR, 2021);
record.put("expiration_time", expiration);
```

## 添加 file 类型数据

```java
try {
    ...
    CloudFile file = Storage.uploadFile(filename, bytes);
    record.put("avatar", file);
    record.save();
    // 操作成功
} catch (Exception e) {
    // 操作失败
}
```

<span class="attention">注：</span> 添加记录时为字段设置的数据，要与预先在知晓云平台设定的字段的数据类型一致，当仅更新一个字段，并且使用的数据不合法时，将无法成功保存，请求返回 `Failed to save record, type conflict on fields` 错误，如果更新多个字段，其中有一个或一个以上字段数据合法，则请求成功，但其中数据不合法的字段将不会成功保存，如下示例：

```java
/*
 * 同时设置 amount 和 date 字段，其中 date 为日期类型，这里为其赋了一个 string 类型的值，
 * 该请求会返回 200，但只有 amount 被成功设置为 10
 */

record.put("amout", 10);
record.put("date", "abc");
record.save();
```

## 添加 object 类型数据

对于未知的类型（比如用户自定义的 Product），sdk 会直接通过 gson 序列化为 json 字符串，所以类型的属性不能被混淆（或者添加 @SerializedName）

对象内的属性名只能包含字母、数字和下划线，必须以字母开头，比如 `{$ifanr.x: 123}` 和 `{知晓云: "test"}` 是错误的

## 添加 array 类型数据

添加 array 类型数据的方法与添加其他类型数据的方法基本一致。区别在于，array 类型数据是将一个的数组赋值给某个字段。

array 类型数据中的元素类型，要与预先在知晓云平台设定的字段类型一致。否则创建的数据将不包含该 array 类型的字段。

```java
record.put("tags", Arrays.asList("phone", "company", "branch"));
```

## 添加 pointer 类型数据 

> **info**
> 每张表最多能建立 3 个 pointer 类型的字段。如有更多需求，请提交工单说明  
> pointer 指向的数据表，不能改名或删除

假设现在有一张 Article 表, Article 表部分字段如下:

| 字段名          | 字段类型          | 说明                 |
|----------------|------------------|----------------------|
| comment        |  pointer         | 指向了 `Comment` 表     |
| user           |  pointer         | 指向了 `_userprofile` 表     |

现在在 Article 表中新增一条数据，其中: 

comment 字段指向了 Comment 表中 id 为 5bad87ab0769797b4fb27a1b 的数据行

user 字段指向了 _userprofile 表中 id 为 69147880 的数据行

```java
try {
    Table comments = new Table("Comment");
    Table articles = new Table("Article");

    // 5bad87ab0769797b4fb27a1b 为 Comment 表中某行数据的 id
    Record comment = comments.fetchWithoutData("5bad87ab0769797b4fb27a1b");
    // 69147880 为 _userprofile 表中某行数据的 id
    User user = Users.userWithoutData(69147880);
    
    Record article = articles.createRecord();
    article.put("comment", comment);
    article.put("user", user);
    article.save();
    // 操作成功
} catch (Exception e) {
    // 操作失败
}
```

## 批量新增数据项

`Table.batchSave(records)`

**请求示例**

```java
Table fruits = new Table("fruits");
Record apple = fruits.createRecord().put("name", "apple");
Record banana = fruits.createRecord().put("name", "banana");

// 同步版本
try {
    fruits.batchSave(Arrays.listOf(apple, banana));
    // 操作成功
} catch (Exception e) {
    // 操作失败
}

// 异步回调版本
fruits.batchSaveInBackground(Arrays.listOf(apple, banana), new Callback<BatchResult>() {
    @Override
    public void onSuccess(@Nullable BatchResult batchResult) {
        // 批量保存成功，拿到结果
    }

    @Override
    public void onFailure(Exception e) {
        // 批量保存失败了
    }
});
```

异常[异常](../error-code.md)

当返回 `HttpException` 时，常见的 code 为：

| http code | 可能的原因        |
|----------------|------------------|
| 400            | 1. 提交的 ACL 权限不合法 、2. 提交的数据的字段类型不匹配、 3. 提交的数据中没有包含必填项 4. 重复创建数据（设置了唯一索引） |
| 403            | 没有权限写入数据    |
| 404            | 写入的数据表不存在  |
