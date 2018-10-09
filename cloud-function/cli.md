# ifxc

云函数命令行工具。

## 快速开始

1. 安装运行时 [node.js](https://nodejs.org/)
2. 安装本命令行工具

   通过 npm 安装：

   ```
   $ npm install -g ifxc
   ```

   通过 yarn 安装：

   ```
   $ yarn global add ifxc
   ```

3. 调用

   ```
   $ ifxc
   用法：
    ifxc <command>

   支持的 command 有：
      delete, deploy, invoke, list, login, logout, new

   - ifxc: v1.1.0
   - node: v8.10.0
   ```

## 命令的使用

flag       | 说明
-----------|-------------------------------------
-j, --json | 调用命令成功后，以 json 格式返回结果

### 删除云函数

必须先登录，请参考 `ifxc login`。谨慎操作，此操作会将服务器上的云函数删除。

```
$ ifxc delete <funciton_name>
```

参数          | 必填  | 默认值 |  说明
--------------|-------|--------|-----------------
function_name | 是    | 无     | 已经存在的云函数

### 部署云函数

必须先登录，请参考 `ifxc login`。

```
$ ifxc deploy <function_name> [cloud_function_root] [-m remark]
```

参数                | 必填  | 默认值        |  说明
--------------------|-------|---------------|--------------------------------------------------------------------------
function_name       | 是    | 无            | 云函数名，指定的是 `<funciton_name>.js` 或者 `<function_name>/index.js`
cloud_function_root | 否    | 当前目录 `./` | 用于存放云函数代码的本地目录

flag          | 说明
--------------|------------------------------------
-m, --message | 备注信息


### 调用云函数

必须先登录，请参考 `ifxc login`。

```
$ ifxc invoke <funciton_name> [data]
```

参数          | 必填  | 默认值      |  说明
--------------|-------|-------------|-----------------
function_name | 是    | 无          | 已经存在的云函数
data          | 否    | 空对象 `{}` | JSON 数据

### 列出云函数

必须先登录，请参考 `ifxc login`。

```
$ ifxc list
```

### 登录

使用知晓云[客户端凭证](https://cloud.minapp.com/dashboard/#/app/settings/app/)登录，令牌将保存在本地文件 `.ifxcrc` 中；若过期，请重新登录。

```
$ ifxc login <client_id> <client_secret>
```

参数          | 必填  | 默认值 |  说明
--------------|-------|--------|-----------------------
client_id     | 是    | 无     | 知晓云的客户端 ID
client_secret | 是    | 无     | 知晓云的客户端密钥

### 注销

```
$ ifxc logout
```

### 本地创建一个云函数文件

此命令将创建一个简单的云函数，文件夹即函数名，入口文件即 `<function_name>/index.js`。

```
$ ifxc new <function_name> [cloud_function_root]
```

参数                | 必填  | 默认值        |  说明
--------------------|-------|---------------|--------------------------------------------------------------------------
function_name       | 是    | 无            | 云函数名
cloud_function_root | 否    | 当前目录 `./` | 用于存放云函数代码的本地目录
