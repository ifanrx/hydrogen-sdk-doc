# 版本预览插件
  显示/关闭版本预览


## 构造函数

* 用法

  ```js
  var editor = new shimo.sdk.sheet.Editor()
  var versionPreview = new new shimo.sdk.sheet.plugins.VersionPreview({
    editor: editor,
    container: $('#version-preview')
    guid: '',
    loadHistory: `/api/docsidebarinfo/${guid}`,
    loadHistoryDetail: `/smapi/files/${guid}/sheet_histories?from=${from}&to=${to}`,
    snapshot: `/smapi/files/${guid}/snapshot`,
    loadSteps: `/smapi/files/${guid}/sheet_histories?from=${from}&to=${to}`,
    currentUserId: ''   
  })
  ```


* 参数

| 名称               | 类型      | 默认值  | 描述             |
| ------------------ | --------- | ------- | ---------------- |
| `options.editor` | `Editor` | 必选 | 编辑器实例 |
| `options.container` | `HTMLElement` | 必选 | 版本预览宿主容器 |
| `options.guid` | `String` | 必选 | file的guid |
| `options.snapshot` | `String` | 必选 | 加载历史快照url |
| `options.loadHistory` | `String` | 必选 | 加载历史条目的 url |
| `options.loadHistoryDetail` | `String` | 必选 | 加载历史详情的 url |
| `options.loadSteps` | `String` | 必选 | 加载版本碎片url |
| `options.currentUserId` | `string` | 必须 | 当前用户id |


## 方法列表

### toggle

显示／隐藏历史预览。

* 返回 `void`
* 用法 `toggle(isShow, item)`
* 参数

| 名称                | 类型          | 默认值 | 描述         |
| ------------------- | ------------- | ------ | ------------ |
| `isShow`   | `boolead`      | 必选     | true显示，false隐藏版本预览    |
| `item`   | `VersionItem`      | 可选     | 预览的版本条目。显示版本预览时，必传    |