# 组集操作

## 获取组集详情

**接口**

`GET https://cloud.minapp.com/userve/v1/user-supergroup/:group_id/`

其中 `:group_id` 需替换为你的用户组 ID

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.get('https://cloud.minapp.com/userve/v1/user-supergroup/52/').then(res => {
  console.log(res)
})
```

**返回示例**

```json
{
  "children": [
    {
      "id": 51,
      "name": "User Group"
    }
  ],
  "id": 52,
  "name": "Super Group"
}
```


## 获取组集列表

**接口**

`GET https://cloud.minapp.com/userve/v1/user-supergroup/`

**参数说明**

| 参数    | 类型   | 必填 | 说明 |
| :----- | :----- | :-- | :-- |
| limit  | Number | N   | 限制返回资源的个数，默认为 20 条，最大可设置为 1000 |
| offset | Number | N   | 设置返回资源的起始偏移值，默认为 0 |

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.get('https://cloud.minapp.com/userve/v1/user-supergroup/').then(res => {
  console.log(res)
})
```

## 创建组集

**接口**

`POST https://cloud.minapp.com/userve/v1/user-supergroup/`

**参数说明**

Content-Type: `application/json`

| 参数      | 类型   | 必填 | 说明 |
| :--------| :----- | :-- | :-- |
| name     | String | Y   | 组集的名称 |
| children | String | N   | 用户组 ID 列表 |

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.post('https://cloud.minapp.com/userve/v1/user-supergroup/', {name: 'Super Group', children: [51]}).then(res => {
  console.log(res)
})
```

**状态码说明**

`201` 写入成功


## 修改组集

> **danger**
> 该接口会清除掉旧有的组集和用户组的关系，重新与传入的用户组建立关系

**接口**

`PUT https://cloud.minapp.com/userve/v1/user-supergroup/:group_id/`

其中 `:group_id` 需替换为你的用户组 ID

**状态码说明**

`200` 修改成功

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.post('https://cloud.minapp.com/userve/v1/user-supergroup/', {name: 'Super Group', children: [51]}).then(res => {
  console.log(res)
})
```

**返回示例**

```json
{
  "children": [
    {
      "id": 51,
      "name": "User Group"
    }
  ],
  "id": 52,
  "name": "super group 3"
}
```

## 删除组集

**接口**

`DELETE https://cloud.minapp.com/userve/v1/user-supergroup/:group_id/`

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.delete('https://cloud.minapp.com/userve/v1/user-supergroup/52/').then(res => {
  console.log(res)
})
```

**状态码说明**

`204` 删除成功


## 批量删除组集

**接口**

`DELETE https://cloud.minapp.com/userve/v1/user-supergroup/?id__in=:group_id,group1_id`

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.delete('https://cloud.minapp.com/userve/v1/user-supergroup/',{
  params: {
    id__in: '48,50'
  }
}).then(res => {
  console.log(res)
})
```

**状态码说明**

`204` 删除成功
