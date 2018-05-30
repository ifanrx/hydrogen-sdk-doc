# 历史列表插件

显示历史列表

## 构造函数

* 用法

  ```js
  var editor = new shimo.sdk.sheet.Editor()
  var historyList = new new shimo.sdk.sheet.plugins.HistoryList({
      editor: editor,
      container: $('#history-list')
      guid: '',
      loadHistory: `/api/docsidebarinfo/${guid}`,
      loadHistoryDetail: `/smapi/files/${guid}/sheet_histories?from=${from}&to=${to}`,
      revert: `/history/${guid}/revert`
      onClose?: () => void 
      onSelectHistory?: (opt: HistoryItem) => void 
  })
  ```

* 参数

| 名称               | 类型      | 默认值  | 描述             |
| ------------------ | --------- | ------- | ---------------- |
| `options.editor` | `Editor` | 必选 | 编辑器实例 |
| `options.container` | `HTMLElement` | 必选 | 历史列表宿主容器 |
| `options.guid` | `String` | 必选 | file 的 guid |
| `options.loadHistory` | `String` | 必选 | 加载历史条目的 url |
| `options.loadHistoryDetail` | `String` | 必选 | 加载历史详情的 url |
| `options.revert` | `string` | 必须 | 还原历史的 url |
| `options.onClose` | `Function` | 可选 | 关闭侧边栏响应事件。还原历史时可能需要关闭历史列表宿主容器 |
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