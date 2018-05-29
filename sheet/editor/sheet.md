# 工作表

## 方法列表

### getRowCount

获取工作表行数。

* 返回 `number`
* 用法 `getRowCount()`

### getColumnCount

获取工作表列数。

* 返回 `number`
* 用法 `getColumnCount()`

### addRows

在指定的行上方或下方添加新行。

* 返回 `void`
* 用法 `addRows(index, count, direction)`
* 参数

| 名称        | 类型                 | 默认值 | 描述 |
| ----------- | -------------------- | ------ | ---- |
| `index`     | `number`             | 无     | 位置 |
| `count`     | `number`             | 无     | 数量 |
| `direction` | `enum: 'up'、'down'` | 无     | 方向 |

### addColumns

在指定的列左边或右边添加新列。

* 返回 `void`
* 用法 `addColumns(index, count, direction)`
* 参数

| 名称        | 类型     | 默认值 | 描述 |
| ----------- | -------- | ------ | ---- |
| `index`     | `number` | 无     | 位置 |
| `count`     | `number` | 无     | 数量 |
| `direction` | `enum()` | 无     | 方向 |

### removeRows

删除行。

* 返回 `void`
* 用法 `removeRows(start, removeCount)`
* 参数

| 名称          | 类型     | 默认值 | 描述       |
| ------------- | -------- | ------ | ---------- |
| `start`       | `number` | 无     | 起始行下标 |
| `removeCount` | `number` | 无     | 数量       |

### removeColumns

删除列。

* 返回 `void`
* 用法 `removeColumns(index, removeCount)`
* 参数

| 名称          | 类型     | 默认值 | 描述       |
| ------------- | -------- | ------ | ---------- |
| `index`       | `number` | 无     | 起始列下标 |
| `removeCount` | `number` | 无     | 数量       |

### setActiveCell

选中一个单元格。

* 返回 `void`
* 用法 `setActiveCell(row, column)`
* 参数

| 名称     | 类型     | 默认值 | 描述   |
| -------- | -------- | ------ | ------ |
| `row`    | `number` | 无     | 行坐标 |
| `column` | `number` | 无     | 列坐标 |

### setValue

设置单元格值。

* 返回 `void`
* 用法 `setStyle(row, column, value)`
* 参数

| 名称     | 类型     | 默认值 | 描述         |
| -------- | -------- | ------ | ------------ |
| `row`    | `number` | 无     | 单元格所在行 |
| `column` | `number` | 无     | 单元格所在列 |
| `value`  | `any`    | 无     | 单元格值     |

### getValue

返回单元格的值。

* 返回 `any`
* 用法 `getValue(row, column)`
* 参数

| 名称     | 类型     | 默认值 | 描述         |
| -------- | -------- | ------ | ------------ |
| `row`    | `number` | 无     | 单元格所在行 |
| `column` | `number` | 无     | 单元格所在列 |

### setStyle

设置单元格样式。

* 返回 `void`
* 用法 `setStyle(row, column, style)`
* 参数

| 名称     | 类型     | 默认值 | 描述         |
| -------- | -------- | ------ | ------------ |
| `row`    | `number` | 无     | 单元格所在行 |
| `column` | `number` | 无     | 单元格所在列 |
| `style`  | `enum`   | 无     | 样式对象     |

### getStyle

获取单元格文字样式。

* 返回 `Style`
* 用法 `getStyle(row, column)`
* 参数

| 名称     | 类型     | 默认值 | 描述         |
| -------- | -------- | ------ | ------------ |
| `row`    | `number` | 无     | 单元格所在行 |
| `column` | `number` | 无     | 单元格所在列 |

### setFormatter

设置单元格格式。

* 返回 `void`
* 用法 `setFormatter(row, column, formatter)`
* 参数

| 名称        | 类型     | 默认值 | 描述         |
| ----------- | -------- | ------ | ------------ |
| `row`       | `number` | 无     | 单元格所在行 |
| `column`    | `number` | 无     | 单元格所在列 |
| `formatter` | `enum`   | 无     | 格式         |

### getFormatter

获取单元格文字样式。

* 返回 `Formatter`
* 用法 `getFormatter(row, column)`
* 参数

| 名称     | 类型     | 默认值 | 描述         |
| -------- | -------- | ------ | ------------ |
| `row`    | `number` | 无     | 单元格所在行 |
| `column` | `number` | 无     | 单元格所在列 |

### search

在工作表中查找包含指定内容的单元格。

* 返回 `SearchMatch`
* 用法 `search(str)`
* 参数

| 名称  | 类型     | 默认值 | 描述           |
| ----- | -------- | ------ | -------------- |
| `str` | `string` | 无     | 要查找的字符串 |
