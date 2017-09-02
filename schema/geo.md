# 地理位置操作

<p style='color:red'>* sdk version >= v1.1.0</p>

### 添加地理位置

添加地理位置和为普通字段添加数据操作方式一致

`xxx.set(key, value)`

##### 参数说明

|  参数名  |  类型  |  必填  |  描述  |
| :-----------: | :----: | :--: | :------------------------ |
|  key  |  String |  是  |  在数据表中的类型必须是 geojson  |
|  value  |  GeoPoint 或 GeoPolygon  |  是  |  |


##### 请求示例

```
var Product = new wx.BaaS.TableObject(tableID)

var point = new wx.BaaS.GeoPoint(20, 20)
Product.set(‘origin’, point)

var polygon = new wx.BaaS.GeoPolygon([point1, point2, point3])

// or
polygon = new wx.BaaS.GeoPolygon([[10, 10], [20, 20], [30, 30]])

Product.set('origin', polygon)
```


### 地理位置查询

#### 在指定多边形集合中找出包含某一点的多边形

```
// 查找当前用户所属小区

var neighbourhood = new BaaS.TableObject(neighbourhoodTableID)

var query = new BaaS.Query()

// geoField 为 neighbourhood 表中定义地理位置的字段名, point 为用户所在位置，为 GeoPoint 类型
query.include(geoField, point)

neighbourhood.setQuery(query).find()
```

#### 在指定点集合中，查找包含在指定圆心和指定半径所构成的圆形区域中的点 (返回结果随机排序)

```
// 查找在距离用户 radius 千米范围内的饭店

var restaurant = new BaaS.TableObject(restaurantTableID)


query.withinCircle(geoField, point, radius)

restaurant.setQuery(query).find()

```


#### 在指定点集合中，查找包含在以某点为起点的最大和最小距离所构成的圆环区域中的点（返回结果按从近到远排序）

```
// 查找距离用户 minDistance 千米外，maxDistance 千米内的所有饭店

// minDistance 不指定默认为 0
query.withinRegion(point, maxDistance, minDistance)

var restaurant = new BaaS.TableObject(restaurantTableID)

restaurant.setQuery(query).find()
```


#### 在指定点集合中，查找包含于指定的多边形区域的点

```
// 查找某个小区内的所有饭店

// geoField 为 restaurant 表中定义地理位置的字段名
query.within(geoField, neighbourhood)

var restaurant = new BaaS.TableObject(restaurantTableID)

restaurant.setQuery(query).find()
```