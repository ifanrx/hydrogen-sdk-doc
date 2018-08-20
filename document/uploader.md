# 文档上传插件

加载此插件可以上传图片和附件

## 构造函数

* 用法

```js
const Editor = shimo.sdk.document.Editor
const Uploader = shimo.sdk.document.plugins.Uploader
const editor = new Editor()
const uploader = new Uploader({
  editor,
  ...options
})
```

* 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `editor` | `Editor` | 必选 | 编辑器实例 |
| `container` | `Element / String`  | 必选 | 拖拽容器 |
| `type` | `'default' / 'qiniu'`  | 可选 | 默认为'default' |
| `url` | `String` | 可选 | 上传URL |
| `tokenUrl` | `String` | 可选 | 获取token的URL |
| `accessToken` | `String` | 可选 | token |
| `paramName` | `String` | 可选 | 上传文件参数名，默认为'file' |
| `params` | `Object` | 可选 | 上传文件时，接口需要的额外参数 |

* 注意：type为'qiniu'时，tokenUrl与accessToken必须要传入一个

## 方法列表

### destroy

销毁实例。

* 返回 `undefined`
* 用法 `uploader.destroy()`

## 事件列表

### on

事件监听

* 返回 undefined
* 用法 uploader.on(type, handler)
* 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `type` | `String` | 必选 | 类型 |
| `handler` | `Function`  | 必选 | 回调函数 |

```js
// 开始上传
uploader.on(Uploader.events.START, (files: File[]) => {})
// 取消上传
uploader.on(Uploader.events.CANCEL, (file: File) => {})
// 上传文件前，type为‘qiniu’时不会触发此事件
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

### off

事件取消

* 返回 undefined
* 用法 uploader.off(type, handler)
* 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `type` | `String` | 必选 | 类型 |
| `handler` | `Function`  | 必选 | 回调函数 |
