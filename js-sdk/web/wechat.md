# 获取微信 JSSDK 调用凭证

`BaaS.getWechatJSSDKCredentials(url)`

获取调用微信网页开发中JS-SDK 的权限验证配置，详细说明阅读：

https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#4

调用此接口需要配置「微信公众号登录」的凭证，无需用户登录，仅需提交 Client-ID。

**请求参数**

| 参数                    | 类型    | 必填 | 参数描述 |
| :--------------------- | :------ | :-- | :------ |
| url                    | string  | Y   | 当前页面的完整 UR，不包含 # 及其后面部分 |

**成功响应**

| 参数                    | 类型    | 必填 | 参数描述 |
| :--------------------- | :------ | :-- | :------ |
| appid                    | string  | Y   | 公众号的唯一标识|
| timestamp                    | string  | Y   | 生成签名的时间戳|
| noncestr                    | string  | Y   | 生成签名的随机串|
| signature                    | string  | Y   | 签名|

**失败响应**

| 参数                    | 类型    | 必填 | 参数描述 |
| :--------------------- | :------ | :-- | :------ |
| code                    | string  | Y   | 失败状态码|
| message                    | string  | Y   | 错误信息|

**示例代码**

```js
window.BaaS.getWechatJSSDKCredentials(window.location.href.replace(/#.*/, ''))
  .then(res => {
    // 成功获取调用凭证
  })
  .catch(err => {
    // 失败
  })
```
