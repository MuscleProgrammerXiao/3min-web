package com.loong.blog.model.dto.blogcategory;

import com.loong.blog.common.PageRequest;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

/**
 * 博客分类查询请求
 *
 * @author loong
 */
@EqualsAndHashCode(callSuper = true)
@Data
@ApiModel(value = "博客分类查询请求", description = "查询博客分类的请求参数")
public class BlogCategoryQueryRequest extends PageRequest implements Serializable {

    /**
     * 分类ID
     */
    @ApiModelProperty(value = "分类ID", example = "1")
    private Integer id;

    /**
     * 分类名称
     */
    @ApiModelProperty(value = "分类名称", example = "技术")
    private String name;

    /**
     * 分类描述
     */
    @ApiModelProperty(value = "分类描述", example = "技术相关")
    private String description;

    /**
     * 搜索文本（同时搜索名称和描述）
     */
    @ApiModelProperty(value = "搜索文本", example = "技术")
    private String searchText;

    private static final long serialVersionUID = 1L;
}