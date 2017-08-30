# 绑定应用

用户信息绑定成功后会自动跳转到「申请应用」页, 此时开发者可按照提示, 在知晓云平台申请绑定自己的第一个小程序。具体操作步骤如下：

### 基本信息绑定

填写 AppName、AppID、AppSecret;

* AppName(小程序名称) : 应用名称, 开发者可自由填写
* AppID(小程序 ID): 开发者需要绑定的小程序的 AppID, 可在微信公众平台 | 小程序 - 设置 - 开发设置 - 开发者 ID - AppID(小程序 ID) 处找到
* AppSecret(小程序密钥): 可在微信公众平台 | 小程序 - 设置 - 开发设置 - 开发者 ID - AppSecret(小程序密钥) 处找到

### 服务器域名配置

为了能正常使用知晓云后端服务, 请将以下域名配置在微信公众平台 | 小程序 - 设置 - 开发设置 - 服务器域名列表中

1. request 合法域名: `sso.ifanr.com`
2. socket 合法域名: `sso.ifanr.com`
3. uploadFile 合法域名: `sso.ifanr.com`
4. downloadFile 合法域名: `sso.ifanr.com`