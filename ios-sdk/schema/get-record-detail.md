# 获取数据项

只能通过 Table 对象获取一个数据项 Record 实例，Table 对象提供三种获取数据项：

1. createRecord(): 创建一个空的数据项。

2. getWithoutData(recordId: xxxx): 获取一个只有 Id 的数据项。

3. get(recordId) { } : 从知晓云获取指定 Id 的数据项详情。

## 创建一个空的数据项

{% tabs swift0="Swift", oc0="Objective-C" %}
{% content "swift0" %}
```
let record = table.createRecord()
```
{% content "oc0" %}
```
BaaSRecord *record = [table createRecord];
```
{% endtabs %}

该方法常用于新增数据项和批量更新数据，先创建一个空的数据项，并设置记录值。详见 [新增数据项](./create-record.md)

## 获取一个只有 Id 的数据项

{% tabs swift1="Swift", oc1="Objective-C" %}
{% content "swift1" %}
```
let record = table.getWithoutData(recordId: xxxx)
```
{% content "oc1" %}
```
BaaSRecord *record = [table getWithoutDataWithRecordId: xxxx];
```
{% endtabs %}

该方法常用于更新数据项，先获取一个只有 Id 的数据项，并设置记录值。详见 [更新数据项](./update-record.md)

## 获取数据项详情

**示例代码**

{% tabs swift2="Swift", oc2="Objective-C" %}
{% content "swift2" %}
```
let select = ["name", "created_by"]
let expand = ["created_by"]
table.get("5caae446ce8e9e5be81bba48", select: select, expand: expand) { (record, error) in

}
```
{% content "oc2" %}
```
NSArray *select = @[@"color", @"created_by"];
NSArray *expand = @[@"created_by"];
[_table get:@"5ca47715d625d83705971cec" select:select expand:expand completion:^(BaaSRecord * _Nullable record, NSError * _Nullable error) {
                        
}];
```
{% endtabs %}

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| recordId | String | Y  | 记录 Id |
| select | Array<String> |  N  | 指定筛选的字段，详见[数据表 - 字段过滤](./select-and-expand.md)章节 |
| expand | Array<String> |  N  | 指定扩展的字段，详见[数据表 - 字段扩展](./select-and-expand.md)章节 |

**返回结果**

| 名称       | 类型           | 说明 |
| :-------- | :------------  | :------ |
| record   | Record     | 数据项实例, 关于 `Record` 类型查看 [数据类型](./data-type.md) 章节|
| error     | NSError | 错误信息   |

error 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

常见错误：

| 错误码            | 可能的原因      |
|----------------|-----------------|
| 404            | 数据行不存在      |

### 字段过滤与扩展

请参考[数据表 - 字段过滤](./select-and-expand.md)章节

## 访问数据项属性

数据项属性包括内置属性和自定义属性，其中内置属性详见 [Record](./data-type.md) 

**访问内置字段**

{% tabs swift3="Swift", oc3="Objective-C" %}
{% content "swift3" %}
```
record.Id      
record.created_by       
record.created_at      
...                  // 其他内置字段类似方式获取
```
{% content "oc3" %}
```
record.Id  
record.created_by   
record.created_at      
...                   // 其他内置字段类似方式获取
```
{% endtabs %}

**访问自定义字段**

{% tabs swift4="Swift", oc4="Objective-C" %}
{% content "swift4" %}
```
record.get(key: "keyName")
```
{% content "oc4" %}
```
[record getWithKey:@"keyName"];
```
{% endtabs %}

如果访问了不存在的属性，会返回空值。