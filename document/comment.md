# 文档评论插件

加载此插件可以使得编辑器支持划词评论。

## 构造函数

* 用法

  ```js
  const editor = new shimo.sdk.document.Editor()
  const comment = new shimo.sdk.document.plugins.Comment({
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

## 方法列表

## render

渲染初始化。

* 返回 `undefined`
* 用法 `comment.render(container)`
* 参数

| 名称                | 类型             | 默认值 | 描述                |
| ------------------- | --------------- | ----- | ------------------ |
| `container`         | `HTMLElement`   | 无     | 评论组件渲染容器     |

## refresh

主动刷新组件。

* 返回 `undefined`
* 用法 `comment.refresh()`

## addComment

添加评论。

* 返回 `undefined`
* 用法 `comment.addComment(comment)`
* 参数

| 名称               | 类型         | 默认值 | 描述                |
| ----------------- | ------------ | ----- | ------------------ |
| `comment`         | `IComment`   | 无     | 评论内容     |

### IComment 类型声明
```js
interface Icomment {
  commentGuid: string
  selectionGuid: string
  content: string
  createdAt: string
  User: IUser
}
```
** 注：commentGuid => 一条评论，selectionGuid => 一块评论区**

## closeComment

结束一段评论区。

* 返回 `undefined`
* 用法 `comment.closeComment(selectionGuid)`
* 参数

| 名称            | 类型       | 默认值 | 描述            |
| -------------- | ---------- | ----- | -------------- |
| `selectionGuid`         | `string`   | 无     | 评论区的 guid     |

## deleteComment

删除一条评论。

* 返回 `undefined`
* 用法 `comment.closeComment(commentGuid)`
* 参数

| 名称            | 类型       | 默认值 | 描述            |
| -------------- | ---------- | ----- | -------------- |
| `commentGuid`         | `string`   | 无     | 评论条目的 guid     |


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