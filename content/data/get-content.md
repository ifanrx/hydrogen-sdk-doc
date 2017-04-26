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
| id | Number | 内容 ID |
| title   | String     | 内容标题     |
| content   | String      | 内容详情     |
| created_at   | Number      | 创建时间     |

##### 返回示例

```
{
   "content": "VBdlylMjvFhfquXlTmvmBTuDlmtPGdosLhvTmLnlhJtviQInPIKYjiFMbkeViWJb",
   "created_at": 1486138375,
   "id": 3,
   "title": "KHuIDZCCREBiUviv"
}
```
