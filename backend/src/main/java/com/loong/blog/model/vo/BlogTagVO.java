package com.loong.blog.model.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 博客标签视图对象
 *
 * @author loong
 */
@Data
@ApiModel(value = "博客标签视图对象", description = "博客标签的展示信息")
public class BlogTagVO implements Serializable {

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
     * 创建时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @ApiModelProperty(value = "创建时间", example = "2023-01-01 12:00:00")
    private Date createdAt;
}