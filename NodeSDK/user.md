# 获取用户信息

`let MyUser = new BaaS.User()`

### 获取指定用户信息

`MyUser.get(userID)`

##### 参数说明

| 参数名  |  类型   |  必填  |   描述  |
| :---:  | :----: | :----: | :----: |
| userID | Number |   是   | 用户 ID |

##### 请求示例

```
let MyUser = new BaaS.User()
let userID = 36395395
MyUser.get(userID).then((res) => {
  // success
}, (err) => {
  // err
})
```

##### 返回字段说明

一般情况下，返回字段为 id, avatar, nickname 这三个系统字段和用户自定义字段，如果 userID 等于当前用户的 id ，即查询当前用户信息，则会额外输出 city, country, gender, language, openid, province 这几个字段, 如下：

非当前用户：
```
{
  avatar: "https://media.ifanrusercontent.com/media/tavatar/9a/1d/9a1db7592d6a325a845548f2fecbfb4516e138d0.jpg",
  id: 36395394,
  nickname: "hip hop man",
}
```

当前用户：
```
{
  avatar: "https://media.ifanrusercontent.com/media/tavatar/9a/1d/9a1db7592d6a325a845548f2fecbfb4516e138d0.jpg",
  city: "Guangzhou",
  country: "China",
  gender: 1,
  id: 36395394,
  language: "en",
  nickname: "hip hop man",
  openid: "oXUfx0HKez4qLqgX-XSwLCpiBYS9",
  province: "Guangdong"
}
```