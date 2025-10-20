package com.loong.blog.model.dto.blogimage;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

@Data
@ApiModel(value = "BlogImageUpdateRequest", description = "更新博客图片请求")
public class BlogImageUpdateRequest implements Serializable {

    @ApiModelProperty(value = "图片ID", required = true, example = "1")
    private Integer id;

    @ApiModelProperty(value = "图片URL", example = "https://cdn.example.com/img/new.jpg")
    private String url;

    @ApiModelProperty(value = "图片替代文本", example = "新的封面图")
    private String altText;

    @ApiModelProperty(value = "图片说明")
    private String caption;

    @ApiModelProperty(value = "显示顺序", example = "1")
    private Integer displayOrder;

    private static final long serialVersionUID = 1L;
}