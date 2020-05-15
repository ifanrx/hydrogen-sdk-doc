# API 网关

知晓云 API 网关（API Gateway），是 API 发布、管理、运维的全生命周期管理工具。让开发者通过可视化界面配置并生成 API 提供给全平台使用，省掉了繁琐的服务开发及部署环节，五分钟即可完成 API 定制开发。

使用 API 网关，还可以让运行在知晓云上的应用数据得以更加灵活地提供给外部系统集成，无需再通过知晓云的 OpenAPI 进行数据转接，使得业务推进速度跃升一个等级。

> 知晓云控制台进入「引擎」即可开启使用。

## 创建 API 网关

选择「API 网关」tab，即可进入管理面板。

![创建 API 网关](/images/dashboard/api-gateway-creation.png)

## 增加路由，绑定云函数

完成 API 网关创建后，在「API 管理」添加 API。

![创建 API](/images/dashboard/api-gateway-add-route.png)


API 可以根据需求进行认证服务，请求参数等的前端配置，按需选择。

![API 前端配置](/images/dashboard/api-gateway-route-config.png)

完成前端配置后，再进行后端云函数的配置，给正式/测试环境配置相对应的云函数，点击「新增云函数」会在新开的标签页中实现云函数的创建，完成后，点击刷新按钮即可选择。

![API 后端配置](/images/dashboard/api-gateway-route-associate-cloud-function.png)

## 编写云函数

云函数中可使用的参数及返回数据都与普通云函数不一样，编写前先阅读[文档](/support/practice/api-gateway.md)，确保编写出正确可用的云函数。

![云函数编写](/images/dashboard/api-gateway-create-cloud-function.png)

编写成后，回到原有标签，进行关联操作。

![API 绑定云函数](/images/dashboard/api-gateway-choose-cloud-function.png)

## 发布 API 网关

![API 发布](/images/dashboard/api-gateway-publish.png)

## 验证 API 网关

![API 验证](/images/dashboard/api-gateway-verify.png)


