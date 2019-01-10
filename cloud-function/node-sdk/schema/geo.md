# 地理位置操作

## 添加地理位置

为地理位置（geojson）类型字段添加数据和为普通字段添加数据的操作方式是一致的，可参考以下示例。

**参数说明**

| 参数   | 类型                     | 必填 | 说明 |
| :---- | :---------------------- | :--- | :--- |
| key   | String                  | 是   | 在数据表中的类型必须是 geojson |
| value | GeoPoint 或 GeoPolygon   | 是   | - |

geojson 类型字段支持使用 GeoPoint 或 GeoPolygon 类型数据进行赋值：

* GeoPoint 表示坐标点，通过 `new GeoPoint(longitude, latitude)` 创建一个点，其中经度（longitude）在前，纬度（latitude）在后

* GeoPolygon 表示地理形状，可以通过以下两种方法创建一个地理形状

```js
// 1. 直接使用数字
var polygon = new BaaS.GeoPolygon([[10, 10], [20, 10], [30, 20], [10, 10]])

// 2. 借助 GeoPoint
var point1 = new BaaS.GeoPoint(10, 10)
...
var polygon = new BaaS.GeoPolygon([point1, point2, point3, point1])
```

**请求示例**

```js
var Product = new BaaS.TableObject(tableName)
var product = Product.create()

// 保存一个点
var point = new BaaS.GeoPoint(10, 10)
product.set('origin', point).save()

// 保存一个多边形
var polygon = new BaaS.GeoPolygon([[10, 10], [20, 10], [30, 20], [10, 10]]) // 前后两点相同，即需构成一个闭环
// or
var point1 = new BaaS.GeoPoint(10, 10)
...
polygon = new BaaS.GeoPolygon([point1, point2, point3, point1])

product.set('origin', polygon).save()
```


## 地理位置查询

**`include` 在指定多边形集合中找出包含某一点的多边形**

```js
// 查找当前用户所属小区

var Neighbourhood = new BaaS.TableObject(neighbourhoodTableName)

var query = new BaaS.Query()

// geoField 为 neighbourhood 表中定义地理位置的字段名，point 为用户所在位置，为 GeoPoint 类型
query.include('geoField', point)

Neighbourhood.setQuery(query).find()
```

**`withinCircle` 在指定点集合中，查找包含在指定圆心和指定半径所构成的圆形区域中的点 (返回结果随机排序)**

```js
// 查找在距离用户 radius 千米范围内的饭店

var Restaurant = new BaaS.TableObject(restaurantTableName)

// geoField 为 restaurant 表中定义地理位置的字段名
query.withinCircle('geoField', point, radius)

Restaurant.setQuery(query).find()
```


**`withinRegion` 在指定点集合中，查找包含在以指定点为圆点，以最大和最小距离为半径，所构成的圆环区域中的点（返回结果按从近到远排序）**

```js
// 查找距离用户 minDistance 千米外，maxDistance 千米内的所有饭店

var Restaurant = new BaaS.TableObject(restaurantTableName)

// geoField 为 restaurant 表中定义地理位置的字段名，point 为圆点，minDistance 不指定默认为 0
query.withinRegion('geoField', point, maxDistance, minDistance)

Restaurant.setQuery(query).find()
```


**`within` 在指定点集合中，查找包含于指定的多边形区域的点**

```js
// 查找某个小区内的所有饭店

var Neighbourhood = new BaaS.TableObject(neighbourhoodTableName)

Neighbourhood.get(recordID).then(res => {
  var neighbourhood = res.data

  var query = new BaaS.Query()

  // neighbourhoodGeoField 为 neighbourhood 表中定义地理位置的字段名
  var neighbourhoodPolygon = new BaaS.GeoPolygon(neighbourhood['neighbourhoodGeoField'].coordinates[0])

  // restaurantGeoField 为 restaurant 表中定义地理位置的字段名
  query.within('restaurantGeoField', neighbourhoodPolygon)

  var Restaurant = new BaaS.TableObject(restaurantTableID)
  Restaurant.setQuery(query).find()
})
```