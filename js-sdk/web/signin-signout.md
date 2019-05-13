# 登录

## 通用注册登录

请参考[通用注册登录](/js-sdk/auth.md)章节

## 第三方登录

`BaaS.auth.loginWithThirdParty(provider, authPageUrl, options)`

**参数说明**

| 参数                    | 类型    | 必填 | 默认值 | 说明         |
| :---------------------- | :------ | :--- | :----- | :----------- |
| provider                | String  | 是   | -      | 第三方平台 |
| authPageUrl             | String  | 是   | -      | 授权页面 URL |
| options.mode            | String  | 否   | `'popup-window'` | 支持三种模式 popup-window、popup-iframe、redirect。|
| options.authModalStyle  | Object  | 否   | `{}` | popup-iframe 模式下，授权模态框的样式 |
| options.windowFeatures  | String  | 否   | `''` | popup-window 模式下，授权窗口的特性，详见 [strWindowFeatures](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open) |
| options.createUser      | Boolean | 否   | `true` | 是否创建用户 |
| options.syncUserProfile | String  | 否   | `'setnx'` | 是否[同步第一层级用户信息](/js-sdk/account.md#同步第一层级用户信息)，可选值为 overwrite、setnx、false |

必填参数：

1. ** provider ** - 第三方平台。目前支持三个平台 `oauth-wechat-mp`(微信公众号)、`oauth-wechat-web`(微信网页)、`oauth-weibo`(新浪微博)

2. ** authPageUrl  ** - 授权页面 URL。进行授权时，SDK 会打开一个新窗口（或 iframe，具体请查看参数 options.mode ），在该页面中跳转到第三方授权页面进行授权，
并将结果返回给 loginWithThirdParty 接口，所以该页面是整个授权过程的总控页面。页面不需要开发者自行开发，我们已经通过了模版，只需要该一下配置项，
并放带自己的服务器下即可。页面的内容请查看下方的授权页面模版。

> **info**
> 授权页必须与主页面同域。

其他参数：

1. ** options.mode ** - 授权模式。支持三种模式，分别为`popup-window`（新窗口打开授权页面）、`popup-iframe`（在 iframe 中打开授权页面）、`redirect`（在当前页面中跳转到授权页面）。
移动端推荐使用`redirect`模式（**微信内置浏览器中，只能使用这种模式**）。

## 授权页

使用以下代码创建一个 html 文件，将该文件放置到服务器中，
并保证通过 url 能访问到该文件。

代码中的 `<sdk-url>` 需要替换成知晓云 sdk 在服务器中的 url，`<cilent-id>` 需要
替换为应用的 clientId。

```html
<!doctype html>
<html>
  <head>
  </head>
  <body>
    <script src="<sdk-url>"></script>
    <script>
      window.BaaS.init('<clinet-id>')
      window.BaaS.auth.thirdPartyAuth()
    </script>
  </body>
</html>
```
