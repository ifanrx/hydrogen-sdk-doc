# currentUser

开发者可以调用 `Auth.currentUser()` 获取 `CurrentUser` 对象，通过该对象进而对当前用户进行管理

## 获取 currentUser 对象

`Auth.currentUser()`

**示例代码**

```java
try {
  // 当前登录用户的信息；它会执行一次网络请求，获取到的用户信息总是最新的
  // 当未登录或者是匿名登录时，返回 null
  CurrentUser curUser = Auth.currentUser();
} catch (Exception e) {
  Log.d(TAG, e.getMessage(), e);
}
```



## CurrentUser 对象说明

`CurrentUser` 代表了当前登录的用户，开发者可以通过获取当前用户的信息，执行一些当前登录用户才能执行的动作
`CurrentUser` 是 `User` 的子类，所以该对象包含了 `_userprofile` 表所有的字段。  

### 获取用户自定义字段

开发者可能会在 _userprofile 表中定义一些自定义字段，要拿到这些自定义字段信息，可以通过如下 API 来获取：
- `currentUser.getXXX(key)`

#### `currentUser.getXXX(key)`

通过 `currentUser.getXXX(key)` 可以获取用户的单个字段(包括内置字段和自定义字段)。

**示例代码**

假设开发者在 _userprofile 表中定义了 `custom_name` 列，并设置当前用户的 `custom_name` 为 `ifanrx`。则在 SDK 中查询当前用户自定义字段代码如下：
  
```java
try {
  String customName = Auth.currentUser().getString("custom_name");
} catch (Exception e) {
  Log.d(TAG, e.getMessage(), e);
}
```
字段说明请参考 [获取用户信息小节](user.md)

### 判断用户是否是匿名用户

```javascript
try {
  if (Auth.isSignIn() && Auth.currentUser() == null) {
    // 已登录，但没有用户信息，表示当前登录是匿名登录
  }
} catch (Exception e) {
  Log.d(TAG, e.getMessage(), e);
}
```

## 设置用户信息

`CurrentUser` 提供了一些方法，用于修改当前用户信息。

常见使用场景：
- 用户的用户名/邮箱设置有误，需要修改为新的用户名/邮箱。
- 用户使用小程序授权登录后，通过设置用户名或邮箱，以便下次通过用户名或邮箱登录。


### 设置用户名，设置邮箱，更新密码

> 用户名不区分大小写。当用户设置了 username 为 ifanrx 的账号后，其他人不能再注册诸如 Ifanrx、IfAnrx、IFANRX 等账号了
> 邮箱中的英文字母会被强制转换为小写。例如 iFanrX@Hello.com 会被转换成 ifanrx@hello.com 

`currentUser.updateUser(request)`

**参数说明**

| 名称       | 类型           | 说明 |
| :-------- | :------------  | :------ |
| username     | String       | 用户名 （不区分大小写） |
| email        | String       | 户邮箱 （不区分大小写） |
| password     | String       | 用户密码 （若有提交 new_password 则为必填） |
| newPassword  | String       | 新用户密码 |

**示例代码**

```java
try {
  UpdateUserReq request = new UpdateUserReq();
  // 用户名、email 和密码可以单独更新，可以两两更新，可以三个一起更新
  request.setUsername("new user name");
  request.setEmail("new email");
  request.setPassword("xxxxxx");
  request.setNewPassword("xxxxxx");
  Auth.currentUser().updateUser(request);
  // 操作成功
} catch (Exception e) {
  Log.d(TAG, e.getMessage(), e);
  // 操作失败
}
```

**异常**

异常请参考[异常](./error-code.md)


### 更新用户自定义字段

更新用户信息与[数据表更新数据项](schema/update-record.md)方法基本一致。这里只允许更新 _userprofile 表中自定义的字段。


## 邮箱验证

`CurrentUser.emailVerify()`

当用户通过邮箱注册后或者修改了邮箱后，开发者可能希望对用户填写的邮箱真实性进行校验，
调用该 API 后，知晓云会向当前用户发送一封验证邮件，用户可以打开邮件并进行验证操作。

**示例代码**

```java
try {
  Auth.currentUser().emailVerify();
  // 操作成功
} catch (Exception e) {
  Log.d(TAG, e.getMessage(), e);
  // 操作失败
}
```

**异常**

异常请参考[异常](./error-code.md)
