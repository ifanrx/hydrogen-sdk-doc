# 校验器

校验器用于数据操作时校验操作的合法性，是对数据表 ACL 权限的自定义校验。
数据表关联了校验器后，在进行数据操作时，后台会调用该校验器进行校验。
校验器通过返回 `true`、`false` 或抛出错误来对操作合法性做出评判。

校验器的使用场景主要分为以下几个方面：

- 对数据表操作方法进行校验（`create`、`update`、`delete`、`bulk_create`、`bulk_update`、`bulk_delete`等）
- 对操作者进行校验
- 对用户传入数据—— `payload` 进行校验

## 快速开始

只需两步，即可成功创建校验器：

1. 在控制台数据表中创建校验器 [查看文档](/dashboard/basic-services/schema.md#校验器)。
2. 校验器创建成功后，进入编辑页面，只需要在默认提供的校验器模版代码对应的 handler 如 onCreate 中加入判定逻辑即可，校验器模版代码如下。

  ```js
  BaaS.useVersion('v3.4')
  exports.main = async function (event) {
    const handlers = {
     /**
      * handler 会在对应的操作事件中被触发，请在下方对应的事件 handler 如 onCreate 中添加判定逻辑并修改返回值。
      *
      * <<输入>>:
      * | 属性        | 类型   | 说明                                                                                          |
      * | :---------- | :----- | :-------------------------------------------------------------------------------------------- |
      * | event       | String | 触发事件类型，包括：`create`、`update`、`delete`、`bulk_create`、`bulk_update`、`bulk_delete` |
      * | schema_id   | String | 校验器关联的数据表 ID                                                                         |
      * | schema_name | String | 校验器关联的数据表名称                                                                        |
      * | user_id     | String | 触发事件的用户 ID                                                                             |
      * | payload     | Object | 用户传入数据，`delete`/`bulk_delete` 事件中不包含该参数                                       |
      * | before      | Object | 原始数据，`create`/`bulk_create`/`bulk_update`/`bulk_delete` 事件中不包含该参数               |
      * | filter      | Object | 用户筛选条件，仅 `bulk_update`/`bulk_delete` 包含该参数                                       |
      *
      * <<输出>>:
      * 返回 true 为 “验证通过”
      * 返回 false 为 “验证不通过（未提供理由）”
      * 抛出 Error 为 “验证不通过（Error.message 为理由）”
      *
      * <<举例>>:
      * return data.user_id == 1001 // 只允许 ID 为 1001 的用户进行操作
      * 或者:
      * if (data.user_id == 1001) {
      *   return true
      * } else {
      *   throw Error(`用户 ${data.user_id} 无操作权限`)
      * }
      */
      async onCreate(data) {
        // “创建”操作时触发，
        return true
      },
      async onUpdate(data) {
        // “更新”操作时触发
        return true
      },
      async onDelete(data) {
        // “删除”操作时触发
        return true
      },
      async onBulkCreate(data) {
        // “批量创建”操作时触发
        return true
      },
      async onBulkUpdate(data) {
        // “批量更新”操作时触发
        return true
      },
      async onBulkDelete(data) {
        // “批量删除”操作时触发
        return true
      },
    }
    const validator = new BaaS.Validator(handlers)
    return validator.validate(event)
  }
  ```

**使用示例**

下方是一个完整的校验器例子，实现了以下规则：

  - 所有用户可以创建订单
  - 只允许用户 1001 删除订单
  - 禁止了批量创建、批量更新、批量删除
  - 禁止取消已过期订单

```js
BaaS.useVersion('v3.4')
exports.main = async function (event) {
  const handlers = {
    async onCreate(data) {
      return true
    },
    async onUpdate(data) {
      if (event.data.before.status === '已过期' && event.data.payload.status === '已取消') {
        throw Error('已过期的订单不可取消')
      }
      return true
    },
    async onDelete(data) {
      if (data.user_id == 1001) {
        return true
      } else {
        throw Error(`用户 ${data.user_id} 无操作权限`)
      }
    },
    async onBulkCreate(data) {
      return false
    },
    async onBulkUpdate(data) {
      return false
    },
    async onBulkDelete(data) {
      return false
    },
  }
  const validator = new BaaS.Validator(handlers)
  return validator.validate(event)
}
```

## Validator

SDK 提供了 `Validator` 类来帮助开发者快速实现校验器。

> **info**
> SDK >= v3.4。

- **`Validator(handlers)`** 创建 Validator 对象
- **`Validator#validate(event)`** 执行校验

<!-- Validator 还支持使用 setter 来设置 handler，例如： -->
<!--  -->
<!-- ```js -->
<!-- const validator = new Validator(event) -->
<!-- validator.onCreate = async () => false -->
<!-- ``` -->

**参数说明**

| 属性      | 类型   | 必填 | 说明 |
| :-------- | :----- | :--- | :--- |
| handlers  | Handlers |  是  | 数据表操作 handler 集合 |
| event     | Object |  是  | 云函数 event 参数 |

Handlers:

```js
interface Handlers {
  [key: string]: (data: typeof event.data) => boolean
}
```

- `event.data` 的数据结构，请参照 [event.data 说明](#eventdata说明) 。
- `key` 的规则是：`'on_'` + 操作事件名，再转化为 CamelCase。例如：`onCreate`、`onBulkCreate`。

> **info**
> 某个操作事件的 handler 如果未定义，默认返回 true。

**使用方法：**

1. 创建 Validator 对象

  `const validator = new Validator(handlers)`

2. 执行校验并返回结果

  `return validator.validate(event)`

**代码示例**

参考上文。

## 高阶使用

除了直接使用 Validator 类，开发者还可用自定义逻辑实现校验器。

### `event.data`说明

校验器的 `event.data` 参数中，包含了触发该校验器的数据操作的详细信息，校验器可以对这些信息进行校验，最终给出判定。

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

### 返回说明

| 返回           | 说明                                |
| :------------  | :---------------------------------- |
| `true`         | 合法操作，校验通过                              |
| `false`        | 非法操作，校验不通过（未提供拒绝理由）          |
| `<Error>`      | 非法操作，校验不通过（Error.message 为拒绝理由）|

### 拒绝所有操作/允许所有操作

校验器直接返回判定结果。

**代码示例**

不返回拒绝理由：

```js
BaaS.useVersion('v3.4')
exports.main = async function (event) {
  return false
}
```

返回拒绝理由：

```js
BaaS.useVersion('v3.4')
exports.main = async function (event) {
  throw '数据表已锁定，不允许任何操作'
}
```

### 对数据表操作方法进行校验

校验器中默认所有操作方法都是打开的，如果需要关闭某个或某写方法的操作权限，
只需要判断操作方法并返回 `false` 即可。

**代码示例**

不返回拒绝理由：

```js
BaaS.useVersion('v3.4')
const whitelist = ['create', 'update']
exports.main = async function (event) {
  return whitelist.includes(event.data.event)
}
```

返回拒绝理由：

```js
BaaS.useVersion('v3.4')
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
BaaS.useVersion('v3.4')
const whitelist = [1001, 1002]
exports.main = async function (event) {
  return whitelist.includes(event.data.user_id)
}
```

返回拒绝理由：

```js
BaaS.useVersion('v3.4')
const whitelist = [1001, 1002]
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
BaaS.useVersion('v3.4')
exports.main = async function (event) {
  return !(event.data.before.status === '已过期' && event.data.payload.status === '已取消')
}
```

返回拒绝理由：

```js
BaaS.useVersion('v3.4')
exports.main = async function (event) {
  if (event.data.before.status === '已过期' && event.data.payload.status === '已取消') {
    throw Error('已过期的订单不可取消')
  }
  return true
}
```

## 注意事项

1. “校验器”与“云函数”使用同一个“云函数”引擎，但使用场景并不一样，
**不要在“校验器”中包含跟数据校验无关的业务代码**。

2. 由于 JavaScript 函数默认返回 `undefined`，是个 falsy 值，所以校验通过时，**需要明确返回 `true`**。

  例如，下文的代码中，开发者的意图是只禁止 ID 为 1001 的用户创建数据。但实际上，
  所有用户都被禁止操作了。

  ```js
  ...
  async onCreate(data) {
    if (data.user_id == 1001) {
      return false
    }
  },
  ...
  ```

  正确的做法：

  ```js
  ...
  async onCreate(data) {
    if (data.user_id == 1001) {
      return false
    }
    return true
  },
  ...
  ```

