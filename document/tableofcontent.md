# 文档目录插件

加载此插件可以使得编辑器支持目录功能。

## 构造函数

* 用法

  ```js
  const Editor = shimo.sdk.document.Editor
  const TableOfContent = shimo.sdk.document.plugins.TableOfContent
  const editor = new Editor()
  const tableofcontent = new TableOfContent({
    editor,
    ...options
  })
  ```

* 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `editor` | `Editor` | 必选 | 编辑器实例 |

## 方法列表

## render

渲染初始化。

* 返回 `undefined`
* 用法 `tableofcontent.render(container)`
* 参数

| 名称                | 类型             | 默认值 | 描述                |
| ------------------- | --------------- | ----- | ------------------ |
| `container`         | `HTMLElement`   | 无     | 渲染容器     |

## update

更新目录。

* 返回 `undefined`
* 用法 `tableofcontent.update()`
