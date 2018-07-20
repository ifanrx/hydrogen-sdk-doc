# 右键菜单插件

表格右键菜单插件

## 构造函数

* 用法

  ```js
  var editor = new shimo.sdk.sheet.Editor()
  const contextmenu = new window.shimo.sdk.sheet.plugins.ContextMenu({
    editor: editor
  })
  contextmenu.render({
    container: document.getElementById('contextmenu')
  })
  ```

* 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `options.editor` | `Editor` | 必选 | 编辑器实例 |

## 方法列表
### render

渲染右键菜单

| 名称                | 类型          | 默认值 | 描述         |
| ------------------- | ------------- | ------ | ------------ |
| `options.container`   | `HTMLElement`      | 无     | 右键菜单宿主容器 |