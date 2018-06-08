# 文档mention插件

加载此插件可以使得编辑器支持@人与文件。

## 构造函数

* 用法

  ```js
  const Editor = shimo.sdk.document.Editor
  const Mention = shimo.sdk.document.plugins.Mention
  const editor = new Editor()
  const mention = new Mention({
    editor,
    ...options
  })
  ```

* 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `editor` | `Editor` | 必选 | 编辑器实例 |
| `id` | `string` | 可选 | 容器id |
| `scrollContainer` | `Element` | 可选 | 滚动容器 |
| `docType` | `['richdoc', 'modoc']` | 可选 | 编辑器实例 |
| `service` | `object` | 可选 | 接口配置 |
| `service.recentConcats` | `string` | 可选 | 最近联系人 |
| `service.recentFiles` | `string` | 可选 | 最近文件 |
| `service.searchApi` | `string` | 可选 | 最近搜索 |
| `data` | `object` | 可选 | 数据配置 |
| `data.fileId` | `string` | 可选 | 文件id |
| `data.fileTeamId` | `string` | 可选 | 文件组id |
| `data.teamId` | `string` | 可选 | 用户组id |

## 方法列表

## render

渲染初始化。

* 返回 `undefined`
* 用法 `mention.render(container)`
* 参数

| 名称                | 类型             | 默认值 | 描述                |
| ------------------- | --------------- | ----- | ------------------ |
| `container`         | `HTMLElement`   | 无     | 渲染容器     |

## dispatch

触发器。

* 返回 `undefined`
* 用法 `mention.dispatch(type, data)`
* 参数

| 名称                | 类型             | 默认值 | 描述                |
| ------------------- | --------------- | ----- | ------------------ |
| `type`         | `['show' , 'hide']`   | 必选     | 类型     |
| `data`         | `object`   | 无     | 数据     |
| `data.keyword`         | `string`   | 必选     | @字符后，用户输入的文本     |
| `data.x`         | `number`   | 必选     | 相对文档的横坐标     |
| `data.y`         | `number`   | 必选     | 相对文档的纵坐标     |
| `data.triggerDom`  | `HTMLElement`   | 可选     | dom节点     |
| `data.direction`  | `['top', 'bottom']`   | 可选     | 弹层位置     |


## next

选中下一个搜索项。

* 返回 `undefined`
* 用法 `mention.next()`

## prev

选中上一个搜索项。

* 返回 `undefined`
* 用法 `mention.prev()`

## 确认

确认@项。

* 返回 `string`
* 用法 `mention.confirm()`

## 事件列表

```js
// 搜索前
mention.on(Mention.events.SEARCHBEFORE, () => {})
// 搜索后
mention.on(Mention.events.SEARCHAFTER, () => {})
// 确认
mention.on(Mention.events.COMPLETED, () => {})
// 下拉框显示
mention.on(Mention.events.SHOW, () => {})
// 下拉框隐藏
mention.on(Mention.events.HIDE, () => {})
```