# 表格工具栏插件

表格编辑器实现顶部工具栏的插件，包含加粗、斜体、下划线、字体颜色、背景颜色，边框线、合并单元格、对齐方式、冻结、排序、筛选、上传图片、条件格式、公式等功能。

## 构造函数

* 用法

  ```js
  var editor = new shimo.sdk.sheet.Editor();
  editor.render({
    content: [表格内容],
    container: [表格渲染容器]
  });

  var toolbar = new shimo.sdk.sheet.plugins.Toolbar({ editor });
  toolbar.render({
    container: [表格工具栏容器]
  });
  ```

* 参数

| 名称             | 类型     | 默认值 | 描述       |
| ---------------- | -------- | ------ | ---------- |
| `options.editor` | `Editor` | 必选   | 编辑器实例 |
