# 使用 CocoaPods 安装 MinCloud

在 Podfile 文件中添加以下代码

```
platform :ios, '10.0'
use_frameworks!

target 'YOUR_APP_TARGET' do # 替换 YOUR_APP_TARGET 为你的应用名称。
    pod 'MinCloud'
end
```

安装 SDK:

```
pod install
```

# 初始化 MinCloud

在应用启动时，需要注册知晓云 clientId，即在 APPDelegate 文件中，找到 application:didFinishLaunchingWithOptions 函数，插入下面代码：
**示例代码**
{% tabs swift1="Swift", oc1="Objective-C" %}
{% content "swift1" %}
```
BaaS.register(clientID: "f86c122f10f45d1152a1")
```
{% content "oc1" %}
```
[BaaS registerWithClientID:@"196ba98487ebc358955d"];
```
{% endtabs %}

## 在需要使用 MinCloud 的文件中导入 MinCloud

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
