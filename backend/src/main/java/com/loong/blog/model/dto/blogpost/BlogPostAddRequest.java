package com.loong.blog.model.dto.blogpost;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 博客文章创建请求
 *
 * @author Long
 */
@Data
@ApiModel(value = "BlogPostAddRequest", description = "博客文章创建请求")
public class BlogPostAddRequest implements Serializable {

    /**
     * 文章标题
     */
    @ApiModelProperty(value = "文章标题", required = true, example = "Spring Boot 实战教程")
    private String title;

    /**
     * 文章摘要
     */
    @ApiModelProperty(value = "文章摘要，用于列表页展示", required = true, example = "本文介绍了Spring Boot的核心特性和使用方法")
    private String excerpt;

    /**
     * 文章内容
     */
    @ApiModelProperty(value = "文章完整内容，支持Markdown格式", required = true, example = "# Spring Boot 实战\n\n## 1. 简介\n\nSpring Boot是一个快速开发框架...")
    private String content;

    /**
     * 发布日期
     */
    @ApiModelProperty(value = "文章发布日期", required = true, example = "2023-05-20")
    private Date publishDate;

    /**
     * 阅读时间
     */
    @ApiModelProperty(value = "阅读时间估计", required = true, example = "5分钟")
    private String readTime;

    /**
     * 分类ID
     */
    @ApiModelProperty(value = "分类ID，关联blog_categories表", required = true, example = "1")
    private Integer categoryId;

    /**
     * 文章slug
     */
    @ApiModelProperty(value = "文章URL友好的唯一标识", required = true, example = "spring-boot-tutorial")
    private String slug;

    /**
     * 作者
     */
    @ApiModelProperty(value = "文章作者", required = true, example = "张三")
    private String author;

    /**
     * 封面图片
     */
    @ApiModelProperty(value = "文章封面图片URL", example = "/images/blog/spring-boot.jpg")

    /**
     * 是否发布
     */
    private Boolean published;

    private static final long serialVersionUID = 1L;
}