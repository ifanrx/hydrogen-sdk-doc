# SDK 可用版本与更新日志

下文所列出的标记为 `[M]` 的更新均为不兼容更新。升级 SDK 版本时，请参照更新日志调整代码。

## 3.2 (2019-01-02)
1. ### [M] `UserRecord#setAccount` 返回整个 `_userprofile`。
2. ### [M] `withCount` 默认为 false。

  数据查询与批量操作时，支持通过设置 `withCount` 为 `false` (不返回 `total_count`) 来提高响应速度。
  v2.x `total_count` 默认值为 `true`，v3+ 默认为 `false`。

  **受影响的接口**：

  `BaaS.TableRecord#update(options)` [查看](/cloud-function/node-sdk/schema/update-record.md)

  `BaaS.TableRecord#delete(options)` [查看](/cloud-function/node-sdk/schema/delete-record.md)

  `BaaS.TableObject#find(options)` [查看](/cloud-function/node-sdk/schema/query.md)

  `BaaS.User#find(options)` [查看](/cloud-function/node-sdk/user.md)

  `BaaS.Content#find(options)` [查看](/cloud-function/node-sdk/content/content.md)

  `BaaS.FileCategory#find(options)` [查看](/cloud-function/node-sdk/file/file-category.md)

  `BaaS.File#find(options)` [查看](/cloud-function/node-sdk/file/file.md)

  **新增 count 接口**：

  `BaaS.TableObject#count()` [查看](/cloud-function/node-sdk/schema/query.md)

  `BaaS.User#count()` [查看](/cloud-function/node-sdk/user.md)

  `BaaS.Content#count()` [查看](/cloud-function/node-sdk/content/content.md)

  `BaaS.FileCategory#count()` [查看](/cloud-function/node-sdk/file/file-category.md)

  `BaaS.File#count()` [查看](/cloud-function/node-sdk/file/file.md)

3. ### [A] `pointer` 展开时，支持指定返回的属性 [查看](/cloud-function/node-sdk/schema/select-and-expand.md)。

## 2.x (默认版本)
