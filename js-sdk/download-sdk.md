<!-- ex_nonav -->

# SDK 下载

### 选择版本下载

- [最新稳定版 v1.2.0（推荐）](https://dl.ifanr.cn/hydrogen/sdk/sdk-latest.zip)

- [v1.1.6](https://dl.ifanr.cn/hydrogen/sdk/sdk-v1.1.6.zip)

### 更新注意事项

- SDK v1.2.0 版本更改了接口请求域名，由原先的 `sso.ifanr.com` 改为 `${clientID}.xiaoapp.io`，旧版本 SDK 升级至该版本或以上版本需更新，需到微信小程序管理后台的【设置】-【开发设置】-【服务器域名】处更新 request 合法域名为 `xiaoapp.io`，修改后，你可以到知晓云控制台[应用设置页面](https://cloud.minapp.com/dashboard/#/app/settings/app/)查看最新的域名地址

- <p style='color:red'>1.1.4 版本重构优化了错误返回信息，请阅读「错误码详解」这一章节内容后再做升级</p>

- <p style='color:red'>1.1.4 版本优化了<b>用户拒绝授权回调</b>和<b>支付失败回调</b>，低版本 SDK 升级请<b>注意兼容性</b></p>

- 部分新功能需新版本支持，请注意文档中特别标明的版本要求

- 所有版本更新日志可查看 [SDK 更新日志](https://github.com/ifanrx/hydrogen-js-sdk/blob/master/CHANGELOG.md)