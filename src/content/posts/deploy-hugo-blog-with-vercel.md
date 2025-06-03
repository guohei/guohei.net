---
title: 使用Vercel和Github来部署Hugo
description: 使用Vercel和Github来部署Hugo
pubDate: 2020-03-20
tags: [博客, Hugo, Vercel]
category: 随笔
---

重新折腾下Blog，综合考虑了下决定使用Hugo来搭建。

了解了一些技术和平台之后，最后选择了目前比较成熟的Vercel和Github平台来部署。

### Hugo部署

使用Vercel来部署hugo非常简单，Vercel是本身直接支持Hogo的，只需要在注册的时候使用Github，创建项目的时候选择Hogo Template最后填上Github里需要的仓库名称等待部署完成，一个Hugo站点就诞生了。
<!-- more -->
### 选择Hugo主题

作为一个优秀的博客生成框架，Hogo是拥有许多三方的主题可以选择的，在Hogo的主题[展示页面](https://themes.gohugo.io/)可以选择一个喜欢的下载下来。然后将创建在Github的Hogo的仓库git clone到本地，将下载的主题文件解压到themes文件夹，并按照要求修改仓库文件夹里的config.toml文件设置好主题。最后将所有文件提交到Github就完成了Hugo主题的设定。

每个主题都有一些特别的设置，这些你都可以在主题发布的页面找到很详细的介绍，比如我使用的[internet-weblog](https://github.com/jnjosh/internet-weblog)主题可以发布和展示micropost。

### 撰写文章

使用Hugo来创作很简单，选择一个你喜欢的Markdown编辑器创建一个带有简单格式的md文件放在仓库的content文件夹下即可。具体你可以参看[Hugo官网](https://gohugo.io/content-management/organization/)的详细介绍。

当然你也可以将Hugo安装到你的本地使用命令行来创建内容。

### 发布和维护

选择Hugo就是因为他可以非常方便的生成整个网站的静态文件，你可以简单的将这些静态文件上传到任何的Web服务器上完成网站搭建从而方便网站的迁移。

现在我可以直接在Github仓库内的content文件夹下直接创建md文件发布新文章，也可以在本地使用Markdown编辑器创建新文章后提交到github仓库完成发布。整个流程从提交到最后Vercel重新自动部署再展示出来可能需要几十秒的时间。

### 手机端发布内容

iPhone上使用Working Copy把Github的Hugo仓库同步到本地修改编辑然后提交更新内容。
