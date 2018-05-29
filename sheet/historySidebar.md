# 历史侧边栏

讨论／历史／版本侧边栏

## 构造函数

* 用法

  ```js
  var editor = new shimo.sdk.sheet.Editor()
  var sidebar = new shimo.sdk.sheet.plugins.Sidebar({
      editor: editor,
      container: $('#sidebar-container'),
      guid: '',
      appList?: [{
        tag: 'history,
        name: '历史'
        component: [class]
        props: {}
      }, {
        tag: 'version',
        name: '版本'
        component: [class]
        props: {}
      }] 
      onClose?:  () => void ,
      onClickTab?: (tab: string) => void,
  })
  ```

* 参数

| 名称               | 类型      | 默认值  | 描述             |
| ------------------ | --------- | ------- | ---------------- |
| `options.editor` | `Editor` | 必选 | 编辑器实例 |
| `options.container` | `HTMLElement` | 必选 | 侧边栏宿主容器 |
| `options.guid` | `String` | 必选 | file的guid |
| `options.appList` | `AppList` | 可选 | 侧边栏显示的容器类列表 |
| `options.onClose` | `Function` | 可选 | 关闭侧边栏响应事件 |
| `options.onClickTab` | `Function` | 可选 | 点击侧边栏tab|


## 方法列表

### toggle

渲染表格。

* 返回 `void`
* 用法 `toggle(isShow)`
* 参数

| 名称                | 类型          | 默认值 | 描述         |
| ------------------- | ------------- | ------ | ------------ |
| `isShow`   | `boolead`      | 无     | 打开／关闭侧边栏     |

### setActiveTab

设置当前激活的tab。

* 返回 `void`
* 用法 `setActiveTab(tab)`
* 参数

| 名称                | 类型          | 默认值 | 描述         |
| ------------------- | ------------- | ------ | ------------ |
| `tab`   | `string`      | 无     | 设置当前active的tab    |



# 历史列表

显示历史列表

## 构造函数

* 用法

  ```js
  var editor = new shimo.sdk.sheet.Editor()
  var historyList = new new shimo.sdk.sheet.plugins.HistoryList({
      editor: editor,
      container: $('#history-list')
      isShow: true 
      guid: '',
      onClose?: () => void 
      onSelectHistory?: (opt: HistoryItem) => void 
  })
  ```

* 参数

| 名称               | 类型      | 默认值  | 描述             |
| ------------------ | --------- | ------- | ---------------- |
| `options.editor` | `Editor` | 必选 | 编辑器实例 |
| `options.container` | `HTMLElement` | 必选 | 历史列表宿主容器 |
| `options.guid` | `String` | 必选 | file的guid |
| `options.isShow` | `boolean` | 必须 | 是否显示历史列表 |
| `options.onClose` | `Function` | 可选 | 关闭侧边栏响应事件。还原历史时可能需要关闭历史列表宿主容器 |
| `options.onSelectHistory` | `Function` | 可选 | 选择历史条目响应事件|



# 版本列表

显示版本列表

## 构造函数

* 用法

  ```js
  var versionList = new new shimo.sdk.sheet.plugins.VersionList({
      editor: editor,
      container: $('#version-list')
      isShow: true
      guid: '',
      onClose?: () => void
      onSelectVersion: (opt: VersionItem) => void
  })
  ```

* 参数

| 名称               | 类型      | 默认值  | 描述             |
| ------------------ | --------- | ------- | ---------------- |
| `options.editor` | `Editor` | 必选 | 编辑器实例 |
| `options.container` | `HTMLElement` | 必选 | 版本列表宿主容器 |
| `options.guid` | `String` | 必选 | file的guid |
| `options.isShow` | `boolean` | 必须 | 是否显示版本列表 |
| `options.onClose` | `Function` | 可选 | 关闭侧边栏响应事件。还原版本时可能需要关闭版本列表宿主容器 |
| `options.onSelectVersion` | `Function` | 可选 | 选择版本条目响应事件|


# 历史预览
  显示/关闭历史预览


## 构造函数

* 用法

  ```js
  var editor = new shimo.sdk.sheet.Editor()
  var historyPreview = new new shimo.sdk.sheet.plugins.HistoryPreview({
      editor: editor,
      container: $('#history-preview')
      guid: '',
      currentUserId: ''
  })
  ```


* 参数

| 名称               | 类型      | 默认值  | 描述             |
| ------------------ | --------- | ------- | ---------------- |
| `options.editor` | `Editor` | 必选 | 编辑器实例 |
| `options.container` | `HTMLElement` | 必选 | 历史预览宿主容器 |
| `options.guid` | `String` | 必选 | file的guid |
| `options.currentUserId` | `string` | 必须 | 当前用户id |


## 方法列表

### toggle

渲染表格。

* 返回 `void`
* 用法 `togglePreview(isShow, item)`
* 参数

| 名称                | 类型          | 默认值 | 描述         |
| ------------------- | ------------- | ------ | ------------ |
| `isShow`   | `boolead`      | 必选     | 打开／关闭历史预览    |
| `item`   | `HistoryItem`      | 可选     | 预览的历史条目。打开历史预览时，必传    |


# 版本预览
  显示/关闭版本预览


## 构造函数

* 用法

  ```js
  var editor = new shimo.sdk.sheet.Editor()
  var versionPreview = new new shimo.sdk.sheet.plugins.VersionPreview({
    editor: editor,
    container: $('#version-preview')
    guid: '',
    currentUserId: ''   
  })
  ```


* 参数

| 名称               | 类型      | 默认值  | 描述             |
| ------------------ | --------- | ------- | ---------------- |
| `options.editor` | `Editor` | 必选 | 编辑器实例 |
| `options.container` | `HTMLElement` | 必选 | 版本预览宿主容器 |
| `options.guid` | `String` | 必选 | file的guid |
| `options.currentUserId` | `string` | 必须 | 当前用户id |


## 方法列表

### toggle

渲染表格。

* 返回 `void`
* 用法 `togglePreview(isShow, item)`
* 参数

| 名称                | 类型          | 默认值 | 描述         |
| ------------------- | ------------- | ------ | ------------ |
| `isShow`   | `boolead`      | 必选     | 打开／关闭版本预览    |
| `item`   | `VersionItem`      | 可选     | 预览的版本条目。打开版本预览时，必传    |