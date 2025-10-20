package com.loong.blog.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.loong.blog.model.dto.blogtag.BlogTagAddRequest;
import com.loong.blog.model.dto.blogtag.BlogTagQueryRequest;
import com.loong.blog.model.dto.blogtag.BlogTagUpdateRequest;
import com.loong.blog.model.entity.BlogTag;
import com.loong.blog.model.vo.BlogTagVO;

import java.util.List;

/**
 * 博客标签服务接口
 *
 * @author loong
 */
public interface BlogTagService extends IService<BlogTag> {

    /**
     * 校验博客标签
     *
     * @param blogTag 博客标签
     * @param add 是否为创建校验
     */
    void validBlogTag(BlogTag blogTag, boolean add);

    /**
     * 获取查询条件
     *
     * @param blogTagQueryRequest 查询请求
     * @return 查询条件
     */
    QueryWrapper<BlogTag> getQueryWrapper(BlogTagQueryRequest blogTagQueryRequest);

    /**
     * 获取博客标签VO
     *
     * @param blogTag 博客标签
     * @return 博客标签VO
     */
    BlogTagVO getBlogTagVO(BlogTag blogTag);

    /**
     * 获取博客标签VO列表
     *
     * @param blogTagList 博客标签列表
     * @return 博客标签VO列表
     */
    List<BlogTagVO> getBlogTagVO(List<BlogTag> blogTagList);

    /**
     * 分页获取博客标签VO
     *
     * @param blogTagPage 博客标签分页
     * @return 博客标签VO分页
     */
    Page<BlogTagVO> getBlogTagVOPage(Page<BlogTag> blogTagPage);

    /**
     * 添加博客标签
     *
     * @param blogTagAddRequest 添加请求
     * @return 博客标签ID
     */
    Integer addBlogTag(BlogTagAddRequest blogTagAddRequest);

    /**
     * 更新博客标签
     *
     * @param blogTagUpdateRequest 更新请求
     * @return 是否成功
     */
    boolean updateBlogTag(BlogTagUpdateRequest blogTagUpdateRequest);

    /**
     * 删除博客标签
     *
     * @param id 博客标签ID
     * @return 是否成功
     */
    boolean deleteBlogTag(Integer id);

    /**
     * 根据文章ID获取标签列表
     *
     * @param postId 文章ID
     * @return 标签列表
     */
    List<BlogTagVO> getTagsByPostId(Integer postId);
}