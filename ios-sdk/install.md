# Requirements

* iOS 10.0+
* Xcode 10.1+
* Swift 4.2+

# 使用 CocoaPods 安装 MinCloud

在 `Podfile` 文件中添加以下代码

```
platform :ios, '10.0'
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
BaaS.register(clientID: "[[client_id]]", serverURLString: "com.example")
```
{% content "oc1" %}
```
[BaaS registerWithClientID:@"[[client_id]]" serverURLString:@"com.example"];
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

# MinCloud 第三方依赖库

MinCloud 依赖库如下

| 名称  | 版本  | 
| :----- | :----- |
| Moya   | ~> 14.0.0 |
| Alamofire | ~> 5.0.0 |
| Starscream | ~> 4.0.0 |
| AlipaySDK  | 15.7.7 |
| libWeiboSDK | 3.3.0  |
| libWebChatSDK | 1.8.7.1 |

如果你的项目中也需要使用上述依赖，可以直接使用；如果存在版本冲突，以 MinCloud 的版本为准。