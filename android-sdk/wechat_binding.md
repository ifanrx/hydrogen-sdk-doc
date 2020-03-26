# 绑定微信

> **info**
> 参考 [「微信登录指南」](/ndroid-sdk/wechat_signin.md) 完成 SDK 内微信功能的初始化
>
> 绑定微信前需先登录（非匿名）
>
> 确保 SDK 版本 >= 1.1.10

`WechatComponent.associationWithWechat(type, callback)`

## 示例代码

```java
// AssociationType.OVERWRITE，覆盖
// AssociationType.SETNX，值不存在时设置
// AssociationType.FALSE，不更新

WechatComponent.associationWithWechat(AssociationType.OVERWRITE, new AssociationCallback() {
    @Override
    public void onSuccess() {
        // 绑定成功
    }

    @Override
    public void onFailure(@Nullable Exception ex) {
        // 绑定失败，可能的异常有：
        // IOException 网络异常
        // WechatNotInitException 没有安装微信
        // "fail to send auth req to wechat" 调用微信 sdk 时发生异常（此时要通过 logcat 查看 MicroMsg.SDK 的日志）
        // "sign in error XXX" 服务端登录异常
    }
});
```