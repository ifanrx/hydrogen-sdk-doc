# [ACL - Access control list](https://en.wikipedia.org/wiki/Access_control_list)

ACL, 又称访问控制列表，是使用以访问控制矩阵为基础的访问控制方法，每一个对象对应一个串列主体。访问控制表描述每一个对象各自的访问控制，并记录可对此对象进行访问的所有主体对对象的权限。

就文件系统而言, ACL 指的是文件的操作权限列表。ACL 指定拥有该对象访问权的用户或系统进程, 以及该对象上允许被执行的操作。每一个 ACL 入口均会指定一个主体和操作。例如, 某个文件的 ACL 包含 `{Alice: read, write; Bob: read}`, 则赋予了 Alice 对该文件的读写权限, 而 Bob 只能对该文件执行读操作。

很多类型的系统都实现了 ACL, 例如:
* 文件系统 ACLs
  参考 Unix 文件系统权限
* 网络 ACLs
  路由器、交换机访问
* SQL 实现

数据表中的数据记录也实现了 ACL 访问控制。



