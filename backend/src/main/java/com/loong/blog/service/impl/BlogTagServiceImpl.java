package com.loong.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.loong.blog.common.ErrorCode;
import com.loong.blog.exception.BusinessException;
import com.loong.blog.mapper.BlogTagMapper;
import com.loong.blog.model.dto.blogtag.BlogTagAddRequest;
import com.loong.blog.model.dto.blogtag.BlogTagQueryRequest;
import com.loong.blog.model.dto.blogtag.BlogTagUpdateRequest;
import com.loong.blog.model.entity.BlogTag;
import com.loong.blog.model.vo.BlogTagVO;
import com.loong.blog.service.BlogTagService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 博客标签服务实现类
 *
 * @author loong
 */
@Service
public class BlogTagServiceImpl extends ServiceImpl<BlogTagMapper, BlogTag>
        implements BlogTagService {

    @Override
    public void validBlogTag(BlogTag blogTag, boolean add) {
        if (blogTag == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        String name = blogTag.getName();
        // 创建时，参数不能为空
        if (add) {
            if (StringUtils.isBlank(name)) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "标签名称不能为空");
            }
        }
        // 有参数则校验
        if (StringUtils.isNotBlank(name) && name.length() > 50) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "标签名称过长");
        }
    }

    @Override
    public QueryWrapper<BlogTag> getQueryWrapper(BlogTagQueryRequest blogTagQueryRequest) {
        if (blogTagQueryRequest == null) {
            return new QueryWrapper<>();
        }
        Integer id = blogTagQueryRequest.getId();
        String name = blogTagQueryRequest.getName();
        String searchText = blogTagQueryRequest.getSearchText();
        String sortField = blogTagQueryRequest.getSortField();
        String sortOrder = blogTagQueryRequest.getSortOrder();

        QueryWrapper<BlogTag> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq(id != null, "id", id);
        queryWrapper.like(StringUtils.isNotBlank(name), "name", name);
        if (StringUtils.isNotBlank(searchText)) {
            queryWrapper.like("name", searchText);
        }
        queryWrapper.orderBy(StringUtils.isNotBlank(sortField), 
                sortOrder.equals("ascend"), sortField);
        return queryWrapper;
    }

    @Override
    public BlogTagVO getBlogTagVO(BlogTag blogTag) {
        if (blogTag == null) {
            return null;
        }
        BlogTagVO blogTagVO = new BlogTagVO();
        BeanUtils.copyProperties(blogTag, blogTagVO);
        return blogTagVO;
    }

    @Override
    public List<BlogTagVO> getBlogTagVO(List<BlogTag> blogTagList) {
        if (blogTagList == null) {
            return new ArrayList<>();
        }
        return blogTagList.stream().map(this::getBlogTagVO).collect(Collectors.toList());
    }

    @Override
    public Page<BlogTagVO> getBlogTagVOPage(Page<BlogTag> blogTagPage) {
        List<BlogTag> blogTagList = blogTagPage.getRecords();
        Page<BlogTagVO> blogTagVOPage = new Page<>(blogTagPage.getCurrent(), blogTagPage.getSize(), blogTagPage.getTotal());
        blogTagVOPage.setRecords(getBlogTagVO(blogTagList));
        return blogTagVOPage;
    }

    @Override
    public Integer addBlogTag(BlogTagAddRequest blogTagAddRequest) {
        if (blogTagAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        BlogTag blogTag = new BlogTag();
        BeanUtils.copyProperties(blogTagAddRequest, blogTag);
        // 校验
        validBlogTag(blogTag, true);
        // 检查标签名称是否已存在
        QueryWrapper<BlogTag> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("name", blogTag.getName());
        long count = this.count(queryWrapper);
        if (count > 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "标签名称已存在");
        }
        // 保存
        boolean result = this.save(blogTag);
        if (!result) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR);
        }
        return blogTag.getId();
    }

    @Override
    public boolean updateBlogTag(BlogTagUpdateRequest blogTagUpdateRequest) {
        if (blogTagUpdateRequest == null || blogTagUpdateRequest.getId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        BlogTag blogTag = new BlogTag();
        BeanUtils.copyProperties(blogTagUpdateRequest, blogTag);
        // 校验
        validBlogTag(blogTag, false);
        // 检查标签名称是否已存在（排除自身）
        if (StringUtils.isNotBlank(blogTag.getName())) {
            QueryWrapper<BlogTag> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("name", blogTag.getName());
            queryWrapper.ne("id", blogTag.getId());
            long count = this.count(queryWrapper);
            if (count > 0) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "标签名称已存在");
            }
        }
        // 更新
        return this.updateById(blogTag);
    }

    @Override
    public boolean deleteBlogTag(Integer id) {
        if (id == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        return this.removeById(id);
    }

    @Override
    public List<BlogTagVO> getTagsByPostId(Integer postId) {
        if (postId == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        List<BlogTag> blogTagList = baseMapper.getTagsByPostId(postId);
        return getBlogTagVO(blogTagList);
    }
}