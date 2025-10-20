package com.loong.blog.model.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 博客分类视图对象
 *
 * @author loong
 */
@Data
@ApiModel(value = "博客分类视图对象", description = "博客分类的展示信息")
public class BlogCategoryVO implements Serializable {

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
    @ApiModelProperty(value = "分类描述", example = "技术相关的文章分类")
    private String description;

    /**
     * 创建时间
     */
    @ApiModelProperty(value = "创建时间", example = "2023-01-01 12:00:00")
    private Date createdAt;

    private static final long serialVersionUID = 1L;
}