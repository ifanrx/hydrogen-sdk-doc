# 绑定微博

> **info**
> 参考 [「微博登录指南」](/android-sdk/weibo_signin.md) 完成 SDK 内微博功能的初始化
>
> 绑定微博前需先登录（非匿名）
>
> 确保 SDK 版本 >= 1.2.1

`WeiboComponent.associationWithWeibo(Activity, SignInCallback)`

## 示例代码

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
        findViewById(R.id.asso).setOnClickListener(v -> {
            handler = WeiboComponent.associationWithWeibo(this, wbSignInCb);
        });
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