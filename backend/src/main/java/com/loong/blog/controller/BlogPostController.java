package com.loong.blog.controller;

import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.loong.blog.annotation.AuthCheck;
import com.loong.blog.common.BaseResponse;
import com.loong.blog.common.DeleteRequest;
import com.loong.blog.common.ErrorCode;
import com.loong.blog.common.ResultUtils;
import com.loong.blog.constant.UserConstant;
import com.loong.blog.exception.BusinessException;
import com.loong.blog.exception.ThrowUtils;
import com.loong.blog.model.dto.blogpost.BlogPostAddRequest;
import com.loong.blog.model.dto.blogpost.BlogPostQueryRequest;
import com.loong.blog.model.dto.blogpost.BlogPostUpdateRequest;
import com.loong.blog.model.entity.BlogPost;
import com.loong.blog.model.entity.User;
import com.loong.blog.model.vo.BlogPostVO;
import com.loong.blog.service.BlogPostService;
import com.loong.blog.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 博客文章接口
 *
 * @author Long
 */
@Api(tags = "博客文章控制类")
@RestController
@RequestMapping("/blog")
@Slf4j
public class BlogPostController {

    @Resource
    private BlogPostService blogPostService;

    @Resource
    private UserService userService;

    // region 增删改查

    /**
     * 创建博客文章
     *
     * @param blogPostAddRequest
     * @param request
     * @return
     */
    @PostMapping("/add")
    @ApiOperation(value = "创建博客文章")
    public BaseResponse<Integer> addBlogPost(@RequestBody BlogPostAddRequest blogPostAddRequest, HttpServletRequest request) {
        if (blogPostAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        BlogPost blogPost = new BlogPost();
        BeanUtils.copyProperties(blogPostAddRequest, blogPost);
        
        // 校验
        blogPostService.validBlogPost(blogPost, true);
        
        // 设置默认值
        blogPost.setViewCount(0);
        blogPost.setLikeCount(0);
        blogPost.setCommentCount(0);
        
        boolean result = blogPostService.save(blogPost);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(blogPost.getId());
    }

    /**
     * 删除博客文章
     *
     * @param deleteRequest
     * @param request
     * @return
     */
    @PostMapping("/delete")
    @ApiOperation(value = "删除博客文章")
    public BaseResponse<Boolean> deleteBlogPost(@RequestBody DeleteRequest deleteRequest, HttpServletRequest request) {
        if (deleteRequest == null || deleteRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User user = userService.getLoginUser(request);
        long id = deleteRequest.getId();
        // 判断是否存在
        BlogPost oldBlogPost = blogPostService.getById(id);
        ThrowUtils.throwIf(oldBlogPost == null, ErrorCode.NOT_FOUND_ERROR);
        
        // 仅管理员可删除
        if (!userService.isAdmin(request)) {
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR);
        }
        boolean b = blogPostService.removeById(id);
        return ResultUtils.success(b);
    }

    /**
     * 更新博客文章（仅管理员）
     *
     * @param blogPostUpdateRequest
     * @return
     */
    @PostMapping("/update")
    @ApiOperation(value = "更新博客文章")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> updateBlogPost(@RequestBody BlogPostUpdateRequest blogPostUpdateRequest) {
        if (blogPostUpdateRequest == null || blogPostUpdateRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        BlogPost blogPost = new BlogPost();
        BeanUtils.copyProperties(blogPostUpdateRequest, blogPost);
        
        // 参数校验
        blogPostService.validBlogPost(blogPost, false);
        int id = blogPostUpdateRequest.getId();
        // 判断是否存在
        BlogPost oldBlogPost = blogPostService.getById(id);
        ThrowUtils.throwIf(oldBlogPost == null, ErrorCode.NOT_FOUND_ERROR);
        boolean result = blogPostService.updateById(blogPost);
        return ResultUtils.success(result);
    }

    /**
     * 根据 id 获取博客文章
     *
     * @param id
     * @return
     */
    @GetMapping("/get")
    @ApiOperation(value = "根据ID获取博客文章")
    public BaseResponse<BlogPostVO> getBlogPostById(int id, HttpServletRequest request) {
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        BlogPost blogPost = blogPostService.getById(id);
        if (blogPost == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }
        
        // 增加浏览次数
        blogPostService.incrementViewCount(id);
        
        return ResultUtils.success(blogPostService.getBlogPostVO(blogPost, request));
    }
    
    /**
     * 根据 slug 获取博客文章
     *
     * @param slug
     * @return
     */
    @GetMapping("/slug/{slug}")
    @ApiOperation(value = "根据Slug获取博客文章")
    public BaseResponse<BlogPostVO> getBlogPostBySlug(@PathVariable("slug") String slug, HttpServletRequest request) {
        if (StringUtils.isBlank(slug)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        BlogPost blogPost = blogPostService.getBySlug(slug);
        if (blogPost == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }
        
        // 增加浏览次数
        blogPostService.incrementViewCount(blogPost.getId());
        
        return ResultUtils.success(blogPostService.getBlogPostVO(blogPost, request));
    }

    /**
     * 分页获取博客文章列表
     *
     * @param blogPostQueryRequest
     * @param request
     * @return
     */
    @PostMapping("/list/page")
    @ApiOperation(value = "分页获取博客文章列表")
    public BaseResponse<Page<BlogPostVO>> listBlogPostByPage(@RequestBody BlogPostQueryRequest blogPostQueryRequest,
            HttpServletRequest request) {
        long current = blogPostQueryRequest.getCurrent();
        long size = blogPostQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        Page<BlogPost> blogPostPage = blogPostService.page(new Page<>(current, size),
                blogPostService.getQueryWrapper(blogPostQueryRequest));
        return ResultUtils.success(blogPostService.getBlogPostVOPage(blogPostPage, request));
    }
    
    /**
     * 根据分类获取博客文章列表
     *
     * @param categoryId
     * @param request
     * @return
     */
    @GetMapping("/category/{categoryId}")
    @ApiOperation(value = "根据分类获取博客文章列表")
    public BaseResponse<List<BlogPostVO>> listBlogPostByCategory(@PathVariable("categoryId") Integer categoryId,
            HttpServletRequest request) {
        if (categoryId <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        List<BlogPost> blogPostList = blogPostService.listByCategory(categoryId);
        List<BlogPostVO> blogPostVOList = blogPostList.stream()
                .map(blogPost -> blogPostService.getBlogPostVO(blogPost, request))
                .collect(Collectors.toList());
        return ResultUtils.success(blogPostVOList);
    }
    
    /**
     * 点赞博客文章
     *
     * @param id
     * @param request
     * @return
     */
    @PostMapping("/like/{id}")
    @ApiOperation(value = "点赞博客文章")
    public BaseResponse<Boolean> likeBlogPost(@PathVariable("id") Integer id, HttpServletRequest request) {
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        // 判断是否存在
        BlogPost blogPost = blogPostService.getById(id);
        if (blogPost == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }
        
        // 必须登录
        User loginUser = userService.getLoginUser(request);
        if (loginUser == null) {
            throw new BusinessException(ErrorCode.NOT_LOGIN_ERROR);
        }
        
        // 增加点赞数
        boolean result = blogPostService.incrementLikeCount(id);
        return ResultUtils.success(result);
    }

    // endregion
}