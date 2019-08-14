# 登录

## 通用注册登录

请参考[通用注册登录](/js-sdk/auth.md)章节

## 第三方授权登录（微博、微信公众号、微信网页）

> **info**
> 使用前，请确保已经完成了[第三方授权配置](/js-sdk/web/third-party-auth-config.md)。

### 弹窗模式（在新窗口或 iframe 中打开授权页面）登录步骤

弹窗模式时序图：

  ![弹窗模式时序图](/images/third-party-auth/popup.png)

> **info**
> **登录页面**指开发者自行编写的，需要发起第三方授权登录（BaaS.auth.loginWithThirdParty）的页面，下文同。
>
> **授权页面**指开发者自行编写或复制下文步骤 2 授权页模板的，发起第三方授权（BaaS.auth.thirdPartyAuth）的页面，下文同。
>
> **第三方授权页面**指在授权页面发起第三方授权后，跳转到的第三方平台（微博、微信公众号、微信网页）授权页面，下文同。

**1. 在登录页面调用 `BaaS.auth.loginWithThirdParty(provider, authPageUrl, options)` 接口，接口会根据 options.mode 参数在新窗口或 iframe 中打开授权页面。**

**接口说明：**

`BaaS.auth.loginWithThirdParty(provider, authPageUrl, options)`

**参数说明**

| 参数                    | 类型    | 必填 | 默认值 | 说明         |
| :---------------------- | :------ | :--- | :----- | :----------- |
| provider                | String  | 是   | -      | 第三方平台 |
| authPageUrl             | String  | 是   | -      | 授权页面 URL |
| options.debug           | Boolean | 否   | false  | 是否开启 debug 模式 |
| options.mode            | String  | 否   | `'popup-window'` | 授权窗口打开模式 |
| options.authModalStyle  | Object  | 否   | `{}` | popup-iframe 模式下，授权模态框的样式 |
| options.wechatIframeContentStyle  | Object  | 否   | `{}` | 微信 web 授权，在 popup-iframe 模式下，微信授权页面的样式 |
| options.windowFeatures  | String  | 否   | `''` | popup-window 模式下，授权窗口的特性，详见 [strWindowFeatures](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open)。 |
| options.createUser      | Boolean | 否   | `true` | 是否创建用户 |
| options.syncUserProfile | String  | 否   | `'setnx'` | 是否[同步第一层级用户信息](/js-sdk/account.md#同步第一层级用户信息)，可选值为 overwrite、setnx、false |

必填参数：

- ** provider ** - 第三方平台。目前支持三个平台 `oauth-wechat-mp`(微信公众号)、`oauth-wechat-web`(微信网页)、`oauth-weibo`(新浪微博)

- ** authPageUrl  ** - 授权页面 URL。进行授权时，SDK 会打开一个新窗口（或 iframe，具体请查看参数 options.mode ），在该页面中跳转到第三方授权页面进行授权，
并将结果返回给授权调用方（loginWithThirdParty 或 linkThirdParty 接口），所以该页面是整个授权过程的总控页面。页面不需要开发者自行开发，我们已经提供了[授权页模板](#附：授权页模板)，只需要改一下配置项，
并放到自己的服务器下即可。页面的内容请查看下方的授权页面模板。

  > **info**
  > 授权页必须与主页面同源。

可选参数：

- ** options.debug ** - 是否开启 debug 模式 。debug 模式为开启状态下，假如授权失败，授权页面不会关闭，方便开发者调试接口。

  > **info**
  > 生产环境请关闭 debug 模式。

- ** options.mode ** - 授权窗口打开模式 。支持三种模式，分别为`popup-window`（新窗口打开授权页面）、`popup-iframe`（在 iframe 中打开授权页面）、`redirect`（在当前页面中跳转到授权页面）。
移动端推荐使用`redirect`模式（**微信内置浏览器中，只能使用这种模式**）。

- ** options.authModalStyle ** - mode 为 `popup-iframe` 时，授权模态框的样式。数据结构为：

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

- ** options.wechatIframeContentStyle ** -  providor 为 'oauth-wechat-web'，mode 为 'popup-iframe' 时，微信授权页面的样式。数据结构为：

  ```js
  {
    style: '',  // 提供"black"、"white"可选，默认为黑色文字描述。
    href: ''  // 自定义样式链接，第三方可根据实际需求覆盖默认样式。
  }
  ```

  字段 style，href 的作用与调用[微信官方 SDK ](https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419316505&token=&lang=zh_CN)时传的参数一致。
  参数 options.wechatIframeContentStyle 与参数 options.authModalStyle 配合，可以实现自定义整个授权弹窗样式（仅微信 web 授权）。

- ** options.windowFeatures ** - mode 为 `popup-window` 时的弹窗样式，详见 [strWindowFeatures](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open)。
如果没传该参数，或值为 `''`，浏览器会新建一个 tab 来打开页面。

- ** options.createUser ** - 是否创建用户。

- ** options.syncUserProfile ** - 是否[同步第一层级用户信息](/js-sdk/account.md#同步第一层级用户信息)。可选值为 `overwrite`、`setnx`、`false`。

**返回结果**

Promise<[UserRecord](/js-sdk/account.md)>

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

err 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

**2. 在授权页面调用 `BaaS.auth.thirdPartyAuth()` 接口完成第三方授权。**

**接口说明：**

`BaaS.auth.thirdPartyAuth()`

调用该接口会跳转到第三方授权页面，用户操作后，会将结果回传给授权调用方。`popup-window` 模式会传给
window.opener，`popup-iframe` 模式会传给 window.parent。

> **info**
> 一般来说，该接口只在授权页中使用。

**授权页模板**

使用以下代码创建一个 html 文件，将该文件放置到服务器中（必须与调用授权的页面同源），
并保证通过 url 能访问到该文件。

代码中的 `<sdk-url>` 需要替换成知晓云 SDK 在服务器中的 URL，`<cilent-id>` 需要
替换为应用的 clientId。

单页应用的开发者，也可以不使用该模板，只要保证 authPageUrl 能访问到的对应的页面，
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

**3. 授权登录成功或失败后，`popup-window` 或 `popup-iframe` 模式下，在步骤 1 登录页面调用的 `BaaS.auth.loginWithThirdParty` 接口返回结果中即可得到授权结果。**

### 重定向模式（在当前登录页面中重定向到授权页面）登录步骤

重定向模式时序图：

  ![重定向模式时序图](/images/third-party-auth/redirect.png)

> **info**
> **登录页面**指开发者自行编写的，需要发起第三方授权登录（BaaS.auth.loginWithThirdParty）的页面，下文同。
>
> **授权页面**指开发者自行编写或复制下文步骤 2 授权页模板的，发起第三方授权（BaaS.auth.thirdPartyAuth）的页面，下文同。
>
> **第三方授权页面**指在授权页面发起第三方授权后，跳转到的第三方平台（微博、微信公众号、微信网页）授权页面，下文同。

**1. 在登录页面调用 `BaaS.auth.loginWithThirdParty(provider, authPageUrl, options)` 接口，接口会根据 options.mode 参数在当前页面中跳转到授权页面。**

**接口说明：**

`BaaS.auth.loginWithThirdParty(provider, authPageUrl, options)`

**参数说明**

| 参数                    | 类型    | 必填 | 默认值 | 说明         |
| :---------------------- | :------ | :--- | :----- | :----------- |
| provider                | String  | 是   | -      | 第三方平台 |
| authPageUrl             | String  | 是   | -      | 授权页面 URL |
| options.debug           | Boolean | 否   | false  | 是否开启 debug 模式 |
| options.mode            | String  | 否   | `'popup-window'` | 授权窗口打开模式 |
| options.authModalStyle  | Object  | 否   | `{}` | popup-iframe 模式下，授权模态框的样式 |
| options.wechatIframeContentStyle  | Object  | 否   | `{}` | 微信 web 授权，在 popup-iframe 模式下，微信授权页面的样式 |
| options.windowFeatures  | String  | 否   | `''` | popup-window 模式下，授权窗口的特性，详见 [strWindowFeatures](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open)。 |
| options.createUser      | Boolean | 否   | `true` | 是否创建用户 |
| options.syncUserProfile | String  | 否   | `'setnx'` | 是否[同步第一层级用户信息](/js-sdk/account.md#同步第一层级用户信息)，可选值为 overwrite、setnx、false |

必填参数：

- ** provider ** - 第三方平台。目前支持三个平台 `oauth-wechat-mp`(微信公众号)、`oauth-wechat-web`(微信网页)、`oauth-weibo`(新浪微博)

- ** authPageUrl  ** - 授权页面 URL。进行授权时，SDK 会打开一个新窗口（或 iframe，具体请查看参数 options.mode ），在该页面中跳转到第三方授权页面进行授权，
并将结果返回给授权调用方（loginWithThirdParty 或 linkThirdParty 接口），所以该页面是整个授权过程的总控页面。页面不需要开发者自行开发，我们已经提供了[授权页模板](#附：授权页模板)，只需要改一下配置项，
并放到自己的服务器下即可。页面的内容请查看下方的授权页面模板。

  > **info**
  > 授权页必须与主页面同源。

可选参数：

- ** options.debug ** - 是否开启 debug 模式 。debug 模式为开启状态下，假如授权失败，授权页面不会关闭，方便开发者调试接口。

  > **info**
  > 生产环境请关闭 debug 模式。

- ** options.mode ** - 授权窗口打开模式 。支持三种模式，分别为`popup-window`（新窗口打开授权页面）、`popup-iframe`（在 iframe 中打开授权页面）、`redirect`（在当前页面中跳转到授权页面）。
移动端推荐使用`redirect`模式（**微信内置浏览器中，只能使用这种模式**）。

- ** options.authModalStyle ** - mode 为 `popup-iframe` 时，授权模态框的样式。数据结构为：

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

- ** options.wechatIframeContentStyle ** -  providor 为 'oauth-wechat-web'，mode 为 'popup-iframe' 时，微信授权页面的样式。数据结构为：

  ```js
  {
    style: '',  // 提供"black"、"white"可选，默认为黑色文字描述。
    href: ''  // 自定义样式链接，第三方可根据实际需求覆盖默认样式。
  }
  ```

  字段 style，href 的作用与调用[微信官方 SDK ](https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419316505&token=&lang=zh_CN)时传的参数一致。
  参数 options.wechatIframeContentStyle 与参数 options.authModalStyle 配合，可以实现自定义整个授权弹窗样式（仅微信 web 授权）。

- ** options.windowFeatures ** - mode 为 `popup-window` 时的弹窗样式，详见 [strWindowFeatures](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open)。
如果没传该参数，或值为 `''`，浏览器会新建一个 tab 来打开页面。

- ** options.createUser ** - 是否创建用户。

- ** options.syncUserProfile ** - 是否[同步第一层级用户信息](/js-sdk/account.md#同步第一层级用户信息)。可选值为 `overwrite`、`setnx`、`false`。

**返回结果**

Promise<[UserRecord](/js-sdk/account.md)>

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

err 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

**2. 在授权页面调用 `BaaS.auth.thirdPartyAuth()` 接口完成第三方授权。**

**接口说明：**

`BaaS.auth.thirdPartyAuth()`

调用该接口会跳转到第三方授权页面，用户操作后，会将结果回传给授权调用方。`redirect` 模式会将结果拼到 URL 中，
并重定向到调用页面（通过 `BaaS.auth.getRedirectResult` 接口可以获取到结果，详见步骤 3）。

> **info**
> 一般来说，该接口只在授权页中使用。

**授权页模板**

使用以下代码创建一个 html 文件，将该文件放置到服务器中（必须与调用授权的页面同源），
并保证通过 url 能访问到该文件。

代码中的 `<sdk-url>` 需要替换成知晓云 SDK 在服务器中的 URL，`<cilent-id>` 需要
替换为应用的 clientId。

单页应用的开发者，也可以不使用该模板，只要保证 authPageUrl 能访问到的对应的页面，
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

**3. 授权登录成功或失败后，`redirect` 模式下，授权页面会重定向回到登录页面，在登录页面调用 `BaaS.auth.getRedirectResult()` 接口可以获取授权结果。**

**接口说明：**

`BaaS.auth.getRedirectResult()`

redirect 模式是直接在页面内跳转到授权，在授权完成后并不能直接在调用用授权的地方直接往下执行（`popup-window`、`popup-iframe` 这两种模式可以），而是会直接重定向回调用授权的页面，授权结果放在页面 URL 中。该接口就是获取 URL 中的授权结果的。请在页面加载时或页面 js 代码的最顶部调用该接口来判断授权操作是否成功。

**请求示例**

```js
BaaS.auth.getRedirectResult().then(user => {
  return user.linkThirdParty('oauth-wechat-web', '/auth.html')
})
  .then(result => {
    // 获取授权结果成功，可以在这里做登录后的操作
  })
  .catch(err => {
    // 未获取到结果
  })
```

**返回值**

`Promise<Result>`

Result 数据结构：

| 字段   | 类型    | 说明         |
| :----- | :------ | :----------- |
| status | String  | 状态。 'success' / 'fail' |
| action | String  | 操作。'login'(第三方登录) / 'associate'(关联第三方账号) |
| user   | String  | 当前用户对象，仅 status 为 'success' 且 action 为 'login' 时返回 |

**移动端调用页面示例**

```js
// 授权完成后，页面会重定向回来，接口能从 URL 中获取到授权结果。
BaaS.auth.getRedirectResult()
  .then(result => {
    // 获取授权结果成功
  })
  .catch(err => {
    // 未找到授权结果
  })

...

// 在页面中调用登录接口后，页面会重定向到授权页。
BaaS.auth.loginWithThirdParty('oauth-wechat-mp', '/auth.html', {
  mode: 'redirect',
})
  .catch(err => {
    // 接口调用失败
  })

...

```

## 已登录用户关联第三方平台账号

> **info**
> 使用前，请确保已经完成了[第三方授权配置](/js-sdk/web/third-party-auth-config.md)并且用户为已登录状态。

关联第三方平台账号步骤与第三方授权登录步骤基本相同，区别在于关联第三方平台账号的第一步需调用 `UserRecord.linkThirdParty(provider, authPageUrl, options)` 接口，第三方授权和获取授权结果的操作步骤与第三方授权登录中的步骤一致。

**接口说明：**

`UserRecord.linkThirdParty(provider, authPageUrl, options)`

**参数说明**

| 参数                    | 类型    | 必填 | 默认值 | 说明         |
| :---------------------- | :------ | :--- | :----- | :----------- |
| provider                | String  | 是   | -      | 第三方平台 |
| authPageUrl             | String  | 是   | -      | 授权页面 URL |
| options.debug           | Boolean | 否   | false  | 是否开启 debug 模式 |
| options.mode            | String  | 否   | `'popup-window'` | 授权窗口打开模式 |
| options.authModalStyle  | Object  | 否   | `{}` | popup-iframe 模式下，授权模态框的样式 |
| options.wechatIframeContentStyle  | Object  | 否   | `{}` | 微信 web 授权，在 popup-iframe 模式下，微信授权页面的样式 |
| options.windowFeatures  | String  | 否   | `''` | popup-window 模式下，授权窗口的特性 |
| options.syncUserProfile | String  | 否   | `'setnx'` | 是否[同步第一层级用户信息](/js-sdk/account.md#同步第一层级用户信息)，可选值为 overwrite、setnx、false |

接口的参数与 `BaaS.auth.loginWithThirdParty` 接口参数几乎相同，只少了 `option.createUser` 参数，因为只有已经登录用户才能关联第三方账号。

**请求示例**

```js
BaaS.auth.getCurrentUser().then(user => {
  return user.linkThirdParty('oauth-wechat-web', '/auth.html')
})
  .then(() => {
    // 关联成功
  })
  .catch(err => {
    // 关联失败
  })
```

err 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)
