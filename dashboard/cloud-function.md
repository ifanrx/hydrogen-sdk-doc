# 云函数

该模块允许用户创建、编写运行于知晓云云引擎上的代码。适用于一些对安全性有要求，功能复杂、需求个性化的业务场景。配合触发器可以帮助开发者实现功能复杂的小程序。

## 创建

点击“**添加**”按钮打开创建云函数的弹窗。

知晓云提供了一个名为 Hello World 的基础云函数模板，云函数创建时默认选中。以后会提供更多的其他功能的模板以供用户选择。

![新建云函数](/images/dashboard/cloud-function-add.jpg)

<span class="attention">注：</span>修改后的代码需要点击编辑左下方的“**提交审核**”按钮，保存成功后生效。云函数功能在内测期间免费开放，但上线前需通过审核。编辑器的右下方可以看到当前函数的审核状态。

## 测试

知晓云提供了云函数测试功能，可以方便地调试您的代码。点击云函数面板右上角的“**测试**”按钮即可打开测试弹窗。

![测试弹窗](/images/dashboard/cloud-function/cloud-function-test.jpg)

点击“**函数测试**”可以选择测试云函数的触发源，提供的触发源有：**SDK**、**数据表**、**微信支付**以及**定时任务**。在“**测试参数**”的编辑器中输入您想测试的参数后，点击“**执行**”按钮即可运行您的代码。执行完毕后将在“**执行结果**”栏显示运行结果，由于代码运行需要时间，这与您写的代码有关，所以可能需要等待一段时间。

<span class="attention">注：</span>

1. 测试参数要求输入 JSON 格式，若您的测试参数为空请输入`{}`。
2. 若您在返回执行结果前关闭了测试弹窗，您还可以点击云函数面板右上角的“**任务日志**”按钮，进入日志页面查看任务执行结果。
3. 触发源若选择了数据表或微信支付，会提供对应的默认测试数据，您可以根据您的测试需要进行修改。

## 任务日志

日志面板可以查看该函数的所有调用记录以及运行结果。点击云函数面板右上角的“**任务日志**”按钮即可打开日志面板。

左侧展示了该函数的调用记录，点击任一条任务记录即可在右侧看到该次运行的详细信息。

若记录太多可以利用时间选择器筛选出您想查看的时间范围内的所有调用记录。若想查看某一天的记录只需时间开始、结束均选择同一天即可。

## 监控

监控面板可以查看**调用次数**、**运行时间**以及**错误次数**三个类目的统计数据，开发者能够十分方便、直观地看到函数的运行情况。

点击云函数面板右上角的“**监控**”按钮即可打开监控面板。左上角提供了一些筛选器，供用户进行数据筛选。

## 云代码编写

以 Hello World 模板为例，创建好云函数后在编辑器中可以看到以下代码：

```js
exports.main = function functionName(event, callback) {
  callback(null, "hello world")
}
```

- 参数

  方法默认传递两个参数：`event` 和 `callback`。`event` 对象包含了函数调用的相关信息，包括触发源、参数等。`callback` 是一个回调方法，它接收两个参数，第一个参数是：`Error` 错误信息，第二个参数是返回的运行结果。可以使用 `callback` 为下一云函数或者其他操作传递数据。

- node SDK

  为了方便开发者使用，知晓云提供了 node 版本的 SDK，在您的云代码中可以使用全局的 `BaaS` 对象。下面是查询某个数据表的某条数据的示例代码：

  ```js
  exports.main = function testSchema(event, callback) {
    let tableID = 233
    let recordID = "5a7291050fc321091e97bcdc"
    let table = new BaaS.TableObject(tableID)
    table.find().then((res) => {
      callback(null, res.data)
    }, (err) => {
      callback(err)
    })
  }
  ```

  详细的 node SDK 的文档参见：[云函数 node SDK](../cloud-function/node-sdk/)

- 云代码运行环境

  云代码的运行环境是 node v8.9.0，请以此考虑编写云代码时使用的 `javascript` 语法。

<span class="attention">注：</span>云代码在运行时会直接调用 `main` 方法，并默认传递 `event`、`callback`，因此不能擅自修改 `exports.main = function functionName (event, callback) {}` 的代码结构。

### 使用示例

以下是一个输入 name，输出 “Hello { name }” 的简单示例。

```js
exports.main = function hello(event, callback) {
  // 通过 event 对象获取参数 name
  let name = event.data.name
  console.log(name)
  // return "Hello" + name
  callback(null, "Hello " + name)
}
```

输入以上代码，在测试参数输入`{"name": "John"}`，点击执行可以看到以下结果：

```js
测试结果: 成功
返回结果:
"Hello John"

摘要
任务 ID: 6566eeeac52c4f7290b6b6ccb3c89093
运行时间: 21.07ms
计费时间: 100ms
占用内存:

日志
2018-02-07T02:59:35.144Z LOG event.data:  { name: 'John' }
2018-02-07T02:59:35.150Z LOG John
2018-02-07T02:59:35.150Z LOG return:  Hello John
```

结果说明：

**测试结果**：成功或失败

**返回结果**：若执行结果为成功，该项显示 `callback` 接收到的结果；若执行结果为失败，则显示错误的相关信息。

**摘要**：显示本次代码执行的相关信息：任务 ID、运行时间、计费时间、占用内存。

**日志**：默认会打印出 `event.data` 和 `callback` 接收到的结果。您还可以在云代码中用 `console` 来进行调试。如上日志结果的第二条 `2018-02-07T02:59:35.150Z LOG John` 便是示例代码中 `console.log(name)` 打印出的值。
