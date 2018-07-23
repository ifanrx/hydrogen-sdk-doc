# 聚合查询 （Aggregation）

> **info**
> 注意 sdk 1.6 及之后的版本才支持聚合查询功能


## 基本概念
聚合操作主要用于对数据的批量处理，往往将记录按条件分组以后，然后再进行一系列操作，例如，求最大值、最小值、平均值，求和等操作。聚合操作还能够对记录进行复杂的操作，可以用于数理统计和数据挖掘。

### 管道 pipeline
管道在Unix和Linux中一般用于将当前命令的输出结果作为下一个命令的参数。
数据集在一个管道处理完毕后将结果传递给下一个管道处理。管道操作是可以重复的。

### 阶段 stage
一般聚合查询分为多个步骤，每个步骤称为 stage。

例如：aggregation.match(...).count('count') 分为两个 Stage，第一个 Stage 先筛选匹配的数据，第二个 Stage 统计上个操作返回的数据总量。

### 操作符 operator
在 stage 中可以使用 Operator 来对数据进行操作。

例如：aggregation.group({ _id: "$status",totalAmount: {$sum: "$amount"}}) 使用了 $sum 操作符来进行叠加操作，统计所有数据行的 amount 字段总和。

> 这里引用 MongoDB 官方文档的一张图帮助理解 Aggregation :
> ![](https://docs.mongodb.com/manual/_images/aggregation-pipeline.bakedsvg.svg)

## 基础用法

数据源

```javascript
[{
  "amount": 150,
  "created_at": 1531979539,
  "status": "A",
  "updated_at": 1531979539,
}, {
  "amount": 200,
  "created_at": 1531979532,
  "status": "B",
  "updated_at": 1531979532,
}, {
  "amount": 100,
  "created_at": 1531979523,
  "status": "A",
  "updated_at": 1531979523,
}]
```

### 分组（group）

根据 status 分组，并计算 总和，平均数，最大值，最小值，数量
```javascript
let Product = new wx.BaaS.TableObject(tableID)

// 实例化 aggregation 对象
var aggregation = new wx.BaaS.Aggregation()

aggregation.group({
  _id: "$status",
  totalAmount: {$sum: "$amount"},
  avgAmount: {$avg: "$amount"},
  maxAmount: {$max: "$amount"},
  minAmount: {$min: "$amount"},
  count: {$sum: 1}
})

// 应用聚合查询对象
Product.setAggregation(aggregation).find().then(res => {
    // success
}, err => {
    // err
})

```

> **info**
> 注意在操作符中引用到的字段需要添加 $ 前缀

查询结果

```javascript
[ { _id: 'B',
    avgAmount: 200,
    count: 1,
    id: 'B',
    maxAmount: 200,
    minAmount: 200,
    totalAmount: 200 },
  { _id: 'A',
    avgAmount: 125,
    count: 2,
    id: 'A',
    maxAmount: 150,
    minAmount: 100,
    totalAmount: 250 } ]
```


### 随机抽取多条数据（sample）

在数据表中随机抽取 2 条数据
```javascript
let Product = new wx.BaaS.TableObject(tableID)

// 实例化 aggregation 对象
var aggregation = new wx.BaaS.Aggregation()

aggregation.sample(2)

// 应用聚合查询对象
Product.setAggregation(aggregation).find().then(res => {
    // success
}, err => {
    // err
})

```
结果
```javascript
[{
  "amount": 150,
  "created_at": 1531979539,
  "status": "A",
  "updated_at": 1531979539,
}, {
  "amount": 200,
  "created_at": 1531979532,
  "status": "B",
  "updated_at": 1531979532,
}]
```

### 计数（count）

统计数据表中一共有多少条数据
```javascript
let Product = new wx.BaaS.TableObject(tableID)

// 实例化 aggregation 对象
var aggregation = new wx.BaaS.Aggregation()

aggregation.count('count')

// 应用聚合查询对象
Product.setAggregation(aggregation).find().then(res => {
    // success
}, err => {
    // err
})

```
结果
```javascript
{count: 3}
```

## 进阶

目前开放了如下 stage

- match
- group
- project
- sample
- count
- *skip*
- *limit* 
- *sort* 

skip、limit、sort 不能直接使用在 pipeline 中，而是通过 TableObject 的 offset()、limit()、orderBy() 来 方法来实现，对应关系如下

| TableObject 方法   | stage |
|:------------------ |:-------|
| limit              | limit  |
| order_by           | sort  |
| offset             | skip  |

它们在 pipeline 中的顺序为 order_by → offset → limit。
offset 的默认值为 0，limit 默认值为 20

> **info**
> 目前限制 stage 数量最多为 2 个。（skip、sort、limit 不计入总数）


目前开放了如下 operator

- sum
- avg
- max
- min
- size (用于数组)
- add
- subtract
- multiply
- divide

### match( queryInstance )

可以用于筛选数据

#### 参数说明
- queryInstance：wx.BaaS.Query 的实例 

#### 示例

数据源

```javascript
[{
  "amount": 150,
  "created_at": 1531979539,
  "status": "A",
  "updated_at": 1531979539,
}, {
  "amount": 200,
  "created_at": 1531979532,
  "status": "B",
  "updated_at": 1531979532,
}, {
  "amount": 100,
  "created_at": 1531979523,
  "status": "A",
  "updated_at": 1531979523,
}]
```
查询 status == "A" 的数据行

```javascript
let Product = new wx.BaaS.TableObject(tableID)

// 实例化 aggregation 对象
var aggregation = new wx.BaaS.Aggregation()
// 实例化查询对象
var query = new wx.BaaS.Query()

// 设置查询条件
query.compare('status', '=', 'A')
aggregation.match(query)

// 应用聚合查询对象
Product.setAggregation(aggregation).find().then(res => {
    // success
}, err => {
    // err
})

```
查询结果

```javascript
[{
  "amount": 150,
  "created_at": 1531979539,
  "status": "A",
  "updated_at": 1531979539,
}, {
  "amount": 100,
  "created_at": 1531979523,
  "status": "A",
  "updated_at": 1531979523,
}]
```

> **info**
> 当TableObject 设置了 aggregation 时，将会忽略 setQuery 设置的查询参数。

[MongoDB 文档参考](https://docs.mongodb.com/manual/reference/operator/aggregation/match/)

### group( expression )
将集合中的文档分组，可用于统计结果。

#### 可用操作符

- sum
- avg
- max
- min

#### 示例

参考基础用法的示例 [分组（group）](#分组（group）)

[MongoDB 文档参考](https://docs.mongodb.com/manual/reference/operator/aggregation/group/)

### project( expression )

可以实现以下效果

- 控制字段的显示隐藏
- 在返回的结果中添加新的字段


#### 可用操作符
- sum
- avg
- max
- min
- size
- add
- subtract
- multiply
- divide


#### 示例

数据源

```javascript
[{
  "amount": 100,
  "amount_2": 20000,
  "created_at": 1531979520,
  "created_by": 3,
  "items": [111, 222, 333],
  "status": "A",
  "updated_at": 1532067374,
}, {
  "amount": 200,
  "amount_2": 30000,
  "created_at": 1531979520,
  "created_by": 3,
  "items": [444, 555, 666],
  "status": "B",
  "updated_at": 1532067386,
}, {
  "amount": 150,
  "amount_2": 10000,
  "created_at": 1531979520,
  "created_by": 3,
  "items": [123, 456, 789],
  "status": "A",
  "updated_at": 1532067362,
}]
```

```javascript

let Product = new wx.BaaS.TableObject(tableID)

// 实例化 aggregation 对象
var aggregation = new wx.BaaS.Aggregation()
// 实例化查询对象
aggregation.project({
    _id: false, // 隐藏 id 字段
    status: true, // 显示 status 字段
    newFields: ['$created_by', '$created_at'],  // 在结果中生成新的字段
    size: {$size: '$items'}, // 计算 数组类型字段的长度
    divide: {
      $divide: ['$amount', {$size: '$items'}]  // 除法
    },
    add: {
      $add: ['$amount', '$amount_2']           // 加法
    },
    sum: {
      $sum: "$items"                           // 计算数组元素总和
    },
    subtract: {
      $subtract: ['$amount', '$amount_2']     // 减法
    }
  }
)

// 应用聚合查询对象
Product.setAggregation(aggregation).find().then(res => {
    // success
}, err => {
    // err
})

```
结果
```javascript
[ { add: 20100,
    divide: 33.333333333333336,
    newFields: [ 3, 1531979520 ],
    size: 3,
    status: 'A',
    subtract: -19900,
    sum: 666 },
  { add: 30200,
    divide: 66.66666666666667,
    newFields: [ 3, 1531979520 ],
    size: 3,
    status: 'B',
    subtract: -29800,
    sum: 1665 },
  { add: 10150,
    divide: 50,
    newFields: [ 3, 1531979520 ],
    size: 3,
    status: 'A',
    subtract: -9850,
    sum: 1368 } ]
```

[MongoDB 文档参考](https://docs.mongodb.com/manual/reference/operator/aggregation/project/)

### sample ( size )
随机抽取 size 条数据

#### 参数说明

- size：数量

#### 示例

数据源

```javascript
[{
  "amount": 150,
  "created_at": 1531979539,
  "status": "A",
  "updated_at": 1531979539,
}, {
  "amount": 200,
  "created_at": 1531979532,
  "status": "B",
  "updated_at": 1531979532,
}, {
  "amount": 100,
  "created_at": 1531979523,
  "status": "A",
  "updated_at": 1531979523,
}, {
    "amount": 101,
    "created_at": 1531979523,
    "status": "A",
    "updated_at": 1531979523,
}, {
     "amount": 102,
     "created_at": 1531979523,
     "status": "A",
     "updated_at": 1531979523,
}]
```

查找 status 为 A 的数据行，再随机抽取 2 条记录

```javascript
let Product = new wx.BaaS.TableObject(tableID)

// 实例化 aggregation 对象
var aggregation = new wx.BaaS.Aggregation()
// 实例化查询对象
var query = new wx.BaaS.Query()

// 设置查询条件
query.compare('status', '=', 'A')
aggregation.match(query).sample(2)

// 应用聚合查询对象
Product.setAggregation(aggregation).find().then(res => {
    // success
}, err => {
    // err
})
```

结果

```javascript
[{
    "amount": 101,
    "created_at": 1531979523,
    "status": "A",
    "updated_at": 1531979523,
}, {
     "amount": 102,
     "created_at": 1531979523,
     "status": "A",
     "updated_at": 1531979523,
}]
```

[MongoDB 文档参考](https://docs.mongodb.com/manual/reference/operator/aggregation/sample/)

### count( outputFieldName )

统计数据的数量

#### 参数说明

- outputFieldName：输出的字段名

数据源

```javascript
[{
  "amount": 150,
  "created_at": 1531979539,
  "status": "A",
  "updated_at": 1531979539,
}, {
  "amount": 200,
  "created_at": 1531979532,
  "status": "B",
  "updated_at": 1531979532,
}, {
  "amount": 100,
  "created_at": 1531979523,
  "status": "A",
  "updated_at": 1531979523,
}, {
    "amount": 101,
    "created_at": 1531979523,
    "status": "A",
    "updated_at": 1531979523,
}, {
     "amount": 102,
     "created_at": 1531979523,
     "status": "A",
     "updated_at": 1531979523,
}]
```

查找 status 为 A 的数据行，并统计数据量
```javascript
let Product = new wx.BaaS.TableObject(tableID)

// 实例化 aggregation 对象
var aggregation = new wx.BaaS.Aggregation()
// 实例化查询对象
var query = new wx.BaaS.Query()

// 设置查询条件
query.compare('status', '=', 'A')
aggregation.match(query).count('count')

// 应用聚合查询对象
Product.setAggregation(aggregation).find().then(res => {
    // success
}, err => {
    // err
})
```

结果

```javascript
{ count: 4 }
```

[MongoDB 文档参考](https://docs.mongodb.com/manual/reference/operator/aggregation/count/)


### skip

使用 TableObject 的 offset 方法

数据源

```javascript
[{
  "amount": 150,
  "created_at": 1531979539,
  "status": "A",
  "updated_at": 1531979539,
}, {
  "amount": 200,
  "created_at": 1531979532,
  "status": "B",
  "updated_at": 1531979532,
}, {
  "amount": 100,
  "created_at": 1531979523,
  "status": "A",
  "updated_at": 1531979523,
}]
```

```javascript
let Product = new wx.BaaS.TableObject(tableID)

// 实例化 aggregation 对象
var aggregation = new wx.BaaS.Aggregation()
// 实例化查询对象
var query = new wx.BaaS.Query()

// 设置查询条件
query.compare('status', '=', 'A')
aggregation.match(query)

// 应用聚合查询对象
Product.setAggregation(aggregation)
.offset(1)  // skip 1
.find().then(res => {
    // success
}, err => {
    // err
})
```
结果

```javascript
[{
  "amount": 100,
  "created_at": 1531979523,
  "status": "A",
  "updated_at": 1531979523,
}]
```

[MongoDB 文档参考](https://docs.mongodb.com/manual/reference/operator/aggregation/skip/)

### sort

使用 TableObject 的 orderBy 方法

数据源

```javascript
[ { _id: '5b50270c1c597b00179e9f69',
    amount: 200,
    amount_2: 30000,
    created_at: 1531979520,
    created_by: 3,
    id: '5b50270c1c597b00179e9f69',
    items: [ 444, 555, 666 ],
    read_perm: [ 'user:*' ],
    status: 'B',
    updated_at: 1532067386,
    write_perm: [ 'user:*' ] },
  { _id: '5b5027041c597b00179e9f68',
    amount: 100,
    amount_2: 20000,
    created_at: 1531979520,
    created_by: 3,
    id: '5b5027041c597b00179e9f68',
    items: [ 111, 222, 333 ],
    read_perm: [ 'user:*' ],
    status: 'A',
    updated_at: 1532067374,
    write_perm: [ 'user:*' ] },
  { _id: '5b5027131c597b00179e9f6a',
    amount: 150,
    amount_2: 10000,
    created_at: 1531979520,
    created_by: 3,
    id: '5b5027131c597b00179e9f6a',
    items: [ 123, 456, 789 ],
    read_perm: [ 'user:*' ],
    status: 'A',
    updated_at: 1532067362,
    write_perm: [ 'user:*' ] } ]
```


```javascript
let Product = new wx.BaaS.TableObject(tableID)

// 实例化 aggregation 对象
var aggregation = new wx.BaaS.Aggregation()
// 实例化查询对象
var query = new wx.BaaS.Query()

// 设置查询条件
query.compare('status', '=', 'A')
aggregation.match(query).count('count')

// 应用聚合查询对象
Product.setAggregation(aggregation)
.orderBy('-updated_at') // 根据更新时间升序排列，越早更新的排的越前
.find()
.then(res => {
    // success
}, err => {
    // err
})
```
结果

```javascript
[ { _id: '5b5027041c597b00179e9f68',
    amount: 100,
    amount_2: 20000,
    created_at: 1531979520,
    created_by: 3,
    id: '5b5027041c597b00179e9f68',
    items: [ 111, 222, 333 ],
    status: 'A',
    updated_at: 1532067374 },
  { _id: '5b5027131c597b00179e9f6a',
    amount: 150,
    amount_2: 10000,
    created_at: 1531979520,
    created_by: 3,
    id: '5b5027131c597b00179e9f6a',
    items: [ 123, 456, 789 ],
    status: 'A',
    updated_at: 1532067362 } ]
```
[MongoDB 文档参考](https://docs.mongodb.com/manual/reference/operator/aggregation/sort/)

### limit

使用 TableObject 的 limit 方法

数据源

```javascript
[{
  "amount": 150,
  "created_at": 1531979539,
  "status": "A",
  "updated_at": 1531979539,
}, {
  "amount": 200,
  "created_at": 1531979532,
  "status": "B",
  "updated_at": 1531979532,
}, {
  "amount": 100,
  "created_at": 1531979523,
  "status": "A",
  "updated_at": 1531979523,
}]
```

```javascript
let Product = new wx.BaaS.TableObject(tableID)

// 实例化 aggregation 对象
var aggregation = new wx.BaaS.Aggregation()
// 实例化查询对象
var query = new wx.BaaS.Query()

// 设置查询条件
query.compare('status', '=', 'A')
aggregation.match(query)

// 应用聚合查询对象
Product.setAggregation(aggregation)
.limit(1)  // limit 1 限制返回数只有一个
.find().then(res => {
    // success
}, err => {
    // err
})
```
结果

```javascript
[{
   "amount": 150,
   "created_at": 1531979539,
   "status": "A",
   "updated_at": 1531979539,
}]
```

[MongoDB 文档参考](https://docs.mongodb.com/manual/reference/operator/aggregation/limit/)

