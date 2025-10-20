package com.loong.blog.model.dto.blogimage;

import com.loong.blog.common.PageRequest;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

@Data
@ApiModel(value = "BlogImageQueryRequest", description = "博客图片查询请求")
public class BlogImageQueryRequest extends PageRequest implements Serializable {

    @ApiModelProperty(value = "图片ID", example = "1")
    private Integer id;

    @ApiModelProperty(value = "关联文章ID", example = "1001")
    private Integer postId;

    @ApiModelProperty(value = "图片URL")
    private String url;

    @ApiModelProperty(value = "图片替代文本")
    private String altText;

    @ApiModelProperty(value = "图片说明")
    private String caption;

    @ApiModelProperty(value = "搜索关键词（会匹配 url / altText / caption）")
    private String searchText;

    private static final long serialVersionUID = 1L;
}