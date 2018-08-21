# 文档协作者插件

加载此插件可以使得编辑器支持协作编写者的相关功能。
如记录编写者、显示编写者信息、显示协作者头像或光标的实时位置等。
依赖通用协作模块。

## 构造函数

* 用法

```js
const Editor = shimo.sdk.document.Editor
const Collaboration = shimo.sdk.common.Collaboration
const Collaborator = shimo.sdk.document.plugins.Collaborator

const editor = new Editor()
const collab = new Collaboration(...)
const collaborator = new Collaborator({
  editor,
  ...options
})

editor.render(...)
collaborator.render(collab)
```

* 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `editor` | `Editor` | 必选 | 编辑器实例 |
| `user` | `User` | 必选 | 用户信息 |
| `service` | `Service` | 必选 | 接口配置 |
| `avatarTrack` | `boolean` | false | 是否显示左侧协作者头像追踪 |
| `cursorTrack` | `boolean` | false | 是否显示协作者光标位置追踪 |

* User

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `id` | `number` | 必选 | 用户唯一标识 |
| `name` | `string` | 必选 | 用户昵称 |
| `avatar` | `string` | 必选 | 用户头像路径 |

* Service

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `user` | `string` | 必选 | 根据id列表获取用户详细信息接口 |

## 方法列表

## render

渲染初始化。

* 返回 `undefined`
* 用法 `collaborator.render(collab)`
* 参数

| 名称                | 类型             | 默认值 | 描述                |
| ------------------- | --------------- | ----- | ------------------ |
| `collab`         | `Collaboration`   | 无     | 协同模块实例     |

## show

显示协作者信息

* 返回 `undefined`
* 用法 `collaborator.show()`

## hide

隐藏协作者信息

* 返回 `undefined`
* 用法 `collaborator.hide()`

## destroy

销毁实例。

* 返回 `undefined`
* 用法 `collaborator.destroy()`

## 事件列表

```js
// 协作者信息显示
collaborator.on(Collaborator.events.SHOW, () => {})
// 协作者信息隐藏
collaborator.on(Collaborator.events.HIDE, () => {})
// 协作者信息更新
collaborator.on(Collaborator.events.UPDATE, () => {})
```
