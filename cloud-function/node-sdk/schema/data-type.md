# 数据类型

## 数据表中支持的数据类型

| 类型    | 说明   |
| :------ | :----- |
| string  | 字符串 |
| integer | 整数   |
| number  | 数字，JavaScript 中的 Number 类型一致 |
| boolean | 布尔值, `true` 或者 `false` |
| array   | 数组, 数组元素支持 `string`、`integer`、`number`、`boolean` 4 种类型 |
| object  | 对象，必须是`{...}`格式，即对象的字面量形式 |
| geojson | 地理位置，支持 GeoPoint、GeoPloygon 两种类型，请参考[地理位置操作](./geo.md)章节。GeoJSON 具体介绍，请参考 mongoDB 的 [GeoJSON Object](https://docs.mongodb.com/manual/reference/geojson/)  |
| date    | 日期，ISO8601 格式的日期字符串，例如：`"2018-09-01T18:31:02.631000+08:00"` |
| file    | 文件，记录文件信息的对象 |

file 类型的数据结构

| 字段       | 说明 |
| :--------- | :--- |
| cdn_path   | cdn 路径 |
| created_at | 创建时间 |
| id         | 文件 id |
| mime_type  | 文件类型 |
| name       | 文件名称 |
| path       | 文件完整 url |
| size       | 文件尺寸，单位 `byte` |

## 数据类型示例
这是一条包含了所有数据类型的记录：
```js
{
  _id: "5baafb910afdde0c2a6dbb8e",
  id: "5baafb910afdde0c2a6dbb8e",
  int: 97,    // integer
  num: 89.11167842607728,   // number
  str: "abcdefg",   //string
  obj: {    // object
    a: "b",
    c: ["apple", "array", "dog"],
    f: {
      num: 123.44
    },
  },
  array_bool: [true, true],   // array
  array_int: [123456, 123, 456],   // array
  array_num: [91.7485922640633, 10.305134978939634],   // array
  array_str: ["abc", "def", "ghi"],   // array
  bool: true,   // boolean
  date: "2018-09-26T11:22:51.100000+08:00",   // date
  file: {   // file
    cdn_path: "1g50PgtbHMNWFntB.png",
    created_at: 1537932176,
    id: "5baafb906e73240d2acfb67e",
    mime_type: "image/png",
    name: "wxfab60d15556a51ec.o6zAJs8v7AFX-FTE2ziIK8E1moJI.8LnYokv8aq4Ubaeaa306f0bbec994ad399bdb97d92ce.png",
    path: "https://cloud-minapp-7894.cloud.ifanrusercontent.com/1g50PgtbHMNWFntB.png",
    size: 105224
  },
  geo_point: {    // geojson
    coordinates: [10.123, 8.543],
    type: "Point"
  },
  geo_polygon: {    // geojson
    coordinates: [[[10.123, 10], [20.12453, 10], [30.564654, 20], [20.654, 30], [10.123, 10]]],
    type: "Polygon"
  },
  created_at: 1537932120,
  created_by: 67566799,
  updated_at: 1538031640,
  read_perm: ["user:*"],
  write_perm: ["user:*"]
}
```

> **info**
> 数据表内置字段 `created_at`、`updated_at` 的数据类型是 integer，而非 date。
