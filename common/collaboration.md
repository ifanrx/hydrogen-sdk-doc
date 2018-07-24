# 协同编辑

协同编辑模块通过和服务器通信，实现多人实时协作功能。该模块需要后端服务支持。

## 构造函数

* 用法

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
| *`options.selectUrl` | `string` | 可选 | 选取状态 url |
| `options.editor` | `Editor` | 必选 | 编辑器实例 |


> * 带`*`表示需要后端服务提供数据；
> * `pullUrl` 和 `composeUrl` 可以提供 `{guid}` 占位符以使用 RESTFUL 方式的 url；如 `/files/{guid}/compose`， `{guid}` 会被自动替换成 `options.guid`；
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

### getCollaborators
  获取当前协作者列表。

  * 返回 `[{ user: { id, name, avatar } }]`
  * 用法 `instance.getCollaborators()`


## 事件列表

### error
  保存失败

  事件触发后，此时用户继续编辑的内容可能会无法保存。


### `saveStatusChange`
  保存状态

  用法

```js
collaboration.on('saveStatusChange', status => { /* TODO */ })
```

  status 值：

|值|描述|
|--|--|
|`offline`|离线状态|
|`offlineSaving`|正在离线保存|
|`offlineSaved`|离线保存成功|
|`offlineSaveFailed`|离线保存失败|
|`online`|在线状态，文档将实时保存|
|`onlineSaving`|保存中|
|`onlineSaved`|保存成功|
|`onlineSaveFailed`|保存失败，此时用户继续编辑的内容可能会无法保存|
|`serverChangeApplied`|文档已更新，表示收到了来自其他人的改动|

### `broadcast`
  广播

  用法

```js
collaboration.on('broadcast', messages => { /* TODO */ })
```

messages 为数组格式，内容为通过 `POST files/:file/broadcast 发送的表单对象或 json 对象，[API 文档](/server/file.md#guang-bo)

### `enter`
  协作者加入

  用法

```js
collaboration.on('enter', data => { /* TODO */ })
```

data 格式：

```json
{
  user: {
    id: 1,
    name: 'tom',
    avatar: 'https://avatar.com/avatar'
  }
}
```

### `leave`
  协作者离开

  用法

```js
collaboration.on('leave', data => { /* TODO */ })
```

data 格式：

```json
{
  user: {
    id: 1,
    name: 'tom',
    avatar: 'https://avatar.com/avatar'
  }
}
```

## 示例


### 表格的选取展示

表格的选取展示可以在当前表格显示出其他协作者目前在哪个单元格上操作。需要配置了`selectUrl`后使用。`selectUrl`仅为表格和幻灯片提供，使用时需要赋给编辑器实例`collaborators`属性再传递给`Collaboration`构造函数，如：

```js
const editor = window.sheetEditor = new window.shimo.sdk.sheet.Editor({
  uploadConfig: {
    origin: shimo.uploadOrigin,
    server: 'aws',
    token: shimo.uploadToken
  }
})

// 在这里赋值
editor.collaborators = new shimo.sdk.sheet.plugins.Collaborators({ editor })

const collaboration = new shimo.sdk.common.Collaboration({
  editor,
  rev: data.head,
  guid: data.guid,
  pullUrl: `${shimo.entrypoint}/files/${data.guid}/pull?accessToken=${shimo.token}`,
  storage: { set () {} },
  composeUrl: `${shimo.entrypoint}/files/${data.guid}/compose?accessToken=${shimo.token}`,
  selectUrl: `${shimo.entrypoint}/files/${data.guid}/select?accessToken=${shimo.token}`,
})
collaboration.start()
```