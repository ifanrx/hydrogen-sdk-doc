# 获取内容详情

`wx.BaaS.getContent(OBJECT)`

##### OBJECT 参数说明

| 参数名 | 类型   | 必填 | 描述 |
| :---:  | :----: | :----: |:----: |
| richTextID | Number | 是 | 内容 ID |

##### 请求示例

```
// 获取 内容ID 为 10 的内容详情
let richTextID = 10;
let objects = { richTextID };
wx.BaaS.getContent(objects).then( (res) => {
  // success
}, (err) => {
  // err
});
```

##### 返回参数

| 参数名 | 类型   | 描述 |
| :---:  | :----: | :----: |
|  content  |  String  |  内容详情  |
|  cover  |  String  |  封面图 url  |
|  created_at  |  Number  |  创建时间  |
|  description  |  String  |  摘要  |
|  id  |  Number  |  内容 ID  |
|  title  |  String  |  内容标题  |

##### 返回示例

```
{
  "content": "<p>\b 该片讲述了伊娅不满父亲的恶作剧</p>",
  "cover": "https://cloud-minapp-1131.cloud.ifanrusercontent.com/1donykIpnuvcRiAX.jpg",
  "created_at": 1504152062,
  "description": "超新约全书摘要",
  "id": 1680,
  "title": "超新约全书"
}
```