# 表格协作者插件

表格编辑器实现协作者渲染功能的插件，用来配合协作者通信通用模块一起使用。

## 构造函数

* 用法

  ```js
    var editor = new shimo.sdk.sheet.Editor()
    var collaboratorEditor = new shimo.sdk.sheet.plugins.Collaborators(editor)

    //使用协作者通用模块，启用协作者渲染功能

    var collaborator = new shimo.sdk.common.Collaborators({
      editor: collaboratorEditor,
      ws: [webSocket],
      guid: [file的guid],
      currentUserId: [当前编辑文档的用户id]
    })

    collaborator.start()
  ```

* 参数

|名称|类型|描述|
| -- | -- | -- |
| `editor` | `Editor` |编辑器的实例|


