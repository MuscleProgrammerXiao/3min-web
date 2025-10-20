package com.loong.blog.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.loong.blog.model.dto.blogpost.BlogPostQueryRequest;
import com.loong.blog.model.entity.BlogPost;
import com.loong.blog.model.vo.BlogPostVO;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 博客文章服务
 *
 * @author Long
 */
public interface BlogPostService extends IService<BlogPost> {

    /**
     * 校验博客文章
     *
     * @param blogPost
     * @param add
     */
    void validBlogPost(BlogPost blogPost, boolean add);

    /**
     * 获取查询条件
     *
     * @param blogPostQueryRequest
     * @return
     */
    QueryWrapper<BlogPost> getQueryWrapper(BlogPostQueryRequest blogPostQueryRequest);

    /**
     * 获取博客文章封装
     *
     * @param blogPost
     * @param request
     * @return
     */
    BlogPostVO getBlogPostVO(BlogPost blogPost, HttpServletRequest request);

    /**
     * 分页获取博客文章封装
     *
     * @param blogPostPage
     * @param request
     * @return
     */
    Page<BlogPostVO> getBlogPostVOPage(Page<BlogPost> blogPostPage, HttpServletRequest request);
    
    /**
     * 根据分类ID获取博客文章列表
     *
     * @param categoryId
     * @return
     */
    List<BlogPost> listByCategory(Integer categoryId);
    
    /**
     * 根据slug获取博客文章
     *
     * @param slug
     * @return
     */
    BlogPost getBySlug(String slug);
    
    /**
     * 增加文章浏览次数
     *
     * @param id
     * @return
     */
    boolean incrementViewCount(Integer id);
    
    /**
     * 增加文章点赞数
     *
     * @param id
     * @return
     */
    boolean incrementLikeCount(Integer id);
}