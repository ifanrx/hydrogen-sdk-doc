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

```dart
// 1. 直接使用数字
GeoPolygon polygon = new GeoPolygon(coordinates: [[10, 10], [20, 10], [30, 20], [10, 10]]);

// 2. 借助 GeoPoint
GeoPoint point1 = new GeoPoint(10, 10);
...
GeoPolygon polygon = new GeoPolygon(points: [point1, point2, point3, point1]);
```

**请求示例**

```dart
TableObject tableObject = new TableObject(tableName);
TableRecord record = tableObject.create();

// 保存一个点
GeoPoint point = new GeoPoint(10, 10);
record.set('geo_point', point);
record.save();

// 保存一个多边形
GeoPolygon polygon = new GeoPolygon(coordinates: [[10, 10], [20, 10], [30, 20], [10, 10]]); // 前后两点相同，即需构成一个闭环

// or
GeoPoint point1 = new GeoPoint(10, 10);
//...

polygon = new GeoPolygon(points: [point1, point2, point3, point1]);

record.set('geo_polygon', polygon);
record.save();
```


## 地理位置查询

**`include` 在指定多边形集合中找出包含某一点的多边形**

```dart
// 查找当前用户所属小区
TableObject neighborhood = new TableObject(neighborhoodTable);

Query query = new Query();

// geoField 为 neighborhood 表中定义地理位置的字段名，point 为用户所在位置，为 GeoPoint 类型
query.where(Where.include('geo_polygon', point));

neighborhood.find(query: query);
```

**`withinCircle` 在指定点集合中，查找包含在指定圆心和指定半径所构成的圆形区域中的点 (返回结果随机排序)**

> **info**
> radius 参数单位为 km。

```dart
// 查找在距离用户 radius 千米范围内的饭店
TableObject restaurant = new TableObject(restaurantTableName);

// geoField 为 restaurant 表中定义地理位置的字段名
query.where(Where.withinCircle('geoField', point, radius));

restaurant.find(query: query);
```

**`withinRegion` 在指定点集合中，查找包含在以指定点为圆点，以最大和最小距离为半径，所构成的圆环区域中的点（返回结果按从近到远排序）**

> **info**
> maxDistance 与 minDistance 参数单位为 m。

```dart
// 查找距离用户 minDistance 米外，maxDistance 米内的所有饭店
TableObject restaurant = new TableObject(restaurantTableName);

// geoField 为 restaurant 表中定义地理位置的字段名，point 为圆点，minDistance 不指定默认为 0
query.where(Where.withinRegion('geoField', point, maxDistance, minDistance));

restaurant.find(query: query);
```


**`within` 在指定点集合中，查找包含于指定的多边形区域的点**

```dart
// 查找某个小区内的所有饭店
TableObject neighborhood = new TableObject(neighborhoodTable);

TableRecord record = await neighborhood.get(recordId);
GeoPolygon neighborhoodPolygon = new GeoPolygon(coordinates: record.recordInfo['geo_polygon']['coordinates'][0]);

Query query = new Query();
query.where(Where.within('restaurantGeoField', neighborhoodPolygon));

TableObject restaurant = new TableObject(restaurantTableID);
await restaurant.find(query: query);
```