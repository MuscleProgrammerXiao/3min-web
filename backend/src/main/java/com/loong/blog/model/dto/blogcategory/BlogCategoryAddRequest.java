package com.loong.blog.model.dto.blogcategory;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

/**
 * 博客分类创建请求
 *
 * @author loong
 */
@Data
@ApiModel(value = "博客分类创建请求", description = "创建博客分类的请求参数")
public class BlogCategoryAddRequest implements Serializable {

    /**
     * 分类名称，如"技术"、"生活"等
     */
    @ApiModelProperty(value = "分类名称", required = true, example = "技术")
    private String name;

    /**
     * 分类描述
     */
    @ApiModelProperty(value = "分类描述", example = "技术相关的文章分类")
    private String description;

    private static final long serialVersionUID = 1L;
}