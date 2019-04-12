<!-- ex_nonav -->

# 知晓云 Web API

## 章节目录

* [授权认证](./authentication.md)
* [数据模块](./data/README.md)
* [内容模块](./content/README.md)
* [文件模块](./file/README.md)
* [用户模块](./user/README.md)
* [云函数](./cloud-function.md)

## 使用须知

在知晓云 `Web API` 的使用过程中，有两个重要的概念:

### ClientID
区分应用的唯一凭证，服务器依靠这个字段来辨别请求者的应用。
##### 获取方式
* 进入[知晓云控制台设置页面](https://cloud.minapp.com/dashboard/#/app/settings/info/), 在左上角选择你的应用
![client-id](/web-api/image/client-id.jpg)
* 在选择完应用后(必须先选择应用，因为不同的应用会有不同的 `ClientID`)，向下滑动页面，在`开发者 ID`中就可以找到 `ClientID`
![client-id-get](/web-api/image/client-id-get.jpg)

##### 使用方式
在你请求的 ``HTTP-Header`` 里，加入以下的项:

`X-Hydrogen-Client-ID: a4d2d62965dd********`

其中的 `a4d2d62965dd********` 为你在控制台拿到的 `ClientID`

##### 使用例子
获取应用的内容库分类列表
```shell
curl -X GET \
-H "X-Hydrogen-Client-ID: a4d2d62965dd********" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/hserve/v1/content/category/?content_group_id=1
```

### Access Token
用于应用中用户的鉴权

##### 获取方式
* 请求[用户注册](/web-api/user.md)或[用户登录](/web-api/user.md)接口
* 接口响应体的`BODY`中的`token`即是用户的`Access Token`
```python
{
    "_email": "hgzchn@qq.com",
    "_email_verified": true,
    "_provider": {},
    "_session": {
        "ip_address": "14.17.111.222",
        "login_method": "email",
        "session_key": "t3yzfew6t41000000000",
        "user_agent": "blablabla"
    },
    "avatar": "https://blablabla.png",
    "created_at": 1554777211,
    "created_by": 34719381684550,
    "expires_in": 2592000,
    "id": 34719381600000,
    "is_authorized": false,
    "token": "t3yzfew6t41000000000", # 用户的 Access Token
    "updated_at": 1554777211,
    "user_id": 34719381600000
}
```

##### 使用方式
在你请求的 ``HTTP-Header`` 里，加入以下的项:

`Authorization: Hydrogen-r1 t3yzfew6t41000000000`

其中的 `t3yzfew6t41000000000` 为用户的`Access Token`

##### 使用例子
用户登出(需同时提供ClientID)
```shell
curl -X POST \
-H "X-Hydrogen-Client-ID: a4d2d62965dd********" \
-H "Authorization: Hydrogen-r1 t3yzfew6t41000000000" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/hserve/v2.0/session/destroy/
```

> **info**
> 若遇到问题，请联系 <minapp-support@ifanr.com> 或者客服（微信号：minsupport3）