# 文档历史插件

加载此插件可以启用历史功能。

## 构造函数

* 用法

```js
const Editor = shimo.sdk.document.Editor
const History = shimo.sdk.document.plugins.History
const editor = new Editor()
const history = new History({
  ...options
})
```

* 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `editor` | `Editor` | 必选 | 编辑器实例 |
| `guid` | `String`  | 必选 | 文档guid |
| `height` | `String` | 必选 | 高度 |
| `service` | `Service` | 可选 | 接口配置 |

* Service

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `fetch` | `string` | 可选 | 获取历史列表的接口 |
| `revert` | `string` | 可选 | 还原某一历史接口 |
| `user` | `string` | 可选 | 根据id列表获取用户详细信息接口 |

## 方法列表

## render

渲染初始化。

* 返回 `undefined`
* 用法 `history.render(container)`
* 参数

| 名称                | 类型             | 默认值 | 描述                |
| ------------------- | --------------- | ----- | ------------------ |
| `container`         | `HTMLElement`   | 可选     | 渲染容器     |

## update

更新数据。

* 返回 `undefined`
* 用法 `history.update()`

## show

显示历史

* 返回 `undefined`
* 用法 `history.show()`

## hide

隐藏历史

* 返回 `undefined`
* 用法 `history.hide()`

## destroy

销毁实例。

* 返回 `undefined`
* 用法 `history.destroy()`
