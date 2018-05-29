# 文档工具栏插件

文档提供开箱即用的工具栏插件。
同时也支持调用工具栏接口实现自定义工具栏。

## 接口调用

* 用法

工具栏接口和使用工具栏的情景类似，都是对用户当前在编辑器内的选区内容进行操作。
  ```js
  ...
  // 加粗选取的内容
  sdkEditor.editorActions.setBold()
  ```

## 支持的工具栏功能接口

### setUndo

撤销改动。

* 用法 `sdkEditor.editorActions.setUndo()`


### setRedo

重做撤销的改动。

* 用法 `sdkEditor.editorActions.setRedo()`

### setFormatPainter

格式刷。

* 用法 `sdkEditor.editorActions.setFormatPainter(value)`
* 参数

| 名称             | 建议可选值             | 描述         |
| --------------- | ----------------- | ------ |
| `value`         | `false`, `'click'`, `'double-click'`  | 格式刷的不同动作     |

### setClean

清除格式。

* 用法 `sdkEditor.editorActions.setClean()`

### setHeader

设置标题格式。

* 用法 `sdkEditor.editorActions.setHeader(value)`
* 参数

| 名称             | 建议可选值             | 描述         |
| --------------- | ----------------- | ------ |
| `value`         | `false`, `'title'`, `'subtitle'`, `'1'`, `'2'`, `'3'`  | 不同类型的标题格式     |

### setFont

设置字体。

* 用法 `sdkEditor.editorActions.setFont(value)`
* 参数

| 名称             | 建议可选值             | 描述         |
| --------------- | ----------------- | ------ |
| `value`         | `false`, `'simsun'`, `'simhei'`, `'microsoftyahei'`, `'fangsong'`, `'kaiti'`, `'arial'`, `'droid'`, `'source'`  | 不同类型的字体     |

### setSize

设置字号大小。

* 用法 `sdkEditor.editorActions.setSize(value)`
* 参数

| 名称             | 建议可选值             | 描述         |
| --------------- | ----------------- | ------ |
| `value`         | `false`, `'9'`, `'10'`, `'11'`, `'12'`, `'14'`, `'16'`, `'18'`, `'22'`, `'24'`, `'30'`, `'36'`  | 不同大小的字号    |

### setBold

设置字体加粗。

* 用法 `sdkEditor.editorActions.setBold(?value)`
* 参数

| 名称             | 类型             | 描述         |
| --------------- | ----------------- | ------ |
| `value`         | `boolean` | [可选] 加粗或取消加粗    |

### setItalic

设置斜体。

* 用法 `sdkEditor.editorActions.setItalic(?value)`
* 参数

| 名称             | 类型             | 描述         |
| --------------- | ----------------- | ------ |
| `value`         | `boolean` | [可选] 加粗或取消斜体    |


### setUnderline

设置下划线。

* 用法 `sdkEditor.editorActions.setUnderline(?value)`
* 参数

| 名称             | 类型             | 描述         |
| --------------- | ----------------- | ------ |
| `value`         | `boolean` | [可选] 加粗或取消下划线   |


### setStrike

设置字体删除线。

* 用法 `sdkEditor.editorActions.setStrike(?value)`
* 参数

| 名称             | 类型             | 描述         |
| --------------- | ----------------- | ------ |
| `value`         | `boolean` | [可选] 加粗或取消删除线    |


### setColor

设置字体颜色。

* 用法 `sdkEditor.editorActions.setColor(value)`
* 参数

| 名称             | 可选值             | 描述         |
| --------------- | ----------------- | ------ |
| `value`         | `false`,  `'16进制颜色字符串'` | 需要设置的颜色    |

### setBackground

设置背景颜色。

* 用法 `sdkEditor.editorActions.setBackground(value)`
* 参数

| 名称             | 可选值             | 描述         |
| --------------- | ----------------- | ------ |
| `value`         | `false`,  `'16进制颜色字符串'` | 需要设置的颜色    |


### setOrdered

设置有序列表。

* 用法 `sdkEditor.editorActions.setBold(?value)`
* 参数

| 名称             | 可选值           | 描述         |
| --------------- | ----------------- | ------ |
| `value`         | `false`, `'decimal'[default]`, `'ckj-decimal'`, `'upper-decimal'` | 列表类型    |

### setBullet

设置无序列表。

* 用法 `sdkEditor.editorActions.setBullet(?value)`
* 参数

| 名称             | 可选值           | 描述         |
| --------------- | ----------------- | ------ |
| `value`         | `false`, `'circle'[default]`, `'ring'`, `'arrow'` | 列表类型    |


### resetOrder

列表重新编号。

* 用法 `sdkEditor.editorActions.resetOrder(value)`
* 参数

| 名称             | 类型              | 描述         |
| --------------- | ----------------- | ----------- |
| `value`         | `string`          | 需要更改的编号|

### setTask

设置任务列表。

* 用法 `sdkEditor.editorActions.setTask(?value)`
* 参数

| 名称             | 可选值           | 描述         |
| --------------- | ----------------- | ------ |
| `value`         | `false`, `'unchecked'[default]`, `'checked'` | 列表类型    |


### setIndent

设置缩进。

* 用法 `sdkEditor.editorActions.setIndent(value)`
* 参数

| 名称             | 可选值           | 描述         |
| --------------- | ----------------- | ------ |
| `value`         | `false`, `'+1'[default]`, `'-1'`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8` | 缩进等级    |


### setAlign

设置对齐方式。

* 用法 `sdkEditor.editorActions.setAlign(value)`
* 参数

| 名称             | 可选值           | 描述         |
| --------------- | ----------------- | ------ |
| `value`         | `false [default]`, `'right'`, `'center'`, `'justify'` | 对齐方式    |

### setLinespace

设置对齐方式。

* 用法 `sdkEditor.editorActions.setLinespace(value)`
* 参数

| 名称             | 可选值           | 描述         |
| --------------- | ----------------- | ------ |
| `value`         | `100`, `115`, `150`, `200`, `250`, `300` | 行高    |
