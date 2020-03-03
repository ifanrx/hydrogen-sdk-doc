# Node.js 事件循环

由于 Node.js 大量采用了异步事件循环的方式处理回调，在云函数中运行代码时，同样支持异步事件。
在入口函数中调用 callback 或 return 后，云函数后台会等待事件队列为空后才返回。

因此，如下代码：

```javascript
exports.main = function(event, callback) {
  console.log("before callback");
  setTimeout(
    function(){
      console.log(new Date);
      console.log("timeout before callback");
    },
    500
  );
  callback(null, "success callback");
  console.log("after callback");
};
```

实际日志输出结果为：

```
2020-03-03T04:07:38.662Z LOG event.data:  {}
2020-03-03T04:07:38.663Z LOG before callback
2020-03-03T04:07:38.664Z LOG return:  { error: {}, code: 0, data: 'success callback' }
2020-03-03T04:07:38.669Z LOG after callback
2020-03-03T04:07:39.165Z LOG 2020-03-03T04:07:39.165Z
2020-03-03T04:07:39.165Z LOG timeout before callback
```
