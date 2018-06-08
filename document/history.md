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

## 方法列表

## render

渲染初始化。

* 返回 `undefined`
* 用法 `history.render(container)`
* 参数

| 名称                | 类型             | 默认值 | 描述                |
| ------------------- | --------------- | ----- | ------------------ |
| `container`         | `HTMLElement`   | 无     | 渲染容器     |

### saveRevision

保存历史。

* 返回 `Promise`
* 用法 `revision.saveRevision()`

### getLength

获取版本数。

* 返回 `Number`
* 用法 `revision.getLength()`

### quitPreview

退出版本预览模式。

* 返回 `undefined`
* 用法 `revision.saveRevision()`

### previewRevision

预览版本。

* 返回 `Promise`
* 用法 `revision.previewRevision(index)`
* 参数

| 名称                | 类型             | 默认值 | 描述                |
| ------------------- | --------------- | ----- | ------------------ |
| `index`         | `Number`   | 0     | 类型     |

## 事件列表

```js
// 版本保存成功
revision.on(Revision.evetns.SAVE, () => {})
// 退出版本预览
revision.on(Revision.events.QUIT, () => {})
// 版本还原成功
revision.on(Revision.events.REVERT, () => {})
```