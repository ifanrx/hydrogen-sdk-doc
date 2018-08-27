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
comment.render()
```

* 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `editor` | `Editor` | 必选 | 编辑器实例 |
| `updateDuration` | `number` | 10000(ms) | 更新时间间隔 |
| `zIndex` | `number` | 100 | 设置层级 |
| `user` | `User` | 必选 | 用户信息 |
| `service` | `Service` | 可选 | 接口配置 |
| `mentionable` | `boolean` | 默认为true | 是否开启 @ 功能 |
| `mention` | `MentionOptions` | 可选 | @ 功能所需参数 |

* User

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `id` | `number` | 必选 | 用户唯一标识 |
| `name` | `string` | 必选 | 用户昵称 |
| `avatar` | `string` | 必选 | 用户头像路径 |

* Service

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `fetch` | `string` | 可选 | 获取评论列表的接口 |
| `create` | `string` | 可选 | 创建评论的接口 |
| `delete` | `string` | 可选 | 删除评论的接口 |
| `close` | `string` | 可选 | 关闭评论的接口 |

* MentionOptions

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `service` | `MentionService` | 可选 | mention接口配置 |
| `data` | `mentionData` | 可选 | mention数据配置 |

* MentionService

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `recentContacts` | `string` | 必选 | 最近联系人 |
| `recentFiles` | `string` | 必选 | 最近使用文件 |
| `searchApi` | `string` | 必选 | 搜索接口 |

* mentionData

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `fileId` | `string` | 必选 | 文件id |
| `fileTeamId` | `string` | 必选 | 文件组id |
| `teamId` | `string` | 必选 | 用户组id |

## 方法列表

## render

渲染初始化。

* 返回 `undefined`
* 用法 `comment.render(container)`
* 参数

| 名称                | 类型             | 默认值 | 描述                |
| ------------------- | --------------- | ----- | ------------------ |
| `container`         | `HTMLElement`   | 可选     | 渲染容器     |

## update

主动更新数据。

* 返回 `undefined`
* 用法 `comment.update()`

## show

显示评论

* 返回 `undefined`
* 用法 `comment.show()`

## hide

隐藏评论

* 返回 `undefined`
* 用法 `comment.hide()`

## destroy

销毁实例。

* 返回 `undefined`
* 用法 `comment.destroy()`

## 事件列表

```js
// 异常信息
comment.on(Comment.events.ERROR, (err) => void)
// 结束一组评论
comment.on(Comment.events.CLOSE_GROUP, (selectionGuid:string) => void)
// 创建一个评论
comment.on(Comment.events.CREATED, (comment) => void)
// 评论功能关闭后
comment.on(Comment.events.CLOSE, () => void)
```
