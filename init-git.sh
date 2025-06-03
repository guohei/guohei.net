#!/bin/bash

# 果黑博客 Git 初始化脚本

echo "🚀 初始化 Git 仓库..."

# 检查是否已经是Git仓库
if [ -d ".git" ]; then
    echo "✅ Git 仓库已存在"
else
    echo "📦 初始化新的 Git 仓库..."
    git init
fi

# 添加所有文件
echo "📝 添加文件到暂存区..."
git add .

# 检查是否有文件需要提交
if git diff --staged --quiet; then
    echo "ℹ️  没有文件需要提交"
else
    echo "💾 提交初始代码..."
    git commit -m "🎉 Initial commit: 果黑博客项目

✨ 功能特性:
- 基于 Astro 4.x 构建的现代化博客
- 支持文章(Posts)和笔记(Notes)双内容类型
- 完整的标签分类系统
- 响应式设计，支持深色模式
- SEO 优化，自动生成 RSS 和 Sitemap
- UnoCSS 原子化 CSS 框架
- 代码高亮和折叠功能
- 国际化支持

🛠️ 技术栈:
- Astro 4.15.11
- TypeScript
- UnoCSS
- Markdown/MDX
- Expressive Code

📦 部署:
- Cloudflare Pages
- GitHub Actions 自动部署
- 自定义域名支持

🎨 设计:
- 现代化响应式布局
- 系统原生字体栈
- 优雅的深色模式
- 精致的交互动画"
fi

echo ""
echo "🎯 下一步操作:"
echo "1. 在 GitHub 创建新仓库 'guohei-blog'"
echo "2. 运行以下命令连接远程仓库:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/guohei-blog.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. 在 Cloudflare Pages 中连接 GitHub 仓库"
echo "4. 设置构建配置:"
echo "   - 构建命令: npm run build"
echo "   - 输出目录: dist"
echo "   - Node.js 版本: 20"
echo ""
echo "✅ Git 初始化完成！"
