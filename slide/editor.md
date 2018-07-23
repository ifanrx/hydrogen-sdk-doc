# 编辑器

幻灯片编辑器类，提供了获取内容、设置内容、操作幻灯片的方法。

## 构造函数

* 用法

  ```js
    new shimo.sdk.slide.Editor(params)
  ```

* 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `params.file` | `string` | `9:8!5@P0$0$` |设置幻灯片初始化渲染数据|

## 属性列表

|名称|类型|描述|
| -- | -- | -- |
| `slides` | `Array` |幻灯片列表|
| `layouts` | `Array` |幻灯片模板列表|
| `currentSlide` | `Object` |当前选中幻灯片信息|
| `currentSlide.id` | `string` |当前选中幻灯片的 id|
| `currentSlide.attributes` | `Object` |当前选中幻灯片的属性|
| `currentElements` | `currentElement[]` |当前选中元素列表|
| `currentElement.elementId` | `string` |元素 id|
| `currentElement.type` | `'text' | 'image' | 'shape'` |元素类型|
| `currentElement.focusState` | `'unfocused' | 'focused' | 'content_focused'` |元素选中状态(未选中|选中边框|选中内容)|
| `currentElement.isPlaceholder` | `boolean` |元素是否是占位符|
| `currentElement.data` | `Object` |元素数据|
| `currentElement.attributes` | `Object` |元素属性|
| `currentElement.order` | `Object` |元素层级|
| `currentElement.order.isTop` | `boolean` |元素是否处于顶层|
| `currentElement.order.isBottom` | `boolean` |元素是否处于底层|
| `currentElement.state` | `Object` |(文本)元素中被选中部分的属性|
| `canUndo` | `boolean` |能否撤销|
| `canRedo` | `boolean` |能否重做|
| `Events` | `Enum` |幻灯片事件|

## 方法列表

### render
  渲染幻灯片内容。

  * 返回 `undefined`
  * 用法 `render(container, options)`
  * 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `container` | `HTMLElement` | 无 |幻灯片渲染容器|
| `options` | `Object` | 无 |渲染配置项|
| `options.editable` | `boolean` | true |是否可编辑|
| `options.scope` | `'slides' | 'layouts'` | `'slides'` |渲染范围|
| `options.slide` | `string | number` | 0 |渲染的幻灯片 id 或序号|
| `options.scalable` | `boolean` | true |是否支持双指缩放|
| `options.reactive` | `boolean` | true |是否支持实时更新|
| `options.placeholder` | `boolean` | false |占位符内容是否显示|
| `options.canvas` | `Object` | 无 |画布渲染配置项|
| `options.canvas.withPadding` | `boolean` | false |是否显示超出画布内容区域的内容|
| `options.canvas.fitContainer` | `boolean` | true |初始缩放比例是否适应容器|
| `options.canvas.minRatio` | `number` | 0.25 |画布缩放比例下限，默认 25%|
| `options.canvas.maxRatio` | `number` | 4 |画布缩放比例上限，默认 400%|

### destroy
  销毁幻灯片编辑器实例。

  * 返回 `undefined`
  * 用法 `destroy()`
  * 参数 `undefined`

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

### setLayout
  设置幻灯片模板。

  * 返回 `Delta`
  * 用法 `setLayout(content)`
  * 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `content` | `string | 无 | PresentationPlainObjects` | 无 |幻灯片模板数据|

### registerPlugin
  注册插件。

  * 返回 `{ editorLayers, previewLayers }`

|名称|类型|描述|
| -- | -- | -- |
| `editorLayers` | `Object` |画布插件层|
| `editorLayers.viewport` | `HTMLElement` |可视区域 dom|
| `editorLayers.canvas` | `HTMLElement` |画布 dom|
| `previewLayers` | `Object` |预览插件层|
| `previewLayers.viewport` | `HTMLElement` |可视区域 dom|
| `previewLayers..canvas` | `HTMLElement` |画布 dom|

  * 用法 `registerPlugin(name, plugin)`
  * 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `name` | `string` | 无 |插件名称|
| `plugin` | `Plugin` | 无 |实例化的插件|


### updateLayout
  更新模板。

  * 返回 `Delta`
  * 用法 `updateLayout({ layoutId, attributes, updateAll })`
  * 参数

|名称|类型|默认值|描述|必选/可选|
| -- | -- | -- | -- | -- |
| `layoutId` | `string` | 无 |幻灯片模板 id|可选|
| `attributes` | `Object` | 无 |用于更新模板的属性|必选|
| `updateAll` | `boolean` | false |是否更新整套模板|可选|

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
  * 用法 `updateSlide({ slideId, attributes, updateAll })`
  * 参数

|名称|类型|默认值|描述|必选/可选|
| -- | -- | -- | -- | -- |
| `slideId` | `string` | 当前幻灯片 id |幻灯片 id|可选|
| `attributes` | `Object` | 无 |幻灯片的属性（如背景颜色等）|必选|
| `updateAll` | `boolean` | 无 |是否更新全部幻灯片|可选|

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
| `element.elementType` | `'text' | 'image' | 'shape'` | `text` |幻灯片元素类型|可选|
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
| `applyToAll` | `boolean` | false | 是否应用到整个文本框 |可选|

### setCurrentTextAutoResize
  设置当前选中文本内文字自适应。

  * 返回 `undefined`
  * 用法 `setCurrentTextAutoResize(autoResize)`
  * 参数

|名称|类型|默认值|描述|必选/可选|
| -- | -- | -- | -- | -- |
| `autoResize` | `boolean` | 无 | 是否使文本自适应 |必选|

### setRatio
  设置画布缩放比例。

  * 返回 `undefined`
  * 用法 `setRatio({ container, ratio, slideId })`
  * 参数

|名称|类型|默认值|描述|必选/可选|
| -- | -- | -- | -- | -- |
| `container` | `HTMLElement` | 无 | 画布容器 |必选|
| `ratio` | `number` | 无 | 缩放比例 |必选|
| `slideId` | `string` | 无 | 画布 slideId |必选|

### setElementsLevel
  设置当前选中元素的层级。

  * 返回 `undefined`
  * 用法 `setElementsLevel(level)`
  * 参数

|名称|类型|默认值|描述|必选/可选|
| -- | -- | -- | -- | -- |
| `level` | `Editor.levelDirection` | 无 | 层级 |必选|

## 事件列表

* 用法

  ```js
    const events = editor.Events
    editor.on(events.CHANGE, handler)
  ```

### CHANGE
  数据变化。

  * 回调方法签名 `handler(delta, options)`
  * 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `delta` | `Delta` | 无 | 数据 |
| `options` | `Object` | 无 | 描述 |
| `options.isExternal` | `Boolean` | 无 | 数据变化是否来自后端 |

### SLIDES_CHANGE
  幻灯片数据变化。

  * 回调方法签名 `handler(action, slides, all)`
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

  * 回调方法签名 `handler(action, elements)`
  * 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `action` | `string` | 无 | 引起变化的动作类型（如新增、修改和删除） |
| `elements` | `element[]` | 无 | 变化的元素信息 |
| `element.elementId` | `string` |元素 id|
| `element.type` | `'text' | 'image' | 'shape'` |元素类型|
| `element.focusState` | `'unfocused' | 'focused' | 'content_focused'` |元素选中状态|
| `element.isPlaceholder` | `boolean` |元素是否是占位符|
| `element.data` | `Object` |元素数据|
| `element.attributes` | `Object` |元素属性|
| `element.order` | `Object` |元素层级|
| `element.order.isTop` | `boolean` |元素是否处于顶层|
| `element.order.isBottom` | `boolean` |元素是否处于底层|
| `element.state` | `Object` |(文本)元素中被选中部分的属性|

### EDITOR_CHANGE
  编辑器属性变化。

  * 回调方法签名 `handler(attributes)`
  * 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `attributes` | `Object` | 无 | 变化的属性 |
| `attributes.ratio` | `number` | 无 | 编辑器画布的缩放比例 |

### SLIDES_SELECT
  幻灯片选中状态变化。

  * 回调方法签名 `handler(prev, current)`
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

  * 回调方法签名 `handler(selectedElements)`
  * 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `selectedElements` | `element[]` | 无 | 选中的元素信息 |
| `element.elementId` | `string` |元素 id|
| `element.type` | `'text' | 'image' | 'shape'` |元素类型|
| `element.focusState` | `'unfocused' | 'focused' | 'content_focused'` |元素选中状态|
| `element.isPlaceholder` | `boolean` |元素是否是占位符|
| `element.data` | `Object` |元素数据|
| `element.attributes` | `Object` |元素属性|
| `element.order` | `Object` |元素层级|
| `element.order.isTop` | `boolean` |元素是否处于顶层|
| `element.order.isBottom` | `boolean` |元素是否处于底层|
| `element.state` | `Object` |(文本)元素中被选中部分的属性|

### TEXT_CHANGE
  文本元素状态变化。

  * 回调方法签名 `handler(selectedElements)`
  * 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `selectedElements` | `element[]` | 无 | 选中的元素信息 |
| `element.elementId` | `string` |元素 id|
| `element.type` | `'text' | 'image' | 'shape'` |元素类型|
| `element.focusState` | `'unfocused' | 'focused' | 'content_focused'` |元素选中状态|
| `element.isPlaceholder` | `boolean` |元素是否是占位符|
| `element.data` | `Object` |元素数据|
| `element.attributes` | `Object` |元素属性|
| `element.order` | `Object` |元素层级|
| `element.order.isTop` | `boolean` |元素是否处于顶层|
| `element.order.isBottom` | `boolean` |元素是否处于底层|
| `element.state` | `Object` |(文本)元素中被选中部分的属性|

### IMAGE_PLACEHOLDER_SELECT
  图片占位符选中。

  * 回调方法签名 `handler(selectedElements)`
  * 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `selectedElements` | `element[]` | 无 | 选中的元素信息 |
| `element.elementId` | `string` |元素 id|
| `element.type` | `'text' | 'image' | 'shape'` |元素类型|
| `element.focusState` | `'unfocused' | 'focused' | 'content_focused'` |元素选中状态|
| `element.isPlaceholder` | `boolean` |元素是否是占位符|
| `element.data` | `Object` |元素数据|
| `element.attributes` | `Object` |元素属性|
| `element.order` | `Object` |元素层级|
| `element.order.isTop` | `boolean` |元素是否处于顶层|
| `element.order.isBottom` | `boolean` |元素是否处于底层|
| `element.state` | `Object` |(文本)元素中被选中部分的属性|

### VIEWPORT_MOUSE_ENTER
  鼠标进入幻灯片可视区域。

  * 回调方法签名 `handler({ slideId })`
  * 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `slideId` | `string` | 无 | 幻灯片 id |

### VIEWPORT_MOUSE_LEAVE
  鼠标离开幻灯片可视区域。

  * 回调方法签名 `handler({ slideId })`
  * 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `slideId` | `string` | 无 | 幻灯片 id |

### ELEMENT_FRAME_MOUSE_ENTER
  鼠标进入元素边框区域。

  * 回调方法签名 `handler({ elementId })`
  * 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `elementId` | `string` | 无 | 元素 id |

### ELEMENT_FRAME_MOUSE_LEAVE
  鼠标离开元素边框区域。

  * 回调方法签名 `handler({ elementId })`
  * 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `elementId` | `string` | 无 | 元素 id |

### ELEMENT_DRAGGING
  元素被拖拽。

  * 回调方法签名 `handler({ offsetX, offsetY, elements })`
  * 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `offsetX` | `number` | 无 | 横轴方向的鼠标偏移量 |
| `offsetY` | `number` | 无 | 横轴方向的鼠标偏移量 |
| `elements` | `Set<Slot>` | 无 | 选中的元素信息 |

### ELEMENT_DRAG_END
  元素拖拽结束。

  * 回调方法签名 `handler({ offsetX, offsetY, elements })`
  * 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `offsetX` | `number` | 无 | 横轴方向的鼠标偏移量 |
| `offsetY` | `number` | 无 | 横轴方向的鼠标偏移量 |
| `elements` | `element[]` | 无 | 选中的元素信息 |
| `element.elementId` | `string` |元素 id|
| `element.type` | `'text' | 'image' | 'shape'` |元素类型|
| `element.focusState` | `'unfocused' | 'focused' | 'content_focused'` |元素选中状态|
| `element.isPlaceholder` | `boolean` |元素是否是占位符|
| `element.data` | `Object` |元素数据|
| `element.attributes` | `Object` |元素属性|
| `element.order` | `Object` |元素层级|
| `element.order.isTop` | `boolean` |元素是否处于顶层|
| `element.order.isBottom` | `boolean` |元素是否处于底层|
| `element.state` | `Object` |(文本)元素中被选中部分的属性|