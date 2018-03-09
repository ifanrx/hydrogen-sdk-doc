# 用户组操作

## 获取用户组详情

**接口**

`GET https://cloud.minapp.com/userve/v1/user-group/:group_id/`

其中 `:group_id` 需替换为你的用户组 ID

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.get('https://cloud.minapp.com/userve/v1/user-group/47/').then(res => {
  console.log(res.data)
})
```

**返回示例**

```json
{
  "id": 47,
  "members": 0,
  "name": "User Group",
  "parent": {
    "id": 1,
    "name": "Super Group"
  }
}
```

`members` 表示在用户组下的用户数量，`parent` 表示用户组的组集


## 获取用户组列表

**接口**

`GET https://cloud.minapp.com/userve/v1/user-group/`

**参数说明**

| 参数       | 类型   | 必填 | 说明 |
| :---------| :----- | :-- | :-- |
| parent_id | String | N   | 用户组的组集 ID |
| limit     | Number | N   | 限制返回资源的个数，默认为 20 条，最大可设置为 1000 |
| offset    | Number | N   | 设置返回资源的起始偏移值，默认为 0 |

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.get('https://cloud.minapp.com/userve/v1/user-group/').then(res => {
  console.log(res.data)
})
```

## 创建用户组

**接口**

`POST https://cloud.minapp.com/userve/v1/user-group/`

**参数说明**

Content-Type: `application/json`

| 参数    | 类型   | 必填 | 说明 |
| :----- | :----- | :-- | :-- |
| name   | String | Y   | 用户组的名称 |
| parent | String | N   | 组集 ID |

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.post('https://cloud.minapp.com/userve/v1/user-group/', {name: 'User Group'}).then(res => {
  console.log(res.data)
})
```

**状态码说明**

`201` 写入成功


## 修改用户组

**接口**

`PUT https://cloud.minapp.com/userve/v1/user-group/:group_id/`

其中 `:group_id` 需替换为你的用户组 ID

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.put('https://cloud.minapp.com/userve/v1/user-group/47/', {name: "user group"}).then(res => {
  console.log(res.data)
})
```

**状态码说明**

`200` 修改成功


## 删除用户组

**接口**

`DELETE https://cloud.minapp.com/userve/v1/user-group/:group_id/`

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.delete('https://cloud.minapp.com/userve/v1/user-group/47/').then(res => {
  console.log(res.data)
})
```

**状态码说明**

`204` 删除成功


## 批量删除用户组

**接口**

`DELETE https://cloud.minapp.com/userve/v1/user-group/?id__in=:group_id,group1_id`

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.delete('https://cloud.minapp.com/userve/v1/user-group/', {
  params: {
    id__in: '48,50'
  }
}).then(res => {
  console.log(res.data)
})
```

**状态码说明**

`204` 删除成功
