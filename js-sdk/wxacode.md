# 获取二维码

> **danger**
> 以下操作仅适用于 SDK version >= 1.2.0

`wx.BaaS.getWXACode(type, params)`

通过该接口可以获取小程序任意页面的二维码，扫描该二维码可以直接进入小程序对应的页面。目前支持生成小程序码和小程序二维码。

> **info**
> 调用该接口前，请确保在 [知晓云管理后台-小程序设置页面-SDK 功能设置](https://cloud.minapp.com/admin/profile/) 中已开启相应权限。

**参数说明**

| 参数    | 类型    | 必填 | 说明 |
| :----- | :------ | :-- | :-- |
| type   | String  | Y   | 支持 'wxacode', 'wxacodeunlimit', 'wxaqrcode' 三种类型 |
| params | Object  | Y   | 小程序码或小程序二维码的配置参数|

## 获取小程序码（数量有限）

设置 `type` 为 `wxacode`，`params` 支持以下配置项：

| 参数        | 类型    | 必填 | 说明 |
| :--------- | :------ | :-- | :-- |
| path       | String  | Y   | 不能为空，最大长度 128 字节 |
| width      | Int     | N   | 二维码的宽度，默认值为 430 |
| auto_color | Bool    | N   | 自动配置线条颜色，如果颜色依然是黑色，则说明不建议配置主色调，默认值为 false |
| line_color | Object  | N   | auth_color 为 false 时生效，使用 rgb 设置颜色 例如 {"r":"xxx","g":"xxx","b":"xxx"},十进制表示，默认值为 {"r":"0","g":"0","b":"0"} |

此类型适用于需要的码数量较少的业务场景。此时生成的小程序码，永久有效，数量有限（与 `wxaqrcode` 生成的小程序二维码加起来不超过 100000），请谨慎使用。用户扫描该码进入小程序后，将直接进入 path 对应的页面。

## 获取小程序码（数量无限制）

设置 `type` 为 `wxacodeunlimit`，`params` 支持以下配置项：

| 参数        | 类型    | 必填 | 说明 |
| :--------- | :------ | :-- | :-- |
| scene      | String  | Y   | 最大32个可见字符，只支持数字，大小写英文以及部分特殊字符：!#$&'()*+,/:;=?@-._~，其它字符请自行编码为合法字符（因不支持%，中文无法使用 urlencode 处理，请使用其他编码方式）|
| page       | String  | Y   | 必须是已经发布的小程序存在的页面（否则报错），例如 "pages/index/index" ,根路径前不要填加'/',不能携带参数（参数请放在scene字段里），如果不填写这个字段，默认跳主页面 |
| width      | Int     | N   | 二维码的宽度，默认值为 430 |
| auto_color | Bool    | N   | 自动配置线条颜色，如果颜色依然是黑色，则说明不建议配置主色调，默认值为 false |
| line_color | Object  | N   | auth_color 为 false 时生效，使用 rgb 设置颜色 例如 {"r":"xxx","g":"xxx","b":"xxx"},十进制表示，默认值为 {"r":"0","g":"0","b":"0"} |

此类型适用于需要的码数量极多，或仅临时使用的业务场景。此时生成的小程序码，永久有效，数量暂无限制。用户扫描该码进入小程序后，开发者需在对应页面获取的码中 scene 字段的值，再做处理逻辑。

## 获取小程序二维码（数量有限）

设置 `type` 为 `wxaqrcode`，`params` 支持以下配置项：

| 参数        | 类型    | 必填 | 说明 |
| :--------- | :------ | :-- | :-- |
| path       | String  | Y   | 不能为空，最大长度 128 字节 |
| width      | Int     | N   | 二维码的宽度，默认值为 430 |

此类型适用于需要的码数量较少的业务场景。此时生成的小程序码，永久有效，数量有限（与 `wxacode` 生成的小程序二维码加起来不超过 100000），请谨慎使用。用户扫描该码进入小程序后，将直接进入 path 对应的页面。

## 接口返回和请求示例

**返回字段说明**

| 参数    | 类型    | 必填 | 说明 |
| :----- | :------ | :-- | :-- |
| image  | String  | Y   | 二维码的 base64 编码 |

以下几种情况会返回 400 错误：

- 未在知晓云后台开启生成小程序码权限
- 传递的参数不合法
- 设置 `type='wxacodeunlimit'` 时，接口调用频率超过限制(目前 5000次/分钟）
- 设置 `type='wxacode'` 或 `type='wxaqrode'`时，接口生成的码数大于限制
- 设置 `type='wxacodeunlimit'` 时，所传的 page 页面不存在，或者小程序没有发布

**请求示例**

```js
  const params = {
    path: '../user/index?id=123456',
    width: 250
  }

  wx.BaaS.getWXACode('wxacode', params).then(res => {
    this.setData({ imageBase64: res.image})
  }).catch(err => {
    console.log(err)
  })
```

```html
<view style="text-align: center;">
  <image src="{{ imageBase64 }}" style="width: 250px; height: 250px" />
</view
```

> **info**
> 了解更多获取二维码的信息，可参考小程序文档 - [获取二维码](https://mp.weixin.qq.com/debug/wxadoc/dev/api/qrcode.html) 章节