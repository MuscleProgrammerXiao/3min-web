package com.loong.blog.model.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
@ApiModel(value = "BlogImageVO", description = "博客图片返回对象")
public class BlogImageVO implements Serializable {

    @ApiModelProperty(value = "图片ID", example = "1")
    private Integer id;

    @ApiModelProperty(value = "关联文章ID", example = "1001")
    private Integer postId;

    @ApiModelProperty(value = "图片URL", example = "https://cdn.example.com/img/abc.jpg")
    private String url;

    @ApiModelProperty(value = "图片替代文本", example = "封面图")
    private String altText;

    @ApiModelProperty(value = "图片说明")
    private String caption;

    @ApiModelProperty(value = "显示顺序", example = "0")
    private Integer displayOrder;

    @ApiModelProperty(value = "创建时间", example = "2024-01-01 12:00:00")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createdAt;

    private static final long serialVersionUID = 1L;
}