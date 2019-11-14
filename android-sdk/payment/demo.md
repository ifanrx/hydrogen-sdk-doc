# 支付功能接入指南及 demo 使用指南

## demo 使用指南
> 微信 sdk 要求 app id 需要与注册微信支付时填入的 app id 一致，所以你需要把 demo app id 重构为你的 app id，并把 demo 里的代码迁移到你的 app id 包下

* 打开 demo app 的 build.gradle，找到下面两行并填入 Baas client id 和 wx app id

```gradle
buildConfigField("String", "CLIENT_ID", '""')       // 这里填入 Baas client id
buildConfigField("String", "APP_ID", '""')          // 这里填入微信 app id
```

或者在 App 里：

```java
public class App extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        BaaS.init("[[client_id]]", this);
        BaaS.initWechatComponent("wx app id", this);
    }
}
```

* 然后在主页面里，点击“微信支付” or “支付宝支付”即可向你的商户支付 0.01 元


## 支付功能接入指南

> app 接入支付功能前，需在知晓云后台-支付面板配置微信支付或者支付宝支付

* 在[这里](https://github.com/ifanrx/hydrogen-android-sdk/blob/master/sdk/libs/alipaySdk-15.6.2-20190416165100.aar)下载支付宝 sdk，放入 libs 文件夹下面（项目目录结构参考 demo ）

* 在 app 的 build.gradle 添加支付宝 sdk 的依赖

```gradle
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.aar'])
}
```

* 调用微信支付 api 前，需初始化微信 sdk

```java
public class App extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        BaaS.initWechatComponent("{wx app id}", this);
        ...
    }
}
```

> 注意 app 的包名应该与注册微信 sdk 时填写的包名一致，否则会导致微信调用失败；支持支付功能的 sdk 版本 >= 0.1.8


