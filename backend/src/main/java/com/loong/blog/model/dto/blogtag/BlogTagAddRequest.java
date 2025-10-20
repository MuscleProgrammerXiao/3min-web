package com.loong.blog.model.dto.blogtag;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

/**
 * 博客标签创建请求
 *
 * @author loong
 */
@Data
@ApiModel(value = "博客标签创建请求", description = "创建博客标签的请求参数")
public class BlogTagAddRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 标签名称
     */
    @ApiModelProperty(value = "标签名称", required = true, example = "Java")
    private String name;
}