package com.loong.blog.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.loong.blog.model.entity.BlogImage;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 博客图片 Mapper
 */
public interface BlogImageMapper extends BaseMapper<BlogImage> {

    /**
     * 根据文章ID获取图片列表（按显示顺序排序）
     */
    List<BlogImage> getImagesByPostId(@Param("postId") Integer postId);
}