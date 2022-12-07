# 文件分类操作

## 获取文件分类详情

`Storage.category(categoryId)`

**参数说明**

| 参数        | 类型   | 必填 | 说明 |
| :--------- | :----- | :-- | :-- |
| categoryID | String | Y   | 文件分类 ID |

**FileCategory 的属性**

| 参数        | 类型   | 必填 | 说明 |
| :--------- | :----- | :-- | :-- |
| FileCategory.CREATED_AT | Long   | Y   | 分类创建时间 |
| FileCategory.FILES      | Long   | Y   | 分类下的文件数 |
| FileCategory.ID         | String | Y   | 分类 ID |
| FileCategory.NAME       | String | Y   | 分类名 |
| FileCategory.UPDATE_AT  | Long   | Y   | 分类更新时间 |

**示例代码**

```java
FileCategory category = Storage.category("122");
```

## 获取分类下的所有文件

`Storage.files(query)`

**示例代码**

```java
try {

    // 获取某分类下的文件（第一页）
    Where where = new Where();
    where.equalTo(CloudFile.QUERY_CATEGORY_ID, "124");
    Query query = new Query().limit(10);
    query.put(where);
    PagedList<CloudFile> pageOne = Storage.files(query);
    
    // 操作成功
} catch (Exception e) {
    // 操作失败
}
```

> **info**
> 如需对分类下的文件进行更多条件的筛选，可使用 [File](./file.md) 的查询接口

## 查询，获取分类列表

文件分类查询与[数据表查询](../schema/query.md)方法一致，但只支持以下指定字段的筛选：

| 支持字段 | 类型   | 说明 |
| :----- | :----- | :-- |
| FileCategory.ID     | String | 文件分类 ID |
| FileCategory.NAME   | String | 文件分类名 |

**示例代码**

```java
try {
    // 查询所有分类
    PagedList<FileCategory> all = Storage.categories(null);

    // 查询名为“avatar”的分类
    Where where = new Where();
    // 根据 id 查询分类
    //where.equalTo(FileCategory.ID, "999");
    where.equalTo(FileCategory.NAME, "avatar");
    Query query = new Query();
    query.put(where);
    PagedList<FileCategory> avatar = Storage.categories(query);
    
    // 操作成功
} catch (Exception e) {
    // 操作失败
}
```

## 排序

文件分类查询排序与[数据表排序](../schema/limit-and-order.md)方法一致，但只支持对以下指定字段进行排序：

| 支持字段    | 描述        |
| :--------- | :--------- |
| FileCategory.NAME       | 文件名      |
| FileCategory.CREATE_AT | 文件创建时间 |

## 分页
文件分类查询排序与[数据表分页](../schema/limit-and-order.md)方法一致。