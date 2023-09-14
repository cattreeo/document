# MySQL 基础篇

## JDBC-MySQL8 配置

1. 引用外部库  mysql-connector-java-8.0.版本的 jar
2. jdbc 驱动类：com.mysql.jdbc.Driver   改成 com.mysql.cj.jdbc.Driver
3. jdbcUrl：jdbc:mysql://{ip}:{port}/{db}?characterEncoding=utf8&useSSL=false&serverTimezone=UTC&rewriteBatchedStatements=true

## 数据库的创建和增删改查

### 操作表 user

| id  | username | password |
| --- | -------- | -------- |
| 1   | user1    | 123      |
| 2   | user2    | 123      |
| 3   | user3    | 123      |

### 1.数据类型

```sql
char(n)			长度为n的字符型
varchar(n)		长度为n的变长字符型
number(n)		长度为n的数字型
int				长整型
smallint		短整型
bigint			大整型
flaot(n)		精度至少为n位数字的浮点型
date			日期，格式为YYYY-MM-DD
time			时间，格式为HH:MM:SS
```

### 2.创建表

```sql
create table user
(
  id int not null primary key auto_increment,
  username varchar(10),
  password varchar(10)
);

not null -- 非空
primary key  -- 主键
auto_increment  -- 自增长
```

### 3.查询

```sql
select * from 表名  -- 查询全部
select 列名[,列名,列名,···,列名] from 表名  -- 查找一列数据
select * from 表名 where 列名=值  -- 按条件查找
select 列名[,列名,列名,···,列名] from 表名 where 列名=值  -- 按条件查找查找一列数据

eg. select * from user
	select username from user
	select * from user where id=1
	select username from user where id=1
```

### 4.插入

```sql
insert into  表名 values('','','',···,'')  -- 按顺序插入
insert into  表名(列名,列名,···,列名) values('','','',···,'')  -- 按列插入

eq. insert into user values('1','user','123')
	insert into user(username,password) values('user','123')
```

### 5.删除

```sql
delete from 表名 where 列名=值
delete from 表名 where 列名 in (值1,值2,...,值n)

eq. delete from user where id=1
	delete from user where id in (1,2,5)
```

### 6.修改

```sql
update 表名 set 列名1=值1[, 列名2=值2, ··· ,列名n=值n] where 列名=值

eq. update user set user='user0' where id=1
```

## DDL

Data Definition Language，数据定义语言，用来定义数据库对象(数据库，表，字段) 。

### 数据库操作

1. 查询所有数据库

```sql
-- 查询所有数据库
show databases;
```

2. 查询当前数据库

```sql
-- 查询当前数据库
selectdatabase();
```

3. 创建数据库

```sql
-- 创建数据库
create database [ if not exists ] 数据库名 [ default charset 字符集 ] [ collate 排序规则 ];
```

4. 删除数据库

```sql
-- 删除数据库
drop database [ if exists ] 数据库名;
```

5. 切换数据库

```sql
-- 切换数据库
use 数据库名;
```

### 表操作

1. 查询当前数据库所有表

```sql
-- 查询当前数据库所有表
show tables;
```

2. 查看指定表结构

```sql
-- 查看指定表结构
desc 表名;
```

3. 查询指定表的建表语句

```sql
--查询指定表的建表语句
show create table 表名;
```

4. 创建表结构

```sql
-- 创建表结构
create table 表名(
  字段1 字段1类型 [ comment 字段1注释 ],
  字段2 字段2类型 [ comment 字段2注释 ],
  字段3 字段3类型 [ comment 字段3注释 ],
  ...
  字段n 字段n类型 [ comment 字段n注释 ]
) [ comment 表注释 ];
```

#### 表操作-修改

1. 添加字段

```sql
-- 添加字段
alter table 表名 add 字段名 类型(长度) [ comment 注释 ] [ 约束 ];
```

2. 修改数据类型

```sql
-- 修改数据类型
alter table 表名 modify 字段名 新数据类型(长度);
```

3. 修改字段名和字段类型

```sql
-- 修改字段名和字段类型
alter table 表名 change 旧字段名 新字段名 类型(长度) [ comment 注释 ];
```

4. 删除字段

```sql
-- 删除字段
alter table 表名 drop 字段名;
```

5. 修改表名

```sql
-- 修改表名
alter table 表名 rename to 新表名;
```

#### 表操作-删除

1. 删除表

```sql
-- 删除表
drop table [ if exists ] 表名;
```

2. 删除指定表，并重新创建表

```sql
-- 删除指定表，并重新创建表
truncate table 表名;
```

## DML

DML 英文全称是 Data Manipulation Language(数据操作语言)，用来对数据库中表的数据记录进 行增、删、改操作。

- 添加数据（INSERT）
- 修改数据（UPDATE）
- 删除数据（DELETE）

### 添加数据

给指定字段添加数据

```sql
insert into 表名 (字段名1, 字段名2, ...) values (值1, 值2, ...);
```

给全部字段添加数据

```sql
insert into 表名 values (值1, 值2, ...);
```

批量添加数据

```sql
insert into 表名 (字段名1, 字段名2, ...)
values (值1, 值2, ...), (值1, 值2, ...), (值 1, 值2, ...);
```

```sql
insert into 表名
values (值1, 值2, ...), (值1, 值2, ...), (值1, 值2, ...);
```

> 注意事项:
>
> - 插入数据时，指定的字段顺序需要与值的顺序是一一对应的。
> - 字符串和日期型数据应该包含在引号中。
> - 插入的数据大小，应该在字段的规定范围内。

### 修改数据

修改数据的具体语法为:

```sql
update 表名 set 字段名1 = 值1 , 字段名2 = 值2 , .... [ where 条件 ] ;
```

> 注意事项:
> 修改语句的条件可以有，也可以没有，如果没有条件，则会修改整张表的所有数据。

### 删除数据

删除数据的具体语法为：

```sql
delete from 表名 [ where 条件 ]  ;
```

> 注意事项:
>
> - DELETE 语句的条件可以有，也可以没有，如果没有条件，则会删除整张表的所有数 据。
> - DELETE 语句不能删除某一个字段的值(可以使用 UPDATE，将该字段值置为 NULL 即 可)。
> - 当进行删除全部数据操作时，datagrip 会提示我们，询问是否确认删除，我们直接点击 Execute 即可。

## DQL

DQL 英文全称是 Data Query Language(数据查询语言)，数据查询语言，用来查询数据库中表的记录。

在一个正常的业务系统中，查询操作的频次是要远高于增删改的，当我们去访问企业官网、电商网站， 在这些网站中我们所看到的数据，实际都是需要从数据库中查询并展示的。而且在查询的过程中，可能 还会涉及到条件、排序、分页等操作。

### 基本语法

DQL 查询语句，语法结构如下：

```sql
select
	字段列表
from
	表名列表
where
	条件列表
group by
	分组字段列表
having
	分组后条件列表
order by
	排序字段列表
limit
	分页参数
```

我们在讲解这部分内容的时候，会将上面的完整语法进行拆分，分为以下几个部分：

- 基本查询（不带任何条件）
- 条件查询（WHERE）
- 聚合函数（count、max、min、avg、sum）
- 分组查询（group by）
- 排序查询（order by）
- 分页查询（limit）

### 基本查询

查询多个字段

```sql
select 字段1, 字段2, 字段3 ... from 表名;
```

```sql
select * from 表名;
```

字段设置别名

```sql
select 字段1 [ as 别名1 ] , 字段2 [ as 别名2 ] ... from 表名;
```

```sql
select 字段1 [ 别名1 ] , 字段2 [ 别名2 ] ... from 表名;
```

去除重复记录

```sql
select distinct 字段列表 from 表名;
```

### 条件查询

语法

```sql
select 字段列表 from 表名 where 条件列表;
```

条件

| **比较运算符**      | **功能**                                    |
| ------------------- | ------------------------------------------- |
| >                   | 大于                                        |
| >=                  | 大于等于                                    |
| <                   | 小于                                        |
| <=                  | 小于等于                                    |
| =                   | 等于                                        |
| <> 或 !=            | 不等于                                      |
| between ... and ... | 在某个范围之内（含最大值、最小值）          |
| in ( ... )          | 在 in 之后的列表中的值，多选一              |
| like 占位符         | 模糊匹配（\_匹配单个字符，%匹配任意个字符） |
| is null             | 是 NULL                                     |

常用的逻辑运算符：

| **逻辑运算符**     | **功能** |
| ------------------ | -------- |
| and 或 &&          | 并且     |
| or 或 &#124;&#124; | 或者     |
| not 或 !           | 非，不是 |

### 聚合函数

将一列数据作为一个整体，进行纵向计算 。

常见的聚合函数

| **函数** | **功能** |
| -------- | -------- |
| count    | 统计数量 |
| max      | 最大值   |
| min      | 最小值   |
| avg      | 平均值   |
| sum      | 求和     |

语法

```sql
select 聚合函数(字段列表) from 表名;
```

### 分组查询

语法

```sql
select 字段列表
from 表名
[ where 条件 ]
group by 分组字段名
[ having 分组后过滤条件 ];
```

where 与 having 区别

- 执行时机不同：where 是分组之前进行过滤，不满足 where 条件，不参与分组；而 having 是分组 之后对结果进行过滤。
- 判断条件不同：where 不能对聚合函数进行判断，而 having 可以。

> 注意事项:
>
> - 分组之后，查询的字段一般为聚合函数和分组字段，查询其他字段无任何意义。
> - 执行顺序: where > 聚合函数 > having 。
> - 支持多字段分组, 具体语法为 : group by columnA,columnB

### 排序查询

语法

```sql
SELECT 字段列表 FROM 表名
ORDER BY 字段1 排序方式1 , 字段2 排序方式2;
```

排序方式

- ASC : 升序(默认值)
- DESC: 降序

> 注意事项：
>
> - 如果是升序, 可以不指定排序方式 ASC ;
> - 如果是多字段排序，当第一个字段值相同时，才会根据第二个字段进行排序

### 分页查询

语法

```sql
select 字段列表 from 表名 limit 起始索引, 查询记录数 ;
```

> 注意事项:
>
> - 起始索引从 0 开始，起始索引 = （查询页码 - 1）\* 每页显示记录数。
> - 分页查询是数据库的方言，不同的数据库有不同的实现，MySQL 中是 LIMIT。
> - 如果查询的是第一页数据，起始索引可以省略，直接简写为 limit 10。

### 执行顺序

![image.png](https://cdn.nlark.com/yuque/0/2023/png/33678031/1692772600059-59468e28-8c0c-4d02-a502-d6e66f0652c4.png#averageHue=%23fbf7e6&clientId=u69ba1454-6681-4&from=paste&height=421&id=u76cefe4d&originHeight=421&originWidth=934&originalType=binary&ratio=1&rotation=0&showTitle=false&size=116442&status=done&style=none&taskId=u5259f70e-f01e-41c9-a023-16c594db82b&title=&width=934)

## DCL

DCL 英文全称是 Data Control Language(数据控制语言)，用来管理数据库用户、控制数据库的访 问权限。

### 管理用户

查询用户

```sql
select * from mysql.user;
```

查询结果如下：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/33678031/1692772783582-37ee5548-7a87-4546-84fa-639fb53874ba.png#averageHue=%23f9f8f7&clientId=u69ba1454-6681-4&from=paste&height=116&id=u79a0e9ad&originHeight=116&originWidth=915&originalType=binary&ratio=1&rotation=0&showTitle=false&size=31389&status=done&style=none&taskId=ub1f525a6-9676-429c-8c77-48510d8b305&title=&width=915)
其中 Host 代表当前用户访问的主机, 如果为 localhost, 仅代表只能够在当前本机访问，是不可以 远程访问的。 User 代表的是访问该数据库的用户名。在 MySQL 中需要通过 Host 和 User 来唯一标识一 个用户。

创建用户

```sql
create user '用户名'@'主机名' identified by '密码';
```

修改用户密码

```sql
alter user '用户名'@'主机名'
identified with mysql_native_password
by '新密码';
```

删除用户

```sql
drop user '用户名'@'主机名';
```

> 注意事项:
>
> - 在 MySQL 中需要通过用户名@主机名的方式，来唯一标识一个用户。
> - 主机名可以使用 % 通配。
> - 这类 SQL 开发人员操作的比较少，主要是 DBA（ Database Administrator 数据库 管理员）使用。

### 权限控制

MySQL 中定义了很多种权限，但是常用的就以下几种：

| **权限**            | **说明**           |
| ------------------- | ------------------ |
| all, all privileges | 所有权限           |
| select              | 查询权限           |
| insert              | 插入数据           |
| update              | 修改数据           |
| delete              | 删除数据           |
| alter               | 修改表             |
| drop                | 删除数据库/表/视图 |
| create              | 创建数据库/表      |

上述只是简单罗列了常见的几种权限描述，其他权限描述及含义，可以直接参考[官方文档](https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html)。

查询权限

```sql
show grants for '用户名'@'主机名' ;
```

授予权限

```sql
grant 权限列表 on 数据库名.表名 to '用户名'@'主机名'
```

撤销权限

```sql
revoke 权限列表 on 数据库名.表名 from '用户名'@'主机名';
```

> 注意事项：
>
> - 多个权限之间，使用逗号分隔
> - 授权时， 数据库名和表名可以使用 \* 进行通配，代表所有。

## 函数

函数 是指一段可以直接被另一段程序调用的程序或代码。 也就意味着，这一段程序或代码在 MySQL 中 已经给我们提供了，我们要做的就是在合适的业务场景调用对应的函数完成对应的业务需求即可。

MySQL 中的函数主要分为以下四类： 字符串函数、数值函数、日期函数、流程函数。

### 处理 NULL 值（coalesce 函数）

| coalesce | coalesce 函数返回参数（列名）中第一个非 NULL 的字段值，注意不是为空'' |
| -------- | --------------------------------------------------------------------- |

soalesce

```sql
-- 返回第一个非空字段值  如果都为NULL则返回NULL
select coalesce(col1, col2, col3) from 表名;


-- 通过将最后一个参数设置为0 使得到的结果不会出现NULL
select coalesce(字段, 0) from 表名;

```

### 字符串函数

MySQL 中内置了很多字符串函数，常用的几个如下 ：

| **函数**                 | **功能**                                                         |
| ------------------------ | ---------------------------------------------------------------- |
| CONCAT(S1,S2,...Sn)      | 字符串拼接，将 S1，S2，... Sn 拼接成一个字符串                   |
| LOWER(str)               | 将字符串 str 全部转为小写                                        |
| UPPER(str)               | 将字符串 str 全部转为大写                                        |
| LPAD(str,n,pad)          | 左填充，用字符串 pad 对 str 的左边进行填充，达到 n 个字符 串长度 |
| RPAD(str,n,pad)          | 右填充，用字符串 pad 对 str 的右边进行填充，达到 n 个字符 串长度 |
| TRIM(str)                | 去掉字符串头部和尾部的空格                                       |
| SUBSTRING(str,start,len) | 返回从字符串 str 从 start 位置起的 len 个长度的字符串            |

演示如下：
A. concat : 字符串拼接

```sql
select concat('Hello' , ' MySQL');
```

B. lower/lcase : 全部转小写

```sql
select lower('Hello');
```

C. upper/ucase : 全部转大写

```sql
select upper('Hello');
```

D. lpad : 左填充

```sql
 select lpad('01', 5, '-');
```

E. rpad : 右填充

```sql
select rpad('01', 5, '-');
```

F. trim : 去除空格

```sql
select trim(' Hello MySQL ') ;
```

G. substring : 截取子字符串

```sql
-- 从第一个字符开始，截取5个长度
select substring('Hello MySQL',1,5);
```

H. instr ： 返回第一个字符串出现的位置

```sql
-- 返回结果为7,表示字符串Worl'在'Hello world'中第一次出现的位置是从第7个字符开始
select instr ("Hello Eorld", "World");
```

### 数值函数

| **函数**   | **功能**                               |
| ---------- | -------------------------------------- |
| CEIL(x)    | 向上取整                               |
| FLOOR(x)   | 向下取整                               |
| MOD(x,y)   | 返回 x/y 的模                          |
| RAND()     | 返回 0~1 内的随机数                    |
| ROUND(x,y) | 求参数 x 的四舍五入的值，保留 y 位小数 |

A. ceil：向上取整

```sql
select ceil(1.1);
```

B. floor：向下取整

```sql
select floor(1.9);
```

C. mod：取模

```sql
select mod(7,4);
```

D. rand：获取随机数

```sql
select rand();
```

E. round：四舍五入

```sql
select round(2.344,2);
```

### 日期函数

| **函数**                           | **功能**                                             |
| ---------------------------------- | ---------------------------------------------------- |
| CURDATE()                          | 返回当前日期                                         |
| CURTIME()                          | 返回当前时间                                         |
| NOW()                              | 返回当前日期和时间                                   |
| YEAR(date)                         | 获取指定 date 的年份                                 |
| MONTH(date)                        | 获取指定 date 的月份                                 |
| DAY(date)                          | 获取指定 date 的日期                                 |
| DATE_ADD(date, INTERVAL expr type) | 返回一个日期/时间值加上一个时间间隔 expr 后的 时间值 |
| DATEDIFF(date1,date2)              | 返回起始时间 date1 和 结束时间 date2 之间的天 数     |

A. curdate：当前日期

```sql
select curdate();
```

B. curtime：当前时间

```sql
select curtime();
```

C. now：当前日期和时间

```sql
select now();
```

D. YEAR , MONTH , DAY：当前年、月、日

```sql
select YEAR(now());
select MONTH(now());
select DAY(now());
```

E. date_add：增加指定的时间间隔  
 date_sub：减少指定的时间间隔

```sql
select date_add(now(), interval 70 YEAR );
```

F. datediff：获取两个日期相差的天数

```sql
select datediff('2021-12-01', '2021-10-01');  //前面减后面
```

### 流程函数

流程函数也是很常用的一类函数，可以在 SQL 语句中实现条件筛选，从而提高语句的效率。

| **函数**                                                         | **功能**                                                        |
| ---------------------------------------------------------------- | --------------------------------------------------------------- |
| IF(value , t , f)                                                | 如果 value 为 true，则返回 t，否则返回 f                        |
| IFNULL(value1 , value2)                                          | 如果 value1 不为空，返回 value1，否则 返回 value2               |
| CASE WHEN [ val1 ] THEN [res1] ... ELSE [ default ] END          | 如果 val1 为 true，返回 res1，... 否 则返回 default 默认值      |
| CASE [ expr ] WHEN [ val1 ] THEN [res1] ... ELSE [ default ] END | 如果 expr 的值等于 val1，返回 res1，... 否则返回 default 默认值 |

A. if

```sql
select if(false, 'Ok', 'Error');
```

B. ifnull

```sql
select ifnull('Ok','Default');  -- Ok
select ifnull('','Default');		-- 返回空字符串
select ifnull(null,'Default');  -- Default
```

C. case when then else end  
 需求: 查询 emp 表的员工姓名和工作地址 (北京/上海 ----> 一线城市 , 其他 ----> 二线城市)

```sql
select
  name,
  ( case workaddress when '北京' then '一线城市' when '上海' then '一线城市' else
'二线城市' end ) as '工作地址'
from emp;

```

## 约束

### 概述

概念：约束是作用于表中字段上的规则，用于限制存储在表中的数据。

目的：保证数据库中数据的正确、有效性和完整性。

分类:

| **约束 **                  | ** 描述 **                                                | ** 关键字 ** |
| -------------------------- | --------------------------------------------------------- | ------------ |
| 非空约束                   | 限制该字段的数据不能为 null                               | NOT NULL     |
| 唯一约束                   | 保证该字段的所有数据都是唯一、不重复的                    | UNIQUE       |
| 主键约束                   | 主键是一行数据的唯一标识，要求非空且唯一                  | PRIMARY KEY  |
| 默认约束                   | 保存数据时，如果未指定该字段的值，则采用默认值            | DEFAULT      |
| 检查约束(8.0.16 版本 之后) | 保证字段值满足某一个条件                                  | CHECK        |
| 外键约束                   | 用来让两张表的数据之间建立连接，保证数据的一致 性和完整性 | FOREIGN KEY  |

> 注意：
>
> - 约束是作用于表中字段上的，可以在创建表/修改表的时候添加约束。

### 约束演示

案例需求：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/33678031/1692776617964-8685b628-0040-4530-a9f8-6917170472c2.png#averageHue=%23fcfcfb&clientId=u69ba1454-6681-4&from=paste&height=552&id=u50d2c917&originHeight=552&originWidth=897&originalType=binary&ratio=1&rotation=0&showTitle=false&size=78195&status=done&style=none&taskId=u999f5789-5ac1-4c78-bdea-3e795fe26de&title=&width=897)

```sql
CREATE TABLE tb_user(
  id 		int 				AUTO_INCREMENT PRIMARY KEY 	COMMENT 'ID唯一标识',
  name 	varchar(10) NOT NULL UNIQUE 						COMMENT '姓名' ,
  age 	int 				check (age > 0 && age <= 120) COMMENT '年龄' ,
  status char(1) 		default '1' 								COMMENT '状态',
  gender char(1) 																COMMENT '性别'
);
```

### 外键约束

介绍
外键：用来让两张表的数据之间建立连接，从而保证数据的一致性和完整性。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/33678031/1692776817836-0c85afc4-53f5-45cf-8b39-af2bcf1b9c7d.png#averageHue=%23faf9f9&clientId=u69ba1454-6681-4&from=paste&height=202&id=ua9cb695c&originHeight=202&originWidth=904&originalType=binary&ratio=1&rotation=0&showTitle=false&size=68921&status=done&style=none&taskId=u076dc1c3-d0cb-4493-8374-d69bf1ba4ab&title=&width=904)

> 注意：
>
> - 目前上述两张表，只是在逻辑上存在这样一层关系；在数据库层面，并未建立外键关联， 所以是无法保证数据的一致性和完整性的。

此时， 删除 id 为 1 的部门信息  
 结果，我们看到删除成功，而删除成功之后，部门表不存在 id 为 1 的部门，而在 emp 表中还有很多的员 工，关联的为 id 为 1 的部门，此时就出现了数据的不完整性。 而要想解决这个问题就得通过数据库的 外键约束。

语法：
添加外键

```sql
create table 表名(
  字段名 数据类型,
  ...
  [constraint] [外键名称] foreign key (外键字段名) references 主表 (主表列名)
);
```

```sql
alter table 表名
add constraint 外键名称
foreign key (外键字段名)
references 主表 (主表列名) ;
```

案例：
为 emp 表的 dept_id 字段添加外键约束,关联 dept 表的主键 id。

```sql
alter table emp
add constraint fk_emp_dept_id
foreign key (dept_id)
references dept(id);

```

添加了外键约束之后，我们再到 dept 表(父表)删除 id 为 1 的记录。
此时 将会报错，不能删除或更新父表记录，因为存在外键约束。

删除外键

```sql
alter table 表名 drop foreign key 外键名称;
```

### 删除/更新行为

添加了外键之后，再删除父表数据时产生的约束行为，我们就称为删除/更新行为。具体的删除/更新行 为有以下几种:  
![image.png](https://cdn.nlark.com/yuque/0/2023/png/33678031/1692779845390-5dc069db-bebe-4923-8a46-21058cd4904c.png#averageHue=%23fbfbfa&clientId=u69ba1454-6681-4&from=paste&height=599&id=u74207d19&originHeight=599&originWidth=906&originalType=binary&ratio=1&rotation=0&showTitle=false&size=172921&status=done&style=none&taskId=u5d228623-2dab-4274-9042-8803b290644&title=&width=906)

```sql
alter table 表名 add constraint 外键名称 foreign key (外键字段)
references 主表名 (主表字段名) on update cascade on delete cascade
```

1). CASCADE

```sql
alter table emp add constraint fk_emp_dept_id foreign key (dept_id) references
dept(id) on update cascade on delete cascade ;
```

2). SET NULL

```sql
alter table emp add constraint fk_emp_dept_id foreign key (dept_id) references
dept(id) on update set null on delete set null ;
```

## 多表联查

### 分类

连接查询

内连接：相当于查询 A、B 交集部分数据
外连接：
左外连接：查询左表所有数据，以及两张表交集部分数据
右外连接：查询右表所有数据，以及两张表交集部分数据
自连接：当前表与自身的连接查询，自连接必须使用表别名

子查询

### 内连接

![image.png](https://cdn.nlark.com/yuque/0/2023/png/33678031/1692784565485-0902b548-926a-430b-871b-ca69629037b3.png#averageHue=%23f9f9ed&clientId=u69ba1454-6681-4&from=paste&height=314&id=u06d78dae&originHeight=314&originWidth=930&originalType=binary&ratio=1&rotation=0&showTitle=false&size=72886&status=done&style=none&taskId=u7c1b9d8d-5c58-41f2-9de0-57b116b8fd2&title=&width=930)

1). 隐式内连接

```sql
select 字段列表 from 表1 , 表2 where 条件 ... ;
```

2). 显式内连接

```sql
select 字段列表 from 表1 [ inner ] join 表2 on 连接条件 ... ;
```

### 外连接

![image.png](https://cdn.nlark.com/yuque/0/2023/png/33678031/1692784803216-a54ee5a3-7218-41f8-9728-9397aaef562f.png#averageHue=%23e0e098&clientId=u69ba1454-6681-4&from=paste&height=245&id=uf55ec889&originHeight=245&originWidth=661&originalType=binary&ratio=1&rotation=0&showTitle=false&size=47189&status=done&style=none&taskId=u4cdb8016-34e4-4223-a2d2-80d5f7a06cd&title=&width=661)

1). 左外连接

```sql
select 字段列表 from 表1 left [ outer ] join 表2 on 条件 ... ;
```

左外连接相当于查询表 1(左表)的所有数据，当然也包含表 1 和表 2 交集部分的数据。

2). 右外连接

```sql
select 字段列表 from 表1 right [ outer ] join 表2 on 条件 ...
```

右外连接相当于查询表 2(右表)的所有数据，当然也包含表 1 和表 2 交集部分的数据。

> 注意事项：
>
> - 左外连接和右外连接是可以相互替换的，只需要调整在连接查询时 SQL 中，表结构的先后顺 序就可以了。而我们在日常开发使用时，更偏向于左外连接。

### 自连接

#### 自连接查询

自连接查询，顾名思义，就是自己连接自己，也就是把一张表连接查询多次。我们先来学习一下自连接 的查询语法：

```sql
select 字段列表 from 表A 别名A join 表A 别名B on 条件 ...
```

而对于自连接查询，可以是内连接查询，也可以是外连接查询。

> 注意事项:
> 在自连接查询中，必须要为表起别名，要不然我们不清楚所指定的条件、返回的字段，到底 是哪一张表的字段。

#### 联合查询

对于 union 查询，就是把多次查询的结果合并起来，形成一个新的查询结果集。

```sql
select 字段列表 from 表A ...
union [ ALL ]
select 字段列表 from 表B ....;
```

- 对于联合查询的多张表的**列数**必须保持一致，**字段类型**也需要保持一致。
- union [ all ] 会将全部的数据直接合并在一起，union 会对合并之后的数据去重。

### 子查询

#### 概述

1). 概念
SQL 语句中嵌套 SELECT 语句，称为嵌套查询，又称子查询。

```sql
SELECT * FROM t1 WHERE column1 = ( SELECT column1 FROM t2 )
```

子查询外部的语句可以是 INSERT / UPDATE / DELETE / SELECT 的任何一个。

2). 分类
根据子查询结果不同，分为：
A. 标量子查询（子查询结果为单个值）
B. 列子查询(子查询结果为一列)
C. 行子查询(子查询结果为一行)
D. 表子查询(子查询结果为多行多列)

根据子查询位置，分为：
A. WHERE 之后
B. FROM 之后
C. SELECT 之后

#### 标量子查询

子查询返回的结果是单个值（数字、字符串、日期等），最简单的形式，这种子查询称为标量子查询。 常用的操作符：= <> > >= < <=

#### 列子查询

子查询返回的结果是一列（可以是多行），这种子查询称为列子查询。 常用的操作符：IN 、NOT IN 、 ANY 、SOME 、 ALL  
![image.png](https://cdn.nlark.com/yuque/0/2023/png/33678031/1692785478091-1ee6038c-ca58-42fe-a451-7d73f4d3360c.png#averageHue=%23fcfbfb&clientId=u69ba1454-6681-4&from=paste&height=381&id=u8dfab641&originHeight=381&originWidth=906&originalType=binary&ratio=1&rotation=0&showTitle=false&size=60021&status=done&style=none&taskId=u84a121b8-de1c-4276-85a4-800bd71f306&title=&width=906)

![image.png](https://cdn.nlark.com/yuque/0/2023/png/33678031/1692785625092-49bdd806-7b2d-4c45-9e75-32c528689cac.png#averageHue=%23e1cfb7&clientId=u69ba1454-6681-4&from=paste&height=473&id=u3c3a6f1b&originHeight=473&originWidth=925&originalType=binary&ratio=1&rotation=0&showTitle=false&size=62104&status=done&style=none&taskId=u3f58ad4c-6a4a-4bf6-91f2-6ee88e8a9e7&title=&width=925)

![image.png](https://cdn.nlark.com/yuque/0/2023/png/33678031/1692785634255-e3781f4e-6552-4328-a65e-ac8675137d63.png#averageHue=%23e2d3bb&clientId=u69ba1454-6681-4&from=paste&height=619&id=ueef4567d&originHeight=619&originWidth=914&originalType=binary&ratio=1&rotation=0&showTitle=false&size=77566&status=done&style=none&taskId=ufbddcaf4-767d-4e14-9b0b-a92ba33ff0a&title=&width=914)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/33678031/1692785682962-400e5c62-69fa-43d1-aaa9-c09ec5a6d5fd.png#averageHue=%23e2d3ba&clientId=u69ba1454-6681-4&from=paste&height=410&id=u5a76b398&originHeight=410&originWidth=922&originalType=binary&ratio=1&rotation=0&showTitle=false&size=67987&status=done&style=none&taskId=u0f023e20-3fdb-4277-b3dc-3661b21e373&title=&width=922)

#### 行子查询

子查询返回的结果是一行（可以是多列），这种子查询称为行子查询。 常用的操作符：= 、<> 、IN 、NOT IN

![image.png](https://cdn.nlark.com/yuque/0/2023/png/33678031/1692785737579-c448b720-4860-4e7f-a8cc-1f4056ed6c68.png#averageHue=%23fcfcfb&clientId=u69ba1454-6681-4&from=paste&height=620&id=ud66a376f&originHeight=620&originWidth=924&originalType=binary&ratio=1&rotation=0&showTitle=false&size=80390&status=done&style=none&taskId=ud1c1c954-e49a-4ab9-a8aa-9049e5d0d70&title=&width=924)

#### 表子查询

子查询返回的结果是多行多列，这种子查询称为表子查询。 常用的操作符：IN  
![image.png](https://cdn.nlark.com/yuque/0/2023/png/33678031/1692785768559-373e14ad-acd8-4a5a-9e29-167c6a2ff827.png#averageHue=%23e2cfb7&clientId=u69ba1454-6681-4&from=paste&height=479&id=u700f38df&originHeight=479&originWidth=914&originalType=binary&ratio=1&rotation=0&showTitle=false&size=85389&status=done&style=none&taskId=u006905d8-b38d-414d-82fa-77844c7e202&title=&width=914)

## 事务

### 事务简介

事务 是一组操作的集合，它是一个不可分割的工作单位，事务会把所有的操作作为一个整体一起向系 统提交或撤销操作请求，即这些操作要么同时成功，要么同时失败。

### 事务操作

#### 控制事务一

1). 查看/设置事务提交方式

```sql
SELECT @@autocommit ;
SET @@autocommit = 0 ;
```

2). 提交事务

```sql
commit;
```

3). 回滚事务

```sql
rollback;
```

> 注意：
> 上述的这种方式，我们是修改了事务的自动提交行为, 把默认的自动提交修改为了手动提 交, 此时我们执行的 DML 语句都不会提交, 需要手动的执行 commit 进行提交。

#### 控制事务二

1). 开启事务

```sql
start transaction 或 begin ;
```

2). 提交事务

```sql
commit;
```

3). 回滚事务

```sql
rollback;
```

转账案例：

```sql
-- 开启事务
start transaction

-- 1. 查询张三余额
select * from account where name = '张三';

-- 2. 张三的余额减少1000
update account set money = money - 1000 where name = '张三';

-- 3. 李四的余额增加1000
update account set money = money + 1000 where name = '李四';

-- 如果正常执行完毕, 则提交事务
commit;

-- 如果执行过程中报错, 则回滚事务
-- rollback;
```

### 事务四大特性

- 原子性（Atomicity）：事务是不可分割的最小操作单元，要么全部成功，要么全部失败。
- 一致性（Consistency）：事务完成时，必须使所有的数据都保持一致状态。
- 隔离性（Isolation）：数据库系统提供的隔离机制，保证事务在不受外部并发操作影响的独立 环境下运行。
- 持久性（Durability）：事务一旦提交或回滚，它对数据库中的数据的改变就是永久的。

上述就是事务的四大特性，简称 ACID。

### 并发事务问题

![image.png](https://cdn.nlark.com/yuque/0/2023/png/33678031/1692786258185-929861b9-8317-4d17-8ab4-5dbd1f954084.png#averageHue=%23fcf8f5&clientId=u69ba1454-6681-4&from=paste&height=361&id=u5a45b074&originHeight=361&originWidth=904&originalType=binary&ratio=1&rotation=0&showTitle=false&size=67613&status=done&style=none&taskId=u7bdb5cb9-5ac5-43c5-9c68-0fb0ec56fcd&title=&width=904)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/33678031/1692786269806-4bc0c3b9-993c-49cb-8a09-1951bf27e9a2.png#averageHue=%23fcf8f5&clientId=u69ba1454-6681-4&from=paste&height=348&id=ubae83f57&originHeight=348&originWidth=924&originalType=binary&ratio=1&rotation=0&showTitle=false&size=76947&status=done&style=none&taskId=u4c959b3b-2492-4378-92fe-816dc2bbe6b&title=&width=924)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/33678031/1692786285471-e844a07f-1d37-4509-9754-c2728d450cbb.png#averageHue=%23fcf8f5&clientId=u69ba1454-6681-4&from=paste&height=313&id=u32bc5db6&originHeight=313&originWidth=930&originalType=binary&ratio=1&rotation=0&showTitle=false&size=70649&status=done&style=none&taskId=u7c5f6d85-25b1-4339-97d6-4471f024686&title=&width=930)

### 事务隔离级别

为了解决并发事务所引发的问题，在数据库中引入了事务隔离级别。主要有以下几种：  
![image.png](https://cdn.nlark.com/yuque/0/2023/png/33678031/1692786328196-08c4f44f-bae1-455a-8c33-274f7b73f61f.png#averageHue=%23fcfbfb&clientId=u69ba1454-6681-4&from=paste&height=319&id=u1d637c7c&originHeight=319&originWidth=902&originalType=binary&ratio=1&rotation=0&showTitle=false&size=33315&status=done&style=none&taskId=uf6b0b90a-6136-43db-b900-ff078333a03&title=&width=902)

1). 查看事务隔离级别

```sql
SELECT @@TRANSACTION_ISOLATION;
```

2). 设置事务隔离级别

```sql
SET [ session | global ] transaction isolation level
{ read uncommitted | read committed | repeatable read | serializable }
```

> 注意：
> 事务隔离级别越高，数据越安全，但是性能越低。
