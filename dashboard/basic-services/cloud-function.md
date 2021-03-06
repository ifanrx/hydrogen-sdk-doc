# 云函数
该模块允许用户创建、编写运行于知晓云云引擎上的代码。编写好的代码在一个专属的容器内运行。调用方式包括触发器事件触发、客户端请求调用、云函数内调用等。适用于一些对安全性有要求，功能复杂、需求个性化的业务场景。目前仅支持 Node 12 环境。

## 基础操作

### 创建云函数

![创建云函数](/images/dashboard/basic-services/create-cloud-function.png)

点击「添加」按钮打开创建云函数的弹窗。   
知晓云提供了发送模板消息、图片转换、数据表统计、抽奖等多个云函数模板供你参考。

### 测试云函数

![测试云函数](/images/dashboard/basic-services/cloud-function-test.png)
![测试云函数](/images/dashboard/basic-services/cloud-function-test2.png)

知晓云提供了云函数测试功能，可以方便地调试您的代码。点击云函数面板右上角的「测试」按钮即可打开测试弹窗。

点击“函数测试”可以选择测试云函数的触发源，提供的触发源有：SDK、数据表、微信支付以及定时任务。在“测试参数”的编辑器中输入您想测试的参数后，点击“执行”按钮即可运行您的代码。执行完毕后将在“执行结果”栏显示运行结果，由于代码运行需要时间，这与您写的代码有关，所以可能需要等待一段时间。

> **Info**
> 测试参数要求输入 JSON 格式，若您的测试参数为空请输入{}。   
> 若您在返回执行结果前关闭了测试弹窗，您还可以点击云函数面板右上角的「任务日志」按钮，进入日志页面查看任务执行结果。   
> 触发源若选择了数据表或微信支付，会提供对应的默认测试数据，您可以根据您的测试需要进行修改。

### 查看任务日志

![查看任务日志](/images/dashboard/basic-services/cloud-function-log.png)

日志面板可以查看该函数的所有调用记录以及运行结果。点击云函数面板右上角的「任务日志」按钮即可打开日志面板。

左侧展示了该函数的调用记录，点击任一条任务记录即可在右侧看到该次运行的详细信息。   
若记录太多可以利用时间选择器筛选出您想查看的时间范围内的所有调用记录。若想查看某一天的记录只需时间开始、结束均选择同一天即可。

### 监控

![监控](/images/dashboard/basic-services/cloud-function-monitoring.png)

监控面板可以查看`调用次数`、`运行时间`以及`错误次数`三个类目的统计数据，开发者能够十分方便、直观地看到函数的运行情况。点击云函数面板右上角的「监控」按钮即可打开监控面板。

点击云函数面板右上角的“`监控`”按钮即可打开监控面板。左上角提供了一些筛选器，供用户进行数据筛选。

### 更多

[点击阅读更多云函数细节](/cloud-function/node-sdk/)
