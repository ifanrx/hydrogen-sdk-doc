# 获取微信用户安全等级

根据提交的用户信息数据获取用户的安全等级 risk_rank，无需用户授权。

> **info**
> SDK version >= 3.17.0

`wx.BaaS.wxGetUserRiskRank(options)`

**参数说明**

options 是对象类型,包含以下参数:

| 参数         | 类型   | 必填 | 说明                       |
| ------------ | ------ | ---- | -------------------------- |
| scene        | Number | Y    | 场景值，0:注册，1:营销作弊 |
| mobileNo     | String | N    | 用户手机号                 |
| emailAddress | String | N    | 用户邮箱地址               |
| extendedInfo | String | N    | 额外补充信息               |

**返回字段说明**

| 属性      | 类型   | 说明         |
| --------- | ------ | ------------ |
| errcode   | Number | 返回码       |
| errmsg    | String | 错误信息     |
| risk_rank | Number | 用户风险等级 |

**返回码**

| 值    | 说明                           |
| ----- | ------------------------------ |
| -1    | 系统繁忙，此时请开发者稍候再试 |
| 0     | 成功                           |
| 48001 | 小程序无该api权限              |
| 40001 | token 无效                     |
| 40003 | openid无效                     |
| 43104 | appid与openid不匹配            |
| 61010 | openid超时                     |

返回码为61010，说明openid超时，目前传入的openID须在30min内有效访问小程序，否则会视为超时openid。

**用户风险等级**

| 值   | 说明      |
| ---- | --------- |
| 0    | 风险等级0 |
| 1    | 风险等级1 |
| 2    | 风险等级2 |
| 3    | 风险等级3 |
| 4    | 风险等级4 |

**示例代码**

```js
const options = {
  scene: 1,
  mobileNo: "12345678",
  emailAddress: "***@qq.com",
  extendedInfo: "",
};

// 获取微信用户安全等级
wx.BaaS.wxGetUserRiskRank(options)
  .then((res) => {
    // 返回数据
    console.log(res);
  })
  .catch((err) => {
    // HError 对象
    console.log(err);
  });
```

**返回示例**

```JSON
{
  "errcode": 0,
  "errmsg": "getuserriskrank succ",
  "risk_rank": 0,
  "union_id": 123456
}
```

