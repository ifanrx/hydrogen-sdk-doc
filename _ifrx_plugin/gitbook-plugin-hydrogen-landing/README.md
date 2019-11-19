# 功能介绍

## 导航栏优化

![](./images/WX20190117-145436.png)

## 自动生成多个平台的代码 tab
![](./images/WX20190117-145630.png)

### 使用方式

- 一次只能包裹一个代码块
- 插件会自动将文本中的 wx.BaaS 替换为 my.BaaS 和 window.BaaS，因此在编写公用方法示例时，只写 wx.BaaS.xxx() 即可

{% ifanrxCodeTabs %}
```javascript
wx.BaaS.login()
console.log(123)
```
{% endifanrxCodeTabs %}

## 应用数据注入

在 markdown 中使用符号 `[[<field-name> | <filter>]]` 来插入占位符，例如 `[[app_id]]`、`[[client_id | addSlashPostfixIfNotEmpty]]`

支持的字段有：

| 名称          | 类型    | 默认值              | 描述         |
| :------------ | :------ | :------------------ | :----------- |
| app_id        |	String  |	'{{app_id}}'        | 应用 ID      |
| app_name      |	String  |	'{{app_name}}'      |	应用名称     |
| client_id     |	String  |	'{{client_id}}'     |	Client ID    |
| enterprise_id |	String  |	'{{enterprise_id}}' |	企业 ID      |
| isBaasLogined |	Boolean |	false               |	是否已经登录 |

支持的 filter:

| 名称                      | 描述                 |
| :------------------------ | :------------------- |
| addSlashPostfixIfNotEmpty |	非空情况下，添加 ‘/’ |

### 使用举例

#### 1. 普通文本

  markdown：

  ```javascript
  wx.BaaS.init([[client_id]])
  ```

  通过 JS 处理后在页面中的结果（已登录）：

  ```html
  <pre><code class="lang-js">
    wx.BaaS.init('9ed06615381bae89790f')
  </code></pre>
  ```

  通过 JS 处理后在页面中的结果（未登录）：

  ```html
  <pre><code class="lang-js">
    wx.BaaS.init('{{client-id}}')
  </code></pre>
  ```


#### 2. 链接

  markdown：

  ```
  在[[[app_name]] - 设置](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]settings/info/])页面...
  ```

  > 'addSlashPostfixIfNotEmpty' 为了防止在未登录的情况下，插入一个空的 id，造成控制台显示应用不存在的提示。

  通过 JS 处理后在页面中的结果（已登录）：

  ```html
  <p>在<a href="https://cloud.minapp.com/dashboard/#/app/75/settings/info/]" target="_blank">应用名称 - 设置</a>页面...</p>
  ```

  通过 JS 处理后在页面中的结果（未登录）：

  ```html
  <p>在<a href="https://cloud.minapp.com/dashboard/#/app/settings/info/]" target="_blank">{{app-name}} - 设置</a>页面...</p>
  ```

#### 3. 通过判断是否已经登录来渲染内容

  markdown：

  ```
  在[[[app_name]] - 设置]([[ isBaasLogined ? 'https://cloud.minapp.com/dashboard/#/app/settings/info/' : 'https://cloud.minapp.com/dashboard/#/app/' + app_id + 'settings/info/' ]])页面...
  ```

  通过 JS 处理后在页面中的结果（已登录）：

  ```html
  <p>在<a href="https://cloud.minapp.com/dashboard/#/app/75/settings/info/]" target="_blank">应用名称 - 设置</a>页面...</p>
  ```

  通过 JS 处理后在页面中的结果（未登录）：

  ```html
  <p>在<a href="https://cloud.minapp.com/dashboard/#/app/settings/info/]" target="_blank">{{app-name}} - 设置</a>页面...</p>
  ```

#### 4. vue@1.0.28 支持的模版语法

  markdown：

  ```html
  <div v-if="isBaasLogined">
    [[app_name]]
  </div>
  ```

  通过 JS 处理后在页面中的结果（已登录）：

  ```html
  <div>
    应用名称
  </div>
  ```

  通过 JS 处理后在页面中的结果（未登录）：

  ```html

  ```
