<!-- ex_nonav -->

# 用户

SDK 提供了快速登录小程序的接口，省去使用微信登录接口时获取 code, session_key 等辅助操作

```js
wx.BaaS.login().then((res) => {
  console.log('登录成功')
})
```

借助知晓云数据表提供的用户表，你可以方便的对用户信息进行查询获取，以及添加和修改自定义字段

```js
let MyUser = new wx.BaaS.User()
let currentUser = MyUser.getCurrentUserWithoutData()

// age 为自定义字段
currentUser.set('age', 30).update()
```