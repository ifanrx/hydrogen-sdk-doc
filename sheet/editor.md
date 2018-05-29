# 编辑器

表格编辑器类，提供了获取内容、设置内容、操作表格的方法。

## 构造函数

* 用法

  ```js
  new shimo.sdk.sheet.Editor()
  new shimo.sdk.sheet.Editor(options)
  ```

* 参数

| 名称               | 类型      | 默认值  | 描述             |
| ------------------ | --------- | ------- | ---------------- |
| `options.editable` | `Boolean` | `false` | 设置表格是否只读 |

## 属性列表

| 名称         | 类型      | 描述             |
| ------------ | --------- | ---------------- |
| `isRendered` | `Boolean` | 表格是否渲染成功 |

## 方法列表

### render

渲染表格。

* 返回 `undefined`
* 用法 `render(options)`
* 参数

| 名称                | 类型          | 默认值 | 描述         |
| ------------------- | ------------- | ------ | ------------ |
| `options.content`   | `string`      | 无     | 表格内容     |
| `options.container` | `HTMLElement` | 无     | 表格渲染容器 |

### getContent

获取表格内容。

* 返回 `Promise<string>`
* 用法

```js
editor.getContent().then(function(content) {
  console.log(content)
})
```

### setContent

设置表格内容。

* 返回 `undefined`
* 用法 `setContent(content, activeSheetId)`
* 参数

| 名称            | 类型     | 默认值 | 描述                      |
| --------------- | -------- | ------ | ------------------------- |
| `content`       | `String` | 无     | 表格内容                  |
| `activeSheetId` | `String` | 无     | 设置表格先渲染的工作表 ID |

### destroy

销毁表格编辑器实例。

* 返回 `undefined`
* 用法 `destroy()`
* 参数

### undo

撤销上一步操作。

* 返回 `Promise<undefined>`
* 用法

```js
editor.undo().then(function() {
  console.log("undo successed!")
})
```

* 参数

### redo

重新应用上一步操作。

* 返回 `Promise<undefined>`
* 用法

```js
editor.redo().then(function() {
  console.log("redo successed!")
})
```

* 参数
