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

{% if apiPrefix == "wx." %}
请移步[这里](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/template-message.html)了解微信模板消息
{% elif apiPrefix == "my." %}
请移步[这里](https://docs.alipay.com/mini/introduce/message)了解支付宝模板消息
{% endif %}

{% if apiPrefix != "qq." %}

## 上报模版消息卡片点击事件

{% if apiPrefix == "wx." %}
`wx.BaaS.reportTemplateMsgAnalytics(options)`
{% elif apiPrefix == "my." %}
`my.BaaS.reportTemplateMsgAnalytics(options)`
{% endif %}

**参数说明**

| 参数   | 类型   | 必填 | 说明 |
| :----- | :----- | :--- | :-- |
| options | Object | 是   | 与 onShow 中的参数 options 相同 |

上报模版消息卡片点击事件，只需要在 `app.js` 的 `onShow` 中做一个埋点，其他的事情由 SDK 自动完成。

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
{% endif %}

{% endif %}

## 上报模版消息所需 formId
{% if apiPrefix == "wx." %}
{% set api = "wx.BaaS.wxReportTicket" %}
{% elif apiPrefix == "my." %}
{% set api = "my.BaaS.reportTicket" %}
{% elif apiPrefix == "qq." %}
{% set api = "qq.BaaS.reportTicket" %}
{% endif %}

{% if apiPrefix == "wx." %}
### 方式一：获取到 formId 后，调用接口上报
`wx.BaaS.wxReportTicket(formID)`
{% elif apiPrefix == "my." %}
### 方式一：获取到 formId 后，调用接口上报
`my.BaaS.reportTicket(formID)`
{% elif apiPrefix == "qq." %}
`qq.BaaS.reportTicket(formID)`
{% endif %}

**参数说明**

| 参数   | 类型   | 必填 | 说明 |
| :----- | :----- | :--- | :-- |
| formID | String | 是   | - |

当使用小程序的 `<form/>` 组件，且属性 report-submit 设为 true 时，此时表单是声明为需要要发模板消息的，当点击按钮提交表单即可获取 formID。

{% if apiPrefix != "qq." %}
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


{% if apiPrefix != "qq." %}

## 发送模版消息

通过 Trigger 触发器设定触发条件以发送模版消息，具体使用请参照 [Trigger 使用说明](http://support.minapp.com/hc/kb/article/1080135) 。

{% endif %}
