package com.loong.blog.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.loong.blog.annotation.AuthCheck;
import com.loong.blog.common.BaseResponse;
import com.loong.blog.common.DeleteRequest;
import com.loong.blog.common.ErrorCode;
import com.loong.blog.common.ResultUtils;
import com.loong.blog.constant.UserConstant;
import com.loong.blog.exception.BusinessException;
import com.loong.blog.model.dto.blogcategory.BlogCategoryAddRequest;
import com.loong.blog.model.dto.blogcategory.BlogCategoryQueryRequest;
import com.loong.blog.model.dto.blogcategory.BlogCategoryUpdateRequest;
import com.loong.blog.model.entity.BlogCategory;
import com.loong.blog.model.entity.User;
import com.loong.blog.model.vo.BlogCategoryVO;
import com.loong.blog.service.BlogCategoryService;
import com.loong.blog.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 博客分类接口
 *
 * @author loong
 */
@RestController
@RequestMapping("/blog/category")
@Slf4j
@Api(tags = "博客分类接口")
public class BlogCategoryController {

    @Resource
    private BlogCategoryService blogCategoryService;

    @Resource
    private UserService userService;

    /**
     * 创建博客分类
     *
     * @param blogCategoryAddRequest 博客分类创建请求
     * @param request HTTP请求
     * @return 博客分类ID
     */
    @PostMapping("/add")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    @ApiOperation(value = "创建博客分类", notes = "创建一个新的博客分类")
    public BaseResponse<Integer> addBlogCategory(@RequestBody BlogCategoryAddRequest blogCategoryAddRequest,
                                              HttpServletRequest request) {
        if (blogCategoryAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Integer categoryId = blogCategoryService.addBlogCategory(blogCategoryAddRequest);
        return ResultUtils.success(categoryId);
    }

    /**
     * 删除博客分类
     *
     * @param deleteRequest 删除请求
     * @param request HTTP请求
     * @return 是否成功
     */
    @PostMapping("/delete")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    @ApiOperation(value = "删除博客分类", notes = "根据ID删除博客分类")
    public BaseResponse<Boolean> deleteBlogCategory(@RequestBody DeleteRequest deleteRequest,
                                                 HttpServletRequest request) {
        if (deleteRequest == null || deleteRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = blogCategoryService.deleteBlogCategory(Math.toIntExact(deleteRequest.getId()));
        return ResultUtils.success(result);
    }

    /**
     * 更新博客分类
     *
     * @param blogCategoryUpdateRequest 博客分类更新请求
     * @param request HTTP请求
     * @return 是否成功
     */
    @PostMapping("/update")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    @ApiOperation(value = "更新博客分类", notes = "根据ID更新博客分类信息")
    public BaseResponse<Boolean> updateBlogCategory(@RequestBody BlogCategoryUpdateRequest blogCategoryUpdateRequest,
                                                HttpServletRequest request) {
        if (blogCategoryUpdateRequest == null || blogCategoryUpdateRequest.getId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = blogCategoryService.updateBlogCategory(blogCategoryUpdateRequest);
        return ResultUtils.success(result);
    }

    /**
     * 根据ID获取博客分类
     *
     * @param id 博客分类ID
     * @return 博客分类
     */
    @GetMapping("/get")
    @ApiOperation(value = "获取博客分类", notes = "根据ID获取博客分类详情")
    public BaseResponse<BlogCategoryVO> getBlogCategoryById(Integer id) {
        if (id == null || id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        BlogCategory blogCategory = blogCategoryService.getById(id);
        if (blogCategory == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }
        return ResultUtils.success(blogCategoryService.getBlogCategoryVO(blogCategory));
    }

    /**
     * 获取博客分类列表
     *
     * @param blogCategoryQueryRequest 博客分类查询请求
     * @return 博客分类列表
     */
    @GetMapping("/list")
    @ApiOperation(value = "获取博客分类列表", notes = "获取所有博客分类列表")
    public BaseResponse<List<BlogCategoryVO>> listBlogCategory(BlogCategoryQueryRequest blogCategoryQueryRequest) {
        BlogCategory blogCategoryQuery = new BlogCategory();
        if (blogCategoryQueryRequest != null) {
            BeanUtils.copyProperties(blogCategoryQueryRequest, blogCategoryQuery);
        }
        QueryWrapper<BlogCategory> queryWrapper = blogCategoryService.getQueryWrapper(blogCategoryQueryRequest);
        List<BlogCategory> blogCategoryList = blogCategoryService.list(queryWrapper);
        List<BlogCategoryVO> blogCategoryVOList = blogCategoryService.getBlogCategoryVO(blogCategoryList);
        return ResultUtils.success(blogCategoryVOList);
    }

    /**
     * 分页获取博客分类列表
     *
     * @param blogCategoryQueryRequest 博客分类查询请求
     * @return 博客分类分页列表
     */
    @GetMapping("/list/page")
    @ApiOperation(value = "分页获取博客分类列表", notes = "分页获取博客分类列表")
    public BaseResponse<Page<BlogCategoryVO>> listBlogCategoryByPage(BlogCategoryQueryRequest blogCategoryQueryRequest) {
        if (blogCategoryQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        long current = blogCategoryQueryRequest.getCurrent();
        long size = blogCategoryQueryRequest.getPageSize();
        // 限制爬虫
        if (size > 20) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        QueryWrapper<BlogCategory> queryWrapper = blogCategoryService.getQueryWrapper(blogCategoryQueryRequest);
        Page<BlogCategory> blogCategoryPage = blogCategoryService.page(new Page<>(current, size), queryWrapper);
        
        // 转换为VO
        Page<BlogCategoryVO> blogCategoryVOPage = new Page<>(current, size, blogCategoryPage.getTotal());
        List<BlogCategoryVO> blogCategoryVOList = blogCategoryService.getBlogCategoryVO(blogCategoryPage.getRecords());
        blogCategoryVOPage.setRecords(blogCategoryVOList);
        
        return ResultUtils.success(blogCategoryVOPage);
    }
}