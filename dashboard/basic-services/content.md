# 内容

内容库是知晓云提供的内置 CMS 服务。配合用户组访问权限控制, 实现内容的分发。在内容库界面, 开发者可以分类管理内容，实现内容的精细化组织，更可以对内容进行增删查改。 在配合 SDK API 一同使用即可在小程序中快速渲染内容。

## 相关概念

使用内容服务前，你需要了解以下概念。

* 内容库：内容库是管理内容的容器
* 内容：内容指的是由开发者创建的一条完整表意的内容信息。比如一篇文章, 一篇报道等等。

## 基础操作
### 创建内容库

![创建内容库](/images/dashboard/basic-services/add-content-group.png)

开发者可在知晓云后台内容模块点击"添加"按钮来创建一个内容库。如果开发者已经对用户进行过分组, 创建内容库的同时还可以通过选择用户分组来设置该内容库的访问权限。

### 添加/编辑内容

![添加/编辑内容](/images/dashboard/basic-services/edit-content.png)

开发者可以直接在管理后台添加文章内容，知晓云提供了如标题、分类、描述等常见字段。并支持开发者自助扩展所需要的字段。开发者只需要在内置数据表表 _richtextcontent 中【添加列】后刷新当前页面即可。

<span class="attention">注：</span>

* 内容编辑器会过滤掉多余的空格，如果需要保留空格的部分内容，可以使用插入代码的方法来插入。如下图所示：

![添加/编辑内容](/images/dashboard/basic-services/edit-content-note.png)

### 添加分类

![添加分类](/images/dashboard/basic-services/add-classify.png)

开发者可以在同一个内容库下添加多个分类，并关联内容，实现精细化运营。注意分类与内容为多堆多的关系。

如需编辑或删除分类，请将光标移动到对应分类上，点击对应图标即可完成对应操作。

### 编辑内容库

![编辑内容库](/images/dashboard/basic-services/edit-content-group.png)

可对已创建的内容库进行重命名、重置内容库访问权限。

### 删除内容库

![删除内容库](/images/dashboard/basic-services/delete-content-group.png)

内容库删除后，原内容库里的所有内容都会被删除，且该操作不可恢复。故操作前需要开发者填写要删除的内容库名进行二次确认。

###  列展示

![列展示](/images/dashboard/basic-services/content-display-column.png)

允许开发者控制数据表字段的展示和隐藏，在数据表字段较多时十分有用。

### 开通阅读数统计

![开通阅读数统计](/images/dashboard/basic-services/open-content-visit-count.png)

知晓云提供了文章阅读数统计功能，开发者无需额外开发，开通后即可通过[获取内容接口]()实时获取文章的阅读数。该服务目前仅提供给个人版及以上版本用户。