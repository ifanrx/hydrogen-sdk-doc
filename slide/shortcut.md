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

## 快捷键列表

↑/↓/←/→

|操作|快捷键|
| -- | -- |
| `删除选中元素/幻灯片` | `Backspace` |
| `复制元素` | `⌘ + C` |
| `粘贴元素` | `⌘ + V` |
| `播放时切换下一张` | `↓ 或 →` |
| `播放时切换上一张` | `↑ 或 ←` |
| `撤销` | `⌘ + Z` |
| `重做` | `⌘ + Y 或 ⌘ + Shift + Z` |
