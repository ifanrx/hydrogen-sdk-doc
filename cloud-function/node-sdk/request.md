<!-- ex_nonav -->

# 网络请求

除了调用我们的云函数 SDK 之外，你可能需要发起一些网络请求，你可以调用 `BaaS.request` 发起请求，实际上 `BaaS.request` 是对 `axios` 开源网络请求库的封装，请求示例如下：

```js
exports.main = function testSDKNetwork(event, callback) {
  BaaS.request.get('http://ip.taobao.com/service/getIpInfo.php?ip=63.223.108.42').then(res => {
    callback(null, res.data)
  }, err => {
    callback(err)
  })
}
```

> **info**
> 目前云函数内请求不允许非安全端口，允许的端口有：80、443、8080、8443。
> 
> 如因业务需求需要请求其他端口，可通过工单申请，注明域名、端口、路径及使用场景说明。

更多用法，你可以参考 axios 的 [文档](https://github.com/axios/axios)

> **info**
> 网络请求出口 IP
>
> 如果外部接口需要对请求 IP 进行限制，可以将以下 IP 放入 IP 访问白名单中：
>
> 52.80.218.3