# 微信小程序 scheme 码

> **info**
> SDK >= 3.14

## 获取微信小程序 URL Scheme 码列表

`BaaS.wechat.UrlScheme#getUrlSchemeList()`

**示例代码**

```javascript
exports.main = async function (event, callback) {
  let urlScheme = new BaaS.wechat.UrlScheme();
  callback(null, await urlScheme.offset(0).limit(20).getUrlSchemeList());
};
```

**返回示例**

```json
{
  "meta": {
    "limit": 20,
    "next": null,
    "offset": 0,
    "previous": null,
    "total_count": 1
  },
  "objects": [
    {
      "created_at": 1610093736,
      "id": 6,
      "options": {},
      "status": "pending"
    }
  ]
}
```

`options` 表示生成 Scheme 码参数

## 获取单个微信小程序 URL Scheme 码

`BaaS.wechat.UrlScheme#get(id)`

**参数说明**

| 参数 | 类型    | 必填 | 说明         |
| :--- | :------ | :--- | :----------- |
| id   | Integer | Y    | scheme 码 ID |

**示例代码**

```javascript
exports.main = async function (event, callback) {
  let urlScheme = new BaaS.wechat.UrlScheme();
  callback(null, await urlScheme.get(1));
};
```

**返回示例**

```json
{
  "created_at": 1610094018,
  "id": 5,
  "options": {},
  "status": "pending"
}
```

## 创建单个微信小程序 URL Scheme 码

`BaaS.wechat.UrlScheme#generate(options)`

**参数说明**

options 是对象类型,包含以下参数:

| 参数        | 类型    | 必填 | 说明                                                                                                                 |
| :---------- | :------ | :--- | :------------------------------------------------------------------------------------------------------------------- |
| is_expire   | Boolean | Y    | 生成的 scheme 码类型，到期失效：true，永久有效：false，默认 false                                                    |
| expire_time | Integer | N    | 到期失效的 scheme 码的失效时间，为 Unix 时间戳。生成的到期失效 scheme 码在该时间前有效。生成到期失效的 scheme 时必填 |
| jump_wxa    | Object  | N    | 跳转到的目标小程序信息，非必填                                                                                       |

jump_wxa 包含以下参数:

| 参数  | 类型   | 必填 | 说明                                                                                                               |
| ----- | ------ | ---- | ------------------------------------------------------------------------------------------------------------------ |
| path  | String | N    | 通过 scheme 码进入的小程序页面路径，必须是已经发布的小程序存在的页面，path 为空时会跳转小程序主页                  |
| query | String | N    | 通过 scheme 码进入小程序时的 query，最大 32 个字符，只支持数字，大小写英文以及部分特殊字符：!#$&'()\*+,/:;=?@-.\_~ |

**示例代码**

```javascript
exports.main = async function (event, callback) {
  let urlScheme = new BaaS.wechat.UrlScheme();
  callback(
    null,
    await urlScheme.generate({
      jump_wxa: { path: "", query: "" },
      is_expire: true,
      expire_time: 1606737600,
    })
  );
};
```

**返回示例**

```json
{
  "created_at": 1610094010,
  "id": 2,
  "options": {
    "jump_wxa": {
      "path": "",
      "query": ""
    },
    "expire_time": 1606737600,
    "is_expire": true
  },
  "status": "pending"
}
```

## 删除单个微信小程序 URL Scheme 码

`BaaS.wechat.UrlScheme#delete(id)`

**参数说明**

| 参数 | 类型    | 必填 | 说明         |
| :--- | :------ | :--- | :----------- |
| id   | Integer | Y    | scheme 码 ID |

**示例代码**

```javascript
exports.main = async function (event, callback) {
  let urlScheme = new BaaS.wechat.UrlScheme();
  callback(null, await urlScheme.delete(1));
};
```
