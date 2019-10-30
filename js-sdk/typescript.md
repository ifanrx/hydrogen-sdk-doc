# TypeScript

SDK 由 v3.x 开始支持 TypeScript 与自动补全。

![自动补全](/images/typescript/auto-completion.gif)

## 两个使用场景：

### 1. 微信小程序开发工具

  1. 前往[ SDK 下载页面](/js-sdk/download-sdk.md)下载类型定义文件 `baas-wx.d.ts`

  2. 将类型定义文件放至微信小程序 TypeScript 项目的 typings 目录中。

  3. 在 `typings/index.d.ts` 文件中添加引用

    ```js
    /// <reference path="./baas-wx.d.ts" />
    ```
    ![操作步骤](/images/typescript/typescript-in-wx.png)

### 2. 通用场景（跨平台版的类型定义文件，支持微信、支付宝、QQ、Web）

  分为两种情况：

  1. 使用 npm 包

    只需要安装 `minapp-sdk-typings`。如果开发微信小程序项目，
    还可以安装微信提供的类型定义文件 `miniprogram-api-typings`。

    如果编辑器不支持通过 npm 包中的类型定义文件来显示类型提示，
    请参考对应编辑器的文档，并使用情况 2 中的类型定义文件。

    ```
    # 安装 minapp-sdk-typings (选择任意一种)
    npm install --save-dev minapp-sdk-typings
    yarn add -D minapp-sdk-typings

    # 安装 miniprogram-api-typings (选择任意一种)
    npm install --save-dev miniprogram-api-typings
    yarn add -D miniprogram-api-typings
    ```

  2. 使用 baas.d.ts 文件

    1. 前往[ SDK 下载页面](/js-sdk/download-sdk.md)下载类型定义文件 `baas.d.ts`

    2. 将文件放至开发工具能识别到的目录，具体请查看自己使用的编辑器的说明文档。

