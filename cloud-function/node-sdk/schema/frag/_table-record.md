
# {{apiPrefix}}BaaS.TableRecord 类

每个 TableRecord 实例对应一个或多个数据行，通过 TableRecord 实例，你可以创建 / 更新数据行。

## 初始化

TableRecord 实例由 {{apiPrefix}}BaaS.TableObject 创建，开发者不应该自通过 new 操作自己创建实例。

## 实例方法

### set(args | (key, value))

set 支持两种传参格式。如果第一个参数是 object 类型，则会采用对象的格式进行赋值。两种传参格式二选一。


| 参数名     | 类型    | 说明                                 |
|-----------|---------|-------------------------------------|
| args       | object |使用对象的格式来设置内容                |
| key, value | /      |使用 record.set('name', 'ifanrx') 的格式来设置内容           |


**返回值**

this，即当前 TableRecord 实例

### incrementBy(key, value)

对数字类型的字段进行原子性增减操作。当请求同时对一个数据进行增减时，原子性使得冲突和覆盖导致的数据不正确的情况不会出现。

**参数说明**

| 参数   | 类型              | 必填 | 说明 |
| :---- | :---------------- | :-- | :-- |
| key   | String            | 是  | 在数据表中的类型必须是 Number 或 Integer |
| value | Number 或 Integer | 是  | 与 key 的类型保持一致 |

**返回值**

this，即当前 TableRecord 实例

### append(key, value)

数组原子性更新，将 *待插入的数组* 加到原数组末尾

**参数说明**

| 参数   | 类型                | 必填 | 说明 |
| :---- | :------------------ | :-- | :--- |
| key   | String              | 是  | 在数据表中的类型必须是 Array |
| value | Array 或 Array item | 是  | - |


**返回值**

this，即当前 TableRecord 实例

### uAppend(key, value)

数组原子性更新，将 *待插入的数组* 中不包含在原数组的数据加到原数组末尾

**参数说明**

| 参数   | 类型                | 必填 | 说明 |
| :---- | :------------------ | :-- | :-- |
| key   | String              | 是  | 在数据表中的类型必须是 Array |
| value | Array 或 Array item | 是   | - |


**返回值**

this，即当前 TableRecord 实例

### remove(key, value)

数组原子性更新，从原数组中删除指定的值

**参数说明**

| 参数   | 类型                | 必填 | 说明 |
| :---- | :------------------ | :-  | :-- |
| key   | String              | 是  | 在数据表中的类型必须是 Array |
| value | Array 或 Array item | 是  | - |

**返回值**

this，即当前 TableRecord 实例

### patchObject(key, value)

Object 的原子性更新，修改 Object 的指定字段。

**参数说明**

| 参数   | 类型                | 必填 | 说明 |
| :---- | :------------------ | :-  | :-- |
| key   | String              | 是  | 在数据表中的类型必须是 Object |
| value | Object              | 是  | 更新的对象 |


**返回值**

this，即当前 TableRecord 实例

### save()
执行创建动作

**参数说明**
无

**返回值**

`Promise<ResObject>`

ResObject 结构如下:

```json
{
  {% if apiPrefix %}"statusCode": 201,{% else %}"status": 201,{% endif %}
  "data": {}
}
```

### update(opts)
执行更新动作

**参数说明**

| 参数名    | 类型    | 说明              |
|-----------|---------|-------------------|
| opts.enableTrigger | boolean | 是否触发触发器，默认为 true。  {% if apiPrefix %}{% endif %}          |

**返回值**

`Promise<ResObject>`

ResObject 结构如下:

```json
{
  {% if apiPrefix %}"statusCode": 201,{% else %}"status": 201,{% endif %}
  "data": {}
}
```
