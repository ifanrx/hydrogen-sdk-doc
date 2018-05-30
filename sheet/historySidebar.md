# 历史侧边栏插件

接受插件，显示在 tab 栏。可用[历史列表](historyList.md)插件, [版本列表](versionList.md)插件

## 构造函数

* 用法

  ```js
  var editor = new shimo.sdk.sheet.Editor()
  var sidebar = new shimo.sdk.sheet.plugins.Sidebar({
      editor: editor,
      container: $('#sidebar-container'),
      guid: '',
      appList: [{
        tag: 'history,
        name: '历史'
        component:  shimo.sdk.sheet.plugins.HistoryList
        props: {}
      }, {
        tag: 'version',
        name: '版本'
        component:  shimo.sdk.sheet.plugins.VersionList
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
| `options.guid` | `String` | 必选 | file 的 guid |
| `options.appList` | `AppList` | 必选 | 侧边栏显示的容器类列表 |
| `options.appList.tag` | `String` | 必选 | 插件唯一标识 |
| `options.appList.name` | `String` | 必选 | 插件名称，显示在侧边栏 tab 上 |
| `options.appList.component` | `Class` | 必选 | 插件类 |
| `options.appList.props` | `Object` | 可选 | 插件所需的参数 |
| `options.onClose` | `Function` | 可选 | 关闭侧边栏响应事件 |
| `options.onClickTab` | `Function` | 可选 | 点击侧边栏tab|


## 方法列表

### toggle

显示／隐藏侧边栏。

* 返回 `void`
* 用法 `toggle(isShow)`
* 参数

| 名称                | 类型          | 默认值 | 描述         |
| ------------------- | ------------- | ------ | ------------ |
| `isShow`   | `boolead`      | 无     | true 打开，false 隐藏侧边栏    |

### setActiveTab

设置当前激活的tab。

* 返回 `void`
* 用法 `setActiveTab(tab)`
* 参数

| 名称                | 类型          | 默认值 | 描述         |
| ------------------- | ------------- | ------ | ------------ |
| `tab`   | `string`      | 无     | 设置当前激活的 tab    |
