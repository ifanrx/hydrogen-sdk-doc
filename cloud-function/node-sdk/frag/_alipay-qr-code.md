# 获取支付宝小程序二维码

{% if apiPrefix %}
`{{apiPrefix}}BaaS.getAlipayQRCode({urlParam, queryParam, describe})`
{% else %}
`BaaS.alipay.getAlipayQRCode({name, urlParam, queryParam, describe})`
{% endif %}


通过该接口可以获取小程序任意页面的二维码，扫描该二维码可以直接进入小程序对应的页面。

> **info**
> 调用该接口前，请确保在 [知晓云管理后台-小程序设置页面-SDK 功能设置](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]settings/sdk/) 中已开启相应权限。

## 参数说明

{% if apiPrefix %}
| 参数    | 类型    | 必填 | 说明 |
| :------ | :------ | :-- | :-- |
| urlParam | String  | Y   | 页面地址，最多 128 个字符|
| queryParam  | String   | Y   | 启动参数，最多 128 个字符|
| describe | String | Y   | 码描述，最少 2 个字符，最多 20 个字符|
{% else %}
| 参数    | 类型    | 必填 | 说明 |
| :------ | :------ | :-- | :-- |
| name    | String  | Y   | 二维码名称，最多 128 个字符|
| urlParam | String  | Y   | 页面地址，最多 128 个字符|
| queryParam  | String   | Y   | 启动参数，最多 128 个字符|
| describe | String | Y   | 码描述，最少 2 个字符，最多 20 个字符|
{% endif %}


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
{{apiPrefix}}BaaS.getAlipayQRCode({
  urlParam: "index",
  queryParam: "key=value&alpha=True",
  describe: "备注：扫码中大奖"})
.then(res => {
  callback(null, res.image_url)
})
```
{% else %}
```js
BaaS.alipay.getAlipayQRCode({
  name: "test",
  urlParam: "index",
  queryParam: "key=value&alpha=True",
  describe: "备注：扫码中大奖"})
.then(res => {
  callback(null, res.image_url)
})
```
{% endif %}

HError 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

> **info**
> 了解更多获取二维码的信息，可参考支付宝小程序文档 - [小程序二维码](https://docs.alipay.com/mini/introduce/qrcode) 章节
