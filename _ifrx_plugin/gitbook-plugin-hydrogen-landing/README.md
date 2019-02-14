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
