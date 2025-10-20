package com.loong.blog.model.dto.blogpost;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 博客文章更新请求
 *
 * @author Long
 */
@Data
@ApiModel(value = "BlogPostUpdateRequest", description = "博客文章更新请求")
public class BlogPostUpdateRequest implements Serializable {

    /**
     * 文章id
     */
    @ApiModelProperty(value = "文章ID", required = true, example = "1")
    private Integer id;

    /**
     * 文章标题
     */
    @ApiModelProperty(value = "文章标题", example = "Spring Boot 实战教程（更新版）")
    private String title;

    /**
     * 文章摘要
     */
    @ApiModelProperty(value = "文章摘要，用于列表页展示", example = "本文全面介绍了Spring Boot的核心特性和最佳实践")
    private String excerpt;

    /**
     * 文章内容
     */
    @ApiModelProperty(value = "文章完整内容，支持Markdown格式", example = "# Spring Boot 实战（更新版）\n\n## 1. 简介\n\nSpring Boot是一个快速开发框架...")
    private String content;

    /**
     * 发布日期
     */
    @ApiModelProperty(value = "文章发布日期", example = "2023-06-15")
    private Date publishDate;

    /**
     * 阅读时间
     */
    @ApiModelProperty(value = "阅读时间估计", example = "8分钟")
    private String readTime;

    /**
     * 分类ID
     */
    @ApiModelProperty(value = "分类ID，关联blog_categories表", example = "2")
    private Integer categoryId;

    /**
     * 文章slug
     */
    @ApiModelProperty(value = "文章URL友好的唯一标识", example = "spring-boot-tutorial-updated")
    private String slug;

    /**
     * 作者
     */
    @ApiModelProperty(value = "文章作者", example = "李四")
    private String author;

    /**
     * 封面图片
     */
    @ApiModelProperty(value = "文章封面图片URL", example = "/images/blog/spring-boot-updated.jpg")
    private String coverImage;

    /**
     * 是否发布
     */
    @ApiModelProperty(value = "是否发布文章，true表示发布，false表示草稿", example = "true")
    private Boolean published;

    private static final long serialVersionUID = 1L;
}