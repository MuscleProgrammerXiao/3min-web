package com.loong.blog.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.loong.blog.model.entity.BlogPostTag;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 博客文章-标签关联Mapper接口
 *
 * @author loong
 */
public interface BlogPostTagMapper extends BaseMapper<BlogPostTag> {

    /**
     * 批量插入文章标签关联
     *
     * @param postId 文章ID
     * @param tagIds 标签ID列表
     * @return 影响行数
     */
    int batchInsert(@Param("postId") Integer postId, @Param("tagIds") List<Integer> tagIds);

    /**
     * 根据文章ID删除所有标签关联
     *
     * @param postId 文章ID
     * @return 影响行数
     */
    int deleteByPostId(@Param("postId") Integer postId);

    /**
     * 根据标签ID获取文章ID列表
     *
     * @param tagId 标签ID
     * @return 文章ID列表
     */
    List<Integer> getPostIdsByTagId(@Param("tagId") Integer tagId);
}