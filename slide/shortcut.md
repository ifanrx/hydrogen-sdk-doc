# 幻灯片快捷键插件

幻灯片编辑器实现快捷键的插件，包含删除元素、复制粘贴、播放控制、撤销重做的快捷键。

## 构造函数

* 用法

  ```js
    var editor = new shimo.sdk.slide.Editor()
    editor.render(document.getElementById('editor'))
    var shortcut = new shimo.sdk.slide.plugins.Shortcut({ editor })
  ```

* 参数

|名称|类型|描述|
| -- | -- | -- |
| `options.editor` | `Editor` |编辑器的实例|


## 析构函数

* 用法

  ```js
    shortcut.destroy()
    editor.destroy()
  ```
