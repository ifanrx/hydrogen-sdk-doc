# 微信小程序直播（SDK >= v3.5）

SDK 支持获取微信小程序直播的「直播房间列表」与「回放源视频」。

> **info**
> 微信小程序直播的接入，请参考 [微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/liveplayer/live-player-plugin.html)。

## 获取直播房间列表

`BaaS.wechat.livestreaming.getRoomList(offset, limit)`

| 属性             | 类型    | 必填  | 说明 |
| :--------------- | :------ | :---- | :--- |
| offset           | Integer | 是    | 起始拉取房间，offset = 0 表示从第 1 个房间开始拉取  |
| limit            | Integer | 是    | 每次拉取的个数上限，不要设置过大，建议 100 以内 |

**请求示例**

```js
BaaS.useVersion('v3.5')
exports.main = async function(event) {
  return await BaaS.wechat.livestreaming.getRoomList(0, 20)
}
```

**返回示例**

```js
{
  "error": {},
  "code": 0,
  "data": {
    "room_info": [
      {
        "name": "直播房间名",
        "roomid": 1, // 直播间 ID
        "cover_img": "http:\/\/mmbiz.qpic.cn\/mmbiz_jpg\/Rl1RuuhdstSfZa8EEljedAYcbtX3Ejpdl2et1tPAQ37bdicnxoVialDLCKKDcPBy8Iic0kCiaiaalXg3EbpNKoicrweQ\/0?wx_fmt=jpeg", // 封面图片 url
        "live_satus": 101, // 直播状态 101: 直播中, 102: 未开始, 103: 已结束, 104: 禁播, 105: 暂停中, 106: 异常, 107: 已过期
        "start_time": 1568128900, // 直播计划开始时间，列表按照 start_time 降序排列
        "end_time": 1568131200, // 直播计划结束时间
        "anchor_name": "李四", // 主播名
        "anchor_img": "http:\/\/mmbiz.qpic.cn\/mmbiz_jpg\/Rl1RuuhdstSfZa8EEljedAYcbtX3Ejpdlp0sf9YTorOzUbGF9Eib6ic54k9fX0xreAIt35HCeiakO04yCwymoKTjw\/0?wx_fmt=jpeg", // 主播头像 url
        "goods": [
          {
            "cover_img": "http://mmbiz.qpic.cn/mmbiz_png/FVribAGdErI2PmyST9ZM0JLbNM48I7TH2FlrwYOlnYqGaej8qKubG1EvK0QIkkwqvicrYTzVtjKmSZSeY5ianc3mw/0?wx_fmt=png",
            "url": "pages/index/index.html",
            "price": 1100,
            "name": "fdgfgf"
          }
        ], // 商品列表
      }
    ],
    "errcode": 0,
    "errmsg": "ok",
    "total": 1
  },
}
```

## 回放源视频

`BaaS.wechat.livestreaming.getPlaybackList(roomId, offset, limit)`

| 属性             | 类型    | 必填  | 说明 |
| :--------------- | :------ | :---- | :--- |
| roomId           | Integer | 是    | 房间号  |
| offset           | Integer | 是    | 起始拉取房间，offset = 0 表示从第 1 个房间开始拉取  |
| limit            | Integer | 是    | 每次拉取的个数上限，不要设置过大，建议 100 以内 |

**请求示例**

```js
BaaS.useVersion('v3.5')
exports.main = async function(event) {
  return await BaaS.wechat.livestreaming.getRoomList(1, 0, 20)
}
```

**返回示例**

```js
{
  "error": {},
  "code": 0,
  "data": {
    "live_replay": [
      {
        "expire_time": "2020-11-11T03:49:55Z", // 回放视频 url 过期时间
        "create_time": "2019-11-12T03:49:55Z", // 回放视频创建时间
        "media_url": "http://xxxxx.vod2.myqcloud.com/xxxxx/xxxxx/f0.mp4" // 回放视频 url
      }
    ],
    "errcode": 0,
    "errmsg": "ok",
    "total": 1
  },
}
```
