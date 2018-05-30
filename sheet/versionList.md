# 版本列表插件

显示版本列表

## 构造函数

* 用法

  ```js
  var versionList = new new shimo.sdk.sheet.plugins.VersionList({
      editor: editor,
      container: $('.sm-sidebar-applist-version')
      guid: '',
      loadVersionListUrl: `/smapi/files/${guid}/revisions`,
      revertVersionUrl:  `/history/${guid}/revert`,
      deleteVersionUrl: `/smapi/files/${guid}/revisions`,
      updateVersionUrl: ``
      afterRevert?: () => void
      onSelectVersion?: (opt: VersionItem) => void
  })
  ```

* 参数

| 名称               | 类型      | 默认值  | 描述             |
| ------------------ | --------- | ------- | ---------------- |
| `options.editor` | `Editor` | 必选 | 编辑器实例 |
| `options.container` | `HTMLElement` | 必选 | 版本列表宿主容器 |
| `options.guid` | `String` | 必选 | file 的 guid |
| `options.loadVersionList` | `String` | 必选 | 加载版本列表 url |
| `options.revertVersion` | `String` | 必选 | 还原版本 url |
| `options.deleteVersion` | `String` | 必选 | 删除版本 url |
| `options.updateVersionUrl` | `String` | 必选 | 更新版本名称 url |
| `options.afterRevert` | `Function` | 可选 | 还原版本后的响应事件（可能需要关闭版本列表宿主容器） |
| `options.onSelectVersion` | `Function` | 可选 | 选择版本条目响应事件|

## 方法列表

### toggle

显示／隐藏版本列表。

* 返回 `void`
* 用法 `toggle(isShow)`
* 参数

| 名称                | 类型          | 默认值 | 描述         |
| ------------------- | ------------- | ------ | ------------ |
| `isShow`   | `boolead`      | 无     | true显示，false隐藏版本列表    |