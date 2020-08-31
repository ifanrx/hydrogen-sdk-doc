{% macro renderIntoPlatform(platform) %}

{% if platform == 'wechat' %}
{% set apiPrefix = 'wx.' %}
{% elif platform == 'alipay' %}
{% set apiPrefix = 'my.' %}
{% elif platform == 'baidu' %}
{% set apiPrefix = 'swan.' %}
{% elif platform == 'qq' %}
{% set apiPrefix = 'qq.' %}
{% elif platform == 'bytedance' %}
{% set apiPrefix = 'tt.' %}
{% elif platform == 'jingdong' %}
{% set apiPrefix = 'jd.' %}
{% else %}
{% set apiPrefix = '' %}
{% endif %}

```javascript
{{apiPrefix}}BaaS.init(clientID, options)
```

**参数说明**

| 参数          | 类型       | 必填 | 说明         |
| :------------ | :--------- | ---- | :----------- |
| clientID      | String     |   Y   | 知晓云管理后台获取到的 ClientID |
| options       | InitOption |   N   | 其他选项 |

InitOption:

{% if platform != 'web' %}
| 参数          | 类型    | 必填 | 说明         |
| :------------ | :------| ---- | :----------- |
| autoLogin     | Boolean |   N   | 请求知晓云接口时，是否自动静默登录，默认为 false |
| logLevel      | String |   N   | 日志输出级别，共支持 debug、info、warn、error 4 个级别，默认为 error|
| host          | String |   N   | 自定义域名 |
| env           | String |   N   | 开发环境 ID，用于区分生产环境与其他开发环境，默认为生产环境 |
{% else %}
| 参数          | 类型    | 必填 | 说明         |
| :------------ | :------| ---- | :----------- |
| logLevel      | String |   N   | 日志输出级别，共支持 debug、info、warn、error 4 个级别，默认为 error|
| host          | String |   N   | 自定义域名 |
| env           | String |   N   | 开发环境 ID，用于区分生产环境与其他开发环境，默认为生产环境 |
{% endif %}

> **info**
> 关于 autoLogin 参数，具体请参考[多平台用户统一登录](./signin-signout.md#多平台用户统一登录) 和 [迁移指南](/js-sdk/migrate-from-v1.md)。

> clientID 在[知晓云管理后台](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]settings/info/)获取。

通过初始化 SDK ，知晓云服务可以验证当前的小程序是否是有效合法的，只有通过验证的小程序才能使用 SDK 提供的全部功能。
{% endmacro %}
