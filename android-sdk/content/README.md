<!-- ex_nonav -->

# 内容库

内容库是知晓云提供的一个方便进行内容管理的功能，你可以在上面创建多个内容库，可以在内容库中创建分类，并提供一个功能丰富的富文本编辑器用于创建内容。借助内容表的功能，你还可以设置自定义的字段，实现更多复杂内容的展示。

SDK 中内置了多个接口，方便你对在控制台中创建的内容库及其中的分类和内容进行获取和查找，如下是查找指定内容库下在指定分类下的内容列表的代码示例：

```java
try {
    Query query = new Query();
    query.put(Content.QUERY_CONTENT_GROUP_ID, "1513076211190694");
    PagedList<Content> list = Contents.contents(query);
    // 操作成功
} catch (Exception e) {
    // 操作失败
}
```

阅读以下章节，了解更多内容库操作接口：

* [内容操作](./operate.md)