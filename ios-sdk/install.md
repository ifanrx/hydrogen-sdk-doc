# Requirements

* iOS 9.0+
* Xcode 10.1+
* Swift 4.2+

# 使用 CocoaPods 安装 MinCloud

在 `Podfile` 文件中添加以下代码

```
platform :ios, '9.0'
use_frameworks!

target 'YOUR_APP_TARGET' do # 替换 YOUR_APP_TARGET 为你的应用名称。
    pod 'MinCloud', :git => 'https://github.com/ifanrx/hydrogen-ios-sdk.git'
end
```

安装 SDK:

```
pod install
```

# 在需要使用 MinCloud 的文件中导入 MinCloud

{% tabs swift2="Swift", oc2="Objective-C" %}
{% content "swift2" %}
```
import MinCloud
```
{% content "oc2" %}
```
@import MinCloud;
```
{% endtabs %}

# 初始化 MinCloud

在应用启动时，需要注册知晓云 `clientId`，即在 `APPDelegate` 文件中，找到 `application:didFinishLaunchingWithOptions` 函数，插入下面代码：
**示例代码**
{% tabs swift1="Swift", oc1="Objective-C" %}
{% content "swift1" %}
```
BaaS.register(clientID: "f86c1******45d1152a1", serverURLString: "com.example")
```
{% content "oc1" %}
```
[BaaS registerWithClientID:@"f86c1******45d1152a1" serverURLString:@"com.example"];
```
{% endtabs %}

**参数说明**

| 名称       | 类型           | 说明        |
| :-------- | :------------  | :------    |
| clientID  | String         | 应用 ID   |
| serverURLString | String   | 自定义域名  |  

# 打印调试信息

开启调试信息，将在开发过程输出错误信息。

{% tabs swift3="Swift", oc3="Objective-C" %}
{% content "swift3" %}
```
BaaS.isDebug = true
```
{% content "oc3" %}
```
BaaS.isDebug = YES;
```
{% endtabs %}

# 获取服务器时间

获取当前服务器时间

{% tabs swift4="Swift", oc4="Objective-C" %}
{% content "swift4" %}
```
BaaS.getServerTime() { result, error in
                    
}
```
{% content "oc4" %}
```
[BaaS getServerTime:^(NSDictionary * _Nullable result, NSError * _Nullable error) {

}];
```
{% endtabs %}

**返回参数说明**

| 参数   | 类型                   | 描述 |
| :---- | :--------------------- | :-- |
| result  | Dictionary            | 包含时间的结果，具体如下 **result** 样例|
| error | NSError                 | 错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md) |

**result**

```json
{
  "time": 2019-11-28T16:39:12.732361+08:00
}
```

