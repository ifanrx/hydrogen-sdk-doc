# 编辑器

表格编辑器提供了编辑器类和一系列操作表格的方法。[快速开始入口](/quick-start.html)

## 构造函数

* 构造函数

  ```js
    new shimoSDK.Sheet()
    new shimoSDK.Sheet(options)
  ```

* 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `options.editable` | `Boolean` | `false` |设置表格是否只读|
| `options.commentable` | `Boolean` | `false` |设置表格能否评论|

## 属性列表

|名称|类型|描述|
| -- | -- | -- |
| `isRendered` | `Boolean` |表格是否渲染成功|

## 方法列表

### getContent
  获取表格内容，返回一个 promise。

  * 返回值：`Promise<string>`
  * 用法

  ```js
  editor.getContent().then(function (content) {
      console.log(content)
  })
  ```

### setContent
  设置表格内容

  * 返回值：`undefined`
  * 用法

  ```js
  setContent(content, activeSheetId)
  ```

  * 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `content` | `String` | 无 |表格内容|
| `activeSheetId` | `String` | 无 |设置表格先渲染的工作表 ID|

