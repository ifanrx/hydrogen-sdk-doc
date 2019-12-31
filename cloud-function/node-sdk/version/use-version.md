# SDK 版本指定与查看当前版本号

## 指定版本号

`BaaS.useVersion(version)`

### 参数说明

| 参数    | 类型   | 必填 | 说明  |
| :------ | :----- | :--- | :---- |
| version | String | 是   | 版本号，例如 `v3.2`，请查看 [SDK 可用版本与更新日志](/cloud-function/node-sdk/version/changelog.md) |

> **info**
> 1. 只允许由低版本向高版本切换
>
> 2. 推荐在代码入口处指定版本号

### 示例代码
```javascript
BaaS.useVersion('v3.2')

exports.main = function (event, callback) {
  console.log(BaaS.VERSION) // 3.2.x
  ...
}
```

## 获取当前版本号

`BaaS.VERSION`

### 示例代码
```javascript
BaaS.useVersion('v3.2')

exports.main = function (event, callback) {
  console.log(BaaS.VERSION) // 3.2.x
  ...
}
```
