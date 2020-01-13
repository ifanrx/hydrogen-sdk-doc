# 校验器

校验器用于数据操作时校验操作的合法性，是对数据表 ACL 权限的自定义校验。
数据表关联了校验器后，在进行数据操作时，后台会会调用该校验器进行校验。
校验器通过返回 `true`、`false` 或抛出错误来对操作合法性做出评判。

> **info**
> “校验器”与“云函数”使用同一个“云函数”引擎，但使用场景并不一样，
> **不要在“校验器”中包含跟数据校验无关的业务代码**。

**返回说明**

| 返回           | 说明                                |
| :------------  | :---------------------------------- |
| `true`         | 合法操作                            |
| `false`        | 非法操作（未提供拒绝理由）          |
| `<Error>`      | 非法操作（Error.message 为拒绝理由）|

**代码示例**

允许所有操作（数据表未设置校验器时的默认行为）：

```js
BaaS.useVersion('v3')
exports.main = async function (event) {
  return true
}
```

拒绝所有操作：

```js
BaaS.useVersion('v3')
exports.main = async function (event) {
  return false
}
```

拒绝所有操作，并返回拒绝理由：

```js
BaaS.useVersion('v3')
exports.main = async function (event) {
  throw Error('非法操作')
}
```

## 使用场景

校验器的使用场景主要分为以下几个方面：

- 对数据表操作方法进行校验（`create`、`update`、`delete`、`bulk_create`、`bulk_update`、`bulk_delete`等）
- 对操作者进行校验
- 对用户传入数据 -- `payload` 进行校验

## 校验

校验器的 event.data 参数中，包含了触发该校验器的数据操作的详细信息，校验器可以对这些信息进行校验，最终给出判定。

**`event.data`说明**

| 属性        | 类型   | 说明                                 |
| :---------- | :----- | :----------------------------------- |
| event       | String | 触发事件类型，包括：`create`、`update`、`delete`、`bulk_create`、`bulk_update`、`bulk_delete` |
| schema_id   | String | 校验器关联的数据表 ID                |
| schema_name | String | 校验器关联的数据表名称               |
| user_id     | String | 触发事件的用户 ID                    |
| payload     | Object | 用户传入数据，`delete`/`bulk_delete` 事件中不包含该参数 |
| before      | Object | 原始数据，`create`/`bulk_create`/`bulk_update`/`bulk_delete` 事件中不包含该参数 |
| filter      | Object | 用户筛选条件，仅 `bulk_update`/`bulk_delete` 包含该参数 |

`event.data.event` 说明：

| 属性          | 说明     |
| :------------ | :------- |
| `create`      | 创建     |
| `update`      | 更新     |
| `delete`      | 删除     |
| `bulk_create` | 批量创建 |
| `bulk_update` | 批量更新 |
| `bulk_delete` | 批量删除 |

### 拒绝所有操作/允许所有操作

请参照上文示例。

### 对数据表操作方法进行校验

校验器中默认所有操作方法都是打开的，如果需要关闭某个或某写方法的操作权限，
只需要判断操作方法并返回 `false` 即可。

**代码示例**

不返回拒绝理由：

```js
BaaS.useVersion('v3')
const whitelist = ['create', 'update']
exports.main = async function (event) {
  return whitelist.includes(event.data.event)
}
```

返回拒绝理由：

```js
BaaS.useVersion('v3')
const whitelist = ['create', 'update']
exports.main = async function (event) {
  if (!whitelist.includes(event.data.event)) {
    throw Error(`不允许 ${event.data.event} 操作`)
  }
  return true
}
```

### 对操作者进行校验

对操作者进行验证与数据表操作方法验证类似，判定并返回判定结果即可。

**代码示例**

不返回拒绝理由：

```js
BaaS.useVersion('v3')
const whitelist = ['1001', '1002']
exports.main = async function (event) {
  return whitelist.includes(event.data.user_id)
}
```

返回拒绝理由：

```js
BaaS.useVersion('v3')
const whitelist = ['1001', '1002']
exports.main = async function (event) {
  if (!whitelist.includes(event.data.user_id)) {
    throw Error(`用户 ${event.data.user_id} 无操作权限`)
  }
  return true
}
```

### 对用户传入数据进行校验

对用户传入数据进行校验时，一般是通过与更新前的数据进行对比，或通过数据查询，判定操作是否合法。

**代码示例**

不返回拒绝理由：

```js
BaaS.useVersion('v3')
exports.main = async function (event) {
  return !(event.data.before.status === '已过期' && event.data.payload.status === '已取消')
}
```

返回拒绝理由：

```js
BaaS.useVersion('v3')
exports.main = async function (event) {
  if (event.data.before.status === '已过期' && event.data.payload.status === '已取消') {
    throw Error('已过期的订单不可取消')
  }
  return true
}
```

### 综合校验

SDK 提供了 Validator 类来做更加复杂、定制化的校验。

- `Validator(event, handlers)` 创建 Validator 对象
- `Validator#validate` 执行校验

**参数说明**

| 属性      | 类型   | 必填 | 说明 |
| :-------- | :----- | :--- | :--- |
| event     | Object |  是  | 云函数 event 参数 |
| handlers  | Handlers |  是  | 数据表操作 handler 集合 |

Handlers:

```js
interface Handlers {
  [key: string]: (data: typeof event.data) => boolean
}
```

- `event.data` 的数据结构，请参照上文。
- `key` 的规则是：`'on_'` + 操作事件名，再转化为 CamelCase。例如：`onCreate`、`onBulkCreate`。

> **info**
> 某个事件的 handler 如果未定义，默认返回 true。

**使用方法：**

1. 创建 Validator 对象

  `const validator = new Validator(event, handlers)`

2. 执行校验并返回结果

  `return validator.validate()`

**代码示例**

在下面例子的 handler 中使用自定义逻辑代替 `return true` 即可。

```js
BaaS.useVersion('v3')
exports.main = async function (event) {
  const handlers = {
    async onCreate(data) {
      return true
    },
    async onUpdate(data) {
      return true
    },
    async onDelete(data) {
      return true
    },
    async onBulkCreate(data) {
      return true
    },
    async onBulkUpdate(data) {
      return true
    },
    async onBulkDelete(data) {
      return true
    },
  }
  const validator = new BaaS.Validator(event, handlers)
  return validator.validate()
}
```

