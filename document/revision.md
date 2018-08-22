# 文档版本插件

加载此插件可以启用版本功能。

## 构造函数

* 用法

```js
const Editor = shimo.sdk.document.Editor
const Revision = shimo.sdk.document.plugins.Revision
const editor = new Editor()
const revision = new Revision({
  editor: editor,
  ...options
})
```

* 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `editor` | `Editor` | 必选 | 编辑器实例 |
| `guid` | `String`  | 必选 | 文档guid |
| `highlight` | `Boolean` | 必选 | 是否高亮 |
| `service` | `Service` | 可选 | 接口配置 |

* Service

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `length` | `string` | 可选 | 获取版本列表长度接口 |
| `fetch` | `string` | 可选 | 获取版本列表接口 |
| `fetchTitle` | `string` | 可选 | 获取版本标题接口 |
| `fetchContent` | `string` | 可选 | 获取版本内容接口 |
| `generate` | `string` | 可选 | 保存版本接口 |
| `revert` | `string` | 可选 | 恢复到版本接口 |
| `postRename` | `string` | 可选 | 重命名版本接口 |
| `delete` | `string` | 可选 | 删除版本接口 |
| `user` | `string` | 可选 | 根据id列表获取用户详细信息接口 |

## 方法列表

## render

渲染初始化。

* 返回 `undefined`
* 用法 `revision.render(container)`
* 参数

| 名称                | 类型             | 默认值 | 描述                |
| ------------------- | --------------- | ----- | ------------------ |
| `container`         | `HTMLElement`   | 可选     | 渲染容器     |

### save

保存版本。

* 返回 `Promise`
* 用法 `revision.save()`

### getCount

获取版本数。

* 返回 `Number`
* 用法 `revision.getCount()`

### quit

退出版本预览模式。

* 返回 `undefined`
* 用法 `revision.quit()`

### preview

预览版本。

* 返回 `Promise`
* 用法 `revision.preview(index)`
* 参数

| 名称                | 类型             | 默认值 | 描述                |
| ------------------- | --------------- | ----- | ------------------ |
| `index`         | `Number`   | 0     | 类型     |

### show

显示版本

* 返回 `undefined`
* 用法 `revision.show()`

### hide

隐藏版本

* 返回 `undefined`
* 用法 `revision.hide()`

## destroy

销毁实例。

* 返回 `undefined`
* 用法 `revision.destroy()`

## 事件列表

```js
// 版本保存成功
revision.on(Revision.evetns.SAVE, () => {})
// 进入版本预览模式
revision.on(Revision.events.ENTER, () => {})
// 退出版本预览
revision.on(Revision.events.QUIT, () => {})
// 版本还原成功
revision.on(Revision.events.REVERT, () => {})
```