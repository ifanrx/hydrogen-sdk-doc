# 微信支付

使用知晓云支付 `SDK`，需要先在知晓云控制台关联商户账号，以及在 `XCode` 完成相应配置。

## 商户账号关联

在知晓云控制台完成商户账号关联，步骤如下图所示：

![账号关联](/images/ios/wexin_account.png)

## `Xcode` 配置

### 1. 配置微信 `APPID`

在 `Xcode` 中打开项目，设置项目属性中的 `URL Schemes` 为微信 `APPID`。如图所示

![设置 URLTYPE](/images/ios/wexin_scheme.png)

### 2. 设置白名单

在 Xcode 中打开项目，在 info.plist 文件中添加 `LSApplicationQueriesSchemes` 数组，并在该数组中添加 `wechat` 和 `wexin` 两个字符串。如图所示：

![设置白名单](/images/ios/query_scheme.png)


### 3. 配置返回 `URL` 处理方法

{% tabs swift1="Swift", oc1="Objective-C" %}
{% content "swift1" %}
```
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
        return BaaS.handleOpenURL(url: url)
}
```
{% content "oc1" %}
```
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
    return [BaaS handleOpenURLWithUrl:url];
}
```
{% endtabs %}

## 发起支付

当用户选择商品后，发起一笔支付时，需要传入订单价格、订单描述等相关参数。后续如需查询订单状态，可以传入商品 `id` 等信息，请参照参数说明。

> **info**
> 该接口只是创建订单，并发起微信支付，不能以微信返回的结果作为知晓云 `SDK` 的支付结果。查询支付结果请查阅 [订单查询](./order.md) 章节的 **查询订单详情** 小节，以该接口返回的订单状态进行后续处理，比如发送商品。

**示例代码**

{% tabs swift2="Swift", oc2="Objective-C" %}
{% content "swift2" %}
```
Pay.shared.wxPay(totalCost: 0.01, merchandiseDescription: "微信支付", completion: { (order, error) in

})
```
{% content "oc2" %}
```
BaaSPay *pay = [BaaSPay.shared wxPayWithTotalCost:0.01 merchandiseDescription:@"微信支付" merchandiseSchemaID: -1 merchandiseRecordID:nil merchandiseSnapshot:nil completion:^(BaaSOrder * _Nullable order, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

| 参数                    | 类型    | 必填 | 参数描述 |
| :--------------------- | :------ | :-- | :------ |
| totalCost              | Float   | Y   | 支付总额 |
| merchandiseDescription | String  | Y   | 商品详情的内容 |
| merchandiseSchemaID    | String | N   | 商品数据表 ID，可用于定位用户购买的物品 |
| merchandiseRecordID    | String  | N   | 商品数据行 ID，可用于定位用户购买的物品 |
| merchandiseSnapshot    | Dictionary  | N   | 根据业务需求自定义的数据 |

> **info**
> 举例：开发者有一个 `Article` 表, 里面有免费 / 付费的文章, 当用户对一篇付费文章进行支付时, 则可以将 `Article` 表的 ID 作为 `merchandiseSchemaID`, 文章记录的 ID 作为你 `merchandiseRecordID` 作为支付参数，写进支付订单记录。当用户阅读此付费文章时, 则可以通过 `merchandiseSchemaID`, `merchandiseRecordID` 来查询用户是否付费。

**支付返回参数说明**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| order  |   Order         | 订单信息，详见 [订单查询](./order.md) |
| error   |  NSError |  错误信息  |

error 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)