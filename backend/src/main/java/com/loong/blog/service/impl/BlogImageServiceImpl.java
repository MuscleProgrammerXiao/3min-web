package com.loong.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.loong.blog.common.ErrorCode;
import com.loong.blog.exception.BusinessException;
import com.loong.blog.mapper.BlogImageMapper;
import com.loong.blog.model.dto.blogimage.BlogImageAddRequest;
import com.loong.blog.model.dto.blogimage.BlogImageQueryRequest;
import com.loong.blog.model.dto.blogimage.BlogImageUpdateRequest;
import com.loong.blog.model.entity.BlogImage;
import com.loong.blog.model.vo.BlogImageVO;
import com.loong.blog.service.BlogImageService;
import com.loong.blog.utils.SqlUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BlogImageServiceImpl extends ServiceImpl<BlogImageMapper, BlogImage> implements BlogImageService {

    @Override
    public void validBlogImage(BlogImage blogImage, boolean add) {
        if (blogImage == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Integer postId = blogImage.getPostId();
        String url = blogImage.getUrl();
        if (add) {
            if (postId == null || postId <= 0) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "postId 不合法");
            }
            if (StringUtils.isBlank(url)) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "url 不能为空");
            }
        }
        if (StringUtils.isNotBlank(url) && url.length() > 255) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "url 长度超过限制");
        }
        String altText = blogImage.getAltText();
        if (StringUtils.isNotBlank(altText) && altText.length() > 255) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "altText 长度超过限制");
        }
    }

    @Override
    public QueryWrapper<BlogImage> getQueryWrapper(BlogImageQueryRequest blogImageQueryRequest) {
        QueryWrapper<BlogImage> queryWrapper = new QueryWrapper<>();
        if (blogImageQueryRequest == null) {
            return queryWrapper;
        }
        Integer id = blogImageQueryRequest.getId();
        Integer postId = blogImageQueryRequest.getPostId();
        String url = blogImageQueryRequest.getUrl();
        String altText = blogImageQueryRequest.getAltText();
        String caption = blogImageQueryRequest.getCaption();
        String searchText = blogImageQueryRequest.getSearchText();
        String sortField = blogImageQueryRequest.getSortField();
        String sortOrder = blogImageQueryRequest.getSortOrder();

        queryWrapper.eq(id != null && id > 0, "id", id);
        queryWrapper.eq(postId != null && postId > 0, "post_id", postId);
        queryWrapper.like(StringUtils.isNotBlank(url), "url", url);
        queryWrapper.like(StringUtils.isNotBlank(altText), "alt_text", altText);
        queryWrapper.like(StringUtils.isNotBlank(caption), "caption", caption);
        if (StringUtils.isNotBlank(searchText)) {
            queryWrapper.and(qw -> qw.like("url", searchText).or().like("alt_text", searchText).or().like("caption", searchText));
        }
        queryWrapper.orderBy(SqlUtils.validSortField(sortField), "ascend".equals(sortOrder), sortField);
        return queryWrapper;
    }

    @Override
    public BlogImageVO getBlogImageVO(BlogImage blogImage) {
        if (blogImage == null) return null;
        BlogImageVO vo = new BlogImageVO();
        BeanUtils.copyProperties(blogImage, vo);
        return vo;
    }

    @Override
    public List<BlogImageVO> getBlogImageVO(List<BlogImage> blogImageList) {
        List<BlogImageVO> voList = new ArrayList<>();
        if (blogImageList == null) {
            return voList;
        }
        for (BlogImage img : blogImageList) {
            BlogImageVO vo = getBlogImageVO(img);
            if (vo != null) {
                voList.add(vo);
            }
        }
        return voList;
    }

    @Override
    public Page<BlogImageVO> getBlogImageVOPage(Page<BlogImage> blogImagePage) {
        Page<BlogImageVO> voPage = new Page<>(blogImagePage.getCurrent(), blogImagePage.getSize(), blogImagePage.getTotal());
        voPage.setRecords(getBlogImageVO(blogImagePage.getRecords()));
        return voPage;
    }

    @Override
    public Integer addBlogImage(BlogImageAddRequest addRequest) {
        BlogImage blogImage = new BlogImage();
        BeanUtils.copyProperties(addRequest, blogImage);
        validBlogImage(blogImage, true);
        boolean saved = this.save(blogImage);
        if (!saved) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "保存图片失败");
        }
        return blogImage.getId();
    }

    @Override
    public boolean updateBlogImage(BlogImageUpdateRequest updateRequest) {
        BlogImage blogImage = new BlogImage();
        BeanUtils.copyProperties(updateRequest, blogImage);
        if (blogImage.getId() == null || blogImage.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "id 不合法");
        }
        validBlogImage(blogImage, false);
        return this.updateById(blogImage);
    }

    @Override
    public boolean deleteBlogImage(Integer id) {
        if (id == null || id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "id 不合法");
        }
        return this.removeById(id);
    }

    @Override
    public List<BlogImageVO> getImagesByPostId(Integer postId) {
        if (postId == null || postId <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "postId 不合法");
        }
        List<BlogImage> list = this.baseMapper.getImagesByPostId(postId);
        return getBlogImageVO(list);
    }
}