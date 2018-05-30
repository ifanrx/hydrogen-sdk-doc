# 幻灯片工具栏插件

幻灯片编辑器实现顶部工具栏的插件，包含新增页面和页面元素、缩放视图、撤销重做等功能。

## 构造函数

* 用法

  ```js
    var editor = new shimo.sdk.slide.Editor()
    editor.render(document.getElementById('editor'))
    var toolbar = new shimo.sdk.slide.plugins.Toolbar({ editor, uploader })
    toolbar.render(document.getElementById('toolbar'))
  ```

* 参数

|名称|类型|描述|
| -- | -- | -- |
| `options.editor` | `Editor` | 编辑器的实例 |
| `options.uploader` | `UploaderConfig` | 上传插件配置 |
| `options.uploader.url` | `string` | 上传URL |
| `options.uploader.token_url` | `string` | 获取token的URL |
| `options.uploader.server` | `string` | 上传接口参数 |


## 析构函数

* 用法

  ```js
    toolbar.destroy()
    editor.destroy()
  ```
