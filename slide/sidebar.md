# 幻灯片侧边栏插件

幻灯片编辑器实现侧边栏的插件，包含样式、动画、主题三个面板，用于修改相应元素的属性。

## 构造函数

* 用法

  ```js
    var editor = new shimo.sdk.slide.Editor()
    editor.render(document.getElementById('editor'))
    var sidebar = new shimo.sdk.slide.plugins.Sidebar({ editor })
    sidebar.render(document.getElementById('sidebar'))
  ```

* 参数

|名称|类型|描述|
| -- | -- | -- |
| `options.editor` | `Editor` |编辑器的实例|


## 析构函数

* 用法

  ```js
    sidebar.destroy()
    editor.destroy()
  ```
