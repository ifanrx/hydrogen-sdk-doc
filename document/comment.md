# 文档评论插件

加载此插件可以使得编辑器支持划词评论。

## 构造函数

* 用法

  ```js
  const Editor = shimo.sdk.document.Editor
  const Comment = shimo.sdk.document.plugins.Comment
  const editor = new Editor()
  const comment = new Comment({
    editor,
    ...options
  })

  editor.render(...)
  comment.render(...)
  ```

* 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `editor` | `Editor` | 必选 | 编辑器实例 |
| `updateDuration` | `number` | 10000(ms) | 更新时间间隔 |
| `zIndex` | `number` | 100 | 设置层级 |
| `service` | `object` | 可选 | 接口配置 |
| `service.fetch` | `string` | 可选 | 获取评论列表的接口 |
| `service.create` | `string` | 可选 | 创建评论的接口 |
| `service.delete` | `string` | 可选 | 删除评论的接口 |
| `service.close` | `string` | 可选 | 关闭评论的接口 |
| `mentionable` | `boolean` | 可选 | 是否开启 @ 功能 |
| `mentionData` | `{ fileId:string, teamId:number }` | 可选 | 开启 @ 功能之后, 该功能所需的参数数据 |

## 方法列表

## render

渲染初始化。

* 返回 `undefined`
* 用法 `comment.render(container)`
* 参数

| 名称                | 类型             | 默认值 | 描述                |
| ------------------- | --------------- | ----- | ------------------ |
| `container`         | `HTMLElement`   | 无     | 渲染容器     |

## refresh

主动刷新组件。

* 返回 `undefined`
* 用法 `comment.refresh()`

## 事件列表

```js
// 异常信息
comment.on(Comment.events.ERROR, (err) => void)
// 结束一组评论
comment.on(Comment.events.CLOSE_GROUP, (selectionGuid:string) => void)
// 创建一个评论
comment.on(Comment.events.CREATED, (comment) => void)
// 功能关闭后
comment.on(Comment.events.CLOSE, () => void)
```
