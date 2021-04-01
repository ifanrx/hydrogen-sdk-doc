# SDK 可用版本与更新日志

## SDK 可用版本与更新日志

下文所列出的标记为 `[M]` 的更新均为不兼容更新。升级 SDK 版本时，请参照更新日志调整代码。

### 3.17 (2021-04-01)
- [A] 支持微信小程序私密消息创建

### 3.16 (2021-03-15)
1. [A] 支持获取微信用户安全等级

### 3.15 (2021-03-04)
1. [A] 支持微信加密数据解密

### 3.14 (2021-02-25)
1. [A] 支持生成微信小程序Scheme码

### 3.13 (2020-12-17)
1. [M] 用户和数据表接口升级

### 3.12 (2020-11-09)
1. [A] Array 类型数据支持 pop, shift 原子操作

### 3.11 (2020-08-27)
1. [A] 添加发送 QQ 订阅消息接口
2. [A] 添加获取 QQ 订阅消息可用订阅数量接口

### 3.10 (2020-06-04)
1. [A] 支持支付宝文本安全检测

### 3.9 (2020-05-26)
1. [A] 支持创建用户

### 3.8 (2020-04-24)
1. [A] 支持获取字节跳动小程序二维码
2. [A] 支持文件下载

### 3.7 (2020-04-10)
1. [A] 支持发送字节跳动模版消息

### 3.6 (2020-04-02)
1. [M] 支持修改用户 `_email_verified` & `_phone_verified` 字段

### 3.5 (2020-03-19)
1. [A] 支持微信小程序直播

### 3.4 (2020-02-28)

1. #### [A] 支持数据表校验器 [查看](/cloud-function/node-sdk/schema/validator.md)
2. #### [A] 文件上传时，使用文件名作为文件路径 [查看](/cloud-function/node-sdk/file/file.md)
3. #### [A] wxacode 接口返回 uploaded_file 文件对象 [查看](/cloud-function/node-sdk/wxacode.md)

### 3.3 (2020-01-10)

1. #### [A] 添加获取微信订阅消息可用订阅数量接口 [查看](/cloud-function/node-sdk/wechat-subscribe-message/wechat-subscribe-message-ticket.md)

### 3.2 (2020-01-02)
1. #### [M] `UserRecord#setAccount` 返回整个 `_userprofile`。
2. #### [M] `withCount` 默认为 false。

  数据查询与批量操作时，支持通过设置 `withCount` 为 `false` (不返回 `total_count`) 来提高响应速度。
  v2.x `total_count` 默认值为 `true`，v3+ 默认为 `false`。

  **受影响的接口**：

  `BaaS.TableRecord#update(options)` [查看](/cloud-function/node-sdk/schema/update-record.md)

  `BaaS.TableRecord#delete(options)` [查看](/cloud-function/node-sdk/schema/delete-record.md)

  `BaaS.TableObject#find(options)` [查看](/cloud-function/node-sdk/schema/query.md)

  `BaaS.User#find(options)` [查看](/cloud-function/node-sdk/user.md)

  `BaaS.Content#find(options)` [查看](/cloud-function/node-sdk/content/content.md)

  `BaaS.FileCategory#find(options)` [查看](/cloud-function/node-sdk/file/file-category.md)

  `BaaS.File#find(options)` [查看](/cloud-function/node-sdk/file/file.md)

  **新增 count 接口**：

  `BaaS.TableObject#count()` [查看](/cloud-function/node-sdk/schema/query.md)

  `BaaS.User#count()` [查看](/cloud-function/node-sdk/user.md)

  `BaaS.Content#count()` [查看](/cloud-function/node-sdk/content/content.md)

  `BaaS.FileCategory#count()` [查看](/cloud-function/node-sdk/file/file-category.md)

  `BaaS.File#count()` [查看](/cloud-function/node-sdk/file/file.md)

3. #### [A] `pointer` 展开时，支持指定返回的属性 [查看](/cloud-function/node-sdk/schema/select-and-expand.md)。

### 2.x (默认版本)

## SDK 支持说明

SDK 主流版本支持为 2 个版本；长期支持版本为 12 个月。

根据此策略，我们将在接下来的一年里陆续停止对旧版本的 SDK 的支持。在停用前 60 天，30 天前和 7 天前，
你将收到额外的提醒邮件。在支持期结束后，我们将不再确保旧版 SDK 的稳定性或可用性。

v2.x 版本我们将支持到 2020 年 12 月 04 日。

