# 地理位置操作

## 添加地理位置

为地理位置（geojson）类型字段添加数据和为普通字段添加数据的操作方式是一致的，可参考以下示例。

**参数说明**

| 参数   | 类型                     | 必填 | 说明 |
| :---- | :---------------------- | :--- | :--- |
| key   | String  | 是   | 在数据表中的类型必须是 geojson |
| value | GeoPoint 或 GeoPolygon   | 是   | - |

geojson 类型字段支持使用 GeoPoint 或 GeoPolygon 类型数据进行赋值：

* GeoPoint 表示坐标点，经度（longitude）在前，纬度（latitude）在后，创建一个点：

{% tabs swift1="Swift", oc1="Objective-C" %}
{% content "swift1" %}
```
let point = GeoPoint(longitude: 10.0, latitude: 10.0)
```
{% content "oc1" %}
```
BAASGEOPoint *point = [[BAASGEOPoint alloc] initWithLongitude:10.0 latitude:10.0];
```
{% endtabs %}

* GeoPolygon 表示地理形状，可以通过以下两种方法创建一个地理形状

{% tabs swift2="Swift", oc2="Objective-C" %}
{% content "swift2" %}
```
// 1. 直接使用数字
let polygon = GeoPolygon(coordinates: [[1, 1], [2, 2], [3, 3]])

// 2. 借助 GeoPoint
var point1 = new wx.BaaS.GeoPoint(1, 1)
var point2 = new wx.BaaS.GeoPoint(2, 2)
var point3 = new wx.BaaS.GeoPoint(3, 3)
let polygon = GeoPolygon(points: [point1, point2, point3])

```
{% content "oc2" %}
```
// 1. 直接使用数字
BAASGeoPolygon *polygon = [[BAASGeoPolygon alloc] initWithCoordinates:@[@[@1, @1], @[@2, @2], @[@3, @3]];

// 2. 借助 GeoPoint
BAASGEOPoint *point1 = [[BAASGEOPoint alloc] initWithLongitude:1 latitude:1];
BAASGeoPolygon *polygon = [[BAASGeoPolygon alloc] initWithPoints:@[point1, point2, point3];
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
let query = Query.include(key: "geoField", point: point)
neighbourhood.setQuery(query)
neighbourhood.find { (result, error) in

}
```
{% content "oc3" %}
```
// 查找当前用户所属小区

BAASTable *neighbourhood = [[BAASTable alloc] initWithName:@"neighbourhoodTableName"];

// geoField 为 neighbourhood 表中定义地理位置的字段名，point 为用户所在位置，为 GeoPoint 类型
BAASQuery *query = [BAASQuery includeWithKey:@"geoField" point: point];
[neighbourhood setQuery: query];
[neighbourhood find:^(NSArray<BAASRecord *> * _Nullable records, NSError * _Nullable error) {
                        
}];
```
{% endtabs %}

**`withinCircle` 在指定点集合中，查找包含在指定圆心和指定半径所构成的圆形区域中的点 (返回结果随机排序)**

{% tabs swift4="Swift", oc4="Objective-C" %}
{% content "swift4" %}
```
// 查找在距离用户 radius 千米范围内的饭店

let restaurant = Table(name: "restaurantTableName")

// geoField 为 restaurant 表中定义地理位置的字段名
let query = Query.withinCircle(key: "geoField", point: point, radius: radius)
restaurant.setQuery(query)
restaurant.find { (result, error) in

}
```
{% content "oc4" %}
```

// 查找在距离用户 radius 千米范围内的饭店
BAASTable *restaurant = [[BAASTable alloc] initWithName:@"restaurantTableName"];

// geoField 为 restaurant 表中定义地理位置的字段名
BAASQuery *query = [BAASQuery withinCircleWithKey:@"geoField" point: point radius: radius];
[restaurant setQuery: query];
[restaurant find:^(NSArray<BAASRecord *> * _Nullable records, NSError * _Nullable error) {
                        
}];
```
{% endtabs %}

**`withinRegion` 在指定点集合中，查找包含在以指定点为圆点，以最大和最小距离为半径，所构成的圆环区域中的点（返回结果按从近到远排序）**

{% tabs swift5="Swift", oc5="Objective-C" %}
{% content "swift5" %}
```
// 查找距离用户 minDistance 千米外，maxDistance 千米内的所有饭店

let restaurant = Table(name: "restaurantTableName")

// geoField 为 restaurant 表中定义地理位置的字段名，point 为圆点，minDistance 不指定默认为 0
let query = Query.Query.withinRegion(key:"geoField", point: point, minDistance: minDistance, maxDistance: maxDistance)
restaurant.setQuery(query)
restaurant.find { (result, error) in

}
```
{% content "oc5" %}
```
// 查找距离用户 minDistance 千米外，maxDistance 千米内的所有饭店

BAASTable *restaurant = [[BAASTable alloc] initWithName:@"restaurantTableName"];

// geoField 为 restaurant 表中定义地理位置的字段名，point 为圆点，minDistance 不指定默认为 0
BAASQuery *query = [BAASQuery withinRegionWithKey: point:point minDistance:minDistance maxDistance:maxDistance];
[restaurant setQuery: query];
[restaurant find:^(NSArray<BAASRecord *> * _Nullable records, NSError * _Nullable error) {
 
}];
```
{% endtabs %}

**`within` 在指定点集合中，查找包含于指定的多边形区域的点**
  