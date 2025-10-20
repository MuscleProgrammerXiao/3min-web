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
import com.loong.blog.model.dto.blogtag.BlogTagAddRequest;
import com.loong.blog.model.dto.blogtag.BlogTagQueryRequest;
import com.loong.blog.model.dto.blogtag.BlogTagUpdateRequest;
import com.loong.blog.model.entity.BlogTag;
import com.loong.blog.model.entity.User;
import com.loong.blog.model.vo.BlogTagVO;
import com.loong.blog.service.BlogTagService;
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
 * 博客标签接口
 *
 * @author loong
 */
@RestController
@RequestMapping("/blog/tag")
@Slf4j
@Api(tags = "博客标签接口")
public class BlogTagController {

    @Resource
    private BlogTagService blogTagService;

    @Resource
    private UserService userService;

    // region 增删改查

    /**
     * 创建博客标签
     *
     * @param blogTagAddRequest 博客标签创建请求
     * @param request HTTP请求
     * @return 博客标签ID
     */
    @PostMapping("/add")
    @ApiOperation(value = "创建博客标签", notes = "创建一个新的博客标签")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Integer> addBlogTag(@RequestBody BlogTagAddRequest blogTagAddRequest, HttpServletRequest request) {
        if (blogTagAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Integer tagId = blogTagService.addBlogTag(blogTagAddRequest);
        return ResultUtils.success(tagId);
    }

    /**
     * 删除博客标签
     *
     * @param deleteRequest 删除请求
     * @param request HTTP请求
     * @return 是否成功
     */
    @PostMapping("/delete")
    @ApiOperation(value = "删除博客标签", notes = "根据ID删除博客标签")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> deleteBlogTag(@RequestBody DeleteRequest deleteRequest, HttpServletRequest request) {
        if (deleteRequest == null || deleteRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = blogTagService.deleteBlogTag(Math.toIntExact(deleteRequest.getId()));
        return ResultUtils.success(result);
    }

    /**
     * 更新博客标签
     *
     * @param blogTagUpdateRequest 博客标签更新请求
     * @param request HTTP请求
     * @return 是否成功
     */
    @PostMapping("/update")
    @ApiOperation(value = "更新博客标签", notes = "根据ID更新博客标签信息")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> updateBlogTag(@RequestBody BlogTagUpdateRequest blogTagUpdateRequest,
                                           HttpServletRequest request) {
        if (blogTagUpdateRequest == null || blogTagUpdateRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = blogTagService.updateBlogTag(blogTagUpdateRequest);
        return ResultUtils.success(result);
    }

    /**
     * 根据ID获取博客标签
     *
     * @param id 博客标签ID
     * @return 博客标签
     */
    @GetMapping("/get")
    @ApiOperation(value = "获取博客标签", notes = "根据ID获取博客标签详情")
    public BaseResponse<BlogTagVO> getBlogTagById(int id) {
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        BlogTag blogTag = blogTagService.getById(id);
        if (blogTag == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }
        return ResultUtils.success(blogTagService.getBlogTagVO(blogTag));
    }

    /**
     * 获取博客标签列表
     *
     * @param blogTagQueryRequest 博客标签查询请求
     * @return 博客标签列表
     */
    @GetMapping("/list")
    @ApiOperation(value = "获取博客标签列表", notes = "根据条件获取博客标签列表")
    public BaseResponse<List<BlogTagVO>> listBlogTag(BlogTagQueryRequest blogTagQueryRequest) {
        BlogTag blogTagQuery = new BlogTag();
        if (blogTagQueryRequest != null) {
            BeanUtils.copyProperties(blogTagQueryRequest, blogTagQuery);
        }
        QueryWrapper<BlogTag> queryWrapper = blogTagService.getQueryWrapper(blogTagQueryRequest);
        List<BlogTag> blogTagList = blogTagService.list(queryWrapper);
        return ResultUtils.success(blogTagService.getBlogTagVO(blogTagList));
    }

    /**
     * 分页获取博客标签列表
     *
     * @param blogTagQueryRequest 博客标签查询请求
     * @return 博客标签分页
     */
    @GetMapping("/list/page")
    @ApiOperation(value = "分页获取博客标签列表", notes = "根据条件分页获取博客标签列表")
    public BaseResponse<Page<BlogTagVO>> listBlogTagByPage(BlogTagQueryRequest blogTagQueryRequest) {
        if (blogTagQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        long current = blogTagQueryRequest.getCurrent();
        long size = blogTagQueryRequest.getPageSize();
        // 限制爬虫
        if (size > 20) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Page<BlogTag> blogTagPage = blogTagService.page(new Page<>(current, size),
                blogTagService.getQueryWrapper(blogTagQueryRequest));
        return ResultUtils.success(blogTagService.getBlogTagVOPage(blogTagPage));
    }

    /**
     * 根据文章ID获取标签列表
     *
     * @param postId 文章ID
     * @return 标签列表
     */
    @GetMapping("/list/post/{postId}")
    @ApiOperation(value = "获取文章标签", notes = "根据文章ID获取关联的标签列表")
    public BaseResponse<List<BlogTagVO>> getTagsByPostId(@PathVariable("postId") Integer postId) {
        if (postId == null || postId <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        List<BlogTagVO> tagList = blogTagService.getTagsByPostId(postId);
        return ResultUtils.success(tagList);
    }

    // endregion
}