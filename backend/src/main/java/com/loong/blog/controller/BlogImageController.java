package com.loong.blog.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.loong.blog.annotation.AuthCheck;
import com.loong.blog.common.BaseResponse;
import com.loong.blog.common.DeleteRequest;
import com.loong.blog.common.ErrorCode;
import com.loong.blog.common.ResultUtils;
import com.loong.blog.constant.UserConstant;
import com.loong.blog.exception.BusinessException;
import com.loong.blog.model.dto.blogimage.BlogImageAddRequest;
import com.loong.blog.model.dto.blogimage.BlogImageQueryRequest;
import com.loong.blog.model.dto.blogimage.BlogImageUpdateRequest;
import com.loong.blog.model.entity.BlogImage;
import com.loong.blog.model.vo.BlogImageVO;
import com.loong.blog.service.BlogImageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@Api(tags = "博客图片接口")
@RestController
@RequestMapping("/blog/image")
@Slf4j
public class BlogImageController {

    @Resource
    private BlogImageService blogImageService;

    @ApiOperation("添加图片")
    @PostMapping("/add")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Integer> addBlogImage(@RequestBody BlogImageAddRequest addRequest) {
        if (addRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Integer id = blogImageService.addBlogImage(addRequest);
        return ResultUtils.success(id);
    }

    @ApiOperation("删除图片")
    @PostMapping("/delete")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> deleteBlogImage(@RequestBody DeleteRequest deleteRequest) {
        if (deleteRequest == null || deleteRequest.getId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = blogImageService.deleteBlogImage(deleteRequest.getId().intValue());
        return ResultUtils.success(result);
    }

    @ApiOperation("更新图片")
    @PostMapping("/update")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> updateBlogImage(@RequestBody BlogImageUpdateRequest updateRequest) {
        if (updateRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = blogImageService.updateBlogImage(updateRequest);
        return ResultUtils.success(result);
    }

    @ApiOperation("根据ID获取图片")
    @GetMapping("/get")
    public BaseResponse<BlogImageVO> getBlogImageById(@RequestParam("id") Integer id) {
        if (id == null || id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        BlogImage blogImage = blogImageService.getById(id);
        BlogImageVO vo = blogImageService.getBlogImageVO(blogImage);
        return ResultUtils.success(vo);
    }

    @ApiOperation("图片列表（不分页）")
    @GetMapping("/list")
    public BaseResponse<List<BlogImageVO>> listBlogImage(BlogImageQueryRequest queryRequest) {
        List<BlogImage> list = blogImageService.list(blogImageService.getQueryWrapper(queryRequest));
        List<BlogImageVO> voList = blogImageService.getBlogImageVO(list);
        return ResultUtils.success(voList);
    }

    @ApiOperation("图片列表（分页）")
    @GetMapping("/list/page")
    public BaseResponse<Page<BlogImageVO>> listBlogImageByPage(BlogImageQueryRequest queryRequest) {
        long current = queryRequest.getCurrent();
        long size = queryRequest.getPageSize();
        Page<BlogImage> page = blogImageService.page(new Page<>(current, size), blogImageService.getQueryWrapper(queryRequest));
        Page<BlogImageVO> voPage = blogImageService.getBlogImageVOPage(page);
        return ResultUtils.success(voPage);
    }

    @ApiOperation("根据文章ID获取图片列表")
    @GetMapping("/list/post/{postId}")
    public BaseResponse<List<BlogImageVO>> listImagesByPostId(@PathVariable("postId") Integer postId) {
        List<BlogImageVO> voList = blogImageService.getImagesByPostId(postId);
        return ResultUtils.success(voList);
    }
}