package com.loong.blog.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.IService;
import com.loong.blog.model.dto.blogcategory.BlogCategoryAddRequest;
import com.loong.blog.model.dto.blogcategory.BlogCategoryQueryRequest;
import com.loong.blog.model.dto.blogcategory.BlogCategoryUpdateRequest;
import com.loong.blog.model.entity.BlogCategory;
import com.loong.blog.model.vo.BlogCategoryVO;

import java.util.List;

/**
 * 博客分类服务接口
 *
 * @author loong
 */
public interface BlogCategoryService extends IService<BlogCategory> {

    /**
     * 校验博客分类
     *
     * @param blogCategory 博客分类
     * @param add 是否为创建校验
     */
    void validBlogCategory(BlogCategory blogCategory, boolean add);

    /**
     * 获取查询条件
     *
     * @param blogCategoryQueryRequest 查询请求
     * @return 查询条件
     */
    QueryWrapper<BlogCategory> getQueryWrapper(BlogCategoryQueryRequest blogCategoryQueryRequest);

    /**
     * 获取博客分类VO
     *
     * @param blogCategory 博客分类
     * @return 博客分类VO
     */
    BlogCategoryVO getBlogCategoryVO(BlogCategory blogCategory);

    /**
     * 获取博客分类VO列表
     *
     * @param blogCategoryList 博客分类列表
     * @return 博客分类VO列表
     */
    List<BlogCategoryVO> getBlogCategoryVO(List<BlogCategory> blogCategoryList);

    /**
     * 添加博客分类
     *
     * @param blogCategoryAddRequest 添加请求
     * @return 博客分类ID
     */
    Integer addBlogCategory(BlogCategoryAddRequest blogCategoryAddRequest);

    /**
     * 更新博客分类
     *
     * @param blogCategoryUpdateRequest 更新请求
     * @return 是否成功
     */
    boolean updateBlogCategory(BlogCategoryUpdateRequest blogCategoryUpdateRequest);

    /**
     * 删除博客分类
     *
     * @param id 博客分类ID
     * @return 是否成功
     */
    boolean deleteBlogCategory(Integer id);
}