# 本地存储

BaaS 提供本地存储功能，皆为同步方法


## 保存数据

`wx.BaaS.storage.set(key, value)`

如果 storage 里面 `key` 值对应的 `value` 已经存在，执行此函数会覆盖掉原来该 `key` 对应的 `value`

**参数说明**

| 参数   | 类型          | 必填 | 说明 |
| :---- | :------------ | :-- | :-- |
| key   | String        | 是  | 本地存储中指定的 key 值 |
| value | Object/String | 是  | 需要存储的内容 |

**示例代码**

```js
wx.BaaS.storage.set('username', 'lucy')
```

## 获取数据

`wx.BaaS.storage.get(key)`

**参数说明**

| 参数 | 类型   | 必填 | 说明 |
| :-- | :----- | :-: | :-- |
| key | String | 是  | 本地存储中指定的 key 值 |


**示例代码**

```js
wx.BaaS.storage.get('username')
```

> **info**
> BaaS 会给存储的 `key` 添加 `ifx_baas_` 前缀，比如 `key` 为 `username` 时，实际存在小程序本地存储环境的 `key` 为 `ifx_baas_username`，使用以上的 `get` 和 `set` 方法，无需关心这个。如果要获取一个不是通过 `wx.BaaS.storage.set(key, value)` 方法设置的数据时，需要保证该数据的 `key` 是以 `ifx_baas_` 前缀开始的。