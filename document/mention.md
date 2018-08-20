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
| `service` | `Service` | 可选 | 接口配置 |
| `data` | `Data` | 可选 | 数据配置 |

* Service

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `recentConcats` | `string` | 必选 | 最近联系人 |
| `recentFiles` | `string` | 必选 | 最近使用文件 |
| `searchApi` | `string` | 必选 | 搜索接口 |

* Data

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `fileId` | `string` | 必选 | 文件id |
| `fileTeamId` | `string` | 必选 | 文件组id |
| `teamId` | `string` | 必选 | 用户组id |

## 方法列表

## render

渲染初始化。

* 返回 `undefined`
* 用法 `mention.render(container)`
* 参数

| 名称                | 类型             | 默认值 | 描述                |
| ------------------- | --------------- | ----- | ------------------ |
| `container`         | `HTMLElement`   | 可选     | 渲染容器     |

## destroy

销毁实例。

* 返回 `undefined`
* 用法 `mention.destroy()`

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