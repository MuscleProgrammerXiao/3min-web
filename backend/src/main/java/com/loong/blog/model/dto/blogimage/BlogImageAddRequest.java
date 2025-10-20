package com.loong.blog.model.dto.blogimage;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

@Data
@ApiModel(value = "BlogImageAddRequest", description = "添加博客图片请求")
public class BlogImageAddRequest implements Serializable {

    @ApiModelProperty(value = "关联文章ID", required = true, example = "1001")
    private Integer postId;

    @ApiModelProperty(value = "图片URL", required = true, example = "https://cdn.example.com/img/abc.jpg")
    private String url;

    @ApiModelProperty(value = "图片替代文本", example = "封面图")
    private String altText;

    @ApiModelProperty(value = "图片说明")
    private String caption;

    @ApiModelProperty(value = "显示顺序", example = "0")
    private Integer displayOrder;

    private static final long serialVersionUID = 1L;
}