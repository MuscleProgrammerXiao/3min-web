package com.loong.blog.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.loong.blog.model.entity.BlogTag;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 博客标签Mapper接口
 *
 * @author loong
 */
public interface BlogTagMapper extends BaseMapper<BlogTag> {

    /**
     * 根据文章ID获取标签列表
     *
     * @param postId 文章ID
     * @return 标签列表
     */
    List<BlogTag> getTagsByPostId(@Param("postId") Integer postId);
}