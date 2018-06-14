# 历史侧边栏插件

包括历史列表和预览，版本列表和预览

## 构造函数

* 用法

  ```js
  var editor = new shimo.sdk.sheet.Editor()
  var sidebar = new shimo.sdk.sheet.plugins.HistorySidebarSkeleton({
      editor: editor,
      container: $('#sidebar-container'),
      guid: '',
      currentUserId: ''
      history: {
        loadHistoryUrl: `/api/docsidebarinfo/${guid}`,
        revertUrl: `/history/${guid}/revert`,
        snapshotUrl: `/api/files/${guid}/snapshot`,
        loadStepsUrl: `/api/files/${guid}/sheet_histories`,
      },
      version: {
        loadHistoryUrl: `/api/docsidebarinfo/${guid}`,
        loadVersionListUrl: `/api/files/${guid}/revisions`,
        revertVersionUrl: `/history/${guid}/revert`,
        deleteVersionUrl: `/smapi/files/${guid}/revisions`,
        updateVersionUrl: `/smapi/files/${guid}/revisions`,
        snapshotUrl: `/api/files/${guid}/snapshot`,
        loadStepsUrl: `/api/files/${guid}/sheet_histories`
      }
  })
  ```

* 参数

| 名称               | 类型      | 默认值  | 描述             |
| ------------------ | --------- | ------- | ---------------- |
| `options.editor` | `Editor` | 必选 | 编辑器实例 |
| `options.container` | `HTMLElement` | 必选 | 侧边栏宿主容器 |
| `options.guid` | `String` | 必选 | file 的 guid |
| `options.currentUserId` | `String` | 必选 | 当前用户 id |
| `options.history` | `Object` | 可选 | 历史列表和预览配置 |
| `options.history.loadHistoryUrl` | `string` | 必选 | 加载历史列表 url |
| `options.history.revertUrl` | `string` | 必选 | 还原历史记录 url |
| `options.history.snapshotUrl` | `string` | 必选 | 加载历史快照 url |
| `options.history.loadStepsUrl` | `string` | 必选 | 加载历史碎片 url |
| `options.version` | `Object` | 可选 | 版本列表和预览配置 |
| `options.version.loadHistoryUrl` | `string` | 必选 | 加载历史列表 url |
| `options.version.loadVersionListUrl` | `string` | 必选 | 加载版本列表 url |
| `options.version.revertVersionUrl` | `string` | 必选 | 还原版本记录 url |
| `options.version.deleteVersionUrl` | `string` | 必选 | 删除版本记录 url |
| `options.version.updateVersionUrl` | `string` | 必选 | 更新版本记录 url |
| `options.version.snapshotUrl` | `string` | 必选 | 加载版本快照 url |
| `options.version.loadStepsUrl` | `string` | 必选 | 还原版本记录 url |



## 方法列表

### show

显示侧边栏。

* 返回 `void`
* 用法 `show()`

### hide

隐藏侧边栏。

* 返回 `void`
* 用法 `hide()`

### render

mount 历史侧边栏到指定容器

* 返回 `void`*
* 用法 `render(container: $('#sidebar-container'))`
* 参数

| 名称               | 类型      | 默认值  | 描述             |
| ------------------ | --------- | ------- | ---------------- |
| `container` | `HTMLElement` | 必选 | 历史侧边栏容器 |