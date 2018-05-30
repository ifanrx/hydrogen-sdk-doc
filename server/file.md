# 文档

## 获取文档列表

**接口**

`GET <SHIMO_API>/files`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| folder | String | N   | 请求目录的 GUID，默认仅获取`我的桌面`的内容 |
| level | Number | N   | 是否列出所有文档夹下的子文档（夹），默认为 1，不列出子文档（夹） |
| content | String | N   | 是否返回文档的内容，默认 `false` |
| excerpt | String | N   | 是否返回文档的预览内容，默认 `false` |

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer 716570ab11db4b349051e570ac2dff13'
  }
})
  .then(res => res.json())
  .then(body => console.log(body.data))
```

{% endtabs %}

**返回示例**

```json
{
  "data": [{
    "children": [{
      "is_folder": 0,
      "role": "editor",
      "permissions": {
        "readable": true,
        "editable": true,
        "commentable": true,
        "manageable": false,
        "exitable": false,
        "collaboratorManageable": true,
        "outsiderAddable": true,
        "childFileCreatable": false,
        "shareModeManageable": true,
        "moveable": true,
        "sheetLockable": true,
        "passwordShareable": true,
        "fileAuthSetable": true
      },
      "url": "/docs/gVyjs9BsJYcfCTdZ",
      "isDelete": 0,
      "parentId": 29490972,
      "shareCount": 0,
      "shareMode": "private",
      "teamId": 13,
      "userId": 5073622,
      "updatedAt": "2018-05-29T07:40:18.000Z",
      "updatedBy": 5073622,
      "createdAt": "2018-05-08T09:54:04.000Z",
      "id": 29490984,
      "guid": "gVyjs9BsJYcfCTdZ",
      "name": "无标题",
      "user_id": 5073622,
      "parent_id": 29490972,
      "type": "newdoc",
      "share_mode": "private",
      "team_id": 13,
      "is_delete": 0,
      "created_at": "2018-05-08T09:54:04.000Z",
      "updated_at": "2018-05-29T07:40:18.000Z",
      "updated_by": 5073622,
      "user": {
        "avatar": "https://assets-cdn.shimo.im/static/unmd5/default-avatar-moke.png",
        "isVerified": false,
        "id": 5073622,
        "name": "墨客"
      },
      "updatedUser": {
        "avatar": "https://assets-cdn.shimo.im/static/unmd5/default-avatar-moke.png",
        "isVerified": false,
        "id": 5073622,
        "name": "墨客"
      },
      "Permissions": [{
        "createdAt": "2018-05-08T09:56:22.000Z",
        "role": "editor",
        "owner": false,
        "sharedBy": null,
        "created_at": "2018-05-08T09:56:22.000Z"
      }],
      "Shortcut": null,
      "FileAuthorizedUsers": [],
      "FileMarks": [],
      "desktopShortcuts": [],
      "share_count": 0,
      "collaboratorCount": 3,
      "sharedAt": "2018-05-08T09:56:22.000Z",
      "sortName": ["wu", "biao", "ti"],
      "privilege": {
        "del": false,
        "move": false
      },
      "starred": false,
      "tags": [],
      "mute": false,
      "marked": false,
      "isShortcut": false,
      "hasDesktopShortcut": false
    }],
    "is_folder": 1,
    "role": "editor",
    "permissions": {
      "readable": true,
      "editable": true,
      "commentable": true,
      "manageable": false,
      "exitable": true,
      "collaboratorManageable": true,
      "outsiderAddable": true,
      "childFileCreatable": true,
      "shareModeManageable": true,
      "moveable": true,
      "sheetLockable": true,
      "passwordShareable": true,
      "fileAuthSetable": true
    },
    "url": "/folder/Sb8k0rnl6p83oPuk",
    "isDelete": 0,
    "parentId": 7311509,
    "shareCount": 0,
    "shareMode": "private",
    "teamId": 13,
    "userId": 5073622,
    "updatedAt": "2018-05-29T08:39:13.000Z",
    "updatedBy": 5073622,
    "createdAt": "2018-05-08T09:54:02.000Z",
    "id": 29490972,
    "guid": "Sb8k0rnl6p83oPuk",
    "name": "无标题",
    "user_id": 5073622,
    "parent_id": 7311509,
    "type": "folder",
    "share_mode": "private",
    "team_id": 13,
    "is_delete": 0,
    "created_at": "2018-05-08T09:54:02.000Z",
    "updated_at": "2018-05-29T08:39:13.000Z",
    "updated_by": 5073622,
    "user": {
      "avatar": "https://assets-cdn.shimo.im/static/unmd5/default-avatar-moke.png",
      "isVerified": false,
      "id": 5073622,
      "name": "墨客"
    },
    "updatedUser": {
      "avatar": "https://assets-cdn.shimo.im/static/unmd5/default-avatar-moke.png",
      "isVerified": false,
      "id": 5073622,
      "name": "墨客"
    },
    "Permissions": [{
      "createdAt": "2018-05-08T09:56:22.000Z",
      "role": "editor",
      "owner": false,
      "sharedBy": 5073622,
      "created_at": "2018-05-08T09:56:22.000Z"
    }],
    "Shortcut": null,
    "FileAuthorizedUsers": [],
    "FileMarks": [],
    "desktopShortcuts": [],
    "share_count": 0,
    "collaboratorCount": 3,
    "sharedAt": "2018-05-08T09:56:22.000Z",
    "sortName": ["wu", "biao", "ti"],
    "privilege": {
      "del": false,
      "move": false
    },
    "starred": false,
    "tags": [],
    "mute": false,
    "marked": false,
    "isShortcut": false,
    "hasDesktopShortcut": false,
    "inviteCode": "ABCDEF"
  }],
  "code": 0
}
```

## 创建文档

**接口**

`POST <SHIMO_API>/files`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| name | String | N   | 文档名，默认`无标题` |
| type | String | N   | 文档类型，默认`document` |
| folder   | String | N   | 文档所在的目录 GUID |
| content   | String | N   | 文档内容 |

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer 716570ab11db4b349051e570ac2dff13'
  }
})
  .then(res => res.json())
  .then(body => console.log(body.data))
```

{% endtabs %}

**返回示例**

```json
{
  "data": {
    "is_folder": 0,
    "role": "owner",
    "permissions": {
      "readable": true,
      "editable": true,
      "commentable": true,
      "manageable": true,
      "exitable": false,
      "collaboratorManageable": true,
      "outsiderAddable": true,
      "childFileCreatable": false,
      "shareModeManageable": true,
      "moveable": true,
      "sheetLockable": true,
      "passwordShareable": true,
      "fileAuthSetable": true
    },
    "url": "/docs/JyRX1679PL86rbTk",
    "isDelete": 0,
    "parentId": 0,
    "shareCount": 0,
    "shareMode": "editable",
    "teamId": 13,
    "userId": 4069620,
    "updatedAt": "2018-05-29T09:40:01.000Z",
    "updatedBy": 4069620,
    "createdAt": "2018-05-29T09:06:25.000Z",
    "id": 32347865,
    "guid": "JyRX1679PL86rbTk",
    "name": "无标题",
    "user_id": 4069620,
    "parent_id": 0,
    "type": "newdoc",
    "share_mode": "editable",
    "team_id": 13,
    "is_delete": 0,
    "created_at": "2018-05-29T09:06:25.000Z",
    "updated_at": "2018-05-29T09:40:01.000Z",
    "updated_by": 4069620,
    "user": {
      "avatar": "https://assets-cdn.shimo.im/static/unmd5/default-avatar-moke.png",
      "isVerified": false,
      "id": 4069620,
      "name": "墨客"
    },
    "updatedUser": {
      "avatar": "https://assets-cdn.shimo.im/static/unmd5/default-avatar-moke.png",
      "isVerified": false,
      "id": 4069620,
      "name": "墨客"
    },
    "Permissions": [{
      "createdAt": "2018-05-29T09:06:25.000Z",
      "role": "owner",
      "owner": true,
      "sharedBy": null,
      "created_at": "2018-05-29T09:06:25.000Z"
    }],
    "Shortcut": null,
    "FileAuthorizedUsers": [],
    "FileMarks": [],
    "desktopShortcuts": [],
    "share_count": 0,
    "collaboratorCount": 1,
    "sharedAt": "2018-05-29T09:06:25.000Z",
    "sortName": ["wu", "biao", "ti"],
    "privilege": {
      "del": true,
      "move": true
    },
    "starred": false,
    "tags": [],
    "mute": false,
    "marked": false,
    "isShortcut": false,
    "hasDesktopShortcut": false,
    "inviteCode": "ABCDEF"
  },
  "code": 0
}
```

## 删除文档

**接口**

`DELETE <SHIMO_API>/files/:guid`

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/JyRX1679PL86rbTk', {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer 716570ab11db4b349051e570ac2dff13'
  }
})
  .then(res => res.json())
  .then(body => console.log(body.data))
```

{% endtabs %}

**状态码说明**

`204` 删除成功

> **info**
> 带有内容的文档将会进入回收站，空内容的文档（夹）会彻底删除

## 修改文档信息

**接口**

`PATCH <SHIMO_API>/files/:guid`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| name | String | N   | 修改文档标题 |
| shareMode | String | N   | 文档分享方式 |
| userId | Number | N   | 将文档转让给指定用户 |
| passwordProtected   | Number | N   | 是否启用密码保护 |
| resetPassword   | Number | N   | 是否重置文档密码 |
| content   | String | N   | 新的文档内容 |

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/JyRX1679PL86rbTk', {
  method: 'PATCH',
  headers: {
    'Authorization': 'Bearer 716570ab11db4b349051e570ac2dff13'
  },
  body: JSON.stringify({
    name: '无标题2'
  })
})
  .then(res => res.json())
  .then(body => console.log(body.data))
```

{% endtabs %}

**返回示例**

```json
{
  "data": {
    "is_folder": 0,
    "role": "owner",
    "permissions": {
      "readable": true,
      "editable": true,
      "commentable": true,
      "manageable": true,
      "exitable": false,
      "collaboratorManageable": true,
      "outsiderAddable": true,
      "childFileCreatable": false,
      "shareModeManageable": true,
      "moveable": true,
      "sheetLockable": true,
      "passwordShareable": true,
      "fileAuthSetable": true
    },
    "url": "/docs/JyRX1679PL86rbTk",
    "isDelete": 0,
    "parentId": 0,
    "shareCount": 0,
    "shareMode": "editable",
    "teamId": 13,
    "userId": 4069620,
    "updatedAt": "2018-05-29T09:40:01.000Z",
    "updatedBy": 4069620,
    "createdAt": "2018-05-29T09:06:25.000Z",
    "id": 32347865,
    "guid": "JyRX1679PL86rbTk",
    "name": "无标题2",
    "user_id": 4069620,
    "parent_id": 0,
    "type": "newdoc",
    "share_mode": "editable",
    "team_id": 13,
    "is_delete": 0,
    "created_at": "2018-05-29T09:06:25.000Z",
    "updated_at": "2018-05-29T09:40:01.000Z",
    "updated_by": 4069620,
    "user": {
      "avatar": "https://assets-cdn.shimo.im/static/unmd5/default-avatar-moke.png",
      "isVerified": false,
      "id": 4069620,
      "name": "墨客"
    },
    "updatedUser": {
      "avatar": "https://assets-cdn.shimo.im/static/unmd5/default-avatar-moke.png",
      "isVerified": false,
      "id": 4069620,
      "name": "墨客"
    },
    "Permissions": [{
      "createdAt": "2018-05-29T09:06:25.000Z",
      "role": "owner",
      "owner": true,
      "sharedBy": null,
      "created_at": "2018-05-29T09:06:25.000Z"
    }],
    "Shortcut": null,
    "FileAuthorizedUsers": [],
    "FileMarks": [],
    "desktopShortcuts": [],
    "share_count": 0,
    "collaboratorCount": 1,
    "sharedAt": "2018-05-29T09:06:25.000Z",
    "sortName": ["wu", "biao", "ti", "2"],
    "privilege": {
      "del": true,
      "move": true
    },
    "starred": false,
    "tags": [],
    "mute": false,
    "marked": false,
    "isShortcut": false,
    "hasDesktopShortcut": false,
    "inviteCode": "ABCDEF"
  },
  "code": 0
}
```

## 撰写文档


**接口**

`POST <SHIMO_API>/files/:guid/compose`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| clientId | String | Y   | 当前客户端的唯一 ID |
| rev | String | Y   | 该次改动的版本号 |
| changeset | String | Y   | 对文档的改动 |
| apool   | String | N   | |
| uuid   | String | N   | 该次改动的唯一 ID，用于同步文档改动信息 |
| sync | String | N   | |
| resend   | String | N   | |

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/JyRX1679PL86rbTk', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer 716570ab11db4b349051e570ac2dff13'
  },
  body: JSON.stringify({
  "fileId": "JyRX1679PL86rbTk",
  "clientId": "03caa56f-c900-4e79-b80f-fd050d68be3e",
  "rev": 11,
  "changeset": "[[20,\"H\",\"26:\\\"10676\\\"\"]]",
  "uuid": "888e62a71284483db9c306ae8383b3aa"
  })
})
```

{% endtabs %}

**状态码说明**

`204` 操作成功

## 还原文档


**接口**

`POST <SHIMO_API>/files/:guid/revert`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| docHistoryId | Numbber | Y   |  |
| before | String | N   | 值为 `true` / `false` |
| sync | String | N   | |

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/JyRX1679PL86rbTk/revert', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer 716570ab11db4b349051e570ac2dff13'
  },
  body: JSON.stringify({
    "docHistoryId": 478035
  })
})
```

{% endtabs %}

**返回示例**

```json
{
  "data": null,
  "code": 0
}
```

## 获取文档历史

**接口**

`GET <SHIMO_API>/files/:guid/pull`

> **info**
> 该接口采用长轮询方式持续返回最新的文档历史

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| clientId | String | Y   | 当前客户端的唯一 ID |
| timeout | Numbber | N   | 请求中止的时间，单位为毫秒，默认是 12000 |
| rev | Number | N   | 该接口以此版本号为基础查询新的历史 |
| sync | String | N   | |

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/JyRX1679PL86rbTk/pull?clientId=03caa56f-c900-4e79-b80f-fd050d68be3e&rev=11', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer 716570ab11db4b349051e570ac2dff13'
  }
})
```

{% endtabs %}

**返回示例**

该接口返回的类型是 `text/event-stream`

```
event: changes
data: []

event: ping
data: "pong"
```

## 同步文档离线改动

**接口**

`POST <SHIMO_API>/files/:guid/sync`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| clientId | String | Y   | 当前客户端的唯一 ID |
| rev | Number | N   | 基础版本号 |
| committingCS | String | N   | 待同步的内容 |
| committingApool | String | N   | |
| uuid | String | N   | 该次改动的唯一 ID，用于同步文档改动信息 |
| userCS | String | N   | 用户的 changeset |

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/files/JyRX1679PL86rbTk/sync', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer 716570ab11db4b349051e570ac2dff13'
  },
  body: JSON.stringify({

  })
})
```

{% endtabs %}

**状态码说明**

`204` 操作成功
