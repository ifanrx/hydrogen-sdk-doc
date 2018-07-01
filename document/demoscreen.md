# 演示模式插件

加载此插件，编辑器可以使用演示模式查看。

## 构造函数

* 用法

  ```js
  const Editor = shimo.sdk.document.Editor
  const DemoScreen = shimo.sdk.document.plugins.DemoScreen
  const editor = new Editor()
  const demoScreen = new DemoScreen({
    editor
  })
  ```

* 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `editor` | `Editor` | 必选 | 编辑器实例 |

## 方法列表

## show

进入演示。

* 返回 `undefined`
* 用法 `demoScreen.show()`

## hide

退出演示。

* 返回 `undefined`
* 用法 `demoScreen.hide()`

## destory

使用完销毁。

* 返回 `undefined`
* 用法 `demoScreen.destory()`
