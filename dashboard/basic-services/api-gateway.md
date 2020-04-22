# API 网关
PI网关（API Gateway）可以看做系统与外界联通的入口，您可以在网关进行处理一些非业务逻辑的逻辑，比如权限验证，监控，缓存，请求路由等等。

## 基础操作

### 创建 API 网关

![创建 API 网关](/images/dashboard/basic-services/gateway-create.png)

点击「添加」按钮打开创建 API 网关的弹窗。
知晓云提供了 "http"、"https"、"http 和 https"三种前端协议，您可以根据自己的实际需要进行选择。
API 网关创建完成后将跳转到详情页面。

### API 网关详情

![API 网关详情页](/images/dashboard/basic-services/gateway-detail.png)

创建 API 网关完成后或者点击 API 网关列表最后一列的「编辑」按钮，将跳转到 API 网关详情页面。
您可以在这边查看 API 网关的基本信息，点击右上角的「编辑」按钮可以将基础设置模块切换到编辑状态对 API 网关进行编辑。

此页还包含对 API 网关进行发布，以及添加 API 的模块。

### API 网关的发布

您可以在 API 网关的详情页的「发布管理」模块切换网关的发布状态，API 网关的发布在不同的环境是分开的，您可以分别设置不同环境的网关发布状态。

![API 网关发布](/images/dashboard/basic-services/gateway-publish.png)

### API 网关的监控

在 API 网关列表页面点击您想要看的 API 网关的「监控」列的按钮即可打开监控面板。左上角提供了一些筛选器，供用户进行数据筛选。

![API 网关监控页](/images/dashboard/basic-services/gateway-monitoring.png)

监控面板可以查看`调用次数`、`运行时间`以及`错误次数`三个类目的统计数据，开发者能够十分方便、直观地看到函数的运行情况。

### 创建 API

![创建 API](/images/dashboard/basic-services/gateway-create-api.png)

在 API 网关详情页的「API 管理」模块，您可以为当前 API 网关添加、编辑、调试和删除 API。点击「API 管理」模块右上角的添加按钮即跳转到创建 API 的页面。

注意，前端认证配置步骤的「认证方式」选择密钥对的话，需要先在 设置- SDK 添加了 JWT 之后在该步骤才有可选择的 JWT。

### API 的监控

在「API 管理」模块点击你想看的 API 的「监控」列即可打开 API 的监控面板。左上角提供了一些筛选器，供用户进行数据筛选。

![API 监控](/images/dashboard/basic-services/gateway-api-monitoring.png)
