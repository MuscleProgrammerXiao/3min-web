package com.loong.blog.model.vo;

import com.loong.blog.model.entity.BlogPost;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.beans.BeanUtils;

import java.io.Serializable;
import java.util.Date;

/**
 * 博客文章视图对象
 *
 * @author Long
 */
@Data
@ApiModel(value = "BlogPostVO", description = "博客文章视图对象，用于前端展示")
public class BlogPostVO implements Serializable {

    /**
     * 文章id
     */
    @ApiModelProperty(value = "文章ID", example = "1")
    private Integer id;

    /**
     * 文章标题
     */
    @ApiModelProperty(value = "文章标题", example = "Spring Boot 实战教程")
    private String title;

    /**
     * 文章摘要
     */
    @ApiModelProperty(value = "文章摘要，用于列表页展示", example = "本文介绍了Spring Boot的核心特性和使用方法")
    private String excerpt;

    /**
     * 文章内容
     */
    @ApiModelProperty(value = "文章完整内容，支持Markdown格式", example = "# Spring Boot 实战\n\n## 1. 简介\n\nSpring Boot是一个快速开发框架...")
    private String content;

    /**
     * 发布日期
     */
    @ApiModelProperty(value = "文章发布日期", example = "2023-05-20")
    private Date publishDate;

    /**
     * 阅读时间
     */
    @ApiModelProperty(value = "阅读时间估计", example = "5分钟")
    private String readTime;

    /**
     * 分类ID
     */
    @ApiModelProperty(value = "分类ID，关联blog_categories表", example = "1")
    private Integer categoryId;
    
    /**
     * 分类名称
     */
    @ApiModelProperty(value = "分类名称", example = "Java")
    private String categoryName;

    /**
     * 文章slug
     */
    @ApiModelProperty(value = "文章URL友好的唯一标识", example = "spring-boot-tutorial")
    private String slug;

    /**
     * 作者
     */
    @ApiModelProperty(value = "文章作者", example = "张三")
    private String author;

    /**
     * 封面图片
     */
    @ApiModelProperty(value = "文章封面图片URL", example = "/images/blog/spring-boot.jpg")
    private String coverImage;

    /**
     * 是否发布
     */
    @ApiModelProperty(value = "是否发布文章，true表示已发布，false表示草稿", example = "true")
    private Boolean published;

    /**
     * 浏览次数
     */
    @ApiModelProperty(value = "文章浏览次数", example = "1024")
    private Integer viewCount;

    /**
     * 点赞数
     */
    @ApiModelProperty(value = "文章点赞数", example = "88")
    private Integer likeCount;

    /**
     * 评论数
     */
    @ApiModelProperty(value = "文章评论数", example = "32")
    private Integer commentCount;

    /**
     * 创建时间
     */
    @ApiModelProperty(value = "文章创建时间", example = "2023-05-18T10:30:00")
    private Date createdAt;

    /**
     * 更新时间
     */
    @ApiModelProperty(value = "文章最后更新时间", example = "2023-05-19T15:45:00")
    private Date updatedAt;

    /**
     * 是否已点赞
     */
    @ApiModelProperty(value = "当前用户是否已点赞该文章", example = "false")
    private Boolean hasLike;

    private static final long serialVersionUID = 1L;

    /**
     * 对象转包装类
     *
     * @param blogPost 博客文章实体对象
     * @return 博客文章视图对象
     */
    public static BlogPostVO objToVo(BlogPost blogPost) {
        if (blogPost == null) {
            return null;
        }
        BlogPostVO blogPostVO = new BlogPostVO();
        BeanUtils.copyProperties(blogPost, blogPostVO);
        return blogPostVO;
    }
}