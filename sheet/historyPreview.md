# 历史预览插件
  显示/隐藏历史预览


## 构造函数

* 用法

  ```js
  var editor = new shimo.sdk.sheet.Editor()
  var historyPreview = new new shimo.sdk.sheet.plugins.HistoryPreview({
      editor: editor,
      container: $('#history-preview')
      guid: '',
      snapshotUrl: `/api/files/${guid}/snapshot`,
      currentUserId: ''
      loadStepsUrl: `/smapi/files/${guid}/sheet_histories`
  })
  ```


* 参数

| 名称               | 类型      | 默认值  | 描述             |
| ------------------ | --------- | ------- | ---------------- |
| `options.editor` | `Editor` | 必选 | 编辑器实例 |
| `options.container` | `HTMLElement` | 必选 | 历史预览宿主容器 |
| `options.guid` | `String` | 必选 | file 的 guid |
| `options.snapshotUrl` | `String` | 必选 | 加载历史快照的 url |
| `options.currentUserId` | `String` | 必须 | 当前用户 id |
| `options.loadStepsUrl` | `String` | 必选 | 加载历史碎片的 url |


## 方法列表

### show

显示历史预览。

* 返回 `void`
* 用法 `show(item)`
* 参数

| 名称                | 类型          | 默认值 | 描述         |
| ------------------- | ------------- | ------ | ------------ |
| `item`   | `HistoryItem`      | 必选     | 预览的历史条目  |
| `item.content`   | `String`      | 必选     | 预览的历史数据  |
| `item.create_at`   | `String`      | 必选     | 历史创建时间  |
| `item.history_type`   | `Number`      | 必选     | 历史类型 1(不可编辑历史); 2（可编辑历史）.   |
| `item.id`   | `Number`      | 必选     | 历史 id  |
| `item.update_at`   | `String`      | 必选     | 历史更新时间  |
| `item.user_id`   | `String`      | 必选     | 编辑历史用户的 id  |


### hide

隐藏历史预览。

* 返回 `void`
* 用法 `hide()`

