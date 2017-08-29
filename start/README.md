# 开始

## 1. 下载并导入 SDK
1. [下载最新版 SDK 到本地](https://dl.ifanr.cn/hydrogen/sdk/sdk-latest.zip)
2. 将第一步获取到的 SDK 文件放在小程序项目目录中
3. 在 `app.js` 中引入 SDK，注意，请将最新的 sdk 版本替换下面代码片段里的 sdk-1.0.9 以确保使用的是最新的 sdk。

```
// app.js
App({
  onLaunch() {
    // require SDK
    require('./sdk-v1.0.9')
  }
})
```

成功引入 SDK 后, 就可以根据本文档的介绍使用 SDK API 来获取知晓云提供的后端云服务了。

## 2. SDK 初始化(客户端认证)

通过初始化 SDK , 知晓云服务可以验证当前的小程序是否是有效合法的，只有通过验证的小程序才能使用 SDK 提供的全部功能

在[知晓云后台 - 我的应用](https://cloud.minapp.com/admin/profile/)页面获取要接入知晓云服务的小程序 ClientID, 按照如下方式进行 SDK 初始化:

```
// app.js
App({
  onLaunch() {
    // 引入 SDK
    require('./sdk-v1.0.9')

    // 初始化 SDK
    wx.BaaS.init(clientID)
  }
})
```

## 3. 创建数据表

完成 1、2 两步工作后, SDK 的配置工作就已完成。现在开发者需要根据自己应用的业务逻辑, 确定所需的数据表。确定好后即可在 [知晓云后台 - 数据管理 - 数据列表](https://cloud.minapp.com/hydrogen/flex/schema/) 页面开始创建数据表的工作:

1. 创建数据表、同时设置表级别 ACL(Access Control List) 此项为数据表中数据记录的默认 ACL 权限。ACL, 又称访问控制列表，是使用以访问控制矩阵为基础的访问控制方法，每一个对象对应一个串列主体。访问控制表描述每一个对象各自的访问控制，并记录可对此对象进行访问的所有主体对对象的权限。（来自维基百科）[点此查看更多 ACL 信息](https://zh.wikipedia.org/wiki/%E5%AD%98%E5%8F%96%E6%8E%A7%E5%88%B6%E4%B8%B2%E5%88%97)

   ![数据表创建界面](/images/start/create-schema.png "数据表创建界面")

2. 成功创建数据表
  在步骤 1 中点击提交按钮成功创建 `book` 数据表后如下图所示: `id`、`created_by`、`created_at`、`updated_at`、`acl` 这 5 个字段为知晓云后端为每个数据表设置的内建字段。内建字段含义如下:


  | 内建字段       | 说明                    | 字段类型   |
  | :--------- | --------------------- | :----- |
  | id         | 数据表记录 ID, 数据库自动生成且自增长 | string |
  | created_by | 当前数据记录的创建者            | int    |
  | created_at | 当前记录创建时间              | int    |
  | updated_at | 当前记录更新时间              | int    |
  | acl        | 当前记录的访问控制             | int    |


   ![数据表成功创建界面](/images/start/book-table.png "数据表成功创建界面")

   > 注: 上图中底部灰色区域注明了当前数据表在 SDK 中的用法。开发者可在 SDK 中使用 tableID 的值来访问该数据表。


3. 为数据表添加列 / 添加字段
   对于一个新创建的数据表, 只包含上述 5 个内建字段。要实现开发者的业务逻辑, 需要使用 dashboard 面板的「添加列」功能来为数据表增加新的字段:


   ![添加列界面](/images/start/add-column.png "添加列界面")添加列时需要填写列名称(数据表字段名称), 指定列类型。知晓云服务目前支持 5 种列类型: `string`、`integer`、`number`、`boolean` 以及 `array`.

   > 注: 当列类型为 `array` 时, 需要填写列表元素类型, 此时列表元素类型不可再为 `array`


## 4. 使用 SDK API 访问数据表
   按照上述步骤创建好业务所需的数据表后, 便可以使用获取到的 tableID 来进行数据表的操作了
