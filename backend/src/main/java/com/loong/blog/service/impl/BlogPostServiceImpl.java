package com.loong.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.loong.blog.common.ErrorCode;
import com.loong.blog.constant.CommonConstant;
import com.loong.blog.exception.BusinessException;
import com.loong.blog.exception.ThrowUtils;
import com.loong.blog.mapper.BlogPostMapper;
import com.loong.blog.model.dto.blogpost.BlogPostQueryRequest;
import com.loong.blog.model.entity.BlogPost;
import com.loong.blog.model.entity.User;
import com.loong.blog.model.vo.BlogPostVO;
import com.loong.blog.service.BlogPostService;
import com.loong.blog.service.UserService;
import com.loong.blog.utils.SqlUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 博客文章服务实现
 *
 * @author Long
 */
@Service
@Slf4j
public class BlogPostServiceImpl extends ServiceImpl<BlogPostMapper, BlogPost> implements BlogPostService {

    @Resource
    private UserService userService;

    @Override
    public void validBlogPost(BlogPost blogPost, boolean add) {
        if (blogPost == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        String title = blogPost.getTitle();
        String content = blogPost.getContent();
        String excerpt = blogPost.getExcerpt();
        String slug = blogPost.getSlug();
        
        // 创建时，参数不能为空
        if (add) {
            ThrowUtils.throwIf(StringUtils.isAnyBlank(title, content, excerpt, slug), ErrorCode.PARAMS_ERROR);
        }
        // 有参数则校验
        if (StringUtils.isNotBlank(title) && title.length() > 255) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "标题过长");
        }
        if (StringUtils.isNotBlank(content) && content.length() > 8192) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "内容过长");
        }
        if (StringUtils.isNotBlank(excerpt) && excerpt.length() > 500) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "摘要过长");
        }
        if (StringUtils.isNotBlank(slug) && slug.length() > 255) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "Slug过长");
        }
    }

    @Override
    public QueryWrapper<BlogPost> getQueryWrapper(BlogPostQueryRequest blogPostQueryRequest) {
        QueryWrapper<BlogPost> queryWrapper = new QueryWrapper<>();
        if (blogPostQueryRequest == null) {
            return queryWrapper;
        }
        
        Integer id = blogPostQueryRequest.getId();
        String title = blogPostQueryRequest.getTitle();
        String content = blogPostQueryRequest.getContent();
        Integer categoryId = blogPostQueryRequest.getCategoryId();
        String slug = blogPostQueryRequest.getSlug();
        String author = blogPostQueryRequest.getAuthor();
        Boolean published = blogPostQueryRequest.getPublished();
        String searchText = blogPostQueryRequest.getSearchText();
        String sortField = blogPostQueryRequest.getSortField();
        String sortOrder = blogPostQueryRequest.getSortOrder();
        
        // 拼接查询条件
        if (StringUtils.isNotBlank(searchText)) {
            queryWrapper.and(qw -> qw.like("title", searchText)
                    .or().like("excerpt", searchText)
                    .or().like("content", searchText));
        }
        queryWrapper.like(StringUtils.isNotBlank(title), "title", title);
        queryWrapper.like(StringUtils.isNotBlank(content), "content", content);
        queryWrapper.eq(ObjectUtils.isNotEmpty(id), "id", id);
        queryWrapper.eq(ObjectUtils.isNotEmpty(categoryId), "category_id", categoryId);
        queryWrapper.eq(StringUtils.isNotBlank(slug), "slug", slug);
        queryWrapper.eq(StringUtils.isNotBlank(author), "author", author);
        queryWrapper.eq(ObjectUtils.isNotEmpty(published), "published", published);
        
        queryWrapper.orderBy(SqlUtils.validSortField(sortField), 
                sortOrder.equals(CommonConstant.SORT_ORDER_ASC),
                sortField);
        return queryWrapper;
    }

    @Override
    public BlogPostVO getBlogPostVO(BlogPost blogPost, HttpServletRequest request) {
        BlogPostVO blogPostVO = BlogPostVO.objToVo(blogPost);
        
        // 可以在这里添加额外的逻辑，例如获取分类名称、判断用户是否点赞等
        
        return blogPostVO;
    }

    @Override
    public Page<BlogPostVO> getBlogPostVOPage(Page<BlogPost> blogPostPage, HttpServletRequest request) {
        List<BlogPost> blogPostList = blogPostPage.getRecords();
        Page<BlogPostVO> blogPostVOPage = new Page<>(blogPostPage.getCurrent(), blogPostPage.getSize(), blogPostPage.getTotal());
        
        if (blogPostList == null || blogPostList.isEmpty()) {
            return blogPostVOPage;
        }
        
        // 将所有记录转换为VO
        List<BlogPostVO> blogPostVOList = blogPostList.stream()
                .map(blogPost -> getBlogPostVO(blogPost, request))
                .collect(Collectors.toList());
        
        blogPostVOPage.setRecords(blogPostVOList);
        return blogPostVOPage;
    }

    @Override
    public List<BlogPost> listByCategory(Integer categoryId) {
        return baseMapper.listByCategory(categoryId);
    }

    @Override
    public BlogPost getBySlug(String slug) {
        return baseMapper.getBySlug(slug);
    }

    @Override
    public boolean incrementViewCount(Integer id) {
        return baseMapper.incrementViewCount(id) > 0;
    }

    @Override
    public boolean incrementLikeCount(Integer id) {
        return baseMapper.incrementLikeCount(id) > 0;
    }
}