# 微信加密数据解密

<p style='color:red'>* sdk version >= v1.1.0</p>

`wx.BaaS.wxDecryptData(encryptedData, iv, dataKey)`

当调用微信小程序接口获取敏感信息时，返回的数据往往是经过加密的，开发者如需获取这些敏感数据，需要对接口返回的加密数据进行对称解密。

当前支持解密的数据包括：
- `wx.getWeRunData` 获取微信用户的微信运动步数
- `wx.getPhoneNumber` 获取微信用户绑定的手机号
- `wx.getShareInfo` 获取转发详细信息

##### 参数说明

|      参数名      |   类型   | 是否必填 | 参数描述                      |
| :-----------: | :----: | :--: | :------------------------ |
|  encryptedData  |  String  |  Y  |  加密的数据  |
|  iv  |  String  |  Y  |  加密算法的初始向量  |
|  type  |  String  |  Y  |  数据类型，现支持 'we-run-data', 'phone-number', 'open-gid'  |

- 当调用 `wx.getWeRunData` 时，type = 'we-run-data'
- 当调用 `wx.getPhoneNumber` 时， type = 'phone-number'
- 当调用 `wx.getShareInfo` 时，type = 'open-gid'


##### 请求示例

```
wx.getWeRunData({
  success(res) {
    wx.BaaS.wxDecryptData(res.encryptedData, res.iv, ‘we-run-data’).then((res) =>  {
      const decrytedData = res.data
    })
  }
})
```