---
title: 使用 Astro 构建现代化个人博客
description: 从零开始构建果黑博客的完整过程，包括技术选型、项目架构、功能实现和部署优化
pubDate: 2024-12-19
category: 技术
tags: [Astro, 博客, UnoCSS, Cloudflare]
draft: false
---

这篇文章记录了我使用 Astro 构建个人博客"果黑"的完整过程，从技术选型到最终部署的所有细节。

## 为什么选择 Astro？

在众多静态网站生成器中，我最终选择了 Astro，主要原因如下：

### 🚀 **性能优势**
- **零 JavaScript 默认**：页面默认不包含客户端 JavaScript，加载速度极快
- **按需加载**：只有需要交互的组件才会加载 JavaScript
- **静态优先**：生成纯静态 HTML，SEO 友好

### 🛠️ **开发体验**
- **组件化开发**：支持 `.astro` 组件，语法简洁直观
- **多框架支持**：可以混用 React、Vue、Svelte 等框架组件
- **TypeScript 原生支持**：无需额外配置即可使用 TypeScript
- **热重载**：开发时修改代码立即生效

### 📦 **生态系统**
- **丰富的集成**：官方提供大量开箱即用的集成
- **灵活的内容管理**：支持 Markdown、MDX 和 CMS 集成
- **现代化工具链**：基于 Vite，构建速度快

## 项目架构设计

基于 Astro Panda 主题，我设计了以下项目结构：

```
src/
├── components/           # 可复用组件
│   ├── Header.astro     # 网站头部
│   ├── Footer.astro     # 网站底部
│   ├── Navbar.astro     # 导航栏
│   └── ThemeToggle.astro # 主题切换
├── content/             # 内容管理
│   ├── posts/          # 博客文章
│   ├── notes/          # 技术笔记
│   ├── about/          # 关于页面
│   └── now/            # Now 页面
├── layouts/            # 页面布局
│   ├── Layout.astro         # 基础布局
│   ├── BlogPostLayout.astro # 文章布局
│   ├── BlogListLayout.astro # 文章列表布局
│   └── NotesListLayout.astro # 笔记列表布局
├── pages/              # 路由页面
│   ├── posts/[...slug].astro # 文章详情页
│   ├── notes/[...slug].astro # 笔记详情页
│   ├── tags/[tag].astro      # 标签页面
│   ├── about.astro           # 关于页面
│   ├── now.astro            # Now 页面
│   └── index.astro          # 首页
├── styles/             # 样式文件
│   ├── index.css       # 主样式文件
│   └── content.css     # 内容样式
├── utils/              # 工具函数
│   ├── format.ts       # 格式化工具
│   └── locale.ts       # 国际化工具
└── locales/            # 国际化文件
    ├── zh.yaml         # 中文翻译
    └── en.yaml         # 英文翻译
```

## 核心功能实现

### 1. 双内容类型系统

博客支持两种内容类型：**Posts（文章）** 和 **Notes（笔记）**，满足不同的写作需求。

#### 内容集合配置
虽然项目使用自动生成的内容集合，但实际的 frontmatter 格式如下：

```yaml
---
title: 文章标题
description: 文章描述，用于SEO和摘要
pubDate: 2024-12-19
category: 技术
tags: [Astro, 博客, UnoCSS]
draft: false
---
```

#### 内容区别
- **Posts**：正式的博客文章，适合深度思考和完整的主题
- **Notes**：技术笔记和快速记录，适合知识片段和参考资料

### 2. 现代化路由设计

采用清晰的路由结构，便于用户导航和SEO优化：

```
/                    # 首页 - 最新文章列表
/posts/[slug]/       # 文章详情页
/notes/              # 笔记列表页
/notes/[slug]/       # 笔记详情页
/tags/[tag]/         # 标签页面
/tags/               # 所有标签页面
/about/              # 关于页面
/now/                # Now 页面
```

### 3. 国际化支持

实现了中英文双语支持，使用 `astro-i18n-aut` 集成：

```typescript
// src/utils/locale.ts
export function useLocale(url: URL) {
  const locale = url.pathname.startsWith('/en') ? 'en' : 'zh'

  return {
    locale,
    path: (path: string) => locale === 'en' ? `/en${path}` : path,
    t: (key: string) => getTranslation(key, locale)
  }
}
```

### 4. 响应式设计系统

使用现代化的响应式设计，确保在所有设备上的完美体验：

#### 断点系统
```css
/* 手机端 */
@media (max-width: 640px) {
  .max-width {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* 桌面端 */
@media (min-width: 640px) {
  .max-width {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
```

#### 字体系统
使用系统原生字体栈，确保最佳性能和可读性：

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
               'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
               'Helvetica Neue', sans-serif;
}
```

## 技术栈选择

### 核心技术

#### **Astro 4.15.11**
- 现代化的静态站点生成器
- 零 JavaScript 默认，性能优异
- 支持多种框架组件

#### **UnoCSS**
- 原子化 CSS 框架
- 按需生成，体积小
- 高度可定制

```typescript
// uno.config.ts
export default defineConfig({
  presets: [
    presetWebFonts({
      fonts: {
        sans: 'Inter:400,500,600,700',
        mono: 'Fira Code:400,500'
      }
    })
  ]
})
```

#### **TypeScript**
- 类型安全
- 更好的开发体验
- 代码提示和错误检查

### 集成插件

#### **内容处理**
- `@astrojs/mdx` - MDX 支持
- `astro-expressive-code` - 代码高亮和折叠
- `remark-pangu` - 中英文排版优化

#### **SEO 和性能**
- `@astrojs/sitemap` - 自动生成站点地图
- `@astrojs/rss` - RSS 订阅支持
- `astro-purgecss` - CSS 优化

#### **开发工具**
- `prettier` - 代码格式化
- `prettier-plugin-astro` - Astro 文件格式化

## 特色功能

### 1. 代码块折叠

实现了代码块自动折叠功能，提升阅读体验：

```javascript
// 代码块折叠逻辑
function initCodeFolding() {
  const codeBlocks = document.querySelectorAll('pre[data-language]')

  codeBlocks.forEach(block => {
    if (block.scrollHeight > 300) {
      addFoldButton(block)
    }
  })
}
```

### 2. 深色模式

支持系统主题检测和手动切换：

```css
:root {
  --color-text-body: 55 65 81;
  --color-text-heading: 55 65 81;
}

.dark {
  --color-text-body: 229 231 235;
  --color-text-heading: 243 244 246;
}
```

### 3. Now 页面

参考 Derek Sivers 的 Now 页面概念，展示当前状态和近期计划。

## 部署方案

### Cloudflare Pages（推荐）

选择 Cloudflare Pages 作为主要部署平台，原因如下：

#### **优势**
- 全球 CDN 加速
- 免费 SSL 证书
- 自动部署
- 优秀的性能

#### **部署配置**

```yaml
# .github/workflows/deploy.yml
name: Deploy to Cloudflare Pages
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: guohei-blog
          directory: dist
```

#### **构建设置**
- 构建命令：`npm run build`
- 输出目录：`dist`
- Node.js 版本：20

### 其他部署选项

#### **Vercel**
- 自动检测 Astro 项目
- 零配置部署
- 优秀的开发者体验

#### **Netlify**
- 简单的拖拽部署
- 表单处理功能
- 分支预览

## 性能优化

### 构建优化

#### **静态生成**
所有页面在构建时生成，无需服务器渲染：

```javascript
// astro.config.mjs
export default defineConfig({
  output: 'static',
  build: {
    format: 'directory'
  }
})
```

#### **资源优化**
- CSS 自动压缩
- 图片响应式处理
- 字体预加载

### 运行时性能

#### **Core Web Vitals**
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

#### **优化策略**
- 最小化 JavaScript
- 使用系统字体
- 图片懒加载

## 开发体验

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

### 内容创作

#### **文章模板**
```yaml
---
title: 文章标题
description: 文章描述
pubDate: 2024-12-19
category: 技术
tags: [标签1, 标签2]
draft: false
---

文章内容...
```

#### **写作工具**
- Markdown 语法支持
- 代码高亮
- 数学公式（可选）
- 图片优化

## 总结

通过使用 Astro 构建这个博客，我获得了：

### ✅ **技术收益**
- 学习了现代化的静态站点生成
- 掌握了 UnoCSS 原子化 CSS
- 实践了 TypeScript 在前端项目中的应用
- 了解了 Cloudflare Pages 的部署流程

### ✅ **产品收益**
- 拥有了一个高性能的个人博客
- 支持双内容类型（文章+笔记）
- 完整的 SEO 优化
- 优秀的用户体验

### ✅ **未来规划**
- [ ] 添加全文搜索功能
- [ ] 实现文章目录导航
- [ ] 集成评论系统
- [ ] 添加阅读统计
- [ ] 优化移动端体验

Astro 确实是一个优秀的静态站点生成器，特别适合构建内容驱动的网站。如果你也在考虑构建个人博客，强烈推荐尝试 Astro！

## 参考资源

- [Astro 官方文档](https://docs.astro.build)
- [UnoCSS 文档](https://unocss.dev)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages)
- [Astro Panda 主题](https://github.com/yuhangch/astro-theme-panda)
- [项目源码](https://github.com/username/guohei-blog)