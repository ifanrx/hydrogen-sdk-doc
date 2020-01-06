{% macro withCountTips() %}
> **info**
> `withCount` 设为 `false`，接口返回的数据中不包含 total_count，
> 当数据条目多时，可通过不返回 `total_count` 提高响应速度。
> 如果需要查询记录的总数，请使用 `count` 方法。
>
> SDK v2.x `withCount` 的默认值为 `true`，SDK v3+ `withCount` 的默认值为 `false`
{% endmacro %}
