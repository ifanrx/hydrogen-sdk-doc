# 获取字节跳动小程序二维码

{% if apiPrefix %}
`{{apiPrefix}}BaaS.getQRCode({path, platform, width, lineColor, background, setIcon, categoryName, categoryId})`
{% else %}
`BaaS.bytedance.getQRCode({appName, path, platform, width, lineColor, background, setIcon, categoryName, categoryId})`
{% endif %}


通过该接口可以获取小程序任意页面的二维码，扫描该二维码可以直接进入小程序对应的页面。

> **info**
> 调用该接口前，请确保在 [知晓云管理后台-小程序设置页面-SDK 功能设置](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]settings/sdk/) 中已开启相应权限。

## 参数说明

{% if apiPrefix %}
| 参数         | 类型    | 必填 | 说明 |
| :----------- | :------ | :--- | :--- |
| path         | String  | N    | 小程序/小游戏启动参数，小程序则格式为 <path>?<query>，小游戏则格式为 JSON 字符串，默认为空 |
| platform     | String  | N    | 当 `path` 字段指定时，该字段必填，取值: miniapp（小程序）/ minigame（小游戏）|
| width        | Integer | N    | 二维码宽度，单位 px，最小 280，最大 1280，默认为 430 |
| lineColor    | Object  | N    | 二维码线条颜色，默认为黑色，格式：{"r":0,"g":0,"b":0} |
| background   | Object  | N    | 二维码背景颜色，默认为透明，格式：{"r":0,"g":0,"b":0} |
| setIcon      | Boolean | N    | 是否展示小程序/小游戏 icon，默认不展示 |
| categoryName | String  | N    | 二维码存储的分类名称 |
| categoryId   | Inter   | N    | 二维码存储的分类 ID, 当名称、ID 同时存在时，ID 优先 |
{% else %}
| 参数    | 类型    | 必填 | 说明 |
| :------ | :------ | :-- | :-- |
| appName      | AppName | N    | 生成字节系对应 app 名称的小程序二维码，默认为`toutiao`（今日头条）。所有支持的应用，请查看下表。 |
| path         | String  | N    | 小程序/小游戏启动参数，小程序则格式为 <path>?<query>，小游戏则格式为 JSON 字符串，默认为空 |
| platform     | String  | N    | 当 `path` 字段指定时，该字段必填，取值: miniapp（小程序）/ minigame（小游戏）|
| width        | Integer | N    | 二维码宽度，单位 px，最小 280，最大 1280，默认为 430 |
| lineColor    | Object  | N    | 二维码线条颜色，默认为黑色，格式：{"r":0,"g":0,"b":0} |
| background   | Object  | N    | 二维码背景颜色，默认为透明，格式：{"r":0,"g":0,"b":0} |
| setIcon      | Boolean | N    | 是否展示小程序/小游戏 icon，默认不展示 |
| categoryName | String  | N    | 二维码存储的分类名称 |
| categoryId   | Inter   | N    | 二维码存储的分类 ID, 当名称、ID 同时存在时，ID 优先 |
{% endif %}

AppName 支持的值为：

| 值      | 说明     |
| :------ | :------- |
| toutiao | 今日头条 |
| douyin  | 抖音     |


## 接口返回

**返回字段说明**

{% if apiPrefix %}
| 参数    | 类型    | 说明 |
| :------ | :------ | :-- |
| image_url  | String  | 二维码地址，二维码的下载链接 |
{% else %}
| 参数    | 类型    | 说明 |
| :------ | :------ | :-- |
| id      | String  | 二维码 ID |
| name    | String  | 二维码名称 |
| image_url  | String  | 二维码地址，二维码的下载链接 |
| url_param  | String  | 页面地址 |
| query_param  | String  | 启动参数 |
| describe  | String  | 描述 |
{% endif %}

以下几种情况会返回 400 错误：

- 未在知晓云后台开启生成小程序码权限
- 传递的参数不合法


## 请求示例

{% if apiPrefix %}
```js
{{apiPrefix}}BaaS.bytedance.getQRCode({
  path: 'pages/index/index?a=10&b=20',
  platform: 'miniapp',
  width: 280,
}).then(res => {
  callback(null, res.image_url)
})
```
{% else %}
```js
const res = await BaaS.bytedance.getQRCode({
  path: 'pages/index/index?a=10&b=20',
  platform: 'miniapp',
  width: 280,
})
return res.image_url
```
{% endif %}

HError 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

> **info**
> 了解更多获取二维码的信息，可参考字节跳动小程序文档 - [二维码](https://microapp.bytedance.com/dev/cn/mini-app/develop/server/qr-code/createqrcode) 章节
