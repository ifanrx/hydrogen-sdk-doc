# 文档目录插件

加载此插件可以使得编辑器支持目录功能。

## 构造函数

* 用法

  ```js
  const editor = new shimo.sdk.document.Editor()
  const tableofcontent = new shimo.sdk.document.plugins.TableOfContent({
    editor,
    ...options
  })

  editor.render(...)
  tableofcontent.render()
  ```

* 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `editor` | `Editor` | 必选 | 编辑器实例 |
