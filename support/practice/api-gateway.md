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
2. `request.meta` 对象为空对象
3. `request.user` 对象不再为当前调用云函数的用户信息，而是当前应用创建者的用户信息
4. `data` 参数类型为对象，内部包含 API 网关传递过来的一些请求元信息以及用户传入的请求内容

#### event.data 对象数据结构说明

| 包含字段 | 类型   | 说明             |
| :------ | :----- | :------------- |
| meta    | Object | 请求元信息       |
| payload | Object | 用户提交的请求内容 |

`meta` 对象说明

| 包含字段          | 类型    | 说明                     |
| :--------------- | :----- | :---------------------- |
| request_method   | String | 请求元信息                |
| request_path     | String | 用户提交的请求内容         |
| query_string     | Object | 请求中包含的 Query string |
| headers          | Object | 请求中提交的自定义 Headers |
| nested_arguments | Array  | 路径中配置的位置参数       |
| named_arguments  | Object | 路径中配置的命名参数       |

`payload` 对象说明

目前知晓云 API 网关支持接收以下格式的内容：

 - JSON（Content-Type: `application/json`）
 - XML（Content-Type: `application/xml`)

API 网关会将 JSON/XML 内容转为对象，使得云函数内部中无需再次解析，提升使用效率。

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

示例：

```json
{
    "meta": {
        "request_method": "GET",
        "nested_arguments": [],
        "named_argsuments": {},
        "request_path": "/hello-world/",
        "query_string": {"query": ["1", "2"], "string": ["1"]},
        "headers": {
            "ip_address": "127.0.0.1",
            "user_agent": "user-agent",
            "customer-headers": "foo"
        }
    },
    "payload": {
        "foo": "bar"
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

1. 使用 callback

    ```javascript
    exports.main = function (event, callback) {
        var response_data = {
            content: "hello, world!",
            content_type: "text/html",
            status_code: 200
        }

        // Do something...

        callback(null, data)
    }
    ```

2. 使用 async + return

    ``` javascript
    exports.main = async function (event) {

        var response_data = {
            content: "hello, world!",
            content_type: "text/html",
            status_code: 200
        }

        // Do something...

        return response_data
    }
    ```
