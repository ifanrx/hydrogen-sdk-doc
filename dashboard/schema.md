# 数据管理

作为知晓云提供的核心功能之一，通过[数据存储引擎](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]schema/)可以省去您自己搭建数据库、优化数据库查询、编写数据接口等麻烦操作。同时知晓云数据库支持多种类型的数据，如数组类型、地理位置类型、文件类型、对象类型等，并且支持原子操作、批量操作等高级功能。SDK 提供了多种复杂查询支持，包括正则匹配查询，数组查询，甚至是与或的组合查询以及匿名读写功能。

## 创建数据表

* **创建表**

  此过程要求开发者具备基本的数据库知识。

  创建数据表过程一般需要经历如下阶段：

  1. 分析业务需求，抽象数据模型
  2. 将数据模型映射为数据表
  3. 检查所创建的数据表是否能满足整个业务需求
  4. 完善数据表和权限


* **通过 JSON 创建数据表**

  提交参数见下表


  | 名称            | 类型 | 是否必填 | 描述 |
  | -----          | ----- | ----- | ----- |
  | name           | String | 是 | 数据表名称。 |
  | description    | String | 否 | 数据表注释。  |
  | row_write_perm | Array | 是 | 行的默认写权限。<br>`[ "user:anonymous" ]` 所有人可写（临时用户和登录用户）。<br>`[ "user:*" ]` 登录用户可写（不包含匿名用户）。<br>`[ "gid:561" ]` 在分组 561 的用户可写。561 为用户组 ID，可根据实际需要进行更改。<br>`[ "user:{created_by}" ]` 创建者可写。|
  | row_read_perm  | Array | 是 | 行的默认读权限。<br>`[ "user:anonymous" ]` 所有人可读（包含匿名用户和登录用户）。<br>`[ "user:*" ]` 登录用户可读（不包含匿名用户）。 <br>`[ "gid:561" ]` 在分组 561 的用户可读。561 为用户组 ID，可根据实际需要进行更改。<br>`[ "user:{created_by}" ]` 创建者可读。 |
  | write_perm     | Array | 是 | 数据表录入权限。<br>`[ "user:anonymous" ]` 所有人可写（临时用户和登录用户）。<br>`[ "user:*" ]` 登录用户可写（不包含匿名用户）。<br>`[]` 不开放。<br>`[ "gid:561" ]` 在分组 561 的用户可以进行数据录入。561 为用户组 ID，可根据实际需要进行更改。 |
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


* **查看表**

  默认会为每一个知晓云应用（每个知晓云应用均会对应一个小程序）生成 **2 个默认数据表**：

  * **`_userprofile`** 存储用户信息
  * **`_richtextcontent`** 存储富文本数据

  >系统默认创建的数据表以 _ 开头

  以默认数据表为例，查看数据表时，可看到以下基本信息：

  * **tableID** 数据表 ID，配合 Hydrogen SDK 使用
  * **操作栏** 数据表操作栏由一组按钮组合构成，提供常见的数据表操作
  * **表头** 表头结构展示列名、列类型以及位于表头的查询排序操作
  * **表记录** 表记录为当前数据表存储的数据
  * **翻页组件** 当数据表存储的数据超过数据表每页默认展示的记录条数时，开发者可以使用翻页功能查看更多表记录。也可自行设置每页展示的数据记录和跳转到特定页码位置

![查看数据表](/images/dashboard/schema-data-management.png)

## 管理数据表
* **添加列**

  开发者可以通过**添加列**操作来扩展已经存在的数据表。添加列界面如下图所示，各字段说明如下：

  1. **列名称** 列名称不允许以下划线开头。新增数据字段名称。每张数据表均会存在系统内建字段，虽然这些内建字段对开发者不可见，但系统依然会将以下划线开头的列名作为数据表的内建列
  2. **列类型**
  3. **列注释** 描述当前列的行为
  4. **默认值** 为该列设定默认值
  5. **权限**

  > **info**
  > 自定义字段设置为创建者可见时，接口不会返回自定义字段

![添加列](/images/dashboard/schema-add-column.png)

* **控制列展示**

  允许开发者控制数据表字段的展示和隐藏，在数据表字段较多时十分有用。

![控制列展示](/images/dashboard/schema-show-column.png)

* **导入 / 导出**

  开发者可导入 **CSV** 或 **JSON** 格式的数据，可导出 **JSON** 格式数据。导入或导出操作并非实时，会先在知晓云服务端创建定时任务，该任务被执行后才会真正执行导入或导出任务。任务执行完成后用户将会在通知中心和邮件收到相应的提醒和数据。

![导入数据](/images/dashboard/schema-import-data.png)

![导出数据](/images/dashboard/schema-export-data.png)

* **唯一索引设置**

  普通索引（由关键字 KEY 或者 INDEX 定义的索引）的唯一任务是加快对数据的访问速度。

  普通索引允许被索引的数据列包含重复的值。如果能确定某个数据列将只包含彼此各不相同的值，在为这个数据列创建索引的时候就应该用关键字 UNIQUE 把它定义为一个唯一索引。

  知晓云会实时分析数据量级和查询效率，自动为数据表字段增加索引以优化查询效率。因此，开发者不需关心普通索引的创建。在实际业务中，有时需要单个字段的唯一性，甚至多个字段的联合唯一性，此时，就需要对该字段或字段们创建唯一索引。如，报名表，只允许每个用户报名一次，则需要为 created_by 字段创建唯一索引。

  也就是说，唯一索引可以保证数据记录的唯一性。事实上，在许多场合，人们创建唯一索引的目的往往不是为了提高访问速度，而只是为了避免数据出现重复。

![唯一索引设置](/images/dashboard/schema-index-setting.png)

* **查询**

  数据表会根据字段类型、字段含义，为该字段提供可用的查询操作符。一般情况下，不同类型对应的可用查询操作符如下表所示


  | 字段类型 | 支持的查询操作符 |
  | ------- | ------ |
  | id      | =, in, range, !=, not in      |
  | string  | =, in, contains, !=, is null, not in, regex       |
  | integer | =, >, >=, <, <=, in, range, !=, not in, is null       |
  | number  | =, >, >=, <, <=, in, range, !=, not in, is null       |
  | boolean | =, exists                               |
  | array   | =, in, not in, is null, all                              |
  | geojson | center, intersects, nearsphere       |
  | date    | =, >, >=, <, <=, range       |
  | file    | is null    |
  | object    | =, has_key, is null    |
  | pointer    |  =, in, range, !=, not in      |
  ​

  操作符介绍及使用规则


  | 操作符       | 描述 |
  | --------- | ------- |
  | =       |    相等     |
  | <       |    小于    |
  | <=      |    小于等于   |
  | >       |    大于    |
  | >=      |    大于等于     |
  | !=      |    不等于     |
  | in      |    存在于在数组中     |
  | all     |    数组包含给出的所有元素  |
  | contains|    字符串包含   |
  | range   |    范围查询     |
  | regex    |    正则表达式 |
  | not in  |    不存在于在数组中    |
  | is null |    是否为空     |
  | has_key  |    是否存在属性（仅限 Object 类型）     |
  | center  |    请参考[withincircle](../js-sdk/schema/geo.md)  |
  | intersects |  请参考[include](../js-sdk/schema/geo.md)         |
  | nearsphere |  请参考[withinRegion](../js-sdk/schema/geo.md)       |

![数据查询](/images/dashboard/schema-data-query.png)

* **编辑表**

  可对已创建的数据表进行**重命名**、**重置数据表录入权限**、**更新数据行的读写权限**。

![编辑表](/images/dashboard/schema-edit.png)

* **删除表**

  键入数据表名称来删除不再需要的数据表，删除表操作不可恢复。

![删除表](/images/dashboard/schema-delete.png)

## 访问数据表
* **使用表**

  已创建的数据表需要配合 [Hydrogen SDK](/js-sdk/download-sdk.md) 来使用。对开发者而言，在控制台读取到 ``tableID`` 或者 ``tableName``，即可以配合 SDK 来对该数据表进行符合权限的操作。
