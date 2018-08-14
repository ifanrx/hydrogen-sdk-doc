# 编辑器播放

幻灯片编辑器实例中，带有一个 player 实例，如下：

```js
const editor = new Editor()
const player = editor.player
```

## 方法列表

### play
  播放幻灯片。
  传入 slideId 表示从特定的幻灯片开始播放，不传表示从第一张幻灯片开始播。
  传入 controllable 表示可以控制播放行为。
  传入 fullscreenPlay 表示全屏播放，否则全页面播放。

  * 参数

  |名称|类型|默认值|描述|必选/可选|
  | -- | -- | -- | -- | -- |
  |`slideId`|`string`|-|slide的Id|可选|
  | `controllable`|`boolean`|true|是否受控|可选|
  | `fullscreenPlay`|`boolean`|true|是否全屏播放|可选|

  * 返回值 void
  * 用法 play(slideId?, controllable?, fullscreenPlay?)

### fullscreenPlay
  全屏播放幻灯片。
  传入 slideId 表示从特定的幻灯片开始播放，不传表示从第一张幻灯片开始播
  传入 controllable 表示可以控制播放行为。

  * 参数

  |名称|类型|默认值|描述|必选/可选|
  | -- | -- | -- | -- | -- |
  |`slideId`|`string`|-|slide的Id|可选|
  | `controllable`|`boolean`|true|是否受控|可选|

  * 返回值 void
  * 用法 fullscreenPlay(slideId?, controllable?)

### fullpagePlay
  全页面播放幻灯片。
  传入 slideId 表示从特定的幻灯片开始播放，不传表示从第一张幻灯片开始播
  传入 controllable 表示可以控制播放行为。

  * 参数

  |名称|类型|默认值|描述|必选/可选|
  | -- | -- | -- | -- | -- |
  |`slideId`|`string`|-|slide的Id|可选|
  | `controllable`|`boolean`|true|是否受控|可选|

  * 返回值 void
  * 用法 fullpagePlay(slideId?, controllable?)

### stop
  退出播放幻灯

  * 参数
  * 返回值 void
  * 用法 stop()

### next
  播放下一张幻灯

  * 参数 index?: number 传 index 会跳到相应序列的slide
  * 返回值 void
  * 用法 next(index?)

### prev
  播放上一张幻灯

  * 参数
  * 返回值 void
  * 用法 prev()

### jumpTo
  跳转至第 `index` 张幻灯片，以开始播放时的幻灯片顺序为准，跳转过程中无动画切换效

  * 参数 `index
  * 返回值 void
  * 用法 jumpTo()

### isPlaying
  获取当前是否在播

  * 参数
  * 返回值 boolean
  * 用法 isPlaying()

### destroy
  播放器销毁

  * 参数
  * 返回值 void
  * 用法 destroy()

### requestFullscreen
  请求浏览器全屏

  * 参数
  * 返回值 void
  * 用法 requestFullscreen()

### quitFullscreen
  退出浏览器全屏

  * 参数
  * 返回值 void
  * 用法 quitFullscreen()

### setFullPage
  设置为全页面播放效果

  * 参数
  * 返回值 void
  * 用法 setFullPage()

### quitFullpage
  退出全页面播放效果

  * 参数
  * 返回值 void
  * 用法 quitFullpage()

### 示例
```javascript
const player = editor.player
player.play()

someCustomizeNextBtn.addEventListener('click', () => {
  if (player.isPlaying()) {
    player.next()
  }
})
```

## 属性列表
|名称|类型|描述|
| -- | -- | -- |
| `overlay` | JQuery |获取播放器交互操作层的 JQuery 实例|


### 示例
可以通过在 overlay 上监听各种操作来自定义播放

```javascript
const player = editor.player

player.overlay
  .on('click', (e) => {
    e.stopImmediatePropagation() // 阻止默认的播放下一页动作
    showSomeMenu()
  })
  .on('dblclick', (e) => {
    player.next()
  })
```

