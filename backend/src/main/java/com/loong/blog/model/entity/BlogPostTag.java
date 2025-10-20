package com.loong.blog.model.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

/**
 * 博客文章-标签关联实体类
 *
 * @author loong
 */
@TableName(value = "blog_post_tags")
@Data
public class BlogPostTag implements Serializable {

    /**
     * 文章ID，关联blog_posts表
     */
    private Integer postId;

    /**
     * 标签ID，关联blog_tags表
     */
    private Integer tagId;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}