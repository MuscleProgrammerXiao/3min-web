package com.loong.blog.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
@TableName(value = "blog_images")
@ApiModel(value = "BlogImage", description = "博客图片实体")
public class BlogImage implements Serializable {

    @TableId(value = "id", type = IdType.AUTO)
    @ApiModelProperty(value = "图片ID", example = "1")
    private Integer id;

    @TableField("post_id")
    @ApiModelProperty(value = "关联文章ID", required = true, example = "1001")
    private Integer postId;

    @TableField("url")
    @ApiModelProperty(value = "图片URL", required = true, example = "https://cdn.example.com/img/abc.jpg")
    private String url;

    @TableField("alt_text")
    @ApiModelProperty(value = "图片替代文本", example = "封面图")
    private String altText;

    @TableField("caption")
    @ApiModelProperty(value = "图片说明")
    private String caption;

    @TableField("display_order")
    @ApiModelProperty(value = "显示顺序", example = "0")
    private Integer displayOrder;

    @TableField("created_at")
    @ApiModelProperty(value = "创建时间")
    private Date createdAt;

    private static final long serialVersionUID = 1L;
}