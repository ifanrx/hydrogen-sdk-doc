# 文档版本插件

加载此插件可以启用版本功能。

## 构造函数

* 用法

  ```js
  const Editor = shimo.sdk.document.Editor
  const Revision = shimo.sdk.document.plugins.Revision
  const editor = new Editor()
  const revision = new Revision({
    ...options
  })
  ```

* 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `editor` | `Editor` | 必选 | 编辑器实例 |
| `guid` | `String`  | 必选 | 文档guid |
| `highlight` | `Boolean` | 必选 | 是否高亮 |

## 方法列表

## render

渲染初始化。

* 返回 `undefined`
* 用法 `revision.render(container)`
* 参数

| 名称                | 类型             | 默认值 | 描述                |
| ------------------- | --------------- | ----- | ------------------ |
| `container`         | `HTMLElement`   | 无     | 渲染容器     |

### saveRevision

保存版本。

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