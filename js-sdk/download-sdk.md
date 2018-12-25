<!-- ex_nonav -->

# SDK 下载

### 选择版本下载

- [最新稳定版 v{{ book.latestVersion }}（推荐）](https://dl.ifanr.cn/hydrogen/sdk/sdk-latest.zip)

### 更新注意事项

> **danger**
> 由于 io 域名的备案问题，请在 2019 年 6 月前完成 SDK 升级及域名替换

- 从 SDK v1.13.0 开始，API 域名改为 `${clientID}.myminapp.com`，由于 io 域名的备案问题，请在 2019 年 6 月前完成 SDK 升级及域名替换。

- 从 SDK v1.2.0 开始，我们为每一个应用分配了一个**专属独立域名**：`${clientID}.xiaoapp.io`。旧版本 SDK 升级到 1.2.0 及以上版本，需到微信小程序管理后台的【设置】-【开发设置】-【服务器域名】处**更新 request 合法域名**为新的独立域名。最新的独立域名地址在知晓云控制台[应用设置页面](https://cloud.minapp.com/dashboard/#/app/settings/app/)查看获取

- <p style='color:red'>1.2.0 版本统一了用户 user_id 字段的格式，原登录接口返回的 String 类型现与其他方法返回统一为 Number 类型，升级到该版本及以上版本注意测试这一块的兼容性。</p>

- <p style='color:red'>1.1.4 版本重构优化了错误返回信息，请阅读「错误码详解」这一章节内容后再做升级</p>

- <p style='color:red'>1.1.4 版本优化了<b>用户拒绝授权回调</b>和<b>支付失败回调</b>，低版本 SDK 升级请<b>注意兼容性</b></p>

- 部分新功能需新版本支持，请注意文档中特别标明的版本要求

- 所有版本更新日志可查看 [SDK 更新日志](https://github.com/ifanrx/hydrogen-js-sdk/blob/master/CHANGELOG.md)

### SDK 支持说明

SDK 主流版本支持为 2 个版本；长期支持版本为 12 个月

根据此策略，我们将在接下来的一年里陆续停止对旧版本的 SDK 的支持。在停用前 60 天，30 天前和 7 天前，你将收到额外的提醒邮件。在支持期结束后，我们将不再确保旧版 SDK 的稳定性或可用性。

v1.13.0 版本我们将支持到 2019 年 12 月 17 日。其他的版本我们会支持到 2019 年 7 月 1 日。
