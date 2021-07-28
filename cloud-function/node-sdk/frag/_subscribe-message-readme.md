{% if platform == 'wechat' %}
微信
{% elif platform == 'qq' %}
QQ
{% elif platform == 'kuaishou' %}
快手

{% endif %}
* [发送订阅消息消息](./subscribe-message.md)
{% if platform != 'kuaishou' %}
* [获取可用订阅记录数量](./subscribe-message-ticket.md)
{% endif %}
