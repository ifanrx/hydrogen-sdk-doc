{% macro importComponent(apiPrefix) %}
{% if apiPrefix == "wx." %}
1. 安装 minapp-ticket-wx，在项目根目录下运行以下命令（二选一）

  ```js
  // 通过 yarn 安装
  yarn add minapp-ticket-wx

  // 通过 npm 安装
  npm install --save minapp-ticket-wx
  ```
2. 使用微信开发者工具构建 npm

  ![构建 npm](/images/template-message/build-npm.png)

3. 在将要使用该组件的页面 json 文件中引用组件

  ```js
  {
    "usingComponents": {
      "ticket-report-wrapper": "../../miniprogram_npm/minapp-ticket-wx/index"
    }
  }
  ```
{% elif apiPrefix == "my." %}
1. 安装 minapp-ticket-my，在项目根目录下运行以下命令（二选一）

  ```js
  // 通过 yarn 安装
  yarn add minapp-ticket-my

  // 通过 npm 安装
  npm install --save minapp-ticket-my
  ```

2. 在将要使用该组件的页面 json 文件中引用组件

  ```js
  {
    "usingComponents": {
      "ticket-report-wrapper": "minapp-ticket-my/src/index"
    }
  }
  ```
{% endif %}
{% endmacro %}

# 模板消息

基于小程序平台的通知渠道，平台为开发者提供了可以高效触达用户的模板消息能力，以便实现服务的闭环并提供更佳的体验。
{% if apiPrefix == "wx." %}
请移步[这里](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/template-message.html)了解微信模板消息
{% elif apiPrefix == "my." %}
请移步[这里](https://docs.alipay.com/mini/introduce/message)了解支付宝模板消息
{% elif apiPrefxi == "swan." %}
请移步[这里](https://smartprogram.baidu.com/docs/develop/serverapi/open_infomation/#sendTemplateMessage/)
{% endif %}

{% if apiPrefix != "qq." %}

## 上报模板消息卡片点击事件

{% if apiPrefix == "wx." %}
`wx.BaaS.reportTemplateMsgAnalytics(options)`
{% elif apiPrefix == "my." %}
`my.BaaS.reportTemplateMsgAnalytics(options)`
{% elif apiPrefix == "swan." %}
`swan.BaaS.reportTemplateMsgAnalytics(options)`
{% endif %}

**参数说明**

| 参数   | 类型   | 必填 | 说明 |
| :----- | :----- | :--- | :-- |
| options | Object | 是   | 与 onShow 中的参数 options 相同 |

上报模板消息卡片点击事件，只需要在 `app.js` 的 `onShow` 中做一个埋点，其他的事情由 SDK 自动完成。

**示例代码**

{% if apiPrefix == "wx." %}
```js
// app.js
...
  onShow: function(options) {
    wx.BaaS.reportTemplateMsgAnalytics(options)
  },
...
```
{% elif apiPrefix == "my." %}
```js
// app.js
...
   onShow: function(options) {
    my.BaaS.reportTemplateMsgAnalytics(options)
  },
...
```
{% elif apiPrefix == "swan." %}
```js
// app.js
...
  onShow: function(options) {
    swan.BaaS.reportTemplateMsgAnalytics(options)
  },
...
```
> **info**
> 由于百度小程序的生命周期和其他平台小程序的有些差异，onShow 在 onLaunch 之后执行，故不要把引入 SDK 的代码放到 onLaunch 中，否则会导致执行到 onShow 的时候 swan.Baas 为 undefine 导致程序报错，建议将引入 SDK 的代码放在文件的头部，即 App({}) 执行之前。
{% endif %}

{% endif %}

## 上报模板消息所需 formId
{% if apiPrefix == "wx." %}
{% set api = "wx.BaaS.wxReportTicket" %}
{% elif apiPrefix == "my." %}
{% set api = "my.BaaS.reportTicket" %}
{% elif apiPrefix == "qq." %}
{% set api = "qq.BaaS.reportTicket" %}
{% elif apiPrefix == "swan." %}
{% set api = "swan.BaaS.reportTicket" %}
{% endif %}

{% if apiPrefix == "wx." %}
### 方式一：获取到 formId 后，调用接口上报
`wx.BaaS.wxReportTicket(formID)`
{% elif apiPrefix == "my." %}
### 方式一：获取到 formId 后，调用接口上报
`my.BaaS.reportTicket(formID)`
{% elif apiPrefix == "qq." %}
`qq.BaaS.reportTicket(formID)`
{% elif apiPrefix == "swan." %}
`swan.BaaS.reportTicket(formID)`
{% endif %}

**参数说明**

| 参数   | 类型   | 必填 | 说明 |
| :----- | :----- | :--- | :-- |
| formID | String | 是   | - |

当使用小程序的 `<form/>` 组件，且属性 report-submit 设为 true 时，此时表单是声明为需要要发模板消息的，当点击按钮提交表单即可获取 formID。

{% if apiPrefix != "qq." and apiPrefix != "swan." %}
### 方式二：使用自定义组件自动上报（推荐）

> **info**
> 组件中添加了节流逻辑进行频次限制，
> 限制的规则为：** 1s 内最多触发 1 次，24h 内最多触发 20 次 **。也就是说，
> 用户在 1 秒内无论点击组件多少次，formId 只会上报一次，一天之内最多只会上报 20 个 formId。
>
> 如有需要多次上报 formId，请使用方式一。

{% if apiPrefix == "wx." %}

插件版 SDK 提供了自定义组件 ticket-report-wrapper（插件版 2.0.6 以上），
文件版与 npm 版 SDK，可以通过 npm 获取该组件（包名为 minapp-ticket-wx）。

#### 引入组件
{% tabs sdkplugin="小程序插件版", sdkfile="js 文件版", npm="npm 包" %}
{% content "sdkplugin" %}

```json
// index.json
{
  "usingComponents": {
    "ticket-report-wrapper": "plugin://sdkPlugin/ticket-report-wrapper"
  }
}
```
{% content "sdkfile" %}
{{ importComponent("wx.") }}
{% content "npm" %}
{{ importComponent("wx.") }}
{% endtabs %}

{% elif apiPrefix == "my." %}

可以通过 npm 获取 ticket-report-wrapper 组件（包名为 minapp-ticket-my）。

#### 引入组件
{{ importComponent("my.") }}
{% endif %}

#### 使用组件
```xml
<ticket-report-wrapper>
  ...
</ticket-report-wrapper>
```

**参数说明**

{% if apiPrefix == "wx." %}

微信小程序可以像普通组件一样在自定义组件上监听事件、设置属性，
所以此处没有做限制，详情请参考[微信小程序自定义组件文档](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)。

```html
<ticket-report-wrapper bind:tap="handleTap">
  ...
</ticket-report-wrapper>
```

{% elif apiPrefix == "my." %}

| 参数   | 类型   | 必填 | 说明 |
| :----- | :----- | :--- | :--- |
| onTap | String | 否   | 点击事件回调函数名 |

{% endif %}

{% endif %}

## 发送模板消息

你可以通过以下方式向用户发送模板消息：

- 在线发送

{% if apiPrefix == "wx." %}
在[知晓云控制台 - 知晓推送](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]wechat-template-message/message/)中在线填写模板消息内容、选择发送用户后直接向其推送模板消息。适用于临时通知或不定期的活动通知等场景。
{% elif apiPrefix == "my." %}
在[知晓云控制台 - 知晓推送](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]alipay-template-message/guide/)中在线填写模板消息内容、选择发送用户后直接向其推送模板消息。适用于临时通知或不定期的活动通知等场景。
{% elif apiPrefix == "qq." %}
在[知晓云控制台 - 知晓推送](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]qq-template-message/guide/)中在线填写模板消息内容、选择发送用户后直接向其推送模板消息。适用于临时通知或不定期的活动通知等场景。
{% elif apiPrefix == "swan." %}
在[知晓云控制台 - 知晓推送](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]baidu-template-message/guide/)中在线填写模板消息内容、选择发送用户后直接向其推送模板消息。适用于临时通知或不定期的活动通知等场景。
{% endif %}

- 触发器发送

通过触发器，在指定触发条件下向用户推送模板消息。适用于抽奖、收付款通知等规律性的推送场景。具体使用请参照 [Trigger 使用说明](http://support.minapp.com/hc/kb/article/1080135) 。

- 云函数发送

通过云函数发送模板消息，适用业务逻辑复杂的场景，建议配合触发器一起使用。
{% if apiPrefix == "wx." %}
具体使用方式请移步[这里](/cloud-function/node-sdk/template-message/wechat/template-message.md)。
{% elif apiPrefix == "my." %}
具体使用方式请移步[这里](/cloud-function/node-sdk/template-message/alipay/template-message.md)。
{% elif apiPrefix == "qq." %}
具体使用方式请移步[这里](/cloud-function/node-sdk/template-message/qq/template-message.md)。
{% elif apiPrefix == "swan." %}
具体使用方式请移步[这里](/cloud-function/node-sdk/template-message/baidu/template-message.md)。
{% endif %}
