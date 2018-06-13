# 文档相册插件

加载此插件，编辑器中插入的图片可以相册查看。

## 构造函数

* 用法

  ```js
  const Editor = shimo.sdk.document.Editor
  const Gallery = shimo.sdk.document.plugins.Gallery
  const editor = new Editor()
  const gallery = new Gallery({
    editor
  })

  editor.render(...)
  gallery.render()
  ```

* 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `editor` | `Editor` | 必选 | 编辑器实例 |

## 方法列表

## render

渲染初始化。

* 返回 `undefined`
* 用法 `gallery.render()`

## destory

使用完销毁。

* 返回 `undefined`
* 用法 `gallery.destory()`
