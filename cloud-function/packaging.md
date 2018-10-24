# 云函数本地代码打包指南

在本地使用第三方工具将代码打包，可以很方便地将云函数项目工程化。
并且可以引入第三方模块，拓展云函数的功能。
打包后的代码，可用使用[命令行工具](./cli.md)来部署到知晓云。
这里以 [webpack](https://webpack.js.org/) 为例，介绍一下云函数打包方法。

## webpack 配置（版本：webpack@4）

由于 webpack 4 提供了默认配置，所以必要的配置只有以下这几个。
如果需要其他配置，请参照 [webpack 官方文档](https://webpack.js.org/concepts/)。

```js
// webpack.config.js
module.exports = {
  output: {
    path: __dirname,
    filename: 'index.js',
    library: 'exports.main',
    libraryTarget: 'assign',
  },
  target: 'node',
}
```

target 设置为 `'node'`，webpack 会打包生成一个可以运行在 node 环境下的文件（使用 Node.js 自带的 `require` 来引入模块，
并且内置模块不会被打包）。

函数目录下的 `./src/index.js` 为入口文件，
并将打包后的文件默认保存到指定的目录中，这里我们把打包好的文件保存到函数目录下的 `index.js`。

## 项目示例

本示例会在本地创建一个名为 `func_test` 的云函数，并打包、部署到知晓云。

### 项目初始化

1. 在本地创建一个云函数。

  ```
  mincloud new func_test
  ```

  接下来，我们进入 `func_test` 目录。

  ```
  cd func_test
  ```

2. 初始化 package，生成 `package.json` 文件。

  ```
  npm init
  ```

3. 新建 `src` 文件夹，用来存放源码。
接下来会使用 webpack 将 `src` 里的代码，打包并保存到 `func_test` 目录下的 `index.js`。

4. 新建 `webpack.config.js` 文件。

5. 安装 webpack

  使用 npm 安装：

  ```
  npm install -D webpack webpack-cli
  ```
  或者使用 yarn 安装：

  ```
  yarn add webpack webpack-cli
  ```

按上述步骤做完之后，项目文件结构应该是这样子：

```
func_test    // 运行`mincloud new func_test` 生成的云函数目录。
├── index.js    // 运行`mincloud deploy func_test ../`时，会将该文件部署到知晓云。
├── node_modules
├── package.json
├── src    // 源码目录
│   └── index.js     // 入口文件
└── webpack.config.js    // webpack 配置文件
```

### webpack 配置

```js
// webpack.config.js
module.exports = {
  output: {
    path: __dirname,
    filename: 'index.js',
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
    "build": "webpack --mode production",
    "deploy": "mincloud deploy func_test ../"
  },
...
```

### 写代码

默认的入口文件，是 `src/index.js` 文件。
入口文件必须暴露出一个函数，签名为`function (event, callback)`。
打包后，该函数就是云函数的入口函数 `main`。
参数 event、callback 的说明，请参照[云函数文档](./node-sdk/README.md)。

```js
// src/index.js
...   // 可以在这里引入其他模块
module.exports = function (event, callback) {
  ...
}
...
```

### 打包

在项目根目录下执行`npm run build`，即可启动 webpack 进行代码打包。

### 部署

在项目根目录下运行：

```
npm run deploy
```

