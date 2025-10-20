package com.loong.blog.model.dto.blogpost;

import com.loong.blog.common.PageRequest;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.Date;

/**
 * 博客文章查询请求
 *
 * @author Long
 */
@EqualsAndHashCode(callSuper = true)
@Data
@ApiModel(value = "BlogPostQueryRequest", description = "博客文章查询请求参数")
public class BlogPostQueryRequest extends PageRequest implements Serializable {

    /**
     * 文章id
     */
    @ApiModelProperty(value = "文章ID", example = "1")
    private Integer id;

    /**
     * 文章标题
     */
    @ApiModelProperty(value = "文章标题，支持模糊查询", example = "Spring")
    private String title;

    /**
     * 文章内容
     */
    @ApiModelProperty(value = "文章内容，支持模糊查询", example = "微服务")
    private String content;

    /**
     * 分类ID
     */
    @ApiModelProperty(value = "分类ID，精确查询", example = "2")
    private Integer categoryId;

    /**
     * 文章slug
     */
    @ApiModelProperty(value = "文章URL友好的唯一标识，精确查询", example = "spring-boot-tutorial")
    private String slug;

    /**
     * 作者
     */
    @ApiModelProperty(value = "文章作者，支持模糊查询", example = "张三")
    private String author;

    /**
     * 是否已发布
     */
    @ApiModelProperty(value = "是否已发布，true表示查询已发布文章，false表示查询草稿", example = "true")
    private Boolean published;

    /**
     * 发布日期
     */
    @ApiModelProperty(value = "发布日期，可用于按日期筛选", example = "2023-05-20")
    private Date publishDate;

    /**
     * 搜索文本
     */
    @ApiModelProperty(value = "全文搜索文本，会同时匹配标题、摘要和内容", example = "Spring Boot 教程")
    private String searchText;

    private static final long serialVersionUID = 1L;
}