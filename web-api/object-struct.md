# 用户(user)

### 字段

|        参数       |      类型    |   说明    |
| :--------------- | :----------- | :------- |
| user_id           | Integer      | 用户 ID |
| avatar           | String      | 用户头像 |
| token             | String       | User authentication token |
| expires_in | Integer | 过期时间，为时间戳，单位：秒 |
| _username           | String       | 用户名 |
| _email           | String       | 用户邮件地址 |
| _email_verified       | Boolean | 用户邮件地址是否已经验证 |
| _provider | Object | 用户在平台方的用户信息(见 `v2.0/user/info` 接口)以及其他 _userprofile 表的内置字段及用户自定义字段 |
| _session | Object | Cookies 信息 |
| country | String | 用户所在的国家 |
| province | String | 用户所在的省份 |
| city | String | 用户所在城市 |
| gender | String | 用户的性别，值为 1 时是男性，值为 2 时是女性，值为 0 时是未知 |


### 示例
```json
{
    "_email": "hgzchn@qq.com",
    "_email_verified": false,
    "_provider": {},
    "_session": {
        "ip_address": "183.61.109.***",
        "login_method": "email",
        "session_key": "bdvz5*********mobvqmbsloqj2*****7",
        "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36"
    },
    "avatar": "https://media.ifanrusercontent.com/hydrogen/default_avatar.png",
    "expires_in": 2592000,
    "id": 34719381111111,
    "token": "bdvz5*********mobvqmbsloqj2*****7",
    "user_id": 3471938111111,
    "country": "China",
    "province": "Guangdong",
    "city": "Guangzhou",
    "gender": 1
}
```
