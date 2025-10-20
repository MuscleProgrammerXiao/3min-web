package com.loong.blog.model.dto.blogtag;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

/**
 * 博客标签更新请求
 *
 * @author loong
 */
@Data
@ApiModel(value = "博客标签更新请求", description = "更新博客标签的请求参数")
public class BlogTagUpdateRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 标签ID
     */
    @ApiModelProperty(value = "标签ID", required = true, example = "1")
    private Integer id;

    /**
     * 标签名称
     */
    @ApiModelProperty(value = "标签名称", example = "Java")
    private String name;
}