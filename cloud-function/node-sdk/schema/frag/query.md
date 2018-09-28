
# {{apiPrefix}}BaaS.Query 类

## 初始化

new {{apiPrefix}}BaaS.Query()

## 静态方法

### {{apiPrefix}}BaaS.Query.and(query, ...)

and 组合查询, 查询所有 query 条件都满足的数据行

**参数说明**

| 参数名    | 类型    | 说明              |
|----------|---------|-------------------|
| query    | Query  |   Query 实例      |

**返回值**

Query 实例

### {{apiPrefix}}BaaS.Query.or(query, ...)

or 组合查询，查询满足任一 query 条件的数据行

**参数说明**

| 参数名    | 类型    | 说明              |
|-----------|---------|-------------------|
| query   | Query     |      Query 实例          |

**返回值**

Query 实例

## 实例方法

### compare(fieldName, operator, value)

比较查询

**参数说明**

| 参数名   | 类型   | 说明                                     |
|----------|--------|------------------------------------------|
| fieldName      | string | 数据行中的字段名                         |
| operator | string | 查询操作符，可选的有 =, !=, <, <=, >, >= |
| value    | any    | 需要比较的值                             |

**返回值**

this, 即当前 Query 实例


### contains(fieldName, value)

字符串包含查询

**参数说明**

| 参数名   | 类型   | 说明                                     |
|----------|--------|------------------------------------------|
| fieldName      | string | 数据行中的字段名                         |
| value    | any    | 需要比较的值                             |

**返回值**

this, 即当前 Query 实例


### matches(fieldName, regex)

正则查询

**参数说明**

| 参数名   | 类型   | 说明                                     |
|----------|--------|------------------------------------------|
| fieldName      | string | 数据行中的字段名                         |
| regex    |  Regex    | 正则表达式对象                             |

**返回值**

this, 即当前 Query 实例


### in(fieldName, arr)
查询 fieldName 的值包含在 value 中的数据行

**参数说明**


| 参数名     | 类型   | 说明                                     |
|-----------|--------|----------------------------------------|
| fieldName | string | 数据行中的字段名                   |
| arr     |  Array | 数组                                |

**返回值**

this, 即当前 Query 实例


### notIn(fieldName, arr)

查询 fieldName 的值不包含在 value 中的数据行

**参数说明**


| 参数名     |  类型     | 说明                                     |
|---------- |-----------|----------------------------------------|
| fieldName | string    | 数据行中的字段名                   |
| arr     |  Array    | 数组                                |


**返回值**

this, 即当前 Query 实例


### arrayContains(fieldName, arr)

查询 fieldName 的值*都*包含在 value 中的数据行

**参数说明**

| 参数名     |  类型     | 说明                                     |
|---------- |-----------|----------------------------------------|
| fieldName | string    | 数据行中的字段名                   |
| arr     |  Array    | 数组                                |

**返回值**

this, 即当前 Query 实例


### isNull(fieldName)

查询 fieldName 的值为 null 的数据行

**参数说明**

| 参数名     |  类型     | 说明                   |
|---------- |-----------|-----------------------|
| fieldName | string    | 数据行中的字段名        |

**返回值**

this, 即当前 Query 实例


### isNotNull(fieldName)

查询 fieldName 的值不为 null 的数据行

**参数说明**

| 参数名     |  类型     | 说明                     |
|---------- |-----------|-------------------------|
| fieldName | string    | 数据行中的字段名          |

**返回值**

this, 即当前 Query 实例


### exists(fieldName)

查询 fieldName 的值为空的数据行

**参数说明**

| 参数名     |  类型     | 说明                         |
|---------- |-----------|-----------------------------|
| fieldName | string    | 数据行中的字段名              |

**返回值**

this, 即当前 Query 实例


### notExists(fieldName)

查询 fieldName 的值不为空的数据行

**参数说明**

| 参数名     |  类型     | 说明                              |
|---------- |-----------|----------------------------------|
| fieldName | string    | 数据行中的字段名                   |

**返回值**

this, 即当前 Query 实例

### include(fieldName, point)

在指定多边形集合中找出包含某一点的多边形

**参数说明**

| 参数名     |  类型     | 说明                                       |
|---------- |-----------|-------------------------------------------|
| fieldName | string    | 数据行中的字段名 , 该字段为 GeoPolygon 格式的 geojson   |
| point     |  GeoPoint | 坐标点， eg: new {{apiPrefix}}BaaS.GeoPoint(10, 10)|

**返回值**

this, 即当前 Query 实例


### withinCircle(fieldName, point, radius)

在指定点集合中，查找包含在指定圆心和指定半径所构成的圆形区域中的点

**参数说明**

| 参数名     |  类型     | 说明                                       |
|---------- |-----------|-------------------------------------------|
| fieldName | string    | 数据行中的字段名 ，该字段为 GeoPoint 格式的 geojson         |
| point     |  GeoPoint | 坐标点， eg: new {{apiPrefix}}BaaS.GeoPoint(10, 10) |
| radius    |  number   | 半径                                       |


**返回值**

this, 即当前 Query 实例


### within(fieldName, polygon)

在指定点集合中，查找包含于指定的多边形区域的点

**参数说明**

| 参数名        |  类型     | 说明                                       |
|--------------|-----------|-------------------------------------------|
| fieldName    | string    | 数据行中的字段名 ，该字段为 GeoPoint 格式的 geojson   |
| polygon      |  GeoPolygon | 多边形区域， eg: new {{apiPrefix}}BaaS.GeoPolygon(...)|

**返回值**

this, 即当前 Query 实例


### withinRegion(fieldName, point, maxDistance, minDistance)

在指定点集合中，查找包含在以指定点为圆点，以最大和最小距离为半径，所构成的圆环区域中的点（返回结果按从近到远排序）

**参数说明**

| 参数名        |  类型     | 说明                                       |
|--------------|-----------|-------------------------------------------|
| fieldName    | string    | 数据行中的字段名 ，该字段为 GeoPoint 格式的 geojson   |
| point        |  GeoPoint | 坐标点， eg: new {{apiPrefix}}BaaS.GeoPoint(10, 10)|
| maxDistance  |  number   | 最大距离                                       |
| maxDistance  |  number   | 最小距离                                       |

**返回值**

this, 即当前 Query 实例


### hasKey(fieldName, value)

查询 object 类型的字段中是否有指定属性名

**参数说明**

| 参数   | 类型                | 必填 | 说明 |
| :---- | :------------------ | :-  | :-- |
| key   | String              | 是  | 在数据表中的类型必须是 Object |
| value | String              | 是  | 需要检测的属性名, 只能包含字母、数字和下划线，必须以字母开头 |


**返回值**

this, 即当前 Query 实例

