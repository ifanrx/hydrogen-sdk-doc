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

  传入 slideId 表示从特定的幻灯片开始播放，不传表示从第一张幻灯片开始播；
  传入 controllable 表示可以控制播放行为；
  传入 fullScreenPlay 表示全屏播放，否则全页面播放。

  * 参数

  |名称|类型|默认值|描述|必选/可选|
  | -- | -- | -- | -- | -- |
  |`slideId`|`string`|-|slide的Id|可选|
  | `controllable`|`boolean`|true|是否受控|可选|
  | `fullScreenPlay`|`boolean`|true|是否全屏播放|可选|

  * 返回值 void
  * 用法 `play(slideId?, controllable?, fullScreenPlay?)`

### fullScreenPlay
  全屏播放幻灯片。

  传入 slideId 表示从特定的幻灯片开始播放，不传表示从第一张幻灯片开始播，
  传入 controllable 表示可以控制播放行为。

  * 参数

  |名称|类型|默认值|描述|必选/可选|
  | -- | -- | -- | -- | -- |
  |`slideId`|`string`|-|slide的Id|可选|
  | `controllable`|`boolean`|true|是否受控|可选|

  * 返回值 void
  * 用法 `fullScreenPlay(slideId?, controllable?)`

### fullPagePlay
  全页面播放幻灯片。

  传入 slideId 表示从特定的幻灯片开始播放，不传表示从第一张幻灯片开始播，
  传入 controllable 表示可以控制播放行为。

  * 参数

  |名称|类型|默认值|描述|必选/可选|
  | -- | -- | -- | -- | -- |
  |`slideId`|`string`|-|slide的Id|可选|
  | `controllable`|`boolean`|true|是否受控|可选|

  * 返回值 void
  * 用法 `fullpagePlay(slideId?, controllable?)`

### stop
  退出播放幻灯

  * 参数
  * 返回值 void
  * 用法 `stop()`

### next
  播放下一张幻灯

  * 参数 index?: number 传 index 会跳到相应序列的slide
  * 返回值 void
  * 用法 `next(index?)`

### prev
  播放上一张幻灯

  * 参数
  * 返回值 void
  * 用法 `prev()`

### jumpTo
  跳转至第 `index` 张幻灯片，以开始播放时的幻灯片顺序为准，跳转过程中无动画切换效

  * 参数 `index`
  * 返回值 `void`
  * 用法 `jumpTo(index)`

### animateTo
  动画过渡到某一张幻灯片

  * 参数 `index`

  |名称|类型|默认值|描述|必选/可选|
  | -- | -- | -- | -- | -- |
  | fromIndex| `string` | - | 动画过渡后消失的幻灯片的 index|必选|
  | toIndex| `string` | - | 动画过渡后出现的幻灯片的 index|必选|
  | reverse| `boolean` | `false` | 是否是回退过渡|可选|
  | animationDuration| `number` | 0.6 | 动画过渡时长，单位`秒`|可选|

  * 返回值 `void`
  * 用法 `animateTo(fromIndex, toIndex, reverse?, animationDuration?)`

### isPlaying
  获取当前是否在播

  * 参数
  * 返回值 `boolean`
  * 用法 `isPlaying()`

### isFullScreen
  获取当前是否为全屏状态

  * 参数
  * 返回值 `boolean`
  * 用法 `isFullScreen()`

### hasNext
  获取是否还有未播放的 slide

  * 参数
  * 返回值 `boolean`
  * 用法 `hasNext()`

### destroy
  销毁播放器实例

  * 参数
  * 返回值 `void`
  * 用法 `destroy()`

### requestFullScreen
  请求浏览器全屏

  * 参数
  * 返回值 `void`
  * 用法 `requestFullScreen()`

### quitFullScreen
  退出浏览器全屏

  * 参数
  * 返回值 `void`
  * 用法 `quitFullScreen()`

### setFullPage
  设置为全页面播放效果

  * 参数
  * 返回值 `void`
  * 用法 `setFullPage()`

### quitFullPage
  退出全页面播放效果

  * 参数
  * 返回值 `void`
  * 用法 `quitFullPage()`

### showFinishPage
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
    editor.on(events.PLAY, handler)
  ```

### PLAY
  进入播放状态，如果是全屏播放此时并未真正开始播放

  * 回调方法签名 `handler()`

### START
  开始播放，如果是全屏播放，事件在全屏之后发生
  * 回调方法签名 `handler()`

### NEXT
  以动画或未动画形式，播放了下一张幻灯片

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

### ANIMATE_TO
  动画效果跳到了某一张幻灯片

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
