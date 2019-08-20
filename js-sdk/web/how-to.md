#  Web 端 SDK 接入指南

> **info**
> Web 端 SDK 浏览器兼容性：IE10+

## 配置安全域名
进入知晓云 [设置页面](https://cloud.minapp.com/dashboard/#/app/settings/app/) 配置安全域名，只有在指定域名下，才能正常的请求知晓云数据：
![配置安全域名](/images/newbies/web-sdk-secure-domain.png)

假设我们将 web 应用架设在 `http://localhost:8080/`，则在安全域名配置框中输入 `http://localhost:8080` 即可


## 引入 SDK

{% tabs first="npm 引入", second="文件引入" %}

{% content "first" %}

安装依赖

```shell
npm i minapp-sdk
```

在代码中引入 SDK
```javascript
var BaaS = require('minapp-sdk')
```
{% content "second" %}

### 下载并导入 SDK

a. [下载最新版 SDK 到本地](../download-sdk.md)

b. 将下载解压后得到的 SDK js 文件放在项目目录中

<pre>
<code class="lang-html">
&lt;script src="./sdk-v{{ book.latestVersionWechat }}.js"&gt;&lt;/script&gt;
&lt;script&gt;
  var BaaS = window.BaaS
&lt;/script&gt;
</code>
</pre>

{% endtabs %}

## 初始化 SDK

通过初始化 SDK ，知晓云服务可以验证当前的应用是否是有效合法的，只有通过验证的应用才能使用 SDK 提供的全部功能。

在[知晓云后台 - 我的应用](https://cloud.minapp.com/admin/profile/)页面获取要接入知晓云服务的 ClientID, 按照如下方式进行 SDK 初始化:


```javascript
BaaS.init(clientID, {logLevel})
```

**参数说明**

| 参数          | 类型   | 必填  | 说明         |
| :------------ | :------| ----- | :----------- |
| clientID      | String |   Y   | 知晓云管理后台获取到的 ClientID |
| logLevel      | String |   N   | 日志输出级别，共支持 `debug`、`info`、`warn`、`error` 4 个级别，默认为 `error`|

更多内容，可查看以下功能模块介绍：

* [数据表](../schema/README.md)
* [内容库](../content/README.md)
* [文件](../file/README.md)
