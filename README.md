# 果黑的个人博客 🐼

基于 Astro Panda 主题定制的个人博客，记录技术、生活与思考。

🌐 **网站地址**: [guohei.com](https://guohei.com)

## ✨ 主要特性

- 🚀 **快速加载** - 基于 Astro 的静态站点生成
- 🎨 **现代化设计** - 采用现代化的响应式布局和排版
- 📱 **完美响应式** - 从手机到桌面的完美适配体验
- 🌙 **深色模式** - 支持明暗主题切换
- 📂 **分类管理** - 便于内容组织和浏览
- 📄 **Now 页面** - 展示当前状态和近期计划
- 🔤 **现代字体** - 使用系统原生字体栈，提供最佳阅读体验
- 📱 **SEO 优化** - 完善的元数据和社交分享
- 📡 **RSS 订阅** - 及时获取最新文章
- 🌍 **国际化** - 支持中英文切换


## 🏗️ 技术栈

- **框架**: [Astro](https://astro.build/) - 现代化静态站点生成器
- **样式**: 现代化 CSS + 自定义工具类 - 轻量级响应式设计系统
- **字体**: 系统原生字体栈 - 最佳性能和可读性
- **语言**: TypeScript + JavaScript
- **部署**: Cloudflare Pages
- **主题**: 基于 [Panda 主题](https://github.com/yuhangch/astro-theme-panda) 定制

### 🎨 现代化设计特色

- ✅ **响应式布局** - 移动优先的现代化布局系统
- ✅ **系统字体** - 使用原生字体栈，提供最佳阅读体验
- ✅ **主题变量** - 使用 CSS 变量实现主题切换
- ✅ **断点系统** - 完整的响应式断点设计
- ✅ **现代化交互** - 精致的悬停效果和过渡动画
- ✅ **卡片设计** - 现代化的卡片式布局
- ✅ **极致性能** - 优化的 CSS 和最小化的 JavaScript

### 📱 响应式设计

博客采用现代化的响应式设计，确保在所有设备上都有出色的阅读体验：

#### 断点系统
- **手机**: < 640px - 单列布局，优化触摸交互
- **平板**: 640px - 1024px - 适中的内容宽度
- **桌面**: > 1024px - 最大 1200px 容器宽度
- **大屏**: > 1280px - 更宽松的内边距

#### 字体系统
- **系统字体栈**: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto'` 等
- **响应式字号**: 根据屏幕尺寸自动调整
- **优化行高**: 1.6-1.8 的行高确保最佳可读性

#### 布局特性
- **流式布局**: 内容自适应容器宽度
- **卡片设计**: 现代化的卡片式文章列表
- **悬停效果**: 精致的交互反馈
- **深色模式**: 完整的深色主题支持

## 📁 项目结构

```
/
├── public/                 # 静态资源
├── src/
│   ├── components/        # 组件
│   ├── content/          # 内容文件
│   │   ├── posts/        # 博客文章
│   │   ├── about/        # 关于页面
│   │   └── now/          # Now 页面
│   ├── layouts/          # 布局组件
│   ├── pages/            # 页面路由
│   ├── styles/           # 样式文件
│   ├── utils/            # 工具函数
│   └── config.js         # 站点配置
├── astro.config.mjs      # Astro 配置
└── package.json          # 依赖管理
```

## ⚙️ 配置说明

在 `src/config.js` 中可以自定义站点配置：

```javascript
export const PandaConfig = {
    title: '果黑',
    description: '果黑的个人博客 - 记录技术、生活与思考',
    start: '2006',
    site: 'https://guohei.com/',
    defaultLocale: 'zh',
    author: {
        name: '果黑',
        email: 'hello@guohei.com',
        github: 'https://github.com/guohei',
        bio: '一个热爱技术和生活的开发者'
    },
    // ... 更多配置选项
}
```

## More customization

### Add a new post

- Create a new markdown file in `src/content/posts/` folder
- Add the following frontmatter to the top of the file:

```markdown
---
description: "Your description here"
pubDate: "2024-03-02"
tags: ['markdown','example']
categories: ['tech']
---
```

- Write your content below the frontmatter

### Add a new page

- Create a new folder in `src/content/` folder
- Add an `index.md` file in the new folder
- Write your content in the `index.md` file
- Create `your-page-name.astro` in `src/pages/` folder
- Reference the `src/content/about/about.md` and `src/pages/about.astro` for more details.


### Customize the theme

- Update the `src/styles/index.css` file to customize the theme
- Set `--color-primary-main` and `--color-secondary-main` in `:root` and `:root.dark` to change the theme colors.


### Simple language support

- Set defaultLocale in `astro.config.mjs (PandaConfig)` to the language you want to use.
- If you need lang not `zh` or `en`, you need to add the language file in `src/content/lang/` folder.
- Reference the `src/locates/en.yml` and `src/utils/locale.ts` for more details.


## 🚀 快速开始

### 本地开发

```bash
# 克隆项目
git clone <your-repo-url>
cd guohei-blog

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 常用命令

| 命令                      | 说明                                             |
| :------------------------ |:------------------------------------------------|
| `npm install`             | 安装依赖                                         |
| `npm run dev`             | 启动开发服务器 (localhost:4321)                  |
| `npm run build`           | 构建生产版本到 `./dist/`                         |
| `npm run preview`         | 本地预览构建结果                                 |
| `npm run astro ...`       | 运行 Astro CLI 命令                              |

## 📝 内容管理

### 添加新文章

1. 在 `src/content/posts/` 目录下创建新的 Markdown 文件
2. 添加必要的 frontmatter：

```markdown
---
title: "文章标题"
description: "文章描述"
pubDate: "2024-12-19"
tags: ['标签1', '标签2']
categories: ['分类']
---

# 文章内容

这里是文章正文...
```

### 自定义页面

1. 在 `src/content/` 下创建新目录
2. 添加 `index.md` 文件
3. 在 `src/pages/` 下创建对应的 `.astro` 文件

## 🎨 主题定制

### 颜色主题

在 `src/styles/index.css` 中修改 CSS 变量：

```css
:root {
    --color-primary-main: 29 116 132;
    --color-secondary-main: 20 79 90;
    /* 更多颜色配置... */
}
```

### 布局调整

主要布局文件位于 `src/layouts/` 目录：
- `Layout.astro` - 基础布局
- `BlogListLayout.astro` - 文章列表布局
- `BlogPostLayout.astro` - 文章详情布局

## 🌐 部署

### Cloudflare Pages

1. 将代码推送到 GitHub
2. 在 Cloudflare Pages 中连接 GitHub 仓库
3. 设置构建命令：`npm run build`
4. 设置输出目录：`dist`
5. 配置环境变量（如需要）

### 自动部署

项目已配置 GitHub Actions，推送到 `main` 分支时会自动部署到 Cloudflare Pages。

需要在 GitHub 仓库设置中添加以下 Secrets：
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## 📊 SEO 优化

- ✅ 自动生成 sitemap
- ✅ RSS 订阅支持
- ✅ Open Graph 标签
- ✅ Twitter Cards
- ✅ 结构化数据
- ✅ robots.txt

## 🔧 功能特性

- [x] 响应式设计
- [x] 深色模式
- [x] 标签分类
- [x] 归档页面
- [x] RSS 订阅
- [x] SEO 优化
- [ ] 文章搜索
- [ ] 评论系统
- [ ] 访问统计
- [ ] 更多语言支持

## 📞 联系方式

- 📧 邮箱：[hello@guohei.com](mailto:hello@guohei.com)
- 🐙 GitHub：[github.com/guohei](https://github.com/guohei)
- 📱 Telegram：[@guohei](https://t.me/guohei)

## 📄 许可证

基于 [Panda 主题](https://github.com/yuhangch/astro-theme-panda) 进行定制开发。

---

感谢使用果黑博客主题！如果你觉得这个主题不错，欢迎 Star ⭐
