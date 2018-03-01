# 触发器实战教程

## 触发器介绍
我们打开应用的引擎模块，默认就进入到了触发器模块，这个页面我们可以很方便进行的查询、编辑，禁用等操作。
![](http://oe3m1vy95.bkt.clouddn.com/18-2-7/3275474.jpg)

触发器相关文档请[移步这里](/dashboard/trigger.md)
## 触发类型：数据表
下面我们先以数据表作为触发条件，方便大家实操。
![](http://oe3m1vy95.bkt.clouddn.com/18-2-9/42461106.jpg)
### 邮件模板
#### 准备工作
我们先在数据页面，创建一个product表，然后添加如下一个字段：

|字段名称|类型  |
|--------|----  |
|name    |string|

#### 创建触发器
我们新建一个触发类型为数据表的触发器，条件卡片的配置如下：

|名称    |内容    |
|----    |----    |
|数据表  |product |
|事件类型|create  |
|满足条件|任一    |
|条件一  |name = 1|

接下来我们编辑邮件内容：

|名称    |内容    |
|----    |----    |
|收件人  |test-trigger@ifanr.com |
|邮件标题|您的商品被创建啦    |
|邮件内容 |商品{{name}}被创建啦|

邮件动作填写完成后如下图：
![](http://oe3m1vy95.bkt.clouddn.com/18-2-7/73866365.jpg)

#### 测试触发器
编辑动作完成后点击保存后，我们切换到数据表模块，创建一条数据，name 字段为"我的第一件商品"，如下图：
![](http://oe3m1vy95.bkt.clouddn.com/18-2-7/31707512.jpg)

保存后，检查邮箱，发现收到知晓云发来的邮件了
![](http://oe3m1vy95.bkt.clouddn.com/18-2-7/57241768.jpg)

### 微信模板消息

#### 准备工作
1. 了解 BaaS JS SDK 的使用方法。
2. 绑定小程序。去应用设置页面绑定小程序，如果已经绑定可以忽略此步。
3. 获取 appSecret。
4. 在小程序后台选择微信消息模板。
5. 准备一个小程序用于测试。

如果忘记了appSecret，可以先去微信小程序后台，重置后即可获取 appSecret，如下图：
![](http://oe3m1vy95.bkt.clouddn.com/18-2-7/35478909.jpg)
配置模板消息列表如下图：
![](http://oe3m1vy95.bkt.clouddn.com/18-2-7/44812646.jpg)

#### 创建触发器
我们重新创建一个触发器，这次动作类型选择微信，这时候会出现一个弹窗，要求我们输入小程序的appSecret，如下图：
![](http://oe3m1vy95.bkt.clouddn.com/18-2-7/38955153.jpg)

配置 appSecret完毕后，进入编辑动作页面，填写参数，如下图：
![](http://oe3m1vy95.bkt.clouddn.com/18-2-10/19751164.jpg)

#### 编写小程序代码
保存后，我们打开[微信开发者工具][1]，新建一个小程序项目，开始编写小程序代码。
第一步：在 app.js 引入 [BaaS JS SDK][2]，SDK 文档请[参考这里][3]
![](http://oe3m1vy95.bkt.clouddn.com/18-2-7/68584271.jpg)

第二步：在index.wxml中添加一个form组件，注意这里form组件需要添加 report-submit属性，否则在回调事件对象中无法获取formId。
![](http://oe3m1vy95.bkt.clouddn.com/18-2-7/28564044.jpg)

第三步：在index.js文件中添加addProduct回调，保存数据行，同时提交formId。
![](http://oe3m1vy95.bkt.clouddn.com/18-2-7/43025364.jpg)

最后一步，预览小程序，然后点击添加商品，不一会就可以收到微信模板消息了。
![](http://oe3m1vy95.bkt.clouddn.com/18-2-7/12429227.jpg)
### WebHook
#### 准备工作
搭建一个 HTTP 服务器用于接收 POST 请求。这里以 Node.js 为例，写一个简单的 demo：
1. 准备一台具有公网 IP 的服务器。
2. 安装 Node.js 环境。
3. 在当前目录下新建 `index.js`，并将下方代码块内容粘贴至`index.js`。然后执行`npm i koa jsonwebtoken`，安装依赖包。
```js
// index.js
const Koa = require('koa')
const jwt = require('jsonwebtoken')
const app = new Koa()

/**
 * 解析 POST BODY
 * @param ctx
 * @returns {Promise<any>}
 */
function parsePostData (ctx) {
    return new Promise((resolve, reject) => {
        try {
            let postdata = ''
            ctx.req.addListener('data', (data) => {
                postdata += data
            })
            ctx.req.addListener('end', function () {
                let parseData = postdata
                resolve(parseData)
            })
        } catch (err) {
            reject(err)
        }
    })
}

/**
 * 解析 JWT 数据
 * @param str
 * @param secret
 * @returns {Promise<any>}
 */
function decodeJWT (str, secret) {
    return new Promise(function (resolve, reject) {
        if (secret) {
            jwt.verify(str, secret, (err, decoded) => {
                if (err) return reject(err)
                resolve(decoded)
            })
        } else {
            resolve(Buffer.from(str.split('.')[1], 'base64').toString())
        }
    })
}

app.use(async (ctx, next) => {
    let postData = await parsePostData(ctx)
    let data = await decodeJWT(postData, ctx.query.jwt)
    console.log(ctx.header)
    console.log(data)
    ctx.body = 'ok'
})

app.listen(8088, () => {
    console.log('running...')
})
```
执行`node index.js`，启动 HTTP 服务。

#### 创建触发器
我们新建一个触发类型为数据表的触发器，条件卡片的配置如下

|名称    |内容    |
|----    |----    |
|数据表  |product |
|事件类型|create  |
|满足条件|任一    |
|条件一  |name = 1|

我们数据表`product`为例，在触发器中添加一个 WebHook 动作。
![](http://oe3m1vy95.bkt.clouddn.com/18-2-7/70001420.jpg)

URL 格式如下
```
http://<your ip>:<port>/?jwt=<JWT KEY>
```
示例
```
http://192.168.11.11:8088/?jwt=mehXaWyZXhnzsyWYeUPhWTCOgfjGgdwN
```

####测试触发器
我们在 product 表中创建一行 `name` 字段为 1 的记录，然后在我们搭建的 HTTP 服务器查看输出结果，可以看到我们成功收到了 POST 请求：
![触发器执行成功](http://oe3m1vy95.bkt.clouddn.com/18-2-7/8044111.jpg)

>**info**
>注：这里为了方便演示，将 JWT KEY 放入了query string 中，生成环境不推荐这么操作。


### 数据表操作
#### 准备工作
1. 新建两张数据表：A 表，B 表。A 表用于激活触发器，然后将结果写入 B 表。
2.  在 A表新建一个名称为 name，类型为 string 的字段；在 B 表新建一个名称为 result ，类型为 string 的字段。

#### 创建触发器
我们创建一个触发类型为数据表的触发器。
条件卡片如下：

|名称    |内容     |
|----    |----     |
|数据表  |A        |
|事件类型|create   |
|满足条件|任一     |
|条件一  |name != 1|

接着我们添加一个数据表操作的动作

|名称    |内容    |
|----    |----    |
|动作类型 |数据表操作 |
| 频率     |可重复触发      |
| 数据表  | B            |
| 操作    |创建         |
| 操作1   |result = {{name}} |

![](http://oe3m1vy95.bkt.clouddn.com/18-2-9/91743366.jpg)

>**info**
>注：这里我们使用了模板变量，result = {{name}} 的意思是将数据表 A 中 name 字段赋值给数据表 A 的 result 字段。

#### 测试触发器
我们在数据表 A 中创建一行 name = test123 的记录。
![](http://oe3m1vy95.bkt.clouddn.com/18-2-7/89900278.jpg)
添加成功后，检查数据表 B，发现触发器成功地为我们添加了一行记录
![](http://oe3m1vy95.bkt.clouddn.com/18-2-7/52759154.jpg)


  [1]: https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html
  [2]: https://github.com/ifanrx/hydrogen-js-sdk
  [3]: https://doc.minapp.com/
  [4]: https://mp.weixin.qq.com/debug/wxadoc/introduction/#%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%94%B3%E8%AF%B7%E5%BE%AE%E4%BF%A1%E6%94%AF%E4%BB%98
  [5]: https://github.com/ifanrx/hydrogen-js-sdk
  [6]: https://doc.minapp.com/payment/pay.html
  [7]: https://github.com/ifanrx/hydrogen-demo/tree/master/payment-demo
  [8]: https://github.com/ifanrx/hydrogen-demo/blob/master/payment-demo/config/config.js