# 地理位置操作

## 添加地理位置

为地理位置 `geojson` 类型字段添加数据和为普通字段添加数据的操作方式是一致的，可参考以下示例。

**参数说明**

| 参数   | 类型                     | 必填 | 说明 |
| :---- | :---------------------- | :--- | :--- |
| key   | String  | 是   | 在数据表中的类型必须是 geojson |
| value | GeoPoint 或 GeoPolygon   | 是   | - |

`geojson` 类型字段支持使用 `GeoPoint` 或 `GeoPolygon` 类型数据进行赋值：

* `GeoPoint` 表示坐标点，经度 `longitude` 在前，纬度 `latitude` 在后，创建一个点：

{% tabs swift1="Swift", oc1="Objective-C" %}
{% content "swift1" %}
```
let point = GeoPoint(longitude: 10, latitude: 10)
```
{% content "oc1" %}
```
BaaSGEOPoint *point = [[BaaSGEOPoint alloc] initWithLongitude:10 latitude:10];
```
{% endtabs %}

* `GeoPolygon` 表示地理形状，可以通过以下两种方法创建一个地理形状

> **info**
> 创建一个地理形状时，第一个点和最后一个点必须重合，否则创建失败。

{% tabs swift2="Swift", oc2="Objective-C" %}
{% content "swift2" %}
```
// 1. 直接使用数字
let polygon = GeoPolygon(coordinates: [[10, 10], [20, 10], [30, 20], [10, 10]])

// 2. 借助 GeoPoint
let point1 = GeoPoint(longitude: 10, latitude: 10)
let point2 = GeoPoint(longitude: 20, latitude: 10)
let point3 = GeoPoint(longitude: 30, latitude: 20)
let point4 = GeoPoint(longitude: 10, latitude: 10)
let polygon = GeoPolygon(points: [point1, point2, point3, point4])
```
{% content "oc2" %}
```
// 1. 直接使用数字
BaaSGeoPolygon *polygon = [[BaaSGeoPolygon alloc] initWithCoordinates:@[@[@1, @1], @[@2, @2], @[@3, @3]];

// 2. 借助 GeoPoint
BaaSGEOPoint *point1 = [[BaaSGEOPoint alloc] initWithLongitude:10 latitude:10];
BaaSGEOPoint *point2 = [[BaaSGEOPoint alloc] initWithLongitude:20 latitude:10];
BaaSGEOPoint *point3 = [[BaaSGEOPoint alloc] initWithLongitude:30 latitude:20];
BaaSGEOPoint *point4 = [[BaaSGEOPoint alloc] initWithLongitude:10 latitude:10];
BAASGeoPolygon *polygon = [[BAASGeoPolygon alloc] initWithPoints:@[point1, point2, point3, point4];
```
{% endtabs %}

## 设置地理位置信息

表中有名称为 `location`，`polygon` 的两列，类型都为 `geojson`。

{% tabs swift2_1="Swift", oc2_1="Objective-C" %}
{% content "swift2_1" %}
```
// Point 类型
let point = GeoPoint(longitude: 2, latitude: 10)
record.set("location", value: point)

// GeoPolygon
let polygon = GeoPolygon(coordinates: [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]])
record.set("polygon", value: polygon)
```
{% content "oc2_1" %}
```
// Point类型
BaaSGeoPoint *point = [[BaaSGeoPoint alloc] initWithLongitude:2 latitude:10];
[record set:@"location" value:point];

// GeoPolygon
BaaSGeoPolygon *polygon = [[BaaSGeoPolygon alloc] initWithCoordinates:@[@[30, 10], @[40, 40], @[20, 40], @[10, 20], @[30, 10]]];
[record set:@"polygon" value:polygon];
```
{% endtabs %}

## 地理位置查询

**`include` 在指定多边形集合中找出包含某一点的多边形**

{% tabs swift3="Swift", oc3="Objective-C" %}
{% content "swift3" %}
```
// 查找当前用户所属小区

let neighbourhood = Table(name: "neighbourhoodTableName")

// geoField 为 neighbourhood 表中定义地理位置的字段名，point 为用户所在位置，为 GeoPoint 类型
let whereArgs = Where.include("geoField", point: point)
let query = Query()
query.where = whereArgs
neighbourhood.find(query: query, completion: {listResult, error in

})
```
{% content "oc3" %}
```
// 查找当前用户所属小区

BaaSTable *neighbourhood = [[BaaSTable alloc] initWithName:@"neighbourhoodTableName"];

// geoField 为 neighbourhood 表中定义地理位置的字段名，point 为用户所在位置，为 GeoPoint 类型
BaaSWhere *where = [BaaSWhere include:"geoField" point:point];
query.where = where;
[neighbourhood findWithQuery:query completion:^(BaaSRecordList * _Nullable listResult, NSError * _Nullable error) {

}];
```
{% endtabs %}

**`withinCircle` 在指定点集合中，查找包含在指定圆心和指定半径所构成的圆形区域中的点，半径单位为 千米(km)。 (返回结果随机排序)**

> **info**
> radius 参数单位为 km。

{% tabs swift4="Swift", oc4="Objective-C" %}
{% content "swift4" %}
```
// 查找在距离用户 radius 千米范围内的饭店

let restaurant = Table(name: "restaurantTableName")

// geoField 为 restaurant 表中定义地理位置的字段名
let whereArgs = Where.withinCircle("geoField", point: point, radius: radius)
let query = Query()
query.where = whereArgs
restaurant.find(query: query, completion: {listResult, error in

})
```
{% content "oc4" %}
```

// 查找在距离用户 radius 千米范围内的饭店
BaaSTable *restaurant = [[BaaSTable alloc] initWithName:@"restaurantTableName"];

// geoField 为 restaurant 表中定义地理位置的字段名
BaaSWhere *where = [BaaSWhere withinCircle:@"geoField" point: point radius: radius];
query.where = where;
[restaurant findWithQuery:query completion:^(BaaSRecordList * _Nullable listResult, NSError * _Nullable error) {

}];
```
{% endtabs %}

**`withinRegion` 在指定点集合中，查找包含在以指定点为圆点，以最大和最小距离为半径，所构成的圆环区域中的点。半径单位为千米(km)。（返回结果按从近到远排序）**

> **info**
> maxDistance 与 minDistance 参数单位为 m。

{% tabs swift5="Swift", oc5="Objective-C" %}
{% content "swift5" %}
```
// 查找距离用户 minDistance 千米外，maxDistance 千米内的所有饭店

let restaurant = Table(name: "restaurantTableName")

// geoField 为 restaurant 表中定义地理位置的字段名，point 为圆点，minDistance 不指定默认为 0
let whereArgs = Where.withinRegion("geoField", point: point, minDistance: minDistance, maxDistance: maxDistance)
let query = Query()
query.where = whereArgs
restaurant.find(query: query, completion: {listResult, error in

})
```
{% content "oc5" %}
```
// 查找距离用户 minDistance 千米外，maxDistance 千米内的所有饭店

BaaSTable *restaurant = [[BaaSTable alloc] initWithName:@"restaurantTableName"];

// geoField 为 restaurant 表中定义地理位置的字段名，point 为圆点，minDistance 不指定默认为 0
BaaSWhere *where = [BaaSWhere withinRegion: point:point minDistance:minDistance maxDistance:maxDistance];
query.where = where;
[restaurant findWithQuery:query completion:^(BaaSRecordList * _Nullable listResult, NSError * _Nullable error) {

}];
```
{% endtabs %}

**`within` 在指定点集合中，查找包含于指定的多边形区域的点**

{% tabs swift6="Swift", oc6="Objective-C" %}
{% content "swift6" %}
```
// 查找某个小区内的所有饭店

let restaurant = Table(name: "restaurantTableName")

// neighbourhoodPolygon 表示某小区的地理位置
let neighbourhoodPolygon: GeoPolygon

// restaurantGeoField 为 restaurant 表中定义地理位置的字段名
let whereArgs = Where.within("restaurantGeoField", polygon: neighbourhoodPolygon)
let query = Query()
query.where = whereArgs
restaurant.find(query: query, completion: {listResult, error in

})
```
{% content "oc6" %}
```
// 查找某个小区内的所有饭店

BaaSTable *restaurant = [[BaaSTable alloc] initWithName:@"restaurantTableName"];

// neighbourhoodPolygon 表示某小区的地理位置
BaaSGeoPolygon *neighbourhoodPolygon;

// restaurantGeoField 为 restaurant 表中定义地理位置的字段名
BaaSWhere *where = [BaaSWhere within: polygon:neighbourhoodPolygon];
query.where = where;
[restaurant findWithQuery:query completion:^(BaaSRecordList * _Nullable listResult, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :---- | :-- | :-- |
| query | Query |  Y  | 查询条件，详见[数据表 - 查询](/ios-sdk/schema/query.md) |

**返回结果**
 
| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| listResult  | RecordList | 结果列表，详见 [数据类型](./data-type.md) 章节|
| error   |  NSError |  错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md)  |
