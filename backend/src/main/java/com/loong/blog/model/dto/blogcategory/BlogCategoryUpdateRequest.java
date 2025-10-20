package com.loong.blog.model.dto.blogcategory;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

/**
 * 博客分类更新请求
 *
 * @author loong
 */
@Data
@ApiModel(value = "博客分类更新请求", description = "更新博客分类的请求参数")
public class BlogCategoryUpdateRequest implements Serializable {

    /**
     * 分类ID
     */
    @ApiModelProperty(value = "分类ID", required = true, example = "1")
    private Integer id;

    /**
     * 分类名称，如"技术"、"生活"等
     */
    @ApiModelProperty(value = "分类名称", example = "技术分享")
    private String name;

    /**
     * 分类描述
     */
    @ApiModelProperty(value = "分类描述", example = "分享各种技术知识和经验")
    private String description;

    private static final long serialVersionUID = 1L;
}