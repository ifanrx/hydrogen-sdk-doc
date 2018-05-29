# 表格快捷键插件

| 操作                | 快捷键                   |
| ------------------- | ------------------------ |
| 加粗                | `⌘ + B`                  |
| 斜体                | `⌘ + I`                  |
| 下划线              | `⌘ + U`                  |
| 超链接              | `⌘ + K`                  |
| 撤销                | `⌘ + Z`                  |
| 重做                | `⌘ + Y`                  |
| 查找                | `⌘ + F`                  |
| 新增行              | `⌘ + Shift + =`          |
| 单元格内换行        | `Control/Option + Enter` |
| 激活单元格          | `F2`                     |
| 合并单元格          | `Option + Shift + M`     |
| 扩大选中范围        | `Shift + ↑/↓/←/→`        |
| 表格定位顶部/底部   | `⌘ + ↑/↓`                |
| 表格定位到左侧/右侧 | `⌘ + ←/→`                |
| 缩放页面            | `Option + +/-`           |

## 构造函数

* 用法

  ```js
  var editor = new shimo.sdk.sheet.Editor()
  var shortcut = new shimo.sdk.sheet.plugins.Shortcut({ editor })
  ```

* 参数

| 名称             | 类型     | 默认值 | 描述       |
| ---------------- | -------- | ------ | ---------- |
| `options.editor` | `Editor` | 必选   | 编辑器实例 |
