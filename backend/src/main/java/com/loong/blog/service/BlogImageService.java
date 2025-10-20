package com.loong.blog.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.loong.blog.model.dto.blogimage.BlogImageAddRequest;
import com.loong.blog.model.dto.blogimage.BlogImageQueryRequest;
import com.loong.blog.model.dto.blogimage.BlogImageUpdateRequest;
import com.loong.blog.model.entity.BlogImage;
import com.loong.blog.model.vo.BlogImageVO;

import java.util.List;

/**
 * 博客图片服务接口
 */
public interface BlogImageService extends IService<BlogImage> {

    /**
     * 校验图片实体
     */
    void validBlogImage(BlogImage blogImage, boolean add);

    /**
     * 获取查询包装器
     */
    QueryWrapper<BlogImage> getQueryWrapper(BlogImageQueryRequest blogImageQueryRequest);

    /**
     * 实体转VO
     */
    BlogImageVO getBlogImageVO(BlogImage blogImage);

    /**
     * 列表转VO列表
     */
    List<BlogImageVO> getBlogImageVO(List<BlogImage> blogImageList);

    /**
     * 分页转VO分页
     */
    Page<BlogImageVO> getBlogImageVOPage(Page<BlogImage> blogImagePage);

    /**
     * 新增图片
     */
    Integer addBlogImage(BlogImageAddRequest addRequest);

    /**
     * 更新图片
     */
    boolean updateBlogImage(BlogImageUpdateRequest updateRequest);

    /**
     * 删除图片
     */
    boolean deleteBlogImage(Integer id);

    /**
     * 根据文章ID获取图片列表（VO）
     */
    List<BlogImageVO> getImagesByPostId(Integer postId);
}