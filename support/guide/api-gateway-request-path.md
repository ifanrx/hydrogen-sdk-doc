# API 网关定义 API 路径指南

API 路径是 URL 的组成一部分（path），具体含义可以参考：[什么是 URL](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/What_is_a_URL)

在 API 网关中 API 路径的定义有几个要求：

1. 必须以 「/」
2. 仅限小写英文字母，不支持中文
3. 路径 + query string 的字符串长度不能超过 16k

为了更好地丰富 API 路径的匹配模式，API 网关支持使用**正则表达式**来编写 API 路径。


## API 路径中的正则表达式语法

API 路径中使用正则表达式是为了实现从用户请求路径中获取符合某个条件的字符串（参数），所以使用的正则表达式会由匹配及重复字符组成。

格式：

    (<匹配字符><重复字符>)

> 重复字符是用于描述匹配字符出现的重复次数才符合整个正则表达式。

> `()` 表示正则表达式的开始与结束

### 匹配字符

`[]`

它用于指定匹配字符，可以单独列出字符，也可以通过给出两个字符并用 '-' 标记将它们分开来表示一系列字符。

例如，`[abc]` 将匹配任何字符 a、b 或 c，也可以写作 `[a-c]`，它使用一个范围来表示同一组字符。

`\d`

匹配任何十进制数字。

`\D`

匹配任何非数字字符。

`\w`

匹配任何字母与数字字符

`\W`

匹配任何非字母与数字字符

`.`

匹配任何字符


### 重复字符

`*`

匹配零或多次

`+`

匹配一或多次

`{n}`

n 是一个非负整数。匹配确定的 n 次

`{n,}`

n 是一个非负整数。至少匹配 n 次

`{n,m}`

m 和 n 均为非负整数，其中 n <= m，最少匹配 n 次且最多匹配 m 次

### 组合示例

`[abc]+`

字符串中只能包含 `a`，`b`，`c` 三个字符串，匹配一或多次。
如 `a`，`aa`，`aaa`，`ab`，`bc`，`abbbbbc`匹配成功，`abd` 匹配失败。

`\d{1}`

任何十进制数字匹配一次。
如 `1`，`2`... `9` 均能匹配成功，`10` 开始匹配失败。


## API 路径中的正则表达式使用

在 API 路径中写入正则表达式，API 网关捕获并将匹配到的字符串传入云函数中。

API 网关支持两种正则表达式的写法：

1. 位置表达式
2. 命名表达式

> 需注意，不支持同时使用两种写法，如同时使用，则只会将匹配命名表达式的参数传入云函数

### 位置表达式

在 API 路径的任意位置中写入 `(pattern)` 即可完成。

下面是一个实际例子：

    /article/(\d+)/

当用户请求 `/article/1/` 在API 网关完成匹配后，云函数可通过 `event.request.meta.nested_arguments` 获取参数，event.request.meta 其数据结构为:

    {
        "request_method": "GET",
        "nested_arguments": ["1"],
        "named_arguments": {},
        "request_path": "/article/1/",
        "query_string": {},
        "headers": {},
        "ip_address": "127.0.0.1",
        "user_agent": "user-agent",
    }

位置表达式可以写入多个

    /article/(\d+)/(\w+)/

当用户请求 `/article/1/comment/` 在API 网关完成匹配后，云函数可通过 `event.request.meta.nested_arguments` 获取参数，event.request.meta 其数据结构为:

    {
        "request_method": "GET",
        "nested_arguments": ["1", "comment"],
        "named_arguments": {},
        "request_path": "/article/1/",
        "query_string": {},
        "headers": {},
        "ip_address": "127.0.0.1",
        "user_agent": "user-agent",
    }

`event.request.meta.nested_arguments` 数组的中的顺序取决于每个位置表达式在 API 路径中的顺序。

### 命名表达式

命名表达式的语法与位置表达式不同，增加了参数命名：

    (?P<name>pattern)

name 为对参数的命名，pattern 为正则表达式。下面是一个实际例子：

    /hello/(?P<id>\d+)/

当用户请求 `/hello/1` 在API 网关完成匹配后，云函数可通过 `event.request.meta.named_arguments` 获取参数，其数据结构为:

    {
        "event.request.meta.named_arguments": {
            "id": "1"
        }
    }
