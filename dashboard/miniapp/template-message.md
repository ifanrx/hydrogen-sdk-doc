# 知晓推送

知晓推送是知晓云专为小程序量身打造的模板消息推送服务，智能过滤僵尸用户，精准匹配目标用户，有效提高回访转化。现已支持微信小程序、支付宝小程序、QQ 小程序、百度小程序等。

## 基础操作

### 发送订阅消息

![发送订阅消息](/images/dashboard/miniapp/send-subscribe-message.png)

开发者可以在知晓推送页面手动向目标用户发送订阅消息。

> **info**
> 注：在微信公众平台手动配置获取审核通过后的模板 ID。
> 目前仅微信平台支持发送订阅消息。

### 发送模板消息

![发送模板消息](/images/dashboard/miniapp/send-message.png)

开发者可以在知晓推送页面手动向目标用户发送模板消息。

> **info**
> 注：有可用 formid 是发送模板消息的必要条件，故需要提前收集 formid。    
> 目前仅微信平台支持同步模板库，其他平台需要手动填写模板 id 同步模板。

### 智能过滤

![智能过滤](/images/dashboard/miniapp/smart-filter.png)

在筛选目标用户时，建议开发者使用智能过滤服务，以保证模板消息的触达率和转化率。

* 过滤无效用户：自动过滤没有 formid 或 formid 已经失效的用户，减少无效发送。
* 过滤低价值用户：低价值用户指经过统计分析后被标记为机器人、僵尸用户或曾经有举报行为的用户。过滤该类用户可以有效提升模板消息的回访转化率；建议升级 SDK 至最新版本，以便实现更精准的统计。

### 设置发送策略

![设置发送策略](/images/dashboard/miniapp/transmission-strategy.png)

> **info**
> 注：短时间内大量发送模板消息容易导致模板消息被封，建议单次发送条数小于 5000 条，每次发送间隔大于 5 分钟。   
> 你可以选择 5 分钟后的任意时刻发送，在设定的时间之前可随时取消。   
> 每日定时任务限额为 10 条，如需提高额度请联系知晓妹微信（minsupport3）。

### 快速发送订阅消息

![快速发送订阅消息](/images/dashboard/miniapp/quickly-send-subscribe-message.png)

选择最近发送记录中的某条记录，点击列表右侧「复制」按钮，可以快速填充历史发送记录，包括订阅消息内容和收件人。 

### 快速发送模板消息

![快速发送模板消息](/images/dashboard/miniapp/quickly-send-message.png)

选择最近发送记录中的某条记录，点击列表右侧「复制」按钮，可以快速填充历史发送记录，包括模板消息内容和收件人。

### 查看订阅记录

![查看订阅记录](/images/dashboard/miniapp/check-subscribe-log.png)

点击知晓推送中的「订阅记录」Tab，即可查看当前平台下收集的订阅记录。

> **info**
> 注：仅微信平台支持查看订阅记录。  

### 添加模板

![添加模板](/images/dashboard/miniapp/add-template.png)

![添加模板](/images/dashboard/miniapp/choose-template.png)

在模板库中搜索合适的模板，点击选用，选择需要的关键词后提交即可。

> **info**
> 注：仅微信平台支持在控制台选择模板并用于发送。   
> 其他平台需要登录对应平台的小程序管理后台添加模板，并在知晓云填写模板 id 后才能正常使用。

### 查看日志

![查看日志](/images/dashboard/miniapp/check-log.png)

点击知晓推送中的「日志」Tab，即可查看当前平台下订阅消息和模板消息的发送日志。

### 查看 formid

![查看 formid](/images/dashboard/miniapp/check-formid.png)

点击知晓推送中的「formid」Tab，即可查看当前平台下收集的 formid 数量及状态。
