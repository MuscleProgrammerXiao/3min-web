package com.loong.blog.model.dto.blogtag;

import com.loong.blog.common.PageRequest;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

/**
 * 博客标签查询请求
 *
 * @author loong
 */
@EqualsAndHashCode(callSuper = true)
@Data
@ApiModel(value = "博客标签查询请求", description = "查询博客标签的请求参数")
public class BlogTagQueryRequest extends PageRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 标签ID
     */
    @ApiModelProperty(value = "标签ID", example = "1")
    private Integer id;

    /**
     * 标签名称
     */
    @ApiModelProperty(value = "标签名称", example = "Java")
    private String name;

    /**
     * 搜索文本
     */
    @ApiModelProperty(value = "搜索文本", example = "Java")
    private String searchText;
}