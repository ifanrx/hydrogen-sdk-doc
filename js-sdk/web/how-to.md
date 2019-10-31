{% import "../macro/sdk-init.md" as sdkInit %}

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

{{ sdkInit.renderIntoPlatform('web') }}

更多内容，可查看以下功能模块介绍：

* [数据表](../schema/README.md)
* [内容库](../content/README.md)
* [文件](../file/README.md)
