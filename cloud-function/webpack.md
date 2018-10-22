# 云函数本地代码打包指南

在本地使用第三方工具将代码打包，可以很方便地将云函数项目工程化。
并且可以引入第三方模块，拓展云函数的功能。
打包后的代码，可用使用[命令行工具](./cli.md)来部署到知晓云。
这里以 [webpack](https://webpack.js.org/) 为例，介绍一下云函数打包方法。

## webpack 配置（版本：webpack@4）

由于 webpack 4 提供了默认配置，所以必要的配置只有以下这几个。
&lt;func_name&gt; 是最终生成的文件名，可以自行配置。
如果需要其他配置，请参照 [webpack 官方文档](https://webpack.js.org/concepts/)。

```js
// webpack.config.js
module.exports = {
  output: {
    filename: '<func_name>.js',  // 如未配置，filename 默认为 'main.js'
    library: 'exports.main',
    libraryTarget: 'assign',
  },
  target: 'node',
}
```
webpack 默认会以 `./src/index.js` 为入口文件，
并将打包后的文件默认保存到 `./dist` 目录中。

## 单入口文件示例

这是最简单的单个云函数开发的示例。

### 项目文件结构

```
project_root
├── dist    // webpack 打包后生成的文件夹
│   └── func_test.js    // 打包后的文件，将该文件部署到知晓云即可。
├── package.json
├── src
│   └── index.js      // 入口文件
├── webpack.config.js    // webpack 配置文件
└── yarn.lock
```

### webpack 配置

```js
// webpack.config.js
module.exports = {
  output: {
    filename: 'func_test.js',  // 如未配置，filename 默认为 'main.js'
    library: 'exports.main',
    libraryTarget: 'assign',
  },
  target: 'node',
}
```

### package.json script 配置

```json
// package.json
...
  "scripts": {
    "build": "webpack --mode production"
  },
...
```

### 入口文件

入口文件必须暴露出一个函数，签名为`function (event, callback)`。
打包后，该函数就是云函数的入口函数 `main`。
参数 event、callback 的说明，请参照[云函数文档](./node-sdk/README.md)。
```js
// src/index.js
...
module.exports = function (event, callback) {
  ...
}
...
```

### 打包

在项目根目录下执行`npm run build`，即可启动 webpack 进行代码打包。

## 多入口文件示例

在同时开发多个云函数的时候，需要打包生成多个文件。
这时候就需要用到多入口配置。
配置内容跟单入口基本一致，下面只讲差异部分。

### 项目文件结构

```
project_root
├── dist
│   ├── func_1.js
│   └── func_2.js
├── package.json
├── src
│   ├── func_1.js    // 入口文件 1
│   └── func_2.js    // 入口文件 2
├── webpack.config.js
└── yarn.lock
```

### webpack 配置

```js
// webpack.config.js
module.exports = {
  entry: {  // 入口配置
    func_1: './src/func_1.js',
    func_2: './src/func_2.js',
  },
  output: {
    filename: '[name].js',  // 根据入口文件名称设置文件名
    library: 'exports.main',
    libraryTarget: 'assign',
  },
  target: 'node',
}
```

### 其他配置

其他配置基本与单入口一致。

