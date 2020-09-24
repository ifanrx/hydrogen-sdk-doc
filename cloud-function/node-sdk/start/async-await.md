# 支持 async/await

在正式支持 async/await 之前，云函数（不管是否是 async 函数）通过 callback 函数来将执行结果返回给调用方。
而现在 async 函数可以直接使用 return 将结果返回。

> **info**
> 使用 async + return 时，不要同时使用 callback（除非你对 Node JS 事件循环与 async/await 十分了解），
> 否则可能产生非预期的结果。
>
> 非 async 函数无法使用 return。

> 云函数执行与结果返回机制，请参考[Node.js 事件循环](/cloud-function/node-sdk/start/nodejs-event-loop.md)

## 云函数支持以下两种风格的写法：

1. 使用 callback

  ```javascript
  exports.main = function getProduct(event, callback) {
    let tableName = 'product'
    let recordID = '59897882ff650c0477f00485'
    let Product = new BaaS.TableObject(tableName)
    Product.get(recordID).then(product => {
      callback(null, product)
    }).catch(err => {
      callback(err)
    })
  }
  ```

2. 使用 async + return

  ```javascript
  exports.main = async function getProduct(event) {
    let tableName = 'product'
    let recordID = '59897882ff650c0477f00485'
    let Product = new BaaS.TableObject(tableName)
    return await Product.get(recordID)
  }
  ```

## 返回错误信息

使用 async + return 风格，云函数返回错误信息的方式与 callback 风格有所不同，
区别如下：

1. callback 风格

  ```js
  exports.main = function (event, callback) {
    callback(new Error('error')) // or callback('error')
  }
  ```

  返回值：

  ```js
  {
    error: {
      message: 'error',
      stack: '...',
    },
    code: 1,
    data: null,
  }
  ```

2. async + return 风格

  ```js
  exports.main = async function (event) {
    throw new Error('error')
  }
  ```

  返回值：

  ```js
  {
    error: {
      message: 'error',
      stack: '...',
    },
    code: 1,
    data: null,
  }
  ```

  > **info**
  > async 函数中单独写 return 或 return undefined，将会被忽略。例如：

  ```js
  // 该云函数会执行超时
  exports.main = async function (event) {
    return
  }
  ```

  ```js
  // 该云函数会执行超时
  exports.main = async function (event) {
    return undefined
  }
  ```

  ```js
  // 该云函数会执行并返回 {error: {}, code: 0, data: null}
  exports.main = async function (event) {
    return null
  }
  ```
