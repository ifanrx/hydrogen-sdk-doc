# 字段过滤与扩展

> **danger**
> 该操作适用于 SDK version >= v1.3.0

## 字段过滤

1. ** 使用 select 来控制请求返回的字段 **

  例如：

  `Product.select('created_by')`

  `Product.select(['pointer', 'created_by'])`

2. ** 通过 `select('pointer.attr')` 指定 pointer 展开后只返回 pointer 中的某些字段 (SDK >= 3.6.0) **

  > **info**
  > `pointer` 字段已经设置了 `expand`，该操作才生效，否则会被忽略。
  >
  > `expand` 的使用请参照下文「字段扩展」章节

  例如：

  `Product.expand(['created_by', 'pointer']).select(['created_by.nickname', 'pointer.count'])`

> **info**
> `select('field')` `select(['field_a', 'field_b'])` 为“规定返回”，
>
> `select('-field')` `select(['-field_a', '-field_b'])` 为“规定不返回”，
>
> “规定返回”和“规定不返回”不能同时使用，否则该操作不生效，接口将会直接返回所有字段。


**在 get 方法中使用**

{% ifanrxCodeTabs %}
```js
var Product = new wx.BaaS.TableObject(tableName)
var recordID = 'xxxxxxxx' // 数据行 id

// 规定返回特定字段
Product.select('created_at').get(recordID)
// or
Product.select(['created_at', 'created_by']).get(recordID)

// 规定不返回特定字段
Product.select('-created_at').get(recordID)
// or
Product.select(['-created_at', '-created_by']).get(recordID)
```
{% endifanrxCodeTabs %}

**在 find 方法中使用**

{% ifanrxCodeTabs %}
```js
var Product = new wx.BaaS.TableObject(tableName)

var query = new wx.BaaS.Query()
query.compare('amount', '>', 0)

// 规定返回特定字段
Product.setQuery(query).select('created_at').find()
// or
Product.setQuery(query).select(['created_at', 'created_by']).find()

// 规定不返回特定字段
Product.setQuery(query).select('-created_at').find()
// or
Product.setQuery(query).select(['-created_at', '-created_by']).find()
```
{% endifanrxCodeTabs %}


## 字段扩展

开发者可以通过 expand pointer 来查询该字段的更多信息,返回结果中的 pointer 字段会被替换为这个字段对应的完整的数据行对象。

  使用 expand 来控制 pointer 展开

  例如：

  `Product.expand('created_by')`

  `Product.expand(['pointer', 'created_by'])`

> **info**
> created_by 字段是一个特殊的 pointer，开发者无需配置，默认指向了 _userpofile 表。需 SDK >= v1.3.0 
>
> 用户自定义 pointer 需 SDK >= 1.10.0
>
> 使用 expand 方法会增加一次数据表查询，api call 计费 +1

### expand 返回结果示例

`pointer_value` 为指向其他表的 pointer 类型字段

> **info**
> 未 expand 的情况下，created_by 的值是 int 类型，而其他 pointer 的值是 object

不使用 expand
```json
{
  "created_at": 1516118400,
  "created_by": 62536607,
  "id": "5a2fa9b008443e59e0e67829",
  "name": "小米无线耳机",
  "price": 199,
  "pointer_value": {
    "id": "5a2fa9xxxxxxxxxxxxxx",
    "_table": "table-name"
  }
}
```

使用 expand
```json
{
  "created_at": 1516118400,
  "created_by": {
    "avatar": "https://media.ifanrusercontent.com/tavatar/fb/cd/xxxx.jpg",
    "id": 62536607,
    "nickname": "Larry。"
  },
  "pointer_value": {
    "created_at": 1516118400,
    "name": "123",
    "id": "5a2fa9xxxxxxxxxxxxxx",
    "_table": "table-name"
  },
  "id": "5a2fa9b008443e59e0e67829",
  "name": "小米无线耳机",
  "price": 199
}
```

### 使用方法
**在 get 方法中使用**
{% ifanrxCodeTabs %}
```js
var Product = new wx.BaaS.TableObject(tableName)
Product.expand(['created_by', 'pointer_value']).get('5acc2904da6b737322a82f78')
```
{% endifanrxCodeTabs %}

**在 find 方法中使用**
{% ifanrxCodeTabs %}
```js
var Product = new wx.BaaS.TableObject(tableName)

var query = new wx.BaaS.Query()
query.compare('amount', '>', 0)

// 扩展特定字段
Product.setQuery(query).expand(['created_by', 'pointer_value']).find()
```
{% endifanrxCodeTabs %}
