# 数据操作

在 BaaS 后台创建好数据表后，可以通过 SDK 提供的相关方法来操作数据表的数据。

## 过滤/排序/分页

数据相关查询接口支持过滤和排序功能

---

#### 过滤

BaaS 提供的查询数据接口提供三种过滤查询方式：

- 精确查询
- 模糊查询
- 多项匹配

提供小于，小于等于，大于，大于等于，范围操作，而且可以组合使用。后缀的使用规则如： `price__range`，`name__contains`，`recordID__lte`

|   参数后缀   | 对应数据表类型  |  说明  |
| :------: | :-----------: | :--: |
|    lt    |    Integer    |  小于  |
|   lte    |    Integer    | 小于等于 |
|    gt    |    Integer    |  大于  |
|   gte    |    Integer    | 大于等于 |
|  range   | Integer/Float |  范围  |
| contains |    String     |  包含  |

示例 1：查询创建者 `ID` 为 1，`name` 为 `知晓云` 的记录（精确查询）

```
let objects = {
  tableID: 10,
  created_by: 1,
  name: '知晓云'
};
wx.BaaS.getRecordList(objects).then( (res) => {
  // success
}, (err) => {
  // err
});
```

示例 2：查询 `name` 中包含 `知晓云` 字符串的记录（模糊查询）

```
let objects = {
  tableID: 10,
  name__contains: '知晓云',
};
wx.BaaS.getRecordList(objects).then( (res) => {
  // success
}, (err) => {
  // err
});
```

示例 3：查询创建者 ID 为在范围 [1, 3] 的记录（多项匹配）

```
let objects = {
  tableID: 10,
  created_by__range: '1,3',
};
wx.BaaS.getRecordList(objects).then( (res) => {
  // success
}, (err) => {
  // err
});
```

示例 4：查询创建者 recordID 大于等于 10 的记录

```
let objects = {
  tableID: 10,
  recordID__gte: 10,
};
wx.BaaS.getRecordList(objects).then( (res) => {
  // success
}, (err) => {
  // err
});
```

示例 5：查询创建者 recordID 大于等于 10，且 price 小于 1000 的记录

```
let objects = {
  tableID: 10,
  recordID__gte: 10,
  price__lt: 1000
};
wx.BaaS.getRecordList(objects).then( (res) => {
  // success
}, (err) => {
  // err
});
```

---

#### 排序

示例 1：查询数据表 `ID` 为 10 的数据，返回的数据按 `id` 逆序排序

```
let objects = {
  tableID: 10,
  order_by: '-id', // 如果是正序就是 order_by: 'id'
};
wx.BaaS.getRecordList(objects).then( (res) => {
  // success
}, (err) => {
  // err
});
```

示例 2：查询数据表 `ID` 为 10 的数据，返回的数据按 `id` 逆序、`created_by` 正序排序（前面的优先）

```
let objects = {
  tableID: 10,
  order_by: '-id,created_by', // 如果是正序就是 order_by: id
};
wx.BaaS.getRecordList(objects).then( (res) => {
  // success
}, (err) => {
  // err
});
```
---

#### 分页

使用 `limit` 和 `offset` 参数来控制分页请求

- `limit`， 指定该请求返回的结果个数
- `offset`（偏移量），指定该请求返回的结果的起始位置（`offset` 从 0 开始算起）

示例：查询数据表 `ID` 为 10 的第 3 页数据

```
let pageNum = 3; // 页码
let limit = 16;
let offset = limit * (pageNum - 1);

let objects = {
  tableID: 10,
  limit
  offset
};
wx.BaaS.getRecordList(objects).then( (res) => {
  // success
}, (err) => {
  // err
});
```

### 注意事项

- 加入查询的字段必须是 `FlexSchema` 定义过的字段。其中，`id` 和 `created_by`（创建者）字段默认支持
- 模糊查询的字段不能是 `Array` 类型
- 多项匹配的字段只能是 `Array` 类型
