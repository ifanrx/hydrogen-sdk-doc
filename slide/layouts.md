# 幻灯片通用布局插件

幻灯片编辑器实现通用布局的插件。
目前 Layouts 对外暴露的插件：keybindingPlugin 和 uploader 而其他内部插件暂时不向外暴露
这个插件出现的目的是为了解决编辑器的开发环境和桌面关于布局部分的重复代码问题，以及这个问题带来的重复维护成本和额外的bug。
遵循这样的原则，如果是编辑器无需感知，只会出现在桌面的功能，不会进入通用布局插件，例如历史插件。

## 构造函数

* 用法

  ```js
    var layouts = new Layouts({
      editor: editor
    })
    layouts.render(document.getElementById('#layouts'), { editable: true })
  ```

* 参数

|名称|类型|描述|
| -- | -- | -- |
| `options.editor` | `Editor` | 编辑器实例 |


## 析构函数

* 用法

  ```js
    layouts.destroy()
  ```

* 调用 keybindingPlugin 插件用法

  ```js
    const { keybinding } = layouts
    keybinding.addSlide()
  ```

* 调用 uploader 插件的用法

  ```js
     const { uploader } = layouts
     uploader.replaceImage()
  ```


## 方法列表

### render
  渲染插件

  * 返回 `Promise`
  * 用法 `render(container, options)`
  * 参数

| 名称 | 类型 | 默认值 | 描述 |
| -- | -- | -- | -- |
| `container` | `HTMLElement` | 无 | 布局渲染容器
| `options.editalbe` | `boolean` | 无 | 是否可编辑
| `options.public` | `boolean` | 无 | 是否公开
| `options.uploader` | `UploaderConfig` | 无 | 上传插件的配置

### ready
  插件渲染完毕的Promise

  * 返回 `Promise`
  * 用法 `ready().then()`
