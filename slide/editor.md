# 编辑器

幻灯片编辑器类，提供了获取内容、设置内容、操作幻灯片的方法。

## 构造函数

* 用法

  ```js
    new shimo.sdk.slide.Editor(params)
    new shimo.sdk.slide.Editor(params, options)
  ```

* 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `params.file` | `string` | `9:8!5@P0$0$` |设置幻灯片初始化渲染数据|
| `options.slideId` | `string` | 无 |展示的幻灯片|

## 属性列表

|名称|类型|描述|
| -- | -- | -- |
| `slides` | `Array` |幻灯片列表|
| `layouts` | `Array` |幻灯片模板列表|
| `currentSlide` | `string` |当前选中幻灯片 id|
| `currentElements` | `Array` |当前选中元素列表|
| `canUndo` | `Boolean` |能否撤销|
| `canRedo` | `Boolean` |能否重做|
| `Events` | `Enum` |幻灯片事件|

## 方法列表

### getContent
  获取幻灯片内容。

  * 返回 `Promise (string)`
  * 用法

  ```js
  editor.getContent().then(function (content) {
      console.log(content)
  })
  ```

### setContent
  设置幻灯片内容。

  * 返回 `undefined`
  * 用法 `setContent(content)`
  * 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `content` | `String` | 无 |幻灯片内容|

### render
  渲染幻灯片内容。

  * 返回 `undefined`
  * 用法 `render(container)`
  * 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `container` | `HTMLElement` | 无 |幻灯片渲染容器|

### renderPreview
  渲染幻灯片预览内容。

  * 返回 `undefined`
  * 用法 `renderPreview(container, slideId, mode)`
  * 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `container` | `HTMLElement` | 无 |幻灯片预览渲染容器|
| `slideId` | `string` | 无 |渲染的幻灯片 id|

### renderLayout
  渲染幻灯片模板内容。

  * 返回 `undefined`
  * 用法 `renderLayout(container, layoutId, mode)`
  * 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `container` | `HTMLElement` | 无 |幻灯片模板渲染容器|
| `layoutId` | `string` | 无 |渲染的幻灯片模板 id|

### destroy
  回收幻灯片。

  * 返回 `undefined`
  * 用法 `destroy()`
  * 参数 `undefined`

### setLayout
  设置幻灯片模板。

  * 返回 `Delta`
  * 用法 `setLayout(content)`
  * 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `content` | `string` | 无 |幻灯片模板数据|

### updateLayout
  更新模板。

  * 返回 `Delta`
  * 用法 `setLayout(content)`
  * 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `content` | `string` | 无 |幻灯片模板数据|

### deleteLayout
  删除模板。

  * 返回 `Delta`
  * 用法 `deleteLayout(layoutId)`
  * 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `layoutId` | `string` | 无 |幻灯片模板 id|

### addSlide
  新建幻灯片。

  * 返回 `Delta`
  * 用法 `addSlide({ layoutId, slide: { attributes }, order })`
  * 参数

|名称|类型|默认值|描述|必选/可选|
| -- | -- | -- | -- | -- |
| `layoutId` | `string` | 无 |幻灯片模板 id|可选|
| `slide.attributes` | `Object` | 无 |新建幻灯片的属性（如背景颜色等）|可选|
| `order` | `number` | 幻灯片个数 - 1 |新建幻灯片的位置|可选|

### updateSlide
  更新幻灯片。

  * 返回 `Delta`
  * 用法 `updateSlide({ slideId, attributes })`
  * 参数

|名称|类型|默认值|描述|必选/可选|
| -- | -- | -- | -- | -- |
| `slideId` | `string` | 当前幻灯片 id |幻灯片 id|可选|
| `attributes` | `Object` | 无 |幻灯片的属性（如背景颜色等）|必选|

### deleteSlide
  删除幻灯片。

  * 返回 `Delta`
  * 用法 `deleteSlide({ slideId })`
  * 参数

|名称|类型|默认值|描述|必选/可选|
| -- | -- | -- | -- | -- |
| `slideId` | `string` | 当前幻灯片 id |幻灯片 id|可选|

### setSlidesOrder
  设置幻灯片显示顺序

  * 返回 `Delta`
  * 用法 `setSlidesOrder(slideIds)`
  * 参数

|名称|类型|默认值|描述|必选/可选|
| -- | -- | -- | -- | -- |
| `slideIds` | `Array` | 无 |幻灯片顺序排列的 id 数组|必选|

### addElements
  批量新建幻灯片元素。

  * 返回 `Delta`
  * 用法 `addElements(elements)`
  * 参数

|名称|类型|默认值|描述|必选/可选|
| -- | -- | -- | -- | -- |
| `elements` | `element[]` | 无 | 批量新建的元素信息|必选|
| `element.elementType` | `string` | `text` |幻灯片元素类型|可选|
| `element.data` | `string` | 无 |新建元素的数据（如文字内容、图片地址等）|可选|
| `element.attributes` | `Object` | 无 |新建元素的属性（如长度、宽度等）|可选|

### duplicateElements
  批量复制幻灯片元素。

  * 返回 `Delta`
  * 用法 `duplicateElements(elements)`
  * 参数

|名称|类型|默认值|描述|必选/可选|
| -- | -- | -- | -- | -- |
| `elements` | `element[]` | 无 | 批量复制的元素信息|必选|
| `element.elementId` | `string` | 无 |被复制的元素 id|必选|
| `element.attributes` | `Object` | 无 |需要修改的元素属性（如坐标等）|可选|

### updateElements
  批量更新幻灯片。

  * 返回 `Delta`
  * 用法 `updateElements({ slideId, elements })`
  * 参数

|名称|类型|默认值|描述|必选/可选|
| -- | -- | -- | -- | -- |
| `slideId` | `string` | 当前幻灯片 id |幻灯片 id|可选|
| `elements` | `element[]` | 无 | 批量更新的元素信息|必选|
| `element.elementId` | `string` | 无 |元素 id|必选|
| `element.elementType` | `string` | 无 |元素类型|必选|
| `element.data` | `string` | 无 |元素数据|可选|
| `element.attributes` | `string` | 无 |元素属性|可选|

### deleteElements
  批量删除幻灯片元素。

  * 返回 `Delta`
  * 用法 `deleteElements({ slideId, elementIds })`
  * 参数

|名称|类型|默认值|描述|必选/可选|
| -- | -- | -- | -- | -- |
| `slideId` | `string` | 幻灯片 id | 当前幻灯片 id |可选|
| `elementIds` | `Array` | 当前选择的元素数组 | 批量删除的元素 id 数组 |可选|

### setCurrentTextStyles
  设置文本样式。

  * 返回 `Delta`
  * 用法 `setCurrentTextStyles(styles, applyToAll)`
  * 参数

|名称|类型|默认值|描述|必选/可选|
| -- | -- | -- | -- | -- |
| `styles` | `Object` | 无 | 样式选项 |必选|
| `applyToAll` | `Boolean` | false | 是否应用到整个文本框 |可选|

## 事件列表

* 用法

  ```js
    const events = editor.Events
    editor.on(events.CHANGE, handler)
  ```

### CHANGE
  数据变化。

  * 回调方法签名 `handler( delta, options )`
  * 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `delta` | `Delta` | 无 | 数据 |
| `options` | `Object` | 无 | 描述 |
| `options.isExternal` | `Boolean` | 无 | 数据变化是否来自后端 |

### SLIDES_CHANGE
  幻灯片数据变化。

  * 回调方法签名 `handler( action, slides, all )`
  * 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `action` | `string` | 无 | 引起变化的动作类型（如新增、修改和删除） |
| `slides` | `slideInfo[]` | 无 | 变化的幻灯片信息 |
| `slideInfo.id` | `string` | 无 | 变化的幻灯片 id |
| `all` | `item[]` | 无 | 变化后所有幻灯片信息 |
| `item.id` | `string` | 无 | 变化后的幻灯片 id |
| `item.order` | `number` | 无 | 变化后的幻灯片显示顺序 |

### ELEMENTS_CHANGE
  元素数据变化。

  * 回调方法签名 `handler( action, elements )`
  * 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `action` | `string` | 无 | 引起变化的动作类型（如新增、修改和删除） |
| `elements` | `Array` | 无 | 变化的元素信息 |
| `element.elementId` | `string` | 无 | 元素 id |
| `element.elementType` | `string` | 无 | 元素类型 |
| `element.attributes` | `Object` | 无 | 元素属性 |

### EDITOR_CHANGE
  编辑器属性变化。

  * 回调方法签名 `handler( attributes )`
  * 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `attributes` | `Object` | 无 | 变化的属性 |
| `attributes.ratio` | `number` | 无 | 编辑器画布的缩放比例 |

### SELECT
  选中状态变化。

  * 回调方法签名 `handler( slideId, elementIds )`
  * 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `slideId` | `string` | 无 | 选中的幻灯片 id |
| `elementIds` | `Array` | 无 | 选中的元素 id 数组 |

### SLIDES_SELECT
  幻灯片选中状态变化。

  * 回调方法签名 `handler( prev, current )`
  * 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `prev` | `prevInfo[]` | 无 | 之前选中的幻灯片信息 |
| `prevInfo.id` | `string` | 无 | 幻灯片 id |
| `current` | `currentInfo[]` | 无 | 当前选中的幻灯片信息 |
| `currentInfo.id` | `string` | 无 | 幻灯片 id |
| `currentInfo.attributes` | `Object` | 无 | 幻灯片属性 |

### ELEMENTS_SELECT
  元素选中状态变化。

  * 回调方法签名 `handler( elements )`
  * 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `elements` | `element[]` | 无 | 选中的元素信息 |
| `element.elementId` | `string` | 无 |元素 id|
| `element.elementType` | `string` | 无 |元素类型|
| `element.data` | `string` | 无 |元素数据|
| `element.attributes` | `string` | 无 |元素属性|





