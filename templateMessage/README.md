# 模板消息

### 上报模版消息所需 formid

<p style='color:red'>* sdk version >= v1.1.0</p>

`wx.BaaS.wxReportTicket(formID)`

##### 参数说明

|   参数名   |   类型   |  必填  |   描述   |
| :-----------: | :----: | :--: | :------------------------ |
| formID | String |  是   |  |

当使用小程序的 `<form/>` 组件，且属性 report-submit 设为 true 时，此时表单是声明为需要要发模板消息的，当点击按钮提交表单即可获取 formID。

### 发送模版消息

通过 Trigger 触发器设定触发条件以发送模版消息，具体使用请参照 [Trigger 使用说明](http://support.minapp.com/hc/kb/article/1080135) 。
