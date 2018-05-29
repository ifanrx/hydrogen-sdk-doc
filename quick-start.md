# 快速开始

在本章节中，你将会学到如何使用石墨 SDK 的核心组件**编辑器**来获取和更新文档内容。

> **info**
> 表格和幻灯片编辑器的初始化逻辑和文档的基本一致，但可能存在部分差异化的参数；
> 文档内容采用的格式为石墨专用内容格式，不支持自定义格式。

## 主要步骤：
1. 引入 JavaScript 文件；
2. 初始化编辑器实例并渲染到 DOM；
3. 获取和设置文档内容；

```html
<!DOCTYPE html>
<html>
<head>
  <!-- 引入 JavaScript 文件 -->
  <script src="./shimo-sdk.document.js"></script>
  <script>
  document.addEventListener("DOMContentLoaded", function () {
    // 初始化编辑器
    var editor = new window.shimoSDK.Document()
    // 渲染编辑器到 DOM
    editor.render(document.querySelector('#editor'))
    // 设置文档内容
    editor.setContent('[[20,"tom","26:\"28\""],[10,"\n","line:\"init\""]]')
    // 获取文档内容
    editor.getContent().then(function (content) {
      console.log('get content', content)
    })
  })
  </script>
</head>
<body>
  <div id="editor" style="width: 600px; height: 400px"></div>
</body>
</html>
```

## 更多

本章节主要介绍如何使用石墨 SDK 的编辑器来初始化一个文档。

石墨 SDK 提供了一系列的插件，使用这些插件，结合后端服务的支持，可以实现强大的多人实时协作。

