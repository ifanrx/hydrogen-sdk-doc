# 获取服务器时间

获取服务器时间，主要有以下应用场景：

  1. 时间校准。例如客户度显示倒计时时，用做基准时间。

  2. 数据查询。防止由于客户端拿到错误时间，导致查询到错误的数据。

**示例代码**

{% tabs swift1="Swift", oc1="Objective-C" %}
{% content "swift1" %}
```
BaaS.getServerTime() { result, error in
                    
}
```
{% content "oc1" %}
```
[BaaS getServerTime:^(NSDictionary * _Nullable result, NSError * _Nullable error) {

}];
```
{% endtabs %}


**返回值说明**

| 属性   | 类型   | 说明     |
|----------|--------|----------|
| result     | Dictionary | 其中 `time` 为服务器时间（ISO 8601），含时区信息，时区信息和应用设置的时区一致，示例如**返回示例** |
| error | NSError                 | 错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md) |

**返回示例**

成功时 `result` 对象结构如下

```json
{
  "time": "2019-11-25T15:05:19.387067+08:00"
}
```