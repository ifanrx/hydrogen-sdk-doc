# 文档上传插件

加载此插件可以上传图片和附件

## 构造函数

* 用法

  ```js
  const Editor = shimo.sdk.document.Editor
  const Uploader = shimo.sdk.document.plugins.Uploader
  const editor = new Editor()
  const uploader = new Uploader({
    ...options
  })
  ```

* 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `editor` | `Editor` | 必选 | 编辑器实例 |
| `container` | `Element / String`  | 必选 | 拖拽容器 |
| `url` | `String` | 必选 | 上传URL |
| `token_url` | `String` | 可选 | 获取token的URL |

## 方法列表

### destory

销毁uploader。

* 返回 `undefined`
* 用法 `uploader.destory()`

## 事件列表

```js
// 开始上传
uploader.on(Uploader.events.START, (file: File) => {})
// 取消上传
uploader.on(Uploader.events.CANCEL, (file: File) => {})
// 上传文件前
uploader.on(Uploader.events.SENDING, (
  file: File,
  xhr: XMLHttpRequest,
  formDataL: FormData
) => {})
// 上传进度更新
uploader.on(Uploader.events.PROCESS, (file: File) => {})
// 上传成功
uploader.on(Uploader.events.SUCCESS, (file: File) => {})
// 上传失败
uploader.on(Uploader.events.FAIL, (error: Error | string) => {})
```