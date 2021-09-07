# 安装知晓云 Flutter SDK（内测版） 依赖

1. 在项目根目录下的 `pubspec.yaml` 文件找到 `dependencies`，添加以下代码：

```yaml
dependencies:
  flutter:
    sdk: flutter
  minapp: ^1.0.0-alpha-4
```

2. 在命令行执行以下代码，安装 SDK

```shell
flutter pub get
```

# 在需要使用 SDK 的文件中引入

```dart
import 'package:minapp/minapp.dart' as BaaS;
```

# 初始化 SDK

在应用启动时，需要注册知晓云 clientId，并在 `main.dart` 中初始化：

```dart
BaaS.init('a4d2d62965ddb57fa4d8');
```

**参数说明**

| 名称       | 类型           | 是否必填    | 说明        |
| :-------- | :------------  |:---------- | :------    |
| clientID  | String         |是          | 应用 ID     |
| host      | String         |否          |  自定义域名  |
| debug     | bool           |否          |  是否打开调试模式，默认为 false  |

> **info**
> 目前 debug 模式下支持打印请求链接和上传文件时的链接。
> debug 模式还可以通过 Charles 和 iOS 模拟器进行抓包调试，端口默认为 8888。