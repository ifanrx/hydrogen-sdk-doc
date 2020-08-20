# 微博登录指南

## 准备工作

1. 如何安装 SDK 请参考[「知晓云 Android SDK 接入指南」](./install.md)

2. 确保 SDK 版本 >= 1.2.0

3. 接入[微博开放平台](https://open.weibo.com/development/mobile)，拿到 app id 和 secret id

4. 在知晓云控制台打开微信登录：「开发」-「设置」-「应用」-「登录方法」-「微博移动端登录」

## 注册 `WeiboComponent`

```java
public class MyApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        // redirectUrl 和 scope 的意义参考微博 SDK(https://github.com/sinaweibosdk/weibo_android_sdk)
        BaaS.initWeiboComponent(this, "${appKey}", "${redirectUrl}", "${scope}");
        ...
    }
}
```

## 配置 `AndroidManifest.xml`

```xml
<!-- 添加网络访问权限 -->
<uses-permission android:name="android.permission.INTERNET" />
```

## 微博登录流程

```java
public class SignInActivity extends AppCompatActivity {

    private static final String TAG = "SignInActivity";

    private SsoHandler handler = null;

    private SignInCallback wbSignInCb = new SignInCallback() {

        // 登录成功，此时用户已登录
        @Override
        public void onSuccess() {
            CurrentUser user = Auth.currentUserWithoutData();
            Long userId = user != null ? user.getUserId() : -1;
            Toast.makeText(MainActivity2.this,
                    String.format("登录成功（%s）", userId.toString()), Toast.LENGTH_SHORT).show();
            Log.d(TAG, user.toString());
        }

        // 用户取消登录
        @Override
        public void onCancel() {
            Toast.makeText(MainActivity2.this, "取消登录", Toast.LENGTH_SHORT).show();
        }

        // 登录失败（比如微博配置错误导致微博 app 授权失败、网络异常等）
        @Override
        public void onFailure(@NonNull Throwable tr) {
            Toast.makeText(MainActivity2.this, String.format("登录失败：%s", tr.getMessage()),
                    Toast.LENGTH_SHORT).show();
            Log.e(TAG, tr.getMessage(), tr);
        }
    };

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_in);

        // 点击微博登录按钮，拉起微博登录页面
        // 返回的 handler 需要保存并在 onActivityResult 时被调用
        findViewById(R.id.wb).setOnClickListener(v -> handler = WeiboComponent.signIn(this, wbSignInCb));
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        // 微博登录是通过 startActivityForResult 发起的，所以这里需要处理响应
        if (handler != null) {
            handler.authorizeCallBack(requestCode, resultCode, data);
        }
    }
}
```