# 工作簿

工作簿由多个[工作表](sheet.md)组成。

## 方法列表

### getActiveSheet

获取当前选中的工作表。

* 返回 `Sheet`
* 用法 `getActiveSheet()`

### getSheetByIndex

根据下标获取工作表。

* 返回 `Sheet`
* 用法 `getSheetByIndex(index)`
* 参数

| 名称    | 类型     | 默认值 | 描述 |
| ------- | -------- | ------ | ---- |
| `index` | `String` | 无     | 下标 |

### getSheets

获取全部工作表。

* 返回 `Sheet[]`
* 用法 `getSheets()`

### getSheet

根据 ID 获取工作表。

* 返回 `Sheet`
* 用法 `getSheet(id)`
* 参数

| 名称 | 类型     | 默认值 | 描述      |
| ---- | -------- | ------ | --------- |
| `id` | `String` | 无     | 工作表 id |

### getSheetIndex

获取工作表在工作簿中的位置。

* 返回 `Number`
* 用法 `getSheetIndex(id)`
* 参数

| 名称 | 类型     | 默认值 | 描述      |
| ---- | -------- | ------ | --------- |
| `id` | `String` | 无     | 工作表 id |

### setActiveSheet

切换至指定工作表。

* 返回 `void`
* 用法 `setActiveSheet(id)`
* 参数

| 名称 | 类型     | 默认值 | 描述      |
| ---- | -------- | ------ | --------- |
| `id` | `String` | 无     | 工作表 id |

### copySheet

创建工作表副本。

* 返回 `Promise<void>`
* 用法 `copySheet(id)`
* 参数

| 名称 | 类型     | 默认值 | 描述      |
| ---- | -------- | ------ | --------- |
| `id` | `String` | 无     | 工作表 id |

### appendSheet

添加一张空白工作表。

* 返回 `void`
* 用法 `appendSheet()`

### removeSheet

删除工作表。

* 返回 `void`
* 用法 `removeSheet(id)`
* 参数

| 名称 | 类型     | 默认值 | 描述      |
| ---- | -------- | ------ | --------- |
| `id` | `String` | 无     | 工作表 id |

### renameSheet

重命名工作表。

* 返回 `Promise<void>`
* 用法 `renameSheet(id, name)`
* 参数

| 名称   | 类型     | 默认值 | 描述           |
| ------ | -------- | ------ | -------------- |
| `id`   | `String` | 无     | 工作表 id      |
| `name` | `String` | 无     | 新的工作表名称 |
