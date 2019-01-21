# 渲染内容

WEB 只需通过设置 DOM 节点的 innerHTML 属性，进行富文本的渲染。 

**示例代码**
```javascript
let MyContentGroup = new window.BaaS.ContentGroup('1538043206670160')
MyContentGroup.getContent('1538043730653679').then(res=>{
  let node = document.createElement('div')
  node.innerHTML = res.data.content
  document.body.appendChild(node)
})
```