# API 网关使用指南

API 网关分成前后端服务，前端主要为接收客户端请求，并对其进行有效性校验及请求参数格式化后，再交给后端进行处理。

> 后端服务暂只支持云函数

## 云函数

云函数在被 API 网关作为后端服务时，其可以使用的传入参数及返回数据都与普通的云函数不一样。

需要注意，如 API 网关中 API 对应的云函数没有返回正确的数据格式时，该 API 则会响应失败。

### 云函数传入参数

传入参数在数据结构上没有改变，与[云函数代码格式](/cloud-function/node-sdk/start/code-format.md) 中描述的一样。

其中变化的主要有以下几点：

1. eventType 的取值为 `api_gateway`
2. `request.meta` 中新增 API 网关请求相关的信息
3. 不再提供 `request.user` 对象

#### event.request.meta 对象数据结构说明

| 包含字段          | 类型    | 说明                                   |
| :--------------- | :----- | :------------------------------------ |
| request_method   | String | 请求方法（始终为大写字母， 如 GET/POST 等）|
| request_path     | String | 请求路径                               |
| query_string     | Object | 请求中包含的 Query string               |
| headers          | Object | 请求中提交的自定义 Headers(预先在 API 的参数设置后才可以使用) |
| nested_arguments | Array  | 路径中配置的位置参数                     |
| named_arguments  | Object | 路径中配置的命名参数                     |


#### event.data 对象说明

目前知晓云 API 网关支持接收以下格式的内容：

 - JSON（Content-Type: `application/json`）
 - XML（Content-Type: `application/xml`)

API 网关会将 JSON/XML 内容转为任何 JavaScript 合法类型/对象，使得云函数内部中无需再次解析，提升使用效率。

XML 的请求转换例子，如用户的请求内容为：

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

返回内容为 `text/html` 类型

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