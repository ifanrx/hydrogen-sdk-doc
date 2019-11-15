<!-- ex_nonav -->

# QQ 加密数据解密

当调用 QQ 小程序接口获取敏感信息时，返回的数据往往是经过加密的，开发者如需获取这些敏感数据，需要对接口返回的加密数据进行对称解密。

`qq.BaaS.decryptData(encryptedData, iv, type)`

**参数说明**

| 参数           | 类型    | 必填 | 说明 |
| :------------ | :------ | :-- | :-- |
| encryptedData | String  | Y   | 加密的数据 |
| iv            | String  | Y   | 加密算法的初始向量 |
| type          | String  | Y   | 数据类型，现支持 'open-gid' |

当前支持解密的数据包括：
- 通过调用 [`qq.getShareInfo`](https://q.qq.com/wiki/develop/game/API/share/qq.getShareInfo.html) 获取到的转发详细信息，此时设置 type = 'open-gid'

> **danger**
> 该功能涉及到敏感数据接口使用，需前往 [知晓云管理后台-小程序设置页面-SDK 功能设置](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]settings/sdk/) 手动开启。

**请求示例**

对 QQ 加密数据进行解密需要使用到本次登录的会话密钥（session_key），因此，在调用该接口前，最好先调用一下 `qq.checkSession` 检查一下 session_key 是否过期，如果过期的话，可以先调用 `qq.BaaS.logout` 再调用 `qq.BaaS.login` 接口进行重新登录。

```javascript
App({
  onLaunch: function (options) {
    qq.getShareInfo({
      shareTicket: options.shareTicket,
      success: res => {
        qq.BaaS.decryptData(res.encryptedData, res.iv, 'open-gid').then(decryptRes => {
          // 解密成功
          console.log('decrytData success', decryptRes)
        }).catch(err => {
          console.log('decrytData fail', decryptRes)
        })
      },
      fail: err => {
        console.log('fail', err)
      },
    })
  }
})
```

**返回示例**

```javascript
{
  "openGId": "OPENGID"
}
```

HError 对象结构请参考[错误码和 HError 对象](./error-code.md)
