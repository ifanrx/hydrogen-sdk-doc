# 通用注册登录

 `Auth` 集合了和平台无关的用户注册登录相关操作。

## 注册

开发者可以使用 `Auth` 来进行用户的通用注册。

> **info**
> 注册成功后会自动登录


### 通过邮箱注册

> **info**
> 邮箱中的英文字母会被强制转换为小写。例如 iFanrX@Hello.com 会被转换成 ifanrx@hello.com 

**示例代码**

```java
Auth.signUpByEmail(name, pwd);
```

**异常**

操作失败抛出异常，异常请参考[异常](./error-code.md)

### 邮箱验证

请参考 [邮箱验证小节](./account.md)

### 通过用户名注册

> **info**
> 用户名不区分大小写。当用户注册了 username 为 ifanrx 的账号后，其他人不能再注册诸如 Ifanrx、IfAnrx、IFANRX 等账号了

**示例代码**

```java
Auth.signInByUsername(username, pwd);
```

异常请参考[异常](./error-code.md)

## 登录

### 用户名登录

用户可以通过用户名和密码登录

**示例代码**

```java
Auth.signInByUsername(username, pwd);
```

### 邮箱登录

用户可以通过邮箱和密码登录

**示例代码**

```java
Auth.signInByEmail(email, pwd)
```

### 创建临时匿名用户

**示例代码**

```java
Auth.signInAnonymous();
```

## 登出

清理客户端存储的用户授权信息。

通过 `Auth.logout()` 函数完成登出功能。

**请求示例**

```javascript
Auth.logout();
```

## 获取 currentUser 对象

请参考 [获取 currentUser 对象小节](./account.md)
