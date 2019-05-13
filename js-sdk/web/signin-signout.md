# 登录

## 通用注册登录

请参考[通用注册登录](/js-sdk/auth.md)章节

## 第三方登录

> **info**
> 使用前，请确保已经完成了[第三方授权配置](/js-sdk/web/third-party-auth-config.md)。

`BaaS.auth.loginWithThirdParty(provider, authPageUrl, options)`

**参数说明**

| 参数                    | 类型    | 必填 | 默认值 | 说明         |
| :---------------------- | :------ | :--- | :----- | :----------- |
| provider                | String  | 是   | -      | 第三方平台 |
| authPageUrl             | String  | 是   | -      | 授权页面 URL |
| options.debug           | Boolean | 否   | false  | 是否 debug 模式 |
| options.mode            | String  | 否   | `'popup-window'` | 授权窗口打开模式 |
| options.authModalStyle  | Object  | 否   | `{}` | popup-iframe 模式下，授权模态框的样式 |
| options.windowFeatures  | String  | 否   | `''` | popup-window 模式下，授权窗口的特性 |
| options.createUser      | Boolean | 否   | `true` | 是否创建用户 |
| options.syncUserProfile | String  | 否   | `'setnx'` | 是否[同步第一层级用户信息](/js-sdk/account.md#同步第一层级用户信息)，可选值为 overwrite、setnx、false |

必填参数：

1. ** provider ** - 第三方平台。目前支持三个平台 `oauth-wechat-mp`(微信公众号)、`oauth-wechat-web`(微信网页)、`oauth-weibo`(新浪微博)

2. ** authPageUrl  ** - 授权页面 URL。进行授权时，SDK 会打开一个新窗口（或 iframe，具体请查看参数 options.mode ），在该页面中跳转到第三方授权页面进行授权，
并将结果返回给 loginWithThirdParty 接口，所以该页面是整个授权过程的总控页面。页面不需要开发者自行开发，我们已经提供了[模版](#授权页模版)，只需要该一下配置项，
并放带自己的服务器下即可。页面的内容请查看下方的授权页面模版。

  > **info**
  > 授权页必须与主页面同源。

其他参数：

1. ** options.debug ** - 是否 debug 模式 。debug 模式下，假如授权失败，授权页面不会关闭，方法开发者调试接口。

  > **info**
  > 生产环境请关闭 debug 模式。

1. ** options.mode ** - 授权窗口打开模式 。支持三种模式，分别为`popup-window`（新窗口打开授权页面）、`popup-iframe`（在 iframe 中打开授权页面）、`redirect`（在当前页面中跳转到授权页面）。
移动端推荐使用`redirect`模式（**微信内置浏览器中，只能使用这种模式**）。

2. ** options.authModalStyle ** - mode 为 `popup-iframe` 时，授权模态框的样式。数据结构为：

  ```js
  {
    container: {
      // 弹窗的最外层 div 样式
    },
    iframe: {
      // iframe 样式
    },
    closeButton: {
      // 删除按钮样式
    }
  }
  ```

3. ** options.windowFeatures ** - mode 为 `popup-window` 时，弹窗样式，详见 [strWindowFeatures](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open)。如果传该参数，或值为 `''`，浏览器会新建一个 tab 来打开页面。

4. ** options.createUser ** - 是否创建用户。

5. ** options.syncUserProfile ** - 是否[同步第一层级用户信息](/js-sdk/account.md#同步第一层级用户信息)。可选值为 `overwrite`、`setnx`、`false`。

**返回结果**

Promise<[UserRecord(currentUser)](/js-sdk/account.md)>

**请求示例**

```js
BaaS.auth.loginWithThirdParty('oauth-wechat-web', '/auth.html')
  .then(user => {
    // 登录成功
  })
  .catch(err => {
    // 登录失败
  })
```

## 关联第三方账号

> **info**
> 使用前，请确保已经完成了[第三方授权配置](/js-sdk/web/third-party-auth-config.md)。

`UserRecord.linkThirdParty(provider, authPageUrl, options)`

**参数说明**

| 参数                    | 类型    | 必填 | 默认值 | 说明         |
| :---------------------- | :------ | :--- | :----- | :----------- |
| provider                | String  | 是   | -      | 第三方平台 |
| authPageUrl             | String  | 是   | -      | 授权页面 URL |
| options.mode            | String  | 否   | `'popup-window'` | 授权窗口打开模式 |
| options.authModalStyle  | Object  | 否   | `{}` | popup-iframe 模式下，授权模态框的样式 |
| options.windowFeatures  | String  | 否   | `''` | popup-window 模式下，授权窗口的特性 |
| options.syncUserProfile | String  | 否   | `'setnx'` | 是否[同步第一层级用户信息](/js-sdk/account.md#同步第一层级用户信息)，可选值为 overwrite、setnx、false |

接口的参数与[第三方登录](#第三方登录)几乎相同，只少了 `option.createUser` 参数，因为只有已经登录了才能关联第三方账号。

## 获取授权结果（options.mode 为 redirect）

`BaaS.auth.getRedirectResult()`

redirect 模式是直接在页面内跳转到授权，在授权完成后并不能直接在调用用授权的地方直接往下执行（`popup-window`、`popup-iframe` 这两种模式可以），
而是会直接重定向会调用授权的页面，授权结果放在页面 URL 中。该接口就是获取 URL 中的授权结果的。请在页面加载时或页面 js 代码的最顶部调用该接口，
来判断授权操作是否成功。

** 返回值 **
Promise<Result>

## 第三方授权

`BaaS.auth.thirdPartyAuth()`

调用该接口会跳转到第三方授权页面，用户操作后，会将结果回传给授权调用方。`popup-window` 模式会传给
window.opener，`popup-iframe` 模式会传给 window.parent，`redirect` 模式会将结果拼到 URL 中，
并重定向到调用页面（通过[获取授权结果](#获取授权结果（optionsmode-为-redirect）)接口可以获取到结果）。

> **info**
> 一般来说，该接口只在授权页中使用。

## 授权页模版

使用以下代码创建一个 html 文件，将该文件放置到服务器中（必须与调用授权的页面同源），
并保证通过 url 能访问到该文件。

代码中的 `<sdk-url>` 需要替换成知晓云 sdk 在服务器中的 url，`<cilent-id>` 需要
替换为应用的 clientId。

单页应用的开发者，也可以不使用该模版，只要保证 authPageUrl 能访问到的对应的页面，
并且进入页面立即调用 `BaaS.auth.thirdPartyAuth` 即可。

> **info**
> 授权页是用来控制整个授权流程的，不要在页面内做其他操作。

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
