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

## 上报模版消息所需 formId

### 方式一：获取到 formId 后，调用接口上报
{% if apiPrefix == "wx." %}
`wx.BaaS.wxReportTicket(formID)`
{% elif apiPrefix == "my." %}
`my.BaaS.reportTicket(formID)`
{% endif %}

**参数说明**

| 参数   | 类型   | 必填 | 说明 |
| :----- | :----- | :--- | :-- |
| formID | String | 是   | - |

当使用小程序的 `<form/>` 组件，且属性 report-submit 设为 true 时，此时表单是声明为需要要发模板消息的，当点击按钮提交表单即可获取 formID。

### 方式二：使用自定义组件自动上报（推荐）
{% if apiPrefix == "wx." %}

插件版 SDK 提供了自定义组件 ticket-report-wrapper（插件版本尚未发布，即将在 2.0.5 以上版本提供，请先使用 npm 版），
文件版与 npm 版 SDK，可以通过 npm 获取该组件（包名为 minapp-ticket-wx）。

使用 ticket-report-wrapper 组件包裹内容，相当于在内容之上盖一个透明的遮罩，因此会内容中的点击事件无法被触发。
如果包裹大面积内容，且内容用有点击或其他交互事件的，请使用 disappear-after-click

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

使用 ticket-report-wrapper 组件包裹内容，相当于在内容之上盖一个透明的遮罩，因此会内容中的点击事件无法被触发。
如果包裹大面积内容，且内容用有点击或其他交互事件的，请使用 disappear-after-click

#### 引入组件
{{ importComponent("my.") }}
{% endif %}

#### 使用组件
```xml
<ticket-report-wrapper disappear-after-click>
  ...
</ticket-report-wrapper>
```

**参数说明**

{% if apiPrefix == "wx." %}

| 参数   | 类型   | 必填 | 说明 |
| :----- | :----- | :--- | :--- |
| disappear-after-click | Boolean | 否   | 是否点击一次后遮罩层消失 |

如果需要监听组件的点击事件，可以像使用内置组件一样指定事件回调函数。

```html
<ticket-report-wrapper bind:tap="handleTap">
  ...
</ticket-report-wrapper>
```

{% elif apiPrefix == "my." %}

| 参数   | 类型   | 必填 | 说明 |
| :----- | :----- | :--- | :--- |
| disappear-after-click | Boolean | 否   | 是否点击一次后遮罩层消失 |
| onTap | String | 否   | 点击事件回调函数名 |

{% endif %}

## 发送模版消息

通过 Trigger 触发器设定触发条件以发送模版消息，具体使用请参照 [Trigger 使用说明](http://support.minapp.com/hc/kb/article/1080135) 。
