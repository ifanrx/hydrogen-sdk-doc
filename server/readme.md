<!-- ex_nonav -->

# API 服务

* [授权认证](./authentication.md)
* [文档](./file.md)
<!-- * [文档评论](./comment.md) -->
<!-- * [文档讨论](./discussion.md) -->
* [文档 AText](./file_atext.md)
* [文档内容历史](./file_change.md)
* [文档历史](./file_history.md)
* [用户](./user.md)

约定事项：

- `<SHIMO_API>` 指石墨 API 具体的 URL 前缀，如 `https://shimo.im/api`
- API URL 中的参数含义：
  - 以 `:` 开头的参数需要替换为具体资源的对应参数值，如 `files/:guid` 替换为 `files/JyRX1679PL86rbTk`
- API 返回类型默认是 `application/json`
