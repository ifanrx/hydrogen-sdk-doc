# 编辑器播放

幻灯片编辑器实例中，带有一个 player 实例，如下：

```js
const editor = new Editor()
const player = editor.player
```


## 方法列表

示例
  ```javascript
  const player = editor.player
  player.play()

  someCustomizeNextBtn.addEventListener('click', () => {
    if (player.isPlaying()) {
      player.next()
    }
  })
  ```

### play
  播放幻灯片。

  * 参数

  |名称|类型|默认值|描述|必选/可选|
  | -- | -- | -- | -- | -- |
  |`id`|`string|number`|-|slide 的 id 或者 player 中 slideList 对应的 index |可选|
  |`fileData`|`string`|原 editor 中的 fileDelta|特定版本的file数据，可被初始化为 Delta|可选|
  |`options`|`object`|见下|播放参数选项，包括是否受控和播放模式|可选|
  |`options.controllable`|`boolean`|true|是否受控|可选|
  |`options.mode`|Editor.PlayMode|PlayMode.FULLSCREEN|播放模式|可选|
  |`options.container`|HTMLElement|document.body|播放区域可以选定mount到特定的节点上|可选|

  * 返回值 void
  * 用法 `play(id?, fileData?, { controllable: true, mode: Editor.PlayMode.FULLSCREEN, container: someDIVContainer }?)`

### stop
  退出播放幻灯

  * 参数
  * 返回值 void
  * 用法 `stop()`

### next
  播放下一张幻灯

  * 参数：无
  * 返回值 void
  * 用法 `next()`

### prev
  播放上一张幻灯

  * 参数
  * 返回值 void
  * 用法 `prev()`

### jumpTo
  跳转至特定幻灯片，以开始播放时的幻灯片顺序为准，跳转过程中无动画切换效
  |名称|类型|默认值|描述|必选/可选|
  | -- | -- | -- | -- | -- |
  |`id`|`string|number`|-|slide的id或者player中slideList对应的index|必选|
  |`withAnimation`|`boolean`|false|是否有过渡效果|可选|

  * 参数 `id`
  * 返回值 `void`
  * 用法 `jumpTo(id)`

### isPlaying
  获取当前是否在播

  * 参数：无
  * 返回值 `boolean`
  * 用法 `isPlaying()`

### isFullScreen
  获取当前是否为全屏状态

  * 参数：无
  * 返回值 `boolean`
  * 用法 `isFullScreen()`

### destroy
  销毁播放器实例

  * 参数：无
  * 返回值 `void`
  * 用法 `destroy()`

### setFinishPage
  配置播放结束提示

  * 参数

  |名称|类型|默认值|描述|必选/可选|
  | -- | -- | -- | -- | -- |
  |`message`|`string`|-|提示内容|可选|
  | `callback`|`Function`|-|点击提示内容页而的回调|可选|


## 事件列表

示例

  ```js
    const events = Editor.PlayerEvents
    editor.player.on(events.PLAY, handler)
  ```

### PLAY
  进入播放状态，如果是全屏播放此时并未真正开始播放

  * 回调方法签名 `handler()`

### START
  开始播放，如果是全屏播放，事件在全屏之后发生
  * 回调方法签名 `handler()`

### NEXT
  以动画或无动画形式，播放了下一张幻灯片

  * 回调方法签名 `handler(event)`

  |名称|类型|默认值|描述|
  | -- | -- | -- | -- |
  | `event` | `Object` | 无 | 描述 |
  | `event.from` | `string` | 无 | 上一张幻灯片的 SlideId，可能为空 |
  | `event.to` | `string` | 无 | 当前幻灯片的 SlideId |

### PREV
  播放了上一张幻灯片

  * 回调方法签名 `handler(event)`

  |名称|类型|默认值|描述|
  | -- | -- | -- | -- |
  | `event` | `Object` | 无 | 描述 |
  | `event.from` | `string` | 无 | 上一张幻灯片的 SlideId |
  | `event.to` | `string` | 无 | 当前幻灯片的 SlideId |

### JUMP_TO
  无动画效果跳到了某一张幻灯片

  * 回调方法签名 `handler(event)`

  |名称|类型|默认值|描述|
  | -- | -- | -- | -- |
  | `event` | `Object` | 无 | 描述 |
  | `event.from` | `string` | 无 | 上一张幻灯片的 SlideId，可能为空 |
  | `event.to` | `string` | 无 | 当前幻灯片的 SlideId |

### FINISH
  进入到了结束提示页，如果有结束提示页的话

  * 回调方法签名 `handler()`

### STOP
  退出了播放

  * 回调方法签名 `handler()`

### DESTROY
  销毁了 Player

  * 回调方法签名 `handler()`

### FULLSCREEN_CHANGE
  全屏状态发生了变化

  * 回调方法签名 `handler(event)`

  |名称|类型|默认值|描述|
  | -- | -- | -- | -- |
  | `event` | `Object` | 无 | 描述 |
  | `event.isFullscreen` | `boolean` | 无 | 当前是否全屏状态 |


## 属性列表

### overlay: `JQuery`
  获取播放器交互操作层的 JQuery 实例

### isFullScreen: `boolean`
  获取浏览器是否处于全屏状态

### slideList: `Array<{slideId, index}>`
  获取到 Player 中对应的列表数据，包含对应 slide 的 id 和在列表中的 index
