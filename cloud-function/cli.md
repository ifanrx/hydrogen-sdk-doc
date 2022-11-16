# 云函数命令行工具使用指南

云函数命令行工具，通过它你可以更方便地在本地进行云函数管理：增删查改；
还可以通过写 shell script，集成到已有的自动化工具中。

## 安装命令行工具

1. 安装 [node.js](https://nodejs.org/) 环境

2. 安装命令行工具 mincloud

   通过 npm 安装：

   ```
   $ npm install -g mincloud
   ```

   通过 [yarn](https://yarnpkg.com/en/docs/install) 安装：

   ```
   $ yarn global add mincloud
   ```

3. 调用

   ```
   $ mincloud
   用法：
    mincloud <command>

   支持的 command 有：
      delete, deploy, invoke, list, login, logout, new, pull

   - mincloud: v1.0.5
   - node: v8.10.0
   ```

## 使用示例

### 创建第一个云函数

1. 打开终端，进入云函数工作目录

   ```
   $ cd /Users/ifanr/demo
   ```

2. 登录

   ```
   $ mincloud login d2****************83 6a************************************22

   登录成功
   ```

   请到
   [知晓云控制台](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]settings/app/)
   查看 `client_id` 和 `client_secret`；如果登录失败，请检查
   `client_id` 和 `client_secret` 是否已经改变。

3. 创建本地文件

   ```
   $ mincloud new greet
   创建成功

   /Users/ifanr/demo/greet
   /Users/ifanr/demo/greet/index.js

   - 函数名：greet
   - 函数根目录: ./
   ```

   默认会创建以下代码：

   ```
   exports.main = function functionName(event, callback) {
     callback(null, "hello world")
   }
   ```

4. 写代码

   这里创建一个简单的云函数，输入名字，返回一句问候。

   ```
   exports.main = function functionName(event, callback) {
     const {
       username
     } = event.data
     callback(null, `您好，${username}！`)
   }
   ```

5. 部署云函数

   ```
   $ mincloud deploy greet

   audit_status:  approved
   created_at:    1539585381
   created_by:
   function_code:
     """
       exports.main = function functionName(event, callback) {
         const {
           username
         } = event.data
         callback(null, `您好，${username}！`)
       }

     """
   id:            1310
   name:          greet
   plan_circle:   P_FREE
   remark:
   updated_at:    1539585381
   updated_by:
   ```

6. 列出云函数状态

   ```
   $ mincloud list

   函数名     状态
   greet approved
   ```

7. 调用云函数

   ```
   $ mincloud invoke greet "{\"username\": \"爱范儿\"}"
   测试结果：成功
     返回结果：
     您好，爱范儿！

   摘要：
     任务 ID：71b1ee3844364f7585f62753cc2207b4
     运行时间：11.97
     计费时间：100
     占用内存：74.84MB

   日志：
     2018-10-15T06:37:40.517Z LOG event.data:  { username: '爱范儿' }
     2018-10-15T06:37:40.520Z LOG return:  您好，爱范儿！
   ```

## 命令的 API

flag       | 说明
-----------|-------------------------------------
-j, --json | 调用命令成功后，以 json 格式返回结果
-e, --env | 可选，表示在指定的环境中执行命令

在知晓云[设置页面](https://cloud.minapp.com/dashboard/#/app/settings/app/)，选择环境，并查看环境 ID。

### 删除云函数

必须先登录，请参考 `mincloud login`。谨慎操作，此操作会将服务器上的云函数删除。

```
$ mincloud delete <funciton_name>
```

参数          | 必填  | 默认值 |  说明
--------------|-------|--------|-----------------
function_name | 是    | 无     | 已经存在的云函数

### 部署云函数

必须先登录，请参考 `mincloud login`。

```
$ mincloud deploy <function_name> [cloud_function_root] [-m remark]
```

参数                | 必填  | 默认值        |  说明
--------------------|-------|---------------|--------------------------------------------------------------------------
function_name       | 是    | 无            | 云函数名，指定的是 `<funciton_name>.js` 或者 `<function_name>/index.js`
cloud_function_root | 否    | 当前目录 `./` | 用于存放云函数代码的本地目录

flag          | 说明
--------------|------------------------------------
-m, --message | 备注信息


### 调用云函数

必须先登录，请参考 `mincloud login`。

```
$ mincloud invoke <funciton_name> [data]
```

参数          | 必填  | 默认值      |  说明
--------------|-------|-------------|-----------------
function_name | 是    | 无          | 已经存在的云函数
data          | 否    | 空对象 `{}` | JSON 数据

### 列出云函数

必须先登录，请参考 `mincloud login`。

```
$ mincloud list
```

### 登录

使用知晓云[客户端凭证](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]settings/app/)登录，令牌将保存在本地文件 `.mincloudrc` 中；若过期，请重新登录。

```
$ mincloud login <client_id> <client_secret>
```

参数          | 必填  | 默认值 |  说明
--------------|-------|--------|-----------------------
client_id     | 是    | 无     | 知晓云的客户端 ID
client_secret | 是    | 无     | 知晓云的客户端密钥

### 注销

```
$ mincloud logout
```

### 本地创建一个云函数文件

此命令将创建一个简单的云函数，文件夹即函数名，入口文件即 `<function_name>/index.js`。

```
$ mincloud new <function_name> [cloud_function_root]
```

参数                | 必填  | 默认值        |  说明
--------------------|-------|---------------|--------------------------------------------------------------------------
function_name       | 是    | 无            | 云函数名
cloud_function_root | 否    | 当前目录 `./` | 用于存放云函数代码的本地目录

### 从服务器上拉取一个已存在的云函数代码到本地

必须先登录，请参考 `mincloud login`。

请谨慎操作，如果本地有此代码文件，将会覆盖。

```
$ mincloud pull <function_name> [cloud_function_root]
```

参数                | 必填  | 默认值        |  说明
--------------------|-------|---------------|--------------------------------------------------------------------------
function_name       | 是    | 无            | 云函数名
cloud_function_root | 否    | 当前目录 `./` | 用于存放云函数代码的本地目录


### 部署运营后台

> **danger**
> CLI 版本要求 >= 1.2.2

必须先登录，请参考 `mincloud login`。

该命令可将本地前端项目部署到运营后台。

```
$ mincloud dashboard-deploy <file_path>
```

参数                | 必填  | 默认值        |  说明
--------------------|-------|---------------|--------------------------------------------------------------------------
file_path           | 是    | 无            | 文件路径，可以是一个目录，或者是一个 zip 文件。如果是 zip 文件，则注意压缩时需把项目根路径压缩，而不是把项目目录文件夹压缩。

flag          | 说明
--------------|------------------------------------
-r, --refresh | 是否刷新管理后台部署地址，取值为：true or false。可为空，默认为 true。
