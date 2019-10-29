# v2.x -> v3.x 迁移指南

由 v1.x 直接迁移至 v3.x，请先查看 [v1.x -> v2.x 迁移指南](/js-sdk/migrate-from-v1.md)

## v3.x 与 v2.x 比较：

### 不兼容的更新：

批量操作接口默认不返回 `total_count`（v3.x 之前的版本默认返回），
这样可以显著提高接口的响应速度，如果需要 `total_count`，可以设置参数 `withCount` 为 `true`。
另外，推荐使用 `count` 方法来获取数据的总数。

**受影响的接口**：

`BaaS.TableRecord#update(options)` [查看](/js-sdk/schema/update-record.md)

`BaaS.TableRecord#delete(options)` [查看](/js-sdk/schema/delete-record.md)

`BaaS.TableObject#find(options)` [查看](/js-sdk/schema/query.md)

`BaaS.User#find(options)` [查看](/js-sdk/user.md)

`BaaS.ContentGroup#find(options)` [查看](/js-sdk/content/operate.md)

`BaaS.FileCategory#find(options)` [查看](/js-sdk/file/category.md)

`BaaS.File#find(options)` [查看](/js-sdk/file/file.md)

**新增 count 接口**：

`BaaS.TableObject#count()` [查看](/js-sdk/schema/query.md)

`BaaS.User#count()` [查看](/js-sdk/user.md)

`BaaS.ContentGroup#count()` [查看](/js-sdk/content/operate.md)

`BaaS.FileCategory#count()` [查看](/js-sdk/file/category.md)

`BaaS.File#count()` [查看](/js-sdk/file/file.md)

### 其他更新：

1. 支持自定义域名

  v3.x 支持在 SDK init 的时候，指定接口的域名，例如：

  ```js
  wx.BaaS.init('***', { host: 'https://***' })
  ```

  需要先在控制台配置自定义域名

  ![配置自定义域名](/images/host-config.png)

2. 支持 TypeScript

  SDK v3.x 提供了 baas.d.ts 类型定义文件，
  可以在微信开发者工具与 vscode（或其他支持使用 `*.d.ts` 文件做类型提示的开发工具）中更好地使用知晓云 SDK 进行开发。 

  具体使用方式，请查看[文档](/js-sdk/typescript.md)
