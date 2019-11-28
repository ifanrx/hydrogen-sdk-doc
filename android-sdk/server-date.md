# 获取服务器时间

`BaaS.getServerDate()`, `BaaS.getServerDateInBackground(callback)`

通过该接口获取服务器时间，可以防止前端由于用户时间设置错误而导致拿到错误的时间，主要有以下应用场景：

  1. 时间校准。例如前端显示倒计时时，用做基准时间。

  2. 数据查询。防止由于前端拿到错误时间，导致查询到错误的数据。

**示例代码**

```java
BaaS.getServerDateInBackground(new BaseCallback<Calendar>() {
    @Override
    public void onSuccess(Calendar calendar) {
        // success
    }

    @Override
    public void onFailure(Throwable e) {
        // fail
    }
});
```

**返回值说明**

| 类型   | 说明     |
|--------|----------|
| Calendar | 服务器时间，含时区信息，时区信息和应用设置的时区一致 |

**返回 json 示例**

成功时 json 结构如下

```json
{
  "data": {
    "time": "2019-11-25T15:05:19.387067+08:00",
  },
  "status": 200
}
```

异常请参考[异常](./error-code.md)