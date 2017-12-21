# 文件操作

### 文件上传

`wx.BaaS.uploadFile(fileParams)`

##### fileParams 参数说明

| 参数名    | 类型    | 是否必填 | 参数描述      |
| :------- | :----- | :-----: | :------------|
| filePath | String |    Y    | 本地资源路径   |

##### 示例代码

```
wx.chooseImage({
  success: function(res) {
    let fileParams = {filePath: res.tempFilePaths[0]}

    wx.BaaS.uploadFile(fileParams).then((res) => {
      /*
      * 注: 只要是服务器有响应的情况都会进入 success, 即便是 4xx，5xx 都会进入这里
      * 如果上传成功则会返回资源远程地址,如果上传失败则会返回失败信息
      */

      let data = JSON.parse(res.data) // res.data 为 JSON String 类型
    }, (err) => {

    })
  }
})
```

##### 返回示例

JSON.parse(res.data)
```
{
  status: "ok",
  path: "https://cloud-minapp-1131.cloud.ifanrusercontent.com/1e2fVFaWoaoAZPyr.svg",
  file: {
    cdn_path: "1e2fVFaWoaoAZPyr.svg",
    created_at: 1507822469,
    id: "59df8b852ab80e3656cf8783",
    mime_type: "text/plain; charset=utf-8",
    name: "tmp_262601706o6zAJs-pmaywKzqHIvzwU97rtiGIe4dd39171563993cf10b12bae2ac30ec.svg",
    size: 3879
  }
}
```

注：
- file 字段只在 <span style='color:red'> sdk version >= v1.1.1</span> 中出现，其可用于含有 file 类型的数据表的数据操作，详细见 [新增数据记录](../schema/create-record.md)


##### 特别注意
微信开发者工具**录音**结束后生成的是 base64 格式文本文件，而在真机上生成的是正常的 buffer。如果在开发者工具里上传录音文件，实际上传的会是一个 base64 格式的文本文件。因此，如果你在使用知晓云上传录音文件，请在真机上调试。
该问题微信团队已知，并在修复当中。