<!-- ex_nonav -->

# 知晓云 Web API

知晓云 Web API 可以让你用任何支持发送 HTTP 请求的设备来与知晓云进行交互，你可以使用 Web API 做很多事情，比如：

* 用户注册，用户登录，密码找回
* 给用户的手机号发送短信
* 上传文件
* 触发云函数
* 对数据表进行增删改查

## Web API 类别

* [用户](./user.md)
* [数据库](./data/README.md)
* [内容库](./content/README.md)
* [文件](./file/README.md)
* [云函数](./cloud-function.md)
* [支付](./payment.md)
* [短信服务](./sms.md)

## 如何构造 HTTP 请求

**首先，发起一个 HTPP 请求时，你得知道服务器的域名**

### 服务器域名
首先，发起一个 HTTP 请求时，要先获取应用的服务器域名

##### 获取方式
* 进入[知晓云控制台设置页面](https://cloud.minapp.com/dashboard/#/app/settings/info/), 在左上角选择你的应用
![client-id](/web-api/image/client-id.jpg)
* 在选择完应用后(必须先选择应用，因为不同的应用会有不同的 `服务器域名`)，向下滑动页面，在`服务器域名`中就可以找到 `request 合法域名`
![server-url](/web-api/image/server-url.jpg)

##### 使用方式
Web API 形如 `https://{{服务器域名}}/hserve/v2.0/idp/pay/order/` 

(eg: `https://abcd11223344daeabcd.myminapp.com/hserve/v2.0/idp/pay/order/`)

其中服务器域名 `abcd11223344daeabcd.myminapp.com` 就是你在上面获取到的 ``request 合法域名`` 的值

##### 使用例子
```shell
curl -X GET \
-H "X-Hydrogen-Client-ID: a4d2d62965dda4d2d62965dd" \
-H "Authorization: Hydrogen-r1 t3yzfew6tt3yzfew6t" \
-H "Content-Type: application/json" \
https://abcd11223344daeabcd.myminapp.com/hserve/v2.0/idp/pay/order/
```

**知道服务器域名之后，你就可以利用 HTTP 请求和位于服务器上的应用交互了，但是服务器怎么辨别收到 HTTP 请求时是属于哪一个应用？这时候，就需要用到 `ClientID` 了**

### ClientID
区分应用的唯一凭证，服务器依靠这个字段来辨别请求者的应用

##### 获取方式
* 进入[知晓云控制台设置页面](https://cloud.minapp.com/dashboard/#/app/settings/info/), 在左上角选择你的应用
![client-id](/web-api/image/client-id.jpg)
* 在选择完应用后(必须先选择应用，因为不同的应用会有不同的 `ClientID`)，向下滑动页面，在`开发者 ID`中就可以找到 `ClientID`
![client-id-get](/web-api/image/client-id-get.jpg)

##### 使用方式
在你请求的 ``HTTP-Header`` 里，加入以下的项:

`X-Hydrogen-Client-ID: a4d2d62965dda4d2d62965dd`

其中的 `a4d2d62965dda4d2d62965dd` 为你在控制台拿到的 `ClientID`

##### 使用示例
获取应用的内容库分类列表
```shell
curl -X GET \
-H "X-Hydrogen-Client-ID: a4d2d62965dda4d2d62965dd" \
-H "Content-Type: application/json" \
https://abcd11223344daeabcd.myminapp.com/hserve/v1/content/category/?content_group_id=1
```

**有一些 WEB API 除了需要知道 `ClientID` 外，还需要知道请求来自哪一名用户(如修改用户信息，应用就需要知道修改的是哪一个用户的信息)，`Access Token` 能满足应用的这个需求**
 
### Access Token
用于应用中用户的鉴权

##### 获取方式
* 请求[用户注册](/web-api/user.md)或[用户登录](/web-api/user.md)接口
* 接口响应体的`BODY`中的`token`即是用户的`Access Token`
```json
{
    "_email": "hgzchn@qq.com",
    "_email_verified": true,
    "_provider": {},
    "_session": {
        "ip_address": "14.17.111.222",
        "login_method": "email",
        "session_key": "t3yzfew6tt3yzfew6t",
        "user_agent": "blablabla"
    },
    "avatar": "https://blablabla.png",
    "created_at": 1554777211,
    "created_by": 34719381684550,
    "expires_in": 2592000,
    "id": 34719381600000,
    "is_authorized": false,
    "token": "t3yzfew6tt3yzfew6t", # 用户的 Access Token
    "updated_at": 1554777211,
    "user_id": 34719381600000
}
```

##### 使用方式
在你请求的 ``HTTP-Header`` 里，加入以下的项:

`Authorization: Hydrogen-r1 t3yzfew6tt3yzfew6t`

其中的 `t3yzfew6tt3yzfew6t` 为用户的`Access Token`

##### 使用示例
用户登出(需同时提供 `ClientID`)
```shell
curl -X POST \
-H "X-Hydrogen-Client-ID: a4d2d62965dda4d2d62965dd" \
-H "Authorization: Hydrogen-r1 t3yzfew6tt3yzfew6t" \
-H "Content-Type: application/json" \
https://abcd11223344daeabcd.myminapp.com/hserve/v2.0/session/destroy/
```

### 请求格式
对于 Web API 的请求，如果需要附带数据，请求的主体必须是 `JSON` 格式，而且 `HTTP header` 的 `Content-Type` 需要设置为 `application/json`。

### 响应格式
参考[错误响应](./error-code.md)
