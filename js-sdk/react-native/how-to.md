# React Native 接入指南

> **info**
> react-native >= 0.60.0

## 引入 SDK 并初始化

### a. 安装 npm 包

以下两种方式任选其一

```sh
npm install react-native-minapp-sdk @react-native-community/async-storage --save  // npm
yarn add react-native-minapp-sdk @react-native-community/async-storage  // yarn
```

### b. 安装 CocoaPods 依赖

```
cd ios
pod install
```

### c. 引入 SDK

在[知晓云后台 - 我的应用](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]settings/info/)页面获取要接入知晓云服务的小程序 ClientID, 按照如下方式进行 SDK 初始化:

```js
import BaaS from 'react-native-minapp-sdk';

BaaS.init('[[client_id]]');
```

## 使用 SDK

通过 `BaaS.init(clientID)` 成功初始化 SDK 后，即可使用 SDK 完成数据操作，内容操作等功能了。如下，在控制台创建一张表（参考[控制台操作-数据表](../dashboard/schema.md) 一节），获取其 tableName ，并插入一条数据。

```js
let tableName = 'product'
let Product = new BaaS.TableObject(tableName)
let product = Product.create()

let apple = {
  name: 'apple',
  price: 1,
  desc: ['good'],
  amount: 0
}

product.set(apple).save().then(res => {
  console.log('成功插入数据：', res)
}, err => {
  // err
})
```

更多内容，可查看以下功能模块介绍：

* [数据表](../schema/README.md)
* [内容库](../content/README.md)
