# 幻灯片列表插件

幻灯片编辑器实现幻灯片列表的插件，用于显示、选择、重排序幻灯片。

## 构造函数

* 用法

  ```js
    var editor = new shimo.sdk.slide.Editor()
    editor.render(document.getElementById('editor'))
    var filmstrip = new shimo.sdk.slide.plugins.Filmstrip({ editor })
    filmstrip.render(document.getElementById('filmstrip'))
  ```

* 参数

|名称|类型|描述|
| -- | -- | -- |
| `options.editor` | `Editor` |编辑器的实例|


## 析构函数

* 用法

  ```js
    filmstrip.destroy()
    editor.destroy()
  ```
