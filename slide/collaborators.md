# 幻灯片协作者插件

幻灯片编辑器实现协作者渲染功能的插件，用来配合协作者通信通用模块一起使用。

## 构造函数

* 用法

  ```js
    var editor = new shimo.sdk.slide.Editor()
    var collaboratorEditor = new shimo.sdk.slide.plugins.Collaborators({
      editor,
      currentUserId: <当前编辑文档的用户id>
    })

    //使用协作者通用模块，启用协作者渲染功能

    var collaborator = new shimo.sdk.common.Collaborators({
      editor: collaboratorEditor,
      ws: <webSocket>,
      guid: <file的guid>,
      currentUserId: <当前编辑文档的用户id>
    })

    collaborator.start()
  ```

* 参数

|名称|类型|描述|
| -- | -- | -- |
| `options.editor` | `Editor` | 编辑器的实例 |
| `options.currentUserId` | `string` | 当前用户id |


## 析构函数

* 用法

  ```js
    collaborator.destroy()
    collaboratorEditor.destroy()
    editor.destroy()
  ```
