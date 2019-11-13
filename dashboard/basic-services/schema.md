# 数据
作为知晓云提供的核心功能之一，通过[数据存储引擎](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]schema/)可以省去您自己搭建数据库、优化数据库查询、编写数据接口等麻烦操作。同时知晓云数据库支持多种类型的数据，如数组类型、地理位置类型、文件类型、对象类型等，并且支持原子操作、批量操作等高级功能。SDK 提供了多种复杂查询支持，包括正则匹配查询，数组查询，甚至是与或的组合查询以及匿名读写功能。

已创建的数据表需要配合 [Hydrogen SDK](/js-sdk/download-sdk.md) 来使用。对开发者而言，在控制台读取到 `tableID` 或者 `tableName`，即可以配合 SDK 来对该数据表进行符合权限的操作。

## 相关概念
使用数据服务前，你需要了解以下概念。

* tableName： 数据表名称，配合 Hydrogen SDK 使用。
* _userprofile：系统内置的用户表，用于存储用户信息。
* _richtextcontent：系统内置的内容表，可配合知晓云提供的 CMS 后台使用。
* _id：系统内置字段，是每一行数据的唯一标识。
* 数据列：即数据表中存储的不同字段。列名称不允许以下划线开头。每张数据表均会存在系统内建字段，虽然这些内建字段对开发者不可见，但系统依然会将以下划线开头的列名作为数据表的内建列。
* 数据行：实际存储的单条数据。
* 数据类型：详见[数据类型](/js-sdk/schema/data-type.md)
* 普通索引：（由关键字 KEY 或者 INDEX 定义的索引）的唯一任务是加快对数据的访问速度。普通索引允许被索引的数据列包含重复的值。如果能确定某个数据列将只包含彼此各不相同的值，在为这个数据列创建索引的时候就应该用关键字 UNIQUE 把它定义为一个唯一索引。
* ACL：详情请查看 [ACL 简介](/dashboard/basic-services/acl.md)

## 基础操作
### 创建表

![创建表](/images/dashboard/basic-services/create-table.png)

点击左边栏「添加」按钮即可开始添加一张新的数据表。知晓云支持多种建表方式，以适应你不同的需求。

* 直接创建：完成创建后你需要为当前数据表逐一添加字段（数据列）。
* 通过 json 创建：开发者可以通过导入 json 文件的方式快速创建一张表。点击查看[文件格式要求](#通过-json-创建数据表)。
* 复制其他的数据表：如果你已经创建过类似的表，可以直接复制生成，目前仅支持跨应用复制数据表。如果你需要大批量复制，推荐使用[复制应用](https://cloud.minapp.com/dashboard/#/enterprise/[[enterprise_id | addSlashPostfixIfNotEmpty]]miniapp-copying/)服务。
* 通过模板生成：知晓云提供了一些常用的数据表模板，开发者可以直接使用。

#### 通过 JSON 创建数据表

提交参数见下表

| 名称            | 类型 | 是否必填 | 描述 |
| -----          | ----- | ----- | ----- |
| name           | String | 是 | 数据表名称。 |
| description    | String | 否 | 数据表注释。  |
| row_write_perm | Array | 是 | 行的默认写权限。<br>`[ "user:anonymous" ]` 所有人可写（包含匿名用户和登录用户）。<br>`[ "user:*" ]` 登录用户可写（不包含匿名用户）。<br>`[ "gid:561" ]` 在分组 561 的用户可写。561 为用户组 ID，可根据实际需要进行更改。<br>`[ "user:{created_by}" ]` 创建者可写。|
| row_read_perm  | Array | 是 | 行的默认读权限。<br>`[ "user:anonymous" ]` 所有人可读（包含匿名用户和登录用户）。<br>`[ "user:*" ]` 登录用户可读（不包含匿名用户）。 <br>`[ "gid:561" ]` 在分组 561 的用户可读。561 为用户组 ID，可根据实际需要进行更改。<br>`[ "user:{created_by}" ]` 创建者可读。 |
| write_perm     | Array | 是 | 数据表录入权限。<br>`[ "user:*" ]` 登录用户（不包含匿名用户）可以进行数据录入。<br>`[]` 不开放。<br>`[ "user:anonymous" ]` 所有人（包含匿名用户和登录用户）都可以进行数据录入。<br>`[ "gid:561" ]` 在分组 561 的用户可以进行数据录入。561 为用户组 ID，可根据实际需要进行更改。 |
| schema         | Object | 是 | 数据表表结构信息。<br>`{ "fields": [ {...}, {...}, ... ] }` 目前仅包含一个值为数组的键：fields<br>fields 详细参数见下表 |

fields 详细参数

| 名称             | 类型 | 是否必填 | 描述 |
| -----           | ----- | ----- | ----- |
| name            | String | 是 | 列名称 |
| type            | String | 是 | 列类型<br>Array 数组类型<br>String 字符串类型<br>integer 整数类型<br>number 数字类型<br>file 文件类型<br>Object 对象类型<br>date 日期类型<br>boolean 布尔值类型<br>geojson geojson 类型<br>reference pointer 类型 |
| description     | String | 否 | 列注释 |
| default         | 值类型取决于列的 type | 否 | 默认值 |
| constraints     | Object | 是 | 列限制<br>required: 是否为必填，类型：boolean，必填。 |
| acl             | Object | 是 | 列权限<br>creatorVisible: 是否仅创建者可见，类型：Boolean，必填。<br>clientReadOnly: 是否只读，类型：Boolean，必填。<br>clientVisible: 客户端是否可见，类型：Boolean，必填。 |
| schema_name     | String | 是 | 仅当 type 为 reference 时使用，列所指向的数据表表名。 |
| items           | Object | 是 | 仅当 type 为 Array 时使用，定义数据类的数据类型。<br>数组中存放 String 时值为： { "type": "String" }。<br>数组中存放 integer 时值为： { "type": "integer" }。<br>数组中存放 number 时值为： { "type": "number" }。<br>数组中存放 file 时值为：{ "type": "file" }。<br>数组中存放 Object 时值为：{ "type": "object" }。<br>数组中存放 date 时值为：{ "type": "date" }。<br>数组中存放 boolean 时值为：{ "type": "boolean" }。<br>数组中存放 geojson 时值为：{ "type": "geojson", "coordinate_type": "gcj02", "format": "default" }。<br>coordinate_type 可根据需求改变。 |
| format          | String | 是 | 仅当 type 为 geojson 时使用。<br>值只能是 default。 |
| coordinate_type | String | 是 | 仅当 type 为 geojson 时使用。<br>有两个值可选：<br>wgs84: 地球坐标<br>gcj02: 火星坐标 |

### 添加列

![添加列](/images/dashboard/basic-services/add-column.png)

开发者可以通过**添加列**操作来扩展已经存在的数据表，如图所示。

### 添加行

![添加行](/images/dashboard/basic-services/add-row.png)

开发者可以通过**添加行**操作来手动添加数据，如图所示。

### 唯一索引设置

![唯一索引设置](/images/dashboard/basic-services/set-up-index.png)

知晓云会实时分析数据量级和查询效率，自动为数据表字段增加索引以优化查询效率。因此，开发者不需关心普通索引的创建。在实际业务中，有时需要单个字段的唯一性，甚至多个字段的联合唯一性，此时，就需要对该字段或字段们创建唯一索引。如，报名表，只允许每个用户报名一次，则需要为 created_by 字段创建唯一索引。

也就是说，唯一索引可以保证数据记录的唯一性。事实上，在许多场合，人们创建唯一索引的目的往往不是为了提高访问速度，而只是为了避免数据出现重复。

### 查询数据

![查询数据](/images/dashboard/basic-services/search.png)

数据表会根据字段类型、字段含义，为该字段提供可用的查询操作符。一般情况下，不同类型对应的可用查询操作符如下表所示

| 字段类型  | 支持的查询操作符                                   |
| :------ | :--------------                                  |
| id      | =, in, range, !=, not in                        |
| string  | =, in, contains, !=, isnull, not in, regex      |
| integer | =, >, >=, <, <=, in, range, !=, not in, isnull  |
| number  | =, >, >=, <, <=, in, range, !=, not in, isnull  |
| boolean | =, exists                                       |
| array   | =, in, not in, is null, all                     |
| geojson  | center, intersects, nearsphere                 |
| date    | =, >, >=, <, <=, range                          |
| file    | isnull                                          |
| object  | =, hasKey, isnull                               |
| pointer | =, in, range, !=, not in                        |

操作符介绍及使用规则

| 操作符       | 描述                         |
| :---------  | :-------------------------- |
| =           | 相等                         |
| <           | 小于                         |
| <=          | 小于等于                      |
| >           | 大于                         |
| >=          | 大于等于                      |
| !=          | 不等于                        |
| in          | 存在于数组中                   |
| all         | 数组中包含给出的所有元素         |
| contains    | 字符串包含                     |
| range       | 范围查询                       |
| regex       | 正则表达式                     |
| not in      | 不存在于在数组中                |
| is null     | 是否为空                       |
| hasKey      | 是否存在属性（仅限 Object 类型） |
| center      | 请参考 [withincircle](/js-sdk/schema/geo.md)  |
| intersects  | 请参考 [include](/js-sdk/schema/geo.md)       |
| nearsphere  | 请参考 [withinRegion](/js-sdk/schema/geo.md)  |

### 列展示

![列展示](/images/dashboard/basic-services/column-display.png)

允许开发者控制数据表字段的展示和隐藏，在数据表字段较多时十分有用。

### 显示密度

![显示密度](/images/dashboard/basic-services/display-desity.png)

开发者可以通过设置列表的显示密度来控制一屏内可展示的数据多少。

### 导入 / 导出

![数据导入](/images/dashboard/basic-services/import-data.png)

![数据导出](/images/dashboard/basic-services/export-data.png)

开发者可导入 CSV 或 JSON 格式的数据，可导出 JSON 格式数据。导入或导出操作并非实时，会先在知晓云服务端创建定时任务，该任务被执行后才会真正执行导入或导出任务。任务执行完成后用户将会在通知中心和邮件收到相应的提醒和数据。

### 编辑表

![编辑表](/images/dashboard/basic-services/edit-schema.png)

开发者可以对已创建的数据表进行重命名、重置数据表录入权限、更新数据行的读写权限。

### 删除表

![删除表](/images/dashboard/basic-services/delete-schema.png)

表删除后，原表内的所有数据都会被删除，且该操作不可恢复。故操作前需要开发者填写要删除的表名进行二次确认。

### 全屏展示

![删除表](/images/dashboard/basic-services/full-screen.png)

点击数据表右上角展开按钮，你可以进入全屏模式来进行数据表操作。
