# 表格评论插件

表格单元格评论插件

## 构造函数

* 用法

  ```js
    var editor = new shimo.sdk.sheet.Editor()
    var comment = new shimo.sdk.sheet.plugins.Comment({
      editor,
      guid: '',
      container: (this.refs.smSpreadsheet as any).querySelector('.sm-comment'),
      currentUser: window.cow.currentUser,
      currentFileId: window.cow.currentFile.id,
      mentionUrl: '/smapi/search',
      usePollingInsteadOfSocket: {
        interval: 1000
      },
      queryCommentOptions: {
        url: `/api/comment/${guid}`,
      },
      deleteCommentOptions: {
        url: `/api/comment/delete/{comment-id}/`,
      },
      closeCommentOptions: {
        url: `/api/comment/closeComments`,
      },
      createCommentOptions: {
        url: `/api/comment/create?target_type=file&guid=${guid}`,
      },
    })

    comment.init()
  ```

* 参数

|名称|类型|默认值|描述|
| -- | -- | -- | -- |
| `options.editor` | `Editor` | 必选 | 编辑器实例 |
| `options.guid` | `String` | 必选 | file 的 guid |
| `options.container` | `HTMLElement` | 必选 | 评论插件宿主容器 |
| `options.currentUser` | `Object` | 必选 | 当前用户信息 |
| `options.currentFileId` | `number` | 可选 | 当前 file id ,用于 mention 模块 |
| `options.mentionUrl` | `string` | 可选 | mention 模块搜索文件／协作者等 api url |
| `options.usePollingInsteadOfSocket` | `Object` | 可选 | 使用轮询而不是 socket 来更新评论列表 |
| `options.usePollingInsteadOfSocket.interval` | `Number` | 必选 | 轮询更新评论列表时间间隔 |
| `options.queryCommentOptions` | `Object` | 必选 | 加载评论列表配置  |
| `options.queryCommentOptions.url` | `Object` | 必选 | 加载评论列表 api url  |
| `options.deleteCommentOptions` | `Object` | 必选 | 删除评论配置。{comment-id} 会被替换成评论的 id |
| `options.deleteCommentOptions.url` | `String` | 必选 | 删除评论 api url |
| `options.closeCommentOptions` | `Object` | 必选 | 结束评论配置 |
| `options.closeCommentOptions.url` | `String` | 必选 | 结束评论 api url |
| `options.createCommentOptions` | `Object` | 必选 | 新建评论配置 |
| `options.createCommentOptions.url` | `String` | 必选 | 新建评论 api url |

