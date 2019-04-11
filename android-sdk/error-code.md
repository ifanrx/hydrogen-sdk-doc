<!-- ex_nonav -->
# Exception

## 普通 Exception

大部分的 sdk api 是需要访问网络的，它在与后端交互过程中会产生一些异常，最常见的如 `IOException`，用户应该在子线程里执行这些数据操作，并捕获异常


**示例代码**
```java
threadPool.submit(() -> {
  try {
    product.createRecord().put("name", "name").put("level", 10).save();
    // 操作成功...
  } catch (Exception e) {
    Log.d(TAG, e.getMessage(), e);
    // 操作失败...
  }
});
```


## SDK 内的自定义 Exception

一些自定义的异常如下：

`AnonymousNotAllowedException`  anonymous user is not allowed 某些 api 是不允许匿名登录用户操作的

`UninitializedException`  uninitialized  未调用 BaaS.init() 进行初始化

`SessionMissingException`  session missing  用户尚未登录

`com.minapp.android.sdk.exception.HttpException`  当网络请求失败（< 200 || > 300）时，抛出此异常；`code` 是 http status code，`errorMsg` 是错误内容