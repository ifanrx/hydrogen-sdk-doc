# 微信登录指南

## 准备工作

1. 如何安装 SDK 请参考[「知晓云 Android SDK 接入指南」](./install.md)

2. 确保 SDK 版本 >= 1.1.0

3. 接入[微信开发者平台](https://developers.weixin.qq.com/doc/oplatform/Mobile_App/WeChat_Login/Development_Guide.html)，拿到 app id 和 secret id

4. 在知晓云控制台打开微信登录：「开发」-「设置」-「应用」-「登录方法」-「微信移动端登录」

## 注册 `WechatComponent`

```java
public class MyApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        WechatComponent.initWechatComponent("{appId}", this);
        ...
    }
}
```

## 配置 `AndroidManifest.xml`

```xml
<!-- SDK 提供的用以接收微信响应的实现 -->
<activity
    android:name="com.minapp.android.sdk.wechat.WXEntryActivity"
    android:launchMode="singleTop"
    android:theme="@style/HyDrogenTranslucent" />

<!-- 接收微信响应 -->
<activity-alias
    android:name=".wxapi.WXEntryActivity"
    android:exported="true"
    android:targetActivity="com.minapp.android.sdk.wechat.WXEntryActivity" />
```

## 微信登录流程

```java
public class SignInActivity extends AppCompatActivity {

    // 得到微信登录的结果
    private WechatSignInCallback cb = new WechatSignInCallback() {
        @Override
        public void onSuccess() {
            // 微信登录成功
        }

        @Override
        public void onFailure(@Nullable Exception ex) {
            // 微信登录失败，可能的异常有：
            // IOException 网络异常
            // WechatNotInitException 没有安装微信
            // "fail to send auth req to wechat" 调用微信 sdk 时发生异常（此时要通过 logcat 查看 MicroMsg.SDK 的日志）
            // "sign in error XXX" 服务端登录异常
        }
    };

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_in);

        // 点击微信登录按钮，拉起微信登录页面
        findViewById(R.id.wechatBtn).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                WechatComponent.signIn(cb);
            }
        });
    }
}
```