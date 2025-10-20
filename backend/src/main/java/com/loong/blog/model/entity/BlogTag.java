package com.loong.blog.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 博客标签实体类
 *
 * @author loong
 */
@TableName(value = "blog_tags")
@Data
public class BlogTag implements Serializable {

    /**
     * 标签ID，自增主键
     */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
     * 标签名称，如"React"、"JavaScript"等
     */
    private String name;

    /**
     * 创建时间
     */
    private Date createdAt;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}