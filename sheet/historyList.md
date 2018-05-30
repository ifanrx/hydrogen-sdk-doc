# 历史列表插件

显示表格历史记录列表

## 构造函数

* 用法

  ```js
  var editor = new shimo.sdk.sheet.Editor()
  var historyList = new new shimo.sdk.sheet.plugins.HistoryList({
      editor: editor,
      container: $('.sm-sidebar-applist-history')
      guid: '',
      loadHistoryUrl: `/api/docsidebarinfo/${guid}`,
      revertUrl: `/history/${guid}/revert`
      afterRevert?: () => void 
      onSelectHistory?: (opt: HistoryItem) => void 
  })
  ```

* 参数

| 名称               | 类型      | 默认值  | 描述             |
| ------------------ | --------- | ------- | ---------------- |
| `options.editor` | `Editor` | 必选 | 编辑器实例 |
| `options.container` | `HTMLElement` | 必选 | 历史列表宿主容器 |
| `options.guid` | `String` | 必选 | file 的 guid |
| `options.loadHistoryUrl` | `String` | 必选 | 加载历史条目的 url |
| `options.revertUrl` | `String` | 必须 | 还原历史的 url |
| `options.afterRevert` | `Function` | 可选 | 还原历史后的响应事件（可能需要关闭历史列表宿主容器） |
| `options.onSelectHistory` | `Function` | 可选 | 选择历史条目响应事件|

## 方法列表

### toggle

显示／关闭历史列表。

* 返回 `void`
* 用法 `toggle(isShow)`
* 参数

| 名称                | 类型          | 默认值 | 描述         |
| ------------------- | ------------- | ------ | ------------ |
| `isShow`   | `boolead`      | 无     | true 显示, false 关闭历史列表    |