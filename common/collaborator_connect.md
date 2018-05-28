# 协作者通信

协作者通信模块适用于需要协同展示协作者信息的场景，例如文档协同编辑时展示协作者正在编辑的行及对应的协作者名，或者编辑表格时实时显示协作者正在编辑的单元格及协作者名。

该模块需要后端服务支持，同时需要配合编辑器的支持协作者插件一起使用。

## 构造函数

* 用法

  ```js
    new shimo.sdk.common.Collaborators(options)
  ```

* 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| *`options.ws` | `WebSocket的实例` | 必选 | 已和后端服务连接成功的一个WebSocket实例 |
| *`options.guid` | `string` | 必选 | 文档唯一标示符 |
| *`options.currentUserId` | `string` | 必选 | 当前编辑文档的用户id，登录服务端后获取 |
| `options.editor` | `CollaboratorEditor` | 必选 | 应用协作者插件后的编辑器实例 |


> * 带`*`表示需要后端服务提供数据；
> * 模块必须在WebSocket的实例连接成功后使用，模块不处理WebSocket的实例初始化和回收；
> * 传入的编辑器实例必须由相应的实现协作者功能的编辑器插件生成，具体参考各编辑器的协作者插件文档；


## 属性列表

|名称|类型|描述|
| -- | -- | -- |
| `guid` | `string` | 文档唯一标示 |

## 方法列表

### start
  开始运行模块。

  * 返回 `undefined`
  * 用法 `instance.start()`

### destroy
  停止运行模块。

  * 返回 `undefined`
  * 用法 `instance.destroy()`

