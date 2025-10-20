package com.loong.blog.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 博客文章
 *
 * @author Long
 */
@TableName(value = "blog_posts")
@Data
public class BlogPost implements Serializable {

    /**
     * 文章ID，自增主键
     */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
     * 文章标题
     */
    private String title;

    /**
     * 文章摘要，用于列表页展示
     */
    private String excerpt;

    /**
     * 文章完整内容，支持Markdown格式
     */
    private String content;

    /**
     * 文章发布日期
     */
    private Date publishDate;

    /**
     * 阅读时间估计，如"5分钟"
     */
    private String readTime;

    /**
     * 分类ID，关联blog_categories表
     */
    private Integer categoryId;

    /**
     * 文章URL友好的唯一标识
     */
    private String slug;

    /**
     * 文章作者
     */
    private String author;

    /**
     * 文章封面图片URL
     */
    private String coverImage;

    /**
     * 是否发布，true为已发布，false为草稿
     */
    private Boolean published;

    /**
     * 文章浏览次数
     */
    private Integer viewCount;

    /**
     * 文章点赞数
     */
    private Integer likeCount;

    /**
     * 文章评论数
     */
    private Integer commentCount;

    /**
     * 创建时间
     */
    private Date createdAt;

    /**
     * 最后更新时间
     */
    private Date updatedAt;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}