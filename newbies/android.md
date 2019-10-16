# 新手入门

## 简介

知晓云是个好用、顺手的开发工具。它免去了小程序开发中服务器搭建、域名备案、数据接口实现等繁琐流程。让您专注于业务逻辑的实现，使用知晓云开发 `Android` 应用，门槛更低，效率更高。

**新手入门**章节将会带领大家如何**从零开始**将知晓云接入 `Android` 应用中。

在本章节中，你将会学到以下内容：

- 知晓云账号注册，创建数据表

- 了解知晓云 `Android SDK` 的使用

- 使用 `Android Stuido` 创建一个接入知晓云 `Android SDK` 的 `Android` 应用

## 知晓云账号注册

### 注册并完成相关信息绑定

前往[知晓云](https://cloud.minapp.com/)注册知晓云账号。

成功注册后，页面将跳转至控制台，需要用户进一步完成**邮箱激活验证**和**企业信息设置**等步骤。

完成以上步骤，即可进入知晓云控制台 `dashboard` 页。

在「设置」-「应用」-「登录方法」里，开通「创建临时匿名用户」、「用户名 + 密码登录」和「邮箱 + 密码登录」。

>**danger**
> 如果注册或邮件激活失败，请开发者根据失败提示进行后续操作。如果开发者认为是服务提供方方面导致的失败，请邮件联系 `mincloud@ifanr.com`，我们会第一时间处理您的邮件。

## 我的书架 Demo

`我的书架` 是一个简单的书架应用，以列表形式展示了存储在知晓云数据表中所有的书籍。

我们以 `我的书架` 为例，讲解如何在 `Android` 中接入知晓云 `Android SDK`。示例代码可以在[这里](https://github.com/magicboylinw/hydrogen-demo/tree/android/android/bookshelf)下载，建议下载代码，一步一步跟着做。

### 创建数据表

我们根据自身应用的业务逻辑，确定所需的数据表，确定好后即可在**知晓云后台 >> 数据管理模块**开始数据表的创建工作。

在**我的书架**应用中，我们将创建一张名为 `bookshelf` 的数据表。打开数据管理模块

![创建表](/images/newbies/table-creation.jpeg)

添加一个名为 `bookName` 的数据列

![添加列](/images/newbies/column-addition.jpeg)

### `Android SDK` 安装与配置

在 app module 的 `build.gradle` 里加入 `Android SDK` 的依赖（比如示例代码里就是 `app/build.gradle`）：

```gradle
dependencies {
    ...
    implementation "com.minapp.android:sdk:0.1.8"
}
```
然后同步项目

### 初始化 `Android SDK`

在应用启动时，需要注册知晓云 `clientId`，`clientID` 可在 dashboard [设置-应用页](https://cloud.minapp.com/dashboard/#/app/settings/info/)中获取。

![复制 clientID](/images/newbies/get-client-id.png)

创建文件 `app/config.properties`，填入 `clientId=你的 clientID`

### 使用 `Android SDK` 获取书籍列表

通过上面的步骤完成了数据表的创建和 `Android SDK` 安装和初始化，接下来就可以通过 `Android SDK` 的 `API` 操作知晓云数据表了。

#### Book

`Book` 类，表示书籍信息，和数据表 `bookshelf` 的记录信息对应。

`Book` 只包含一个属性 `name`，它对应表 `bookshelf` 里的列 `bookName`

```kotlin
/**
 * 领域模块开发，使其继承自 [Record]
 */
class Book: Record {

    constructor(record: Record) : super(record._getTable(), record._getJson())
    constructor() : super()


    /**
     * 对应的，给数据表的每个字段添加 getter/setter
     */
    var name: String?
    get() = getString(NAME)
    set(value) {
        put(NAME, value)
    }

    companion object {

        /**
         * 类似与 orm，把数据表的字段作为常量记录起来，这里相当于 table scheme，方便以后开发而不用常常取后台看数据表有哪些字段
         */
        private const val NAME = "bookName"
        val EMPTY_PLACEHOLDER = Book()
    }
}
```

#### Books

* 定义 `Books`

这里我们定义一个 `Books`，它继承自 `Table`，我们把 `Book` 相关的 `CURD` 操作封装在里面，就像是类型化的 `Table`。

```kotlin
class Books: Table(Const.TABLE_BOOKS) {

    override fun fetchRecord(recordId: String?): Book {
        return Book(super.fetchRecord(recordId))
    }

    override fun fetchWithoutData(id: String?): Record {
        return Book(super.fetchWithoutData(id))
    }

    override fun createRecord(): Book {
        return Book(super.createRecord())
    }
}
```

* 新增一个 `Book` 条目

```kotlin
...
// 这里截取关键代码片段，完整代码在 EditBookViewModel
val record = table.createRecord()
record.name = name
record.save()
...
```

* 获取 `Book` 列表

通过 `Table.query()` 方法，查询得到表 `bookshelf` 的所有行，然后把原始的 `Record` 类型包装为 `Book` 方便后续使用。

```kotlin
...
// 这里截取关键代码片段，完整代码在 BookListDataSource
query.orderBy("-${Record.UPDATED_AT}")
val pagedList = books.query(query).transform { Book(it) }
return pagedList
```

![书籍列表](/images/newbies/android_booklist.jpeg)

至此， 接入 `Android SDK` 的 `Android` 应用，已经完成了，完整的代码可以从[这里](https://github.com/magicboylinw/hydrogen-demo/tree/android/android/bookshelf)下载。

## 最后

通过这个简单的上手 `我的书架`，我们已经学会了知晓云注册、`Android` 应用接入知晓云 `Android SDK`。希望进一步了解 `Android SDK` 的使用，可以点击[这里](https://doc.minapp.com/android-sdk/)。

