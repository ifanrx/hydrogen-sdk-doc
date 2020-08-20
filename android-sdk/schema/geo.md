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

```java
// 1. 直接使用数字
GeoPolygon polygon = new GeoPolygon(
  new float[]{10f, 10f},
  new float[]{20f, 20f},
  new float[]{30f, 30f}
);

// 2. 借助 GeoPoint
GeoPoint p1 = new GeoPoint(10f, 10f);
GeoPoint p2 = new GeoPoint(10f, 10f);
GeoPoint p3 = new GeoPoint(10f, 10f);
GeoPolygon polygon = new GeoPolygon(p1, p2, p3);
```

**请求示例**

```java
Table geoTest = new Table("geo_test");
Record record = geoTest.createRecord

// 保存一个点
record.put("location", new GeoPoint(10f, 20f)).save

// 保存一个多边形
record.put("location", new GeoPolygon(
        new GeoPoint(10f, 20f),
        new GeoPoint(10f, 20f),
        new GeoPoint(10f, 20f)
)).save();
```


## 地理位置查询

**`include` 在指定多边形集合中找出包含某一点的多边形**

```java
// 查找当前用户所属小区

Table neighbourhood = new Table("neighbourhood");

// geoField 为 neighbourhood 表中定义地理位置的字段名，point 为用户所在位置，为 GeoPoint 类型
Where where = new Where();
where.include("geoField", point);

Query query = new Query();
query.put(where);
neighbourhood.query(query);
```

**`withinCircle` 在指定点集合中，查找包含在指定圆心和指定半径所构成的圆形区域中的点 (返回结果随机排序)**

> **info**
> radius 参数单位为 km。

```java
// 查找在距离用户 radius 千米范围内的饭店

Table restaurant = new Table("restaurant");

// geoField 为 restaurant 表中定义地理位置的字段名
Where where = new Where();
where.withinCircle("geoField", point, radius);

Query query = new Query();
query.put(where);
restaurant.query(query);
```


**`withinRegion` 在指定点集合中，查找包含在以指定点为圆点，以最大和最小距离为半径，所构成的圆环区域中的点（返回结果按从近到远排序）**

> **info**
> maxDistance 与 minDistance 参数单位为 m。

```java
// 查找距离用户 minDistance 米外，maxDistance 米内的所有饭店

Table restaurant = new Table("restaurant");

// geoField 为 restaurant 表中定义地理位置的字段名，point 为圆点，minDistance 不指定默认为 0
Where where = new Where();
where.withinRegion("geoField", point, maxDistance, minDistance);

Query query = new Query();
query.put(where);
restaurant.query(query);
```


**`within` 在指定点集合中，查找包含于指定的多边形区域的点**

```java
// 查找某个小区内的所有饭店
Table neighbourhood = new Table("neighbourhood");
Table restaurant = new Table("restaurant");

neighbourhood.fetchRecordInBackground(recordId, new BaseCallback<Record>() {
    @Override
    public void onSuccess(Record record) {

        // neighbourhoodGeoField 为 neighbourhood 表中定义地理位置的字段名（代表该小区的范围）
        // restaurantGeoField 为 restaurant 表中定义地理位置的字段名（代表该餐厅的坐标）
        Where where = new Where();
        where.withIn("restaurantGeoField", record.getGeoPolygo("neighbourhoodGeoField"));

        Query query = new Query();
        query.put(where);
        restaurant.query(query);
    }
    @Override
    public void onFailure(Throwable e) {}
});
```
