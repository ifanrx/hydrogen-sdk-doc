# 表格快捷键插件
快捷键插件在内置快捷键的基础上扩展了更多快捷键操作。

| 操作                | 快捷键                   |
| ------------------- | ------------------------ |
| 超链接              | `⌘ + K`                  |
| 新增行              | `⌘ + Shift + =`          |
| 单元格内换行        | `Control/Option + Enter` |
| 激活单元格          | `F2`                     |
| 合并单元格          | `Option + Shift + M`     |
| 扩大选中范围        | `Shift + ↑/↓/←/→`        |
| 表格定位顶部/底部   | `⌘ + ↑/↓`                |
| 表格定位到左侧/右侧 | `⌘ + ←/→`                |
| 缩放页面            | `Option + +/-`           |

# 表格内置快捷键

| 操作                | 快捷键                   |
| ------------------- | ------------------------ |
| 撤销                | `⌘ + Z`                  |
| 重做                | `⌘ + Y`                  |
| 复制                | `⌘ + C`                  |
| 粘贴                | `⌘ + V`                  |
| 剪切                | `⌘ + X`                  |
| 全选                | `⌘ + A`                  |
| 加粗                | `⌘ + B`                  |
| 斜体                | `⌘ + I`                  |
| 下划线              | `⌘ + U`                  |
| 查找                | `⌘ + F`                  |



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