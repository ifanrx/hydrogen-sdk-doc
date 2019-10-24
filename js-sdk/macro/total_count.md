{% macro withCountTips() %}
> **info**
> 当数据条目多时，可通过不返回 total_count 提高响应速度。

> SDK v2.x `withCount` 默认 `true`，v3.x `withCount` 默认 `false`，

> 如果需要查询记录的总数，请使用 `count` 方法。
{% endmacro %}
