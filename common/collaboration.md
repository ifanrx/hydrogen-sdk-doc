# 协同编辑

协同编辑模块通过和服务器通信，实现多人实时协作功能。该模块需要后端服务支持。

## 构造函数

* 构造函数

  ```js
    new shimo.sdk.common.Collaboration(options)
  ```

* 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| *`options.rev` | `number` | 必选 | 文档当前版本号 |
| *`options.guid` | `string` | 必选 | 文档唯一标示符 |
| *`options.pullUrl` | `string` | 必选 | 获取改动 url |
| *`options.composeUrl` | `string` | 必选 | 发送改动 url |
| `options.editor` | `Editor` | 必选 | 编辑器实例 |


> * 带`*`表示需要后端服务提供数据；
> * `pullUrl` 和 `composeUrl` 可以提供 `{guid}` 占位符以使用 RESTFUL 方式的 url；如 `/files/{guid}/compose`， `guid` 会被自动替换成 `options.guid`；
> * 编辑器内容必须由后端服务指定；
> * 模块必须在编辑器设置了内容，并且初始化成功后才能开始运行；


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

