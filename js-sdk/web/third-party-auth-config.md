# 第三方授权配置

知晓云 Web 端支持使用 OAuth 协议的第三方平台进行授权登录，进一步降低用户登录的门槛。

目前支持平台：
* 微信 - 网页
* 微信 - 公众号
* 微博

## 微信 - 网站（网站应用微信登录）

「网站应用微信登录」允许桌面应用通过微信扫码的方式来进行微信登录，
此方式仅能通过微信开放平台获取，微信公众号不具备此能力。

### 接入指南

1. 登入微信开放平台（注册：[点我直达](https://open.weixin.qq.com/cgi-bin/readtemplate?t=regist/regist_tmpl&lang=zh_CN)）

2. 切换到「网站应用」并点击 「创建网站应用」开始配置你的应用

  ![](/images/third-party-auth-config/001.png)

3. 填写信息

  ![](/images/third-party-auth-config/002.png)

4. 创建应用成功后，设置 AppSecret 并将 AppID/AppSecert 妥善保存到本地

  ![](/images/third-party-auth-config/003.png)

5. 知晓云应用后台 -> 设置 -> 应用 -> 登录方法，找到「微信网页登录」，点击「开通」或「更新配置」，将应用详情中的 AppID / AppSecret 填写到知晓云的配置中

  ![](/images/third-party-auth-config/weixin_web_setting.png)

6. 知晓云应用后台 -> 设置 -> 应用 -> 第三方授权登录安全域名，获取授权回调 URL 并将填入第 4 步中的「开发信息」中

  ![](/images/third-party-auth-config/weixin_web_domain.png)

7. 完成以上配置后，你就可以开始在 Web 中接入微信登录（网站应用微信登录）服务啦，详见 [Web 接入指南](https://doc.minapp.com/newbies/web.html)

## 微信 - 公众号（微信网页授权）

「微信网页授权」是指当用户在微信中打开网页时，发起微信登录。
使用这个能力需要确保拥有一个已完成认证的微信服务号。

### 接入指南

1. 登入微信公众平台（注册：[点我直达](https://mp.weixin.qq.com/cgi-bin/registermidpage?action=index&lang=zh_CN&token=)）

2. 从左侧导航栏中的「开发」选择「基本配置」进入获取公众号开发信息，
将 AppID/AppSecret 妥善保存到本地

  ![](/images/third-party-auth-config/006.png)

3. 从左侧导航栏中的「设置」选择「公众号设置」进入「功能设置」，开始设置「网页授权域名」

  ![](/images/third-party-auth-config/007.png)

4. 将微信提示下载的文件（文件名为 `MP_verify_` 开头）保存到本地

  ![](/images/third-party-auth-config/008.png)

5. 知晓云应用后台 -> 设置 -> 应用 -> 登录方法，找到「微信公众号登录」，点击「开通」或「更新配置」，将获取到的 AppID / AppSecret / MP_verify_xxx.txt（下载的文件）配置到知晓云

  ![](/images/third-party-auth-config/weixin_mp_setting.png)

6. 知晓云应用后台 -> 设置 -> 应用 -> 第三方授权登录安全域名，获取网页授权域名，并将其填写到微信公众号平台的设置

  ![](/images/third-party-auth-config/weixin_mp_domain.png)

  ![](/images/third-party-auth-config/011.png)

  （如提示校验失败，请多点几次）

7. 完成以上配置后，你就可以开始在 Web 中接入微信（微信网页授权）登录服务啦，详见 [Web 接入指南](https://doc.minapp.com/newbies/web.html)

## 微博

微博登录可以使用在各种网页。启用这个功能需要一个微博帐号（拥有开放平台的开发者权限），
应用需要通过审核后，才可正式发布使用。

> **info** 如应用未通过审核时，可通过「应用信息」-> 「测试信息」来绑定测试帐号

### 接入指南

1. 通过微博开放平台创建一个网站应用（[点我直达](https://open.weibo.com/apps/new?sort=web)）

  ![](/images/third-party-auth-config/012.png)

2. 进入应用详情，选择「应用信息」-> 「基本信息」，获取  App Key / App Secert 并妥善保存到本地

  ![](/images/third-party-auth-config/013.png)

3. 知晓云应用后台 -> 设置 -> 应用 -> 登录方法，找到「微博登录」，点击「开通」或「更新配置」，将获取到的 App Key / App Secert 配置到知晓云

  ![](/images/third-party-auth-config/weibo_setting.png)

4. 知晓云应用后台 -> 设置 -> 应用 -> 第三方授权登录安全域名，获取网页授权域名，并将其填写到微博应用设置中的安全域名

  ![](/images/third-party-auth-config/weibo_domain.png)

  ![](/images/third-party-auth-config/016.png)

5. 完成以上配置后，你就可以开始在 Web 中接入微博登录服务啦，详见 [Web 接入指南](https://doc.minapp.com/newbies/web.html)






