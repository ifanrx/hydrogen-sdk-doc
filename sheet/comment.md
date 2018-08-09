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
        url: `/api/comment/delete/{comment-id}`,
      },
      closeCommentOptions: {
        url: `/api/comment/closeComments`,
        method: 'POST'
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
| `options.queryCommentOptions.method` | `GET` | 可选 | 加载评论列表 api method |
| `options.deleteCommentOptions` | `Object` | 必选 | 删除评论配置。{comment-id} 会被替换成评论的 id |
| `options.deleteCommentOptions.url` | `String` | 必选 | 删除评论 api url |
| `options.deleteCommentOptions.method` | `POST` | 可选 | 删除评论 api method |
| `options.closeCommentOptions` | `Object` | 必选 | 结束评论配置 |
| `options.closeCommentOptions.url` | `String` | 必选 | 结束评论 api url |
| `options.closeCommentOptions.method` | `POST` | 可选 | 结束评论 api method |
| `options.createCommentOptions` | `Object` | 必选 | 新建评论配置 |
| `options.createCommentOptions.url` | `String` | 必选 | 新建评论 api url |
| `options.createCommentOptions.method` | `POST` | 可选 | 新建评论 api method |

## 方法列表

### init

初始化评论数据处理和列表实例

* 返回 无
* 用法 `comment.init()`
* 参数 无

### initModel

初始化评论数据处理实例, 该实例可操作评论 changeset, 请求评论数据，修改评论框样式，绑定／触发自定义事件

* 返回 `CommentModel`
* 用法 `comment.initModel()`
* 参数 无

#### query

获取表格内评论列表. 将触发 loadComments 事件

* 返回 `Promise`
* 用法 
```
  comment.commentModel.query()
  comment.commentModel.on('loadComments', (commentList) => {})
```
* 参数 无

#### start

开始单元格评论，给单元格添加评论框, 将触发 startComment 事件

* 返回 

```
result: {
  message: 'message'
  type: 'success' | 'error'
}
```

* 用法 
```
comment.commentModel.start({
  sheet: editor.spread.getActiveSheet().gcSheet,
  row: 0, 
  col: 0
  })
comment.commentModel.on('startComment', ({
  cell: {row, col},
  commentList, // 当前评论列表
  cellComment // 当前单元格评论
}) => {})
```
* 参数

|名称|类型|默认值|描述|
| ------------------- | ------------- | ------ | ------------ |
| `sheet`   | `gcSheet`      | 必选     | 开始评论的表格 |
| `row`   | `Number`      | 必选     | 单元格所在行|
| `col`   | `Number`      | 必选     | 单元格所在列 |

#### create

添加单元格评论

* 返回 `Promise`
* 用法 
```
const commentId = comment.commentModel.genCommentId()
comment.commentModel.create({
  comment: {
    selection_guid: 'comment-8aQPn06tRflVNoMR',
    selectionGuid: 'comment-8aQPn06tRflVNoMR',
    comment_guid: commentId,
    commentGuid: commentId,
    content: '这是一条评论',
    created_at: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    selection_title: editor.spread.getActiveSheet().gcSheet.guid() || '',
    selectionTitle: editor.spread.getActiveSheet().gcSheet.guid() || '',
    user_id: window.cow.currentUser.id,
    userId:  window.cow.currentUser.id,
  },
  row: 0,
  col: 0,
  user: window.cow.currentUser
})
```

* 参数

|名称|类型|默认值|描述|
| ------------------- | ------------- | ------ | ------------ |
| `comment`   | `CommentItem`      | 必选     | 添加的单元格评论 |
| `comment.selection_guid`   | `String`      | 可选     | 单元格评论列表 id |
| `comment.comment_guid`   | `String`      | 必选     | 单元格评论 id |
| `comment.content`   | `String`      | 必选     | 单元格评论内容 |
| `comment.created_at`   | `String`      | 必选     | 单元格评论创建时间 |
| `comment.selection_title`   | `String`      | 必选     | 当前表格 sheet id |
| `comment.user_id`   | `String`      | 必选     | 当前用户 id |
| `row`   | `Number`      | 必选     | 当前行 |
| `col`   | `Number`      | 必选     | 当前列 |
| `user`   | `Number`      | 必选     | 当前用户信息 |

#### delete

删除单元格评论

* 返回 `Promise`
* 用法 `comment.commentModel.delete('eziY3FgYc2DUVouu')`
* 参数

|名称|类型|默认值|描述|
| ------------------- | ------------- | ------ | ------------ |
| `commentId`   | `String`      | 必选     | 删除单元格评论 id |

#### close

结束单元格评论

* 返回 `Promise`
* 用法 
```
comment.commentModel.close({
  sheet: editor.spread.getActiveSheet(),
  row: 0,
  col: 0
})
```

* 参数

|名称|类型|默认值|描述|
| ------------------- | ------------- | ------ | ------------ |
| `sheet`   | `Sheet`      | 必选     | 当前表格 |
| `row`   | `Number`      | 必选     | 当前行 |
| `col`   | `Number`      | 必选     | 当前列 |

#### cancel

取消单元格评论，删除单元格评论样式

* 返回 `void`
* 用法 
```
comment.commentModel.cancel({
  sheet: editor.spread.getActiveSheet(),
  row: 0,
  col: 0
})
```

* 参数

|名称|类型|默认值|描述|
| ------------------- | ------------- | ------ | ------------ |
| `sheet`   | `Sheet`      | 必选     | 当前表格 |
| `row`   | `Number`      | 必选     | 当前行 |
| `col`   | `Number`      | 必选     | 当前列 |

#### 自定义事件 updateComment

当评论列表发生变化时发生此事件，可监听此事件获取最新评论列表
* 用法
```
comment.commentModel.on('updateComment', (commentList) => {})
```

### initList

初始化评论列表实例

* 返回 `CommentList`
* 用法 `commentList = comment.initList()`
* 参数 无
