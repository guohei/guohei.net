---
title: Git版本控制实用技巧
description: Git是现代软件开发必备的版本控制工具，这里整理了一些实用的Git命令和技巧
pubDate: 2024-01-30
category: 技术
tags: [Git, 版本控制, 开发工具]
draft: false
---

Git是现代软件开发必备的版本控制工具，这里整理了一些实用的Git命令和技巧。

## 基础配置

### 全局配置
```bash
# 设置用户信息
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 设置默认编辑器
git config --global core.editor vim

# 设置默认分支名
git config --global init.defaultBranch main

# 查看配置
git config --list
git config user.name
```

### SSH密钥配置
```bash
# 生成SSH密钥
ssh-keygen -t rsa -b 4096 -C "your.email@example.com"

# 添加到ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa

# 测试连接
ssh -T git@github.com
```

## 仓库操作

### 初始化和克隆
```bash
# 初始化仓库
git init
git init --bare  # 创建裸仓库

# 克隆仓库
git clone https://github.com/user/repo.git
git clone --depth 1 repo.git  # 浅克隆，只获取最新提交
git clone -b branch_name repo.git  # 克隆指定分支
```

### 远程仓库管理
```bash
# 查看远程仓库
git remote -v

# 添加远程仓库
git remote add origin https://github.com/user/repo.git
git remote add upstream https://github.com/original/repo.git

# 修改远程仓库URL
git remote set-url origin git@github.com:user/repo.git

# 删除远程仓库
git remote remove origin
```

## 分支管理

### 分支操作
```bash
# 查看分支
git branch          # 本地分支
git branch -r       # 远程分支
git branch -a       # 所有分支

# 创建分支
git branch feature-branch
git checkout -b feature-branch    # 创建并切换
git switch -c feature-branch      # 新语法

# 切换分支
git checkout main
git switch main     # 新语法

# 删除分支
git branch -d feature-branch      # 删除已合并分支
git branch -D feature-branch      # 强制删除分支
git push origin --delete feature-branch  # 删除远程分支
```

### 分支合并
```bash
# 合并分支
git merge feature-branch
git merge --no-ff feature-branch  # 禁用快进合并

# 变基合并
git rebase main
git rebase -i HEAD~3  # 交互式变基，合并最近3个提交

# 解决冲突
git status
# 编辑冲突文件
git add .
git commit
```

## 提交管理

### 基本提交
```bash
# 添加文件
git add file.txt
git add .           # 添加所有文件
git add -A          # 添加所有变更
git add -p          # 交互式添加

# 提交
git commit -m "提交信息"
git commit -am "提交信息"  # 添加并提交已跟踪文件
git commit --amend  # 修改最后一次提交
```

### 查看历史
```bash
# 查看提交历史
git log
git log --oneline   # 简洁格式
git log --graph     # 图形化显示
git log --stat      # 显示文件变更统计
git log -p          # 显示详细差异

# 查看特定文件历史
git log -- file.txt
git log --follow -- file.txt  # 跟踪重命名

# 查看分支图
git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
```

## 撤销和重置

### 撤销修改
```bash
# 撤销工作区修改
git checkout -- file.txt
git restore file.txt  # 新语法

# 撤销暂存区修改
git reset HEAD file.txt
git restore --staged file.txt  # 新语法

# 撤销提交
git reset --soft HEAD~1   # 保留修改在暂存区
git reset --mixed HEAD~1  # 保留修改在工作区（默认）
git reset --hard HEAD~1   # 完全删除修改
```

### 回退版本
```bash
# 查看提交ID
git log --oneline

# 回退到指定提交
git reset --hard commit_id
git revert commit_id  # 创建新提交来撤销

# 恢复删除的提交
git reflog
git reset --hard HEAD@{2}
```

## 标签管理

```bash
# 创建标签
git tag v1.0.0
git tag -a v1.0.0 -m "版本1.0.0"  # 带注释的标签

# 查看标签
git tag
git show v1.0.0

# 推送标签
git push origin v1.0.0
git push origin --tags  # 推送所有标签

# 删除标签
git tag -d v1.0.0
git push origin --delete v1.0.0
```

## 实用技巧

### 暂存工作
```bash
# 暂存当前工作
git stash
git stash save "工作描述"

# 查看暂存列表
git stash list

# 恢复暂存
git stash pop       # 恢复并删除暂存
git stash apply     # 恢复但保留暂存
git stash apply stash@{1}  # 恢复指定暂存

# 删除暂存
git stash drop
git stash clear     # 清空所有暂存
```

### 文件操作
```bash
# 重命名文件
git mv old_name new_name

# 删除文件
git rm file.txt
git rm --cached file.txt  # 从版本控制中移除但保留文件

# 忽略文件
echo "*.log" >> .gitignore
git add .gitignore
```

### 差异比较
```bash
# 查看差异
git diff            # 工作区与暂存区
git diff --cached   # 暂存区与最后提交
git diff HEAD       # 工作区与最后提交
git diff branch1 branch2  # 比较分支

# 查看文件差异
git diff file.txt
git diff HEAD~1 file.txt
```

## 高级技巧

### 交互式变基
```bash
# 合并多个提交
git rebase -i HEAD~3

# 在编辑器中：
# pick -> squash (合并到上一个提交)
# pick -> edit (修改提交)
# pick -> drop (删除提交)
```

### 子模块管理
```bash
# 添加子模块
git submodule add https://github.com/user/repo.git path/to/submodule

# 初始化子模块
git submodule init
git submodule update

# 克隆包含子模块的仓库
git clone --recursive repo.git

# 更新子模块
git submodule update --remote
```

### 钩子脚本
```bash
# 预提交钩子示例 (.git/hooks/pre-commit)
#!/bin/bash
# 运行代码检查
npm run lint
if [ $? -ne 0 ]; then
    echo "代码检查失败，提交被阻止"
    exit 1
fi
```

## 团队协作

### 工作流程
```bash
# 功能分支工作流
git checkout -b feature/new-feature
# 开发功能
git add .
git commit -m "添加新功能"
git push origin feature/new-feature
# 创建Pull Request

# 同步主分支
git checkout main
git pull origin main
git checkout feature/new-feature
git rebase main
```

### 代码审查
```bash
# 查看他人的分支
git fetch origin
git checkout -b review-branch origin/feature-branch

# 比较分支差异
git diff main..feature-branch
git log main..feature-branch
```

## 常用别名配置

```bash
# 设置Git别名
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'

# 复杂别名
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

## 故障排查

### 常见问题解决
```bash
# 解决合并冲突
git status
# 编辑冲突文件，删除冲突标记
git add .
git commit

# 找回丢失的提交
git reflog
git cherry-pick commit_id

# 修复分离的HEAD
git checkout main
git branch temp-branch commit_id  # 保存工作

# 清理仓库
git gc              # 垃圾回收
git fsck            # 检查仓库完整性
```

这些Git技巧可以帮助你更高效地进行版本控制和团队协作！
