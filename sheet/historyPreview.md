# 历史预览插件
  显示/关闭历史预览


## 构造函数

* 用法

  ```js
  var editor = new shimo.sdk.sheet.Editor()
  var historyPreview = new new shimo.sdk.sheet.plugins.HistoryPreview({
      editor: editor,
      container: $('#history-preview')
      guid: '',
      snapshot: `/api/files/${guid}/snapshot`,
      currentUserId: ''
  })
  ```


* 参数

| 名称               | 类型      | 默认值  | 描述             |
| ------------------ | --------- | ------- | ---------------- |
| `options.editor` | `Editor` | 必选 | 编辑器实例 |
| `options.container` | `HTMLElement` | 必选 | 历史预览宿主容器 |
| `options.guid` | `String` | 必选 | file 的 guid |
| `options.snapshot` | `String` | 必选 | 加载历史快照的 url |
| `options.currentUserId` | `string` | 必须 | 当前用户 id |


## 方法列表

### toggle

显示／隐藏历史预览。

* 返回 `void`
* 用法 `togglePreview(isShow, item)`
* 参数

| 名称                | 类型          | 默认值 | 描述         |
| ------------------- | ------------- | ------ | ------------ |
| `isShow`   | `boolead`      | 必选     | true 显示，false 隐藏历史预览    |
| `item`   | `HistoryItem`      | 可选     | 预览的历史条目。打开历史预览时，必传    |

