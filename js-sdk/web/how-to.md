#  Web 端 SDK 接入指南

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

通过 CDN 引入 SDK

```html
<script src="https://dl.ifanr.cn/hydrogen/sdk/sdk-web-latest.js"></script>
<script>
  var BaaS = window.BaaS
</script>
```

{% endtabs %}

## 初始化 SDK

通过初始化 SDK ，知晓云服务可以验证当前的应用是否是有效合法的，只有通过验证的应用才能使用 SDK 提供的全部功能。

在[知晓云后台 - 我的应用](https://cloud.minapp.com/admin/profile/)页面获取要接入知晓云服务的 ClientID, 按照如下方式进行 SDK 初始化:


```javascript
  let clientID = '知晓云管理后台获取到的 ClientID'
  BaaS.init('clientID')
```


更多内容，可查看以下功能模块介绍：

* [数据表](../schema/README.md)
* [内容库](../content/README.md)
* [文件](../file/README.md)