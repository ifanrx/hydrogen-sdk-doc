# API 网关使用指南

API 网关分成前后端服务，前端主要为接收客户端请求，并对其进行有效性校验及请求参数格式化后，再交给后端进行处理。

详细的控制台配置流程参考：[点我直达](/dashboard/basic-services/api-gateway.md)

> 后端服务暂只支持云函数

## 云函数

云函数在被 API 网关作为后端服务时，其可以使用的传入参数及返回数据都与普通的云函数不一样。

需要注意，如 API 网关中 API 对应的云函数没有返回正确的数据格式时，该 API 则会响应失败。

### 云函数传入参数

传入参数在数据结构上没有改变，与[云函数代码格式](/cloud-function/node-sdk/start/code-format.md) 中描述的一样。

其中变化的主要有以下几点：

1. eventType 的取值为 `api_gateway`
2. `request.meta` 中新增 API 网关请求相关的信息
3. 由于 API 网关会配置自定义的认证、鉴权逻辑，所以 `request.user` 不再提供，如需在云函数中识别请求的用户，可从 request 携带的 headers 等参数，如 cookie、token 等获取相关信息后进行。

#### event.request.meta 对象数据结构说明

| 包含字段          | 类型    | 说明                                   |
| :--------------- | :----- | :------------------------------------ |
| request_method   | String | 请求方法（始终为大写字母， 如 GET/POST 等）|
| query_string     | Object | 请求中包含的 Query string               |
| headers          | Object | 请求中提交的自定义 Headers(预先在 API 的参数设置后才可以使用) |
| request_path     | String | 请求路径（详细信息参见下文）              |
| nested_arguments | Array  | 请求路径中配置的位置参数（详细信息参见下文） |
| named_arguments  | Object | 请求路径中配置的命名参数（详细信息参见下文） |
| ip_address       | String | 调用客户端地址                          |
| user_agent       | String | 调用客户端 User-Agent                   |

示例：

```json
{
    "request_method": "GET",
    "nested_arguments": [],
    "named_arguments": {},
    "request_path": "/hello-world/",
    "query_string": {"query": ["1", "2"], "string": ["1"]},
    "headers": {
        "customer-headers": "foo"
    },
    "ip_address": "127.0.0.1",
    "user_agent": "user-agent",
}
```

#### 请求路径

API 网关在定义 API 路径时，支持使用符合正则表达式语法来定义请求路径及其参数，以便更好地构造成动态路径。

定义参数支持两种模式：

- 位置参数
- 命名参数

比如，在控制台设置路径（位置参数）：

    /article/(\d+)/

或者，在控制台设置路径（命名参数）：

    /article/(?P<article_id>\d+)/

客户端在请求时，云函数即可对路径及其参数进行获取，在客户端请求路径为：`/article/123/` 时，`event.request.meta` 中通过 `nested_arguments` 或者 `named_arguments` 获取参数。

示例：

- 位置参数

    ```json
    {
        "request_method": "GET",
        "nested_arguments": ["123"],
        "named_arguments": {},
        "request_path": "/article/123/",
        "query_string": {},
        "headers": {},
        "ip_address": "127.0.0.1",
        "user_agent": "user-agent",
    }
    ```

- 命名参数

    ```json
    {
        "request_method": "GET",
        "nested_arguments": [],
        "named_arguments": {"article_id": "123"},
        "request_path": "/article/123/",
        "query_string": {},
        "headers": {},
        "ip_address": "127.0.0.1",
        "user_agent": "user-agent",
    }
    ```


#### event.data 对象说明

目前知晓云 API 网关支持接收以下格式的内容：

 - JSON（Content-Type: `application/json`）
 - XML（Content-Type: `application/xml`)

API 网关会将 JSON/XML 内容转为 JavaScript 合法类型，使得云函数内部中无需再次解析，提升使用效率。

其中 XML 内容的会从字符串转为对象，如用户的请求内容为：

```
<xml>
  <return_code><![CDATA[SUCCESS]]></return_code>
  <return_msg><![CDATA[OK]]></return_msg>
</xml>
```
转换后可使用的内容则为：

```
{
    "xml": {
        "return_code": "SUCCESS",
        "return_msg": "OK"
    }
}
```

### 云函数返回结果

在 API 网关调用的云函数中，需要指定返回结果为以下对象结构，如：

```json
{
    "content": "hello, world!",
    "content_type": "text/plain",
    "status_code": 200
}
```

#### 对象说明

| 包含字段       | 类型    | 说明         |
| :----------- | :------ | :----------- |
| content      | String  | 响应内容      |
| content_type | String  | 响应内容的类型 |
| status_code  | integer | 响应状态码    |

响应内容类型支持以下几种：

- text/plain
- text/html
- application/json
- application/xml

状态码使用可阅读资料：https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

#### 示例代码

返回内容为 `text/plain` 类型

``` javascript
exports.main = async function helloWorld (event) {

    var response_data = {
        content: "hello, world!",
        content_type: "text/plain",
        status_code: 200
    }

    // Do something...

    return response_data
}
```

返回内容为 `text/html` 类型

``` javascript
exports.main = async function helloWorld (event) {

    var response_data = {
        content: "<html><body><h1>hello, world!</h1></body></html>",
        content_type: "text/html",
        status_code: 200
    }

    // do something...

    return response_data
}
```

返回内容为 `application/json` 类型

``` javascript
exports.main = async function helloWorld (event) {

    var response_data = {
        content: "{\"hello\": \"world\"}",
        content_type: "application/json",
        status_code: 200
    }

    // do something...

    return response_data
}
```

返回内容为 `application/xml` 类型

``` javascript
exports.main = async function helloWorld (event) {

    var response_data = {
        content: "<xml><hello>world!</hello></xml>",
        content_type: "application/xml",
        status_code: 200
    }

    // do something...

    return response_data
}
```