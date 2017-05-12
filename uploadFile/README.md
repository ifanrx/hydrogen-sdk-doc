# 文件上传

通过 BaaS SDK 提供的 `wx.BaaS.uploadFile(OBJECT)` 方法将本地资源上传到开发者服务器。

##### OBJECT 参数说明
参数列表采用**驼峰命名, 区分大小写**的命名方式和书写规范

| 参数名      | 类型     | 是否必填 | 参数描述                    |
| :------- | :----- | :--: | :---------------------- |
| filePath | String |  Y   | 本地资源路径                  |
| clientID | String |  Y   | 当前小程序的 clientID         |
| formData | Object |  N   | HTTP 请求中其他额外的 form data |

注: 本地资源路径的获取方法要视具体情况而定。例如通过 `wx.chooseImage(object)` 获取的图片, 可以在用户选好本地图片后的成功回调中获取到其本地路径。

##### 接口说明
调用文件上传接口时包含以下操作:
- SDK 会确保用户具备有效的登录态(可以获取到有效的 token) 后再发起 `wx.uploadFile` 请求
- SDK 内部封装的 `wx.uploadFile` 接口在发起请求时会携带当前用户的有效 `token`,  `token` 的获取 SDK 使用者无需关心, SDK 本身已封装好并且添加在请求头部一同发送
- 上传成功或失败都会调用 `wx.BaaS.uploadFile` 接口事先返回的 `Promise` 对象。上传成功会返回资源的网络地址, 失败则会告知 SDK 使用者失败原因
- 注: 微信提供了统一的返回描述字符串 `res.errMsg` 来通知开发者上传接口调用结果的详细信息
##### 示例代码
```
// 文件上传示例代码
let params = {}
params.filePath = '本地资源路径'
params.clientID = '当前小程序的 cilentID'
params.formData = {} // 可选的 formData

wx.BaaS.uploadFile(params).then((res) => {
  // success
}, (err) => {
  // err
});
```

