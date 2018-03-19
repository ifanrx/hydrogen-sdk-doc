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

更多用法，你可以参考 axios 的 [文档](https://github.com/axios/axios)