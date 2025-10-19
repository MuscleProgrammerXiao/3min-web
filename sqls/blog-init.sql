CREATE TABLE blog_posts (
                            id INT AUTO_INCREMENT PRIMARY KEY COMMENT '文章ID，自增主键',
                            title VARCHAR(255) NOT NULL COMMENT '文章标题',
                            excerpt TEXT NOT NULL COMMENT '文章摘要，用于列表页展示',
                            content LONGTEXT NOT NULL COMMENT '文章完整内容，支持Markdown格式',
                            publish_date DATE NOT NULL COMMENT '文章发布日期',
                            read_time VARCHAR(50) NOT NULL COMMENT '阅读时间估计，如"5分钟"',
                            category_id INT NOT NULL COMMENT '分类ID，关联blog_categories表',
                            slug VARCHAR(255) NOT NULL UNIQUE COMMENT '文章URL友好的唯一标识',
                            author VARCHAR(100) NOT NULL COMMENT '文章作者',
                            cover_image VARCHAR(255) COMMENT '文章封面图片URL',
                            published BOOLEAN DEFAULT FALSE COMMENT '是否发布，true为已发布，false为草稿',
                            view_count INT DEFAULT 0 COMMENT '文章浏览次数',
                            like_count INT DEFAULT 0 COMMENT '文章点赞数',
                            comment_count INT DEFAULT 0 COMMENT '文章评论数',
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间',
                            INDEX idx_slug (slug) COMMENT '文章slug索引，用于快速查找',
                            INDEX idx_category (category_id) COMMENT '分类索引，用于按分类查询',
                            INDEX idx_publish_date (publish_date) COMMENT '发布日期索引，用于按时间排序'
) COMMENT '博客文章表，存储所有博客文章信息';

CREATE TABLE blog_categories (
                                 id INT AUTO_INCREMENT PRIMARY KEY COMMENT '分类ID，自增主键',
                                 name VARCHAR(50) NOT NULL UNIQUE COMMENT '分类名称，如"技术"、"生活"等',
                                 description TEXT COMMENT '分类描述',
                                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) COMMENT '博客分类表，存储文章分类信息';

CREATE TABLE blog_tags (
                           id INT AUTO_INCREMENT PRIMARY KEY COMMENT '标签ID，自增主键',
                           name VARCHAR(50) NOT NULL UNIQUE COMMENT '标签名称，如"React"、"JavaScript"等',
                           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) COMMENT '博客标签表，存储所有标签信息';

CREATE TABLE blog_images (
                             id INT AUTO_INCREMENT PRIMARY KEY COMMENT '图片ID，自增主键',
                             post_id INT NOT NULL COMMENT '关联的文章ID',
                             url VARCHAR(255) NOT NULL COMMENT '图片URL路径',
                             alt_text VARCHAR(255) COMMENT '图片替代文本，用于SEO和无障碍访问',
                             caption TEXT COMMENT '图片说明文字',
                             display_order INT DEFAULT 0 COMMENT '显示顺序，用于控制多图片的显示顺序',
                             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                             INDEX idx_post_id (post_id) COMMENT '文章ID索引，用于查找文章的所有图片'
) COMMENT '博客图片表，存储文章相关的图片信息';

CREATE TABLE blog_images (
                             id INT AUTO_INCREMENT PRIMARY KEY COMMENT '图片ID，自增主键',
                             post_id INT NOT NULL COMMENT '关联的文章ID',
                             url VARCHAR(255) NOT NULL COMMENT '图片URL路径',
                             alt_text VARCHAR(255) COMMENT '图片替代文本，用于SEO和无障碍访问',
                             caption TEXT COMMENT '图片说明文字',
                             display_order INT DEFAULT 0 COMMENT '显示顺序，用于控制多图片的显示顺序',
                             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                             INDEX idx_post_id (post_id) COMMENT '文章ID索引，用于查找文章的所有图片'
) COMMENT '博客图片表，存储文章相关的图片信息';

-- 初始化博客分类数据
INSERT INTO blog_categories (name, description) VALUES
                                                    ('技术', '技术相关文章，包括编程、开发工具等'),
                                                    ('生活', '生活感悟、日常记录等内容'),
                                                    ('分享', '分享经验、资源、工具等'),
                                                    ('随笔', '随想、短文等'),
                                                    ('教程', '教程类文章，包括详细的步骤指导'),
                                                    ('产品', '产品设计、分析、评测等');