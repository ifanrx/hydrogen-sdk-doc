# 文档目录插件

加载此插件可以使得编辑器支持目录功能。

## 构造函数

* 用法

```js
const Editor = shimo.sdk.document.Editor
const TableOfContent = shimo.sdk.document.plugins.TableOfContent
const editor = new Editor()
const tableOfContent = new TableOfContent({
  editor,
  ...options
})
```

* 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `editor` | `Editor` | 必选 | 编辑器实例 |

## 方法列表

## render

渲染初始化。

* 返回 `undefined`
* 用法 `tableOfContent.render(container)`
* 参数

| 名称                | 类型             | 默认值 | 描述                |
| ------------------- | --------------- | ----- | ------------------ |
| `container`         | `HTMLElement`   | 可选     | 渲染容器     |

## show

显示目录

* 返回 `undefined`
* 用法 `tableOfContent.show()`

## hide

隐藏目录

* 返回 `undefined`
* 用法 `tableOfContent.hide()`

## destroy

销毁实例。

* 返回 `undefined`
* 用法 `tableOfContent.destroy()`

## 事件列表

```js
// 目录显示
tableOfContent.on(TableOfContent.events.SHOW, () => {})
// 目录隐藏
tableOfContent.on(TableOfContent.events.HIDE, () => {})
// 目录更新
tableOfContent.on(TableOfContent.events.UPDATE, () => {})
```