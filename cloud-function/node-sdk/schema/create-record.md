# 新增数据记录

## 操作步骤

1.通过 `数据表名` 实例化一个 `TableObject` 对象，操作该对象即相当于操作对应的数据表 

`let MyTableObject = new BaaS.TableObject(tableName)`

**参数说明**


| 参数名    | 类型    | 说明                                 |
|-----------|---------|--------------------------------------|
| tableName | string  | 数据表名                             |

2.本地创建一条空记录

`let MyRecord = MyTableObject.create()`

3.为上面创建的空记录赋值

`MyRecord.set(data)`

该方法支持两种类型的赋值操作：

a.一次性赋值：

```js
MyRecord.set({
  key1: value1,
  key2: value2
})
```

b.逐个赋值

```js
MyRecord.set(key1, value1)
MyRecord.set(key2, value2)
```

> **info**
> 对同一字段进行多次 `set` 操作，后面的数据会覆盖掉前面的数据

4.将创建的记录保存到服务器

`MyRecord.save()`

通过上面的四个步骤，即完成了一条记录的插入，具体操作阅读以下内容。

## 添加普通数据

**请求示例**

```js
// 向 tableName 为 product 的数据表插入一条记录
let tableName = 'product'
let Product = new BaaS.TableObject(tableName)
let product = Product.create()

// 设置方式一
let apple = {
  name: 'apple',
  price: 1,
  desc: ['good'],
  amount: 0
}
product.set(apple).save().then(res => {
  // success
  console.log(res)  
}, err => {
  // error
})

// 设置方式二
product.set('name', 'apple')
product.set('price', 1)
product.set('desc', ['good'])
product.set('amount', 0)

product.save().then(res => {
  // success
  console.log(res)  
}, (err) => {
  // error
})
```

**返回示例** 

then 回调中的 res 对象结构如下，其中 res.data 为新增的数据行：

```json
{
  "status": 201,
  "data": {
    "_id": "59a3c2b5afb7766a5ec6e84e",
    "amount": 0,
    "created_at": 1503904437,
    "created_by": 36395395,
    "desc": ["good"],
    "id": "59a3c2b5afb7766a5ec6e84e",
    "name": "apple",
    "price": 1.0,
    "read_perm": ["user:*"],
    "updated_at": 1503904437,
    "write_perm": ["user:*"]
  }
}
```

> **info**
> 对于不合法的数据，知晓云会进行过滤，比如开发者尝试在 integer 类型的字段写入 string 类型的数据，该操作不会报错而是会忽略对该字段的修改。
> 因此可以检查 res.data 中对应的字段来判断某些字段是否添加成功。


## 添加日期时间 Date 类型的数据

数据表允许添加时间日期类型的列，为该类型的记录赋值，需要使用 ISO Date 格式的字符串，如 Product 表定义一个时间日期类型的列 expiration_time，创建一条记录时，该字段的赋值操作如下：

```js
let isoStr = ((new Date()).toISOString()).toString()
product.set('expiration_time', isoStr)
```


## 添加 file 类型数据

**请求示例**
```js
let MyFile = new BaaS.File()
MyFile.upload(params).then(res => {
  product.set('manual', res.data.file)
  product.save().then(res=>{
    console.log(res)
  })
})
```

**返回示例**

res 结构如下

```js
{
  status: 201,
  data: {
    "_id": "5bbac6e7bd66033df7fd0aac",
    "created_at": 1538967271,
    "created_by": 61736923,
    "file": {
      "cdn_path": "1g9LgkbXEdbXwAJT.jpg",
      "created_at": 1538967271,
      "id": "5bbac6e6bd66033efcfd0a95",
      "mime_type": "image/jpeg",
      "name": "wxc6b86e382a1e3294.o6zAJs5dCuYRqqJOq0MwNPlGiFVM.UxdrZqves41D1cd738e01dc1c7417c03d046e96408cc.jpg",
      "path": "https://cloud-minapp-11033.cloud.ifanrusercontent.com/1g9LgkbXEdbXwAJT.jpg",
      "size": 6151
    },
    "id": "5bbac6e7bd66033df7fd0aac",
    "name": "new",
    "read_perm": ["user:*"],
    "updated_at": 1538967271,
    "write_perm": ["user:*"]
  }
}
```

## 添加 geojson 类型数据

查看 [地理位置操作](./geo.md) 章节

## 添加 object 类型数据

对象内的属性名只能包含字母、数字和下划线，必须以字母开头，比如 `{$ifanr.x: 123}` 和 `{知晓云: "test"}` 是错误的。


## 批量新增数据项

`MyTableObject.createMany([item,...])`

**参数说明**

| 参数名    | 类型    | 说明              |
|-----------|---------|-------------------|
| item   | object     |   符合表结构的对象   |

**请求示例**

```js
let MyTableObject = new BaaS.TableObject(tableName)

const records = [{
  name: 'apple',
  price: 1,
  desc: ['good'],
  amount: 0
}, {
  name: 'banana',
  price: 2,
  desc: ['good'],
  amount: 1
}]

MyTableObject.createMany(records).then(res => {
   console.log(res.data.succeed)
}, err => {
  //error
})
```

**返回示例**

then 回调中 res 结构如下:
```js
{
  status: 201, // 状态码
  data: {
    "succeed": 10, // 成功插入记录数
    "total_count": 10 // 总的待插入记录数
  }
}
```

**状态码说明**

201 创建成功，400 请求数据非法或超过最大操作条目数上限

<span class="attention">注：</span> 由于对数据表的增删改均会触发 trigger 动作，为了防止出现严重消耗系统资源的情况，对数据表进行批量操作的数据条目最多不能超过 1000 条。
