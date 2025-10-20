package com.loong.blog.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.loong.blog.model.entity.BlogPost;
import java.util.List;
import org.apache.ibatis.annotations.Param;

/**
 * 博客文章数据库操作
 *
 * @author Long
 */
public interface BlogPostMapper extends BaseMapper<BlogPost> {

    /**
     * 根据分类ID查询文章列表
     */
    List<BlogPost> listByCategory(@Param("categoryId") Integer categoryId);
    
    /**
     * 增加文章浏览次数
     */
    int incrementViewCount(@Param("id") Integer id);
    
    /**
     * 增加文章点赞数
     */
    int incrementLikeCount(@Param("id") Integer id);
    
    /**
     * 增加文章评论数
     */
    int incrementCommentCount(@Param("id") Integer id);
    
    /**
     * 根据slug查询文章
     */
    BlogPost getBySlug(@Param("slug") String slug);
}