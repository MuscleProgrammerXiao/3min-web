package com.loong.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.loong.blog.common.ErrorCode;
import com.loong.blog.exception.BusinessException;
import com.loong.blog.mapper.BlogCategoryMapper;
import com.loong.blog.model.dto.blogcategory.BlogCategoryAddRequest;
import com.loong.blog.model.dto.blogcategory.BlogCategoryQueryRequest;
import com.loong.blog.model.dto.blogcategory.BlogCategoryUpdateRequest;
import com.loong.blog.model.entity.BlogCategory;
import com.loong.blog.model.vo.BlogCategoryVO;
import com.loong.blog.service.BlogCategoryService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * 博客分类服务实现类
 *
 * @author loong
 */
@Service
public class BlogCategoryServiceImpl extends ServiceImpl<BlogCategoryMapper, BlogCategory>
        implements BlogCategoryService {

    @Override
    public void validBlogCategory(BlogCategory blogCategory, boolean add) {
        if (blogCategory == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        String name = blogCategory.getName();
        // 创建时，参数不能为空
        if (add) {
            if (StringUtils.isBlank(name)) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "分类名称不能为空");
            }
        }
        // 有参数则校验
        if (StringUtils.isNotBlank(name) && name.length() > 50) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "分类名称过长");
        }
    }

    @Override
    public QueryWrapper<BlogCategory> getQueryWrapper(BlogCategoryQueryRequest blogCategoryQueryRequest) {
        if (blogCategoryQueryRequest == null) {
            return new QueryWrapper<>();
        }
        Integer id = blogCategoryQueryRequest.getId();
        String name = blogCategoryQueryRequest.getName();
        String description = blogCategoryQueryRequest.getDescription();
        String searchText = blogCategoryQueryRequest.getSearchText();
        String sortField = blogCategoryQueryRequest.getSortField();
        String sortOrder = blogCategoryQueryRequest.getSortOrder();

        QueryWrapper<BlogCategory> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq(id != null, "id", id);
        queryWrapper.like(StringUtils.isNotBlank(name), "name", name);
        queryWrapper.like(StringUtils.isNotBlank(description), "description", description);
        if (StringUtils.isNotBlank(searchText)) {
            queryWrapper.and(qw -> qw.like("name", searchText).or().like("description", searchText));
        }
        queryWrapper.orderBy(StringUtils.isNotBlank(sortField), 
                sortOrder.equals("ascend"), sortField);
        return queryWrapper;
    }

    @Override
    public BlogCategoryVO getBlogCategoryVO(BlogCategory blogCategory) {
        if (blogCategory == null) {
            return null;
        }
        BlogCategoryVO blogCategoryVO = new BlogCategoryVO();
        BeanUtils.copyProperties(blogCategory, blogCategoryVO);
        return blogCategoryVO;
    }

    @Override
    public List<BlogCategoryVO> getBlogCategoryVO(List<BlogCategory> blogCategoryList) {
        if (blogCategoryList == null) {
            return new ArrayList<>();
        }
        List<BlogCategoryVO> blogCategoryVOList = new ArrayList<>(blogCategoryList.size());
        for (BlogCategory blogCategory : blogCategoryList) {
            blogCategoryVOList.add(getBlogCategoryVO(blogCategory));
        }
        return blogCategoryVOList;
    }

    @Override
    public Integer addBlogCategory(BlogCategoryAddRequest blogCategoryAddRequest) {
        if (blogCategoryAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        BlogCategory blogCategory = new BlogCategory();
        BeanUtils.copyProperties(blogCategoryAddRequest, blogCategory);
        // 校验
        validBlogCategory(blogCategory, true);
        // 检查分类名称是否已存在
        QueryWrapper<BlogCategory> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("name", blogCategory.getName());
        long count = this.count(queryWrapper);
        if (count > 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "分类名称已存在");
        }
        // 保存
        boolean result = this.save(blogCategory);
        if (!result) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR);
        }
        return blogCategory.getId();
    }

    @Override
    public boolean updateBlogCategory(BlogCategoryUpdateRequest blogCategoryUpdateRequest) {
        if (blogCategoryUpdateRequest == null || blogCategoryUpdateRequest.getId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        BlogCategory blogCategory = new BlogCategory();
        BeanUtils.copyProperties(blogCategoryUpdateRequest, blogCategory);
        // 校验
        validBlogCategory(blogCategory, false);
        // 检查分类名称是否已存在（排除自身）
        if (StringUtils.isNotBlank(blogCategory.getName())) {
            QueryWrapper<BlogCategory> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("name", blogCategory.getName());
            queryWrapper.ne("id", blogCategory.getId());
            long count = this.count(queryWrapper);
            if (count > 0) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "分类名称已存在");
            }
        }
        // 更新
        return this.updateById(blogCategory);
    }

    @Override
    public boolean deleteBlogCategory(Integer id) {
        if (id == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        return this.removeById(id);
    }
}