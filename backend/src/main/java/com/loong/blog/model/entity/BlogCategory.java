package com.loong.blog.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 博客分类实体类
 *
 * @author loong
 */
@TableName(value = "blog_categories")
@Data
public class BlogCategory implements Serializable {

    /**
     * 分类ID，自增主键
     */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
     * 分类名称，如"技术"、"生活"等
     */
    private String name;

    /**
     * 分类描述
     */
    private String description;

    /**
     * 创建时间
     */
    private Date createdAt;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}