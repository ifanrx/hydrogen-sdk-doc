# 表格事件

表格内部事件，可以监听对应事件，添加相应逻辑


* 用法

### 表格内容改变事件

  ```js
  var editor = new shimo.sdk.sheet.Editor()
  var events = shimo.sdk.sheet.Editor.events
  editor.on(events.CHANGE, function() {
    // your code
  })
  ```

### 切换工作表事件

  ```js
  var editor = new shimo.sdk.sheet.Editor()
  var events = shimo.sdk.sheet.Editor.events
  editor.on(events.SheetSwitched, function(args) {
    // your code
  })
  ```

* 切换工作表事件回调函数参数

| 名称               | 类型        | 描述             |
| ------------------ | --------- | ---------------- |
| `args.newSheet` | `Sheet`  | 新激活的工作表 |
| `args.oldSheet` | `Sheet`  | 旧工作表 |