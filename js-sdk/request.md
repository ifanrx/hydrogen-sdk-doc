# 网络请求

BaaS 提供 `wx.BaaS.request(OBJECT)` 函数用于调用 API。

**`wx.BaaS.request()` 相比 `wx.request()` 的优势：**

- 支持 `Promise` 规范
- 方便 BaaS 分析接口调用状况
- 无需关心微信 `wx.request()` 方法是否更新
- 自动配置必要的参数

**OBJECT 参数说明**

| 参数      |      类型      | 必填 | 说明 |
| :------- | :-----------: | :--- | :-- |
| url      | String        | 是   | 接口地址 |
| method   | String        | 是   | 默认为 GET，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT |
| data     | Object/String | 否   | 请求参数 |
| header   | Object        | 否   | 设置请求的 header , header 中不能设置 Referer |
| dataType | String        | 否   | 默认为 json |

**示例**

```js
// 获取当前登录用户订单列表
wx.BaaS.request({
  url: '/orderlist/',
  data: {orderby: 'orderID'})
}).then((res) => {
  // success
}, (err) => {
  // err
});
```

**返回参数**

BaaS 提供的 API，如果返回结果是与列表相关的，返回参数中会附有 meta 元信息，其结构如下：

| 参数         | 类型   | 说明 |
| :---------  | :----- | :--- |
| total_count | Number | 列表中元素总数 |
| next        | String | 下页地址 |
| previous    | String | 上页地址 |
| limit       | Number | 每次拉取数量的最大值，见 Tip |
| offset      | Number | 相对起始位置的偏移量 |

**meta 返回示例**

```js
{
  "limit": 20,
  "next": null,
  "offset": 0,
  "previous": null,
  "total_count": 1
}

```

### 状态码

BaaS 提供的 API 遵循 RESTful 规范，返回的状态码与对应的请求方法相对应。

需要特别说明的是：**当返回 401 状态码时，SDK 会清除本地的客户端认证 `Token`、BaaS 登录状态和BaaS 用户信息（与调用 `wx.BaaS.logout()` 退出 BaaS 一样）。**


> **info**
> 当 total_count > limit 时，会返回长度为 limit 的列表；反之返回剩下列表，实际上，total_count 为总列表的长度，其值不会变; offset 是相对起始位置的偏移量，也就是当 offset 为 10 时，此次拉取就是从第十一个元素开始拉取
