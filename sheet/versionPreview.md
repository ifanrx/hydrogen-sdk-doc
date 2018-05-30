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
    loadHistoryUrl: `/api/docsidebarinfo/${guid}`,
    snapshotUrl: `/smapi/files/${guid}/snapshot`,
    loadStepsUrl: `/smapi/files/${guid}/sheet_histories`,
    currentUserId: ''   
  })
  ```


* 参数

| 名称               | 类型      | 默认值  | 描述             |
| ------------------ | --------- | ------- | ---------------- |
| `options.editor` | `Editor` | 必选 | 编辑器实例 |
| `options.container` | `HTMLElement` | 必选 | 版本预览宿主容器 |
| `options.guid` | `String` | 必选 | file 的 guid |
| `options.loadHistoryUrl` | `String` | 必选 | 加载历史条目的 url |
| `options.snapshotUrl` | `String` | 必选 | 加载历史快照 url |
| `options.loadStepsUrl` | `String` | 必选 | 加载版本碎片 url |
| `options.currentUserId` | `String` | 必须 | 当前用户 id |


## 方法列表

### show

显示历史预览。

* 返回 `void`
* 用法 `show(item)`
* 参数

| 名称                | 类型          | 默认值 | 描述         |
| ------------------- | ------------- | ------ | ------------ |
| `item`   | `VersionItem`      | 必选     | 预览的版本条目  |
| `item.content`   | `String`      | 必选     | 预览的版本数据  |
| `item.create_at`   | `String`      | 必选     | 版本创建时间  |
| `item.history_type`   | `Number`      | 必选     | 版本类型, 2（可编辑版本). |
| `item.id`   | `Number`      | 必选     | 版本 id  |
| `item.update_at`   | `String`      | 必选     | 版本更新时间  |
| `item.user_id`   | `String`      | 必选     | 编辑版本用户的 id  |

### hide

隐藏历史预览。

* 返回 `void`
* 用法 `hide()`