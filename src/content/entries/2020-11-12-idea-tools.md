---
title: "Idea 实战汇总"
description: "记录常用的 IntelliJ IDEA 插件、EasyCode 代码模板和可执行 JAR 的导出步骤。"
date: "2020-11-12"
kind: "article"
path: "/2020/11/12/Idea-实战汇总/"
legacyAnchors: ["IDEA-插件", "干活类", "1、GenerateAllSetter", "2、Alibaba-Java-Coding-Guidelines", "3、GsonFormat", "4、Maven-Helper", "5、Codota", "6、Free-MyBatis-Plugin", "7、IntelliJad", "8、Properties-to-YAML-Converter", "9、Lombok", "10、CodeGlance", "11、EasyCode", "修饰类", "1、Material-Theme-UI", "2、Rainbow-Brackets", "如何导出可执行jar包"]
---

## IDEA 插件

### 干活类

#### 1、GenerateAllSetter

> 实际的开发中，可能会经常为某个对象中多个属性进行 `set` 赋值，尽管可以用`BeanUtil.copyProperties()`方式批量赋值，但这种方式有一些弊端，存在属性值覆盖的问题，所以不少场景还是需要手动 `set`。如果一个对象属性太多 `set` 起来也很痛苦，`GenerateAllSetter`可以一键将对象属性都 `set` 出来。
>
> 快捷键：`Alt+Enter`

#### 2、Alibaba Java Coding Guidelines

> 阿里出品的《Java 开发手册》时下已经成为了很多公司新员工入职必读的手册，前一段阿里发布了《Java 开发手册(泰山版)》， 又一次对`Java`开发规范做了完善。不过，又臭又长的手册背下来是不可能的，但集成到`IDEA`开发工具中就方便很多。

#### 3、GsonFormat

> `GsonFormat` 个人觉得是一个非常非常实用的插件，它可以将`JSON`字符串自动转换成`Java`实体类。特别是在和其他系统对接时，往往以`JSON`格式传输数据，而我们需要用`Java`实体接收数据入库或者包装转发，如果字段太多一个一个编写那就太麻烦了。
>
> 快捷键：`Alt+ S`

#### 4、Maven Helper

> `Maven Helper` 是解决`Maven`依赖冲突的利器，可以快速查找项目中的依赖冲突。安装后打开`pom`文件，底部有 `Dependency Analyzer` 视图。显示红色表示存在依赖冲突，点进去直接在包上右键`Exclude`排除，`pom`文件中会做出相应排除包的操作。
>
> - Conflicts(冲突)
> - All Dependencies as List(列表形式查看所有依赖)
> - All Dependencies as Tree(树结构查看所有依赖)，并且这个页面还支持搜索。

#### 5、Codota

> 用了`Codota` 后不再怕对`API`不会用，举个栗子：当我们用`stream().filter()`对`List`操作，可是对`filter()`用法不熟，按常理我们会百度一下，而用`Codota` 会提示很多`filter()`用法，节省不少查阅资料的时间。

#### 6、Free MyBatis Plugin

> 在使用`MyBatis` 作为持久框架时有一个尴尬的问题：`SQL` `xml`文件和定义的`Java`接口无法相互跳转，不能像Java接口间调用那样，只能全局搜索稍显麻烦。`Free MyBatis Plugin`将两者之间进行关联。

#### 7、IntelliJad

> `IntelliJad`是一个Java class文件的反编译工具，需要在 `setting` 中设置本地``` Java``jad.exe ```工具的地址。随便找个`Jar`架包选择`class`文件右键`Decompile`，会出现反编译的结果。

#### 8、Properties to YAML Converter

> 将`Properties` 配置文件一键转换成`YAML` 文件，很实用的一个插件。**「注意：要提前备份原`Properties` 文件」**

#### 9、Lombok

> `Lombok` 插件应该比较熟，它替我们解决了那些繁琐又重复的代码，比如`Setter`、`Getter`、`toString`、`equals`等方法。

#### 10、CodeGlance

> `CodeGlance` 是一款代码编辑区迷你缩放图插件，可以很方便的知道我们方法大致在什么位置。

#### 11、EasyCode

> 代码生成脚本
>
> 模板
>
> 1. entity.java
>
> ```java
> ##引入宏定义
> $!define
>
> ##使用宏定义设置回调（保存位置与文件后缀）
> #save("/entity", ".java")
>
> ##使用宏定义设置包后缀
> #setPackageSuffix("entity")
>
> ##使用全局变量实现默认包导入
> $!autoImport
> import java.io.Serializable;
> import lombok.Data;
>
> ##使用宏定义实现类注释信息
> #tableComment("实体类")
> @Data
> public class $!{tableInfo.name} implements Serializable {
>     private static final long serialVersionUID = $!tool.serial();
> #foreach($column in $tableInfo.fullColumn)
>     #if(${column.comment})/**
>     * ${column.comment}
>     */#end
>
>     private $!{tool.getClsNameByFullName($column.type)} $!{column.name};
> #end
> }
> ```
>
> 2.dao.java
>
> ```java
> ##定义初始变量
> #set($tableName = $tool.append($tableInfo.name, "Dao"))
> ##设置回调
> $!callback.setFileName($tool.append($tableName, ".java"))
> $!callback.setSavePath($tool.append($tableInfo.savePath, "/dao"))
>
> ##拿到主键
> #if(!$tableInfo.pkColumn.isEmpty())
>     #set($pk = $tableInfo.pkColumn.get(0))
> #end
>
> #if($tableInfo.savePackageName)package $!{tableInfo.savePackageName}.#{end}dao;
>
> import $!{tableInfo.savePackageName}.entity.$!{tableInfo.name};
> import org.apache.ibatis.annotations.Param;
> import java.util.List;
>
> /**
>  * $!{tableInfo.comment}($!{tableInfo.name})表数据库访问层
>  *
>  * @author $!author
>  * @since $!time.currTime()
>  */
> public interface $!{tableName} {
>
>   	 /**
>      * 新增数据
>      *
>      * @param $!tool.firstLowerCase($!{tableInfo.name}) 实例对象
>      * @return 影响行数
>      */
>     int insert($!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name}));
>
>   	/**
>      * 新增非空数据
>      *
>      * @param $!tool.firstLowerCase($!{tableInfo.name}) 实例对象
>      * @return 影响行数
>      */
>     int insertSelective($!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name}));
>
>     /**
>      * 修改数据
>      *
>      * @param $!tool.firstLowerCase($!{tableInfo.name}) 实例对象
>      * @return 影响行数
>      */
>     int updateByPrimaryKey($!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name}));
>
>   	/**
>      * 修改非空数据
>      *
>      * @param $!tool.firstLowerCase($!{tableInfo.name}) 实例对象
>      * @return 影响行数
>      */
>     int updateByPrimaryKeySelective($!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name}));
>
>    /**
>      * 通过ID查询单条数据
>      *
>      * @param $!pk.name 主键
>      * @return 实例对象
>      */
>     $!{tableInfo.name} selectByPrimaryKey($!pk.shortType $!pk.name);
>
>     /**
>      * 通过实体作为筛选条件查询
>      *
>      * @param $!tool.firstLowerCase($!{tableInfo.name}) 实例对象
>      * @return 对象列表
>      */
>     List<$!{tableInfo.name}> selectByParam($!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name}));
> }
> ```
>
> 3.mapper.xml
>
> > ```xml
> > ##定义宏，查询非主键列
> > #macro(insertSqlColumn)#foreach($column in $tableInfo.otherColumn)$column.obj.name#if($velocityHasNext)
> > ```
>
> ```xml
> ##引入mybatis支持
> $!mybatisSupport
>
> ##设置保存名称与保存位置
> $!callback.setFileName($tool.append($!{tableInfo.name}, "Dao.xml"))
> $!callback.setSavePath($tool.append($modulePath, "/src/main/resources/mapper"))
>
> ##拿到主键
> #if(!$tableInfo.pkColumn.isEmpty())
>     #set($pk = $tableInfo.pkColumn.get(0))
> #end
>
> <?xml version="1.0" encoding="UTF-8"?>
> <!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
> <mapper namespace="$!{tableInfo.savePackageName}.dao.$!{tableInfo.name}Dao">
>
>     <resultMap type="$!{tableInfo.savePackageName}.entity.$!{tableInfo.name}" id="$!{tableInfo.name}Map">
> #foreach($column in $tableInfo.fullColumn)
>         <result property="$!column.name" column="$!column.obj.name" jdbcType="$!column.ext.jdbcType"/>
> #end
>     </resultMap>
>
>     <sql id="table_name">
>         $!{tableInfo.obj.name}
>     </sql>
>
>     <sql id="other_column">
>         #insertSqlColumn()
>
>   	</sql>
>
>   	<sql id="full_column">
>         #allSqlColumn()
>
>   	</sql>
>
>   	<sql id="where_query_conditions">
>   	    <where>
> #foreach($column in $tableInfo.fullColumn)
>             <if test="$!column.name != null#if($column.type.equals("java.lang.String")) and $!column.name != ''#end">
>                 and $!column.obj.name = #{$!column.name}
>             </if>
> #end
>         </where>
>   	</sql>
>
>
>    	<!--新增所有列-->
>     <insert id="insert" keyProperty="$!pk.name" useGeneratedKeys="true">
>         insert into <include refid="table_name"/>
>         (<include refid="other_column"/>)
>         values (#foreach($column in $tableInfo.otherColumn)#{$!{column.name}}#if($velocityHasNext), #end#end)
>     </insert>
>
>     <!--新增非空列-->
>   	<insert id="insertSelective" keyProperty="$!pk.name" useGeneratedKeys="true">
>         insert into <include refid="table_name"/>
>         <trim prefix="(" suffix=")" suffixOverrides=",">
> #foreach($column in $tableInfo.otherColumn)
>             <if test="$!column.name != null#if($column.type.equals("java.lang.String")) and $!column.name != ''#end">
>                 $!column.obj.name,
>             </if>
> #end
>         </trim>
>         <trim prefix="values (" suffix=")" suffixOverrides=",">
> #foreach($column in $tableInfo.otherColumn)
>             <if test="$!column.name != null#if($column.type.equals("java.lang.String")) and $!column.name != ''#end">
>                 #{$!{column.name}},
>             </if>
> #end
>       </trim>
>     </insert>
>
>      <!--通过主键修改数据-->
>     <update id="updateByPrimaryKey">
>         update <include refid="table_name"/>
>       	set
> #foreach($column in $tableInfo.otherColumn)
>             $!column.obj.name = #{$!column.name}#if($velocityHasNext),
> #end#end
>
>         where $!pk.obj.name = #{$!pk.name}
>     </update>
>
>     <!--通过主键修改非空数据-->
>     <update id="updateByPrimaryKeySelective">
>         update <include refid="table_name"/>
>         <set>
> #foreach($column in $tableInfo.otherColumn)
>             <if test="$!column.name != null#if($column.type.equals("java.lang.String")) and $!column.name != ''#end">
>                 $!column.obj.name = #{$!column.name},
>             </if>
> #end
>         </set>
>         where $!pk.obj.name = #{$!pk.name}
>     </update>
>
>     <!--查询单个-->
>     <select id="selectByPrimaryKey" resultMap="$!{tableInfo.name}Map">
>         select
>         <include refid="full_column"/>
>         from <include refid="table_name"/>
>         where $!pk.obj.name = #{$!pk.name}
>     </select>
>
>     <!--通过实体作为筛选条件查询-->
>     <select id="selectByParam" resultMap="$!{tableInfo.name}Map">
>         select
>         <include refid="full_column"/>
>         from <include refid="table_name"/>
>         <include refid="where_query_conditions"/>
>     </select>
> </mapper>
> ```
>
> 4.service

### 修饰类

#### 1、Material Theme UI

> 使用插件后界面图标样式都会变的很漂亮。

#### 2、Rainbow Brackets

> 彩虹颜色的括号，看着很舒服，有点赏心悦目的感觉。

## 如何导出可执行jar包

第一步:

> 原截图未随旧站归档（image-20200615121236604）。

第二步:

> 原截图未随旧站归档（image-20200615121317546）。

第三步:

> 原截图未随旧站归档（image-20200615121546275）。

第四步:

> 原截图未随旧站归档（image-20200615121714754）。

> 原截图未随旧站归档（image-20200615121655424）。

执行build即可

第五步,验收成果

> 原截图未随旧站归档（image-20200615122142787）。
