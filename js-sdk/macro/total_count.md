{% macro withCountTips() %}
> **info**
> 当数据条目多时，可通过不返回 total_count 提高响应速度。

> SDK v2.x 无法配置是否返回 total_count。

> SDK v3.x 新增了 `withCount` 字段来配置是否返回 total_count，默认为 `false`。

> SDK v3.x 还新增了 `count` 方法，用来查询列表的数量。
{% endmacro %}
