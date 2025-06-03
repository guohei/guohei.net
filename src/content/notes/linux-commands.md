---
title: 常用Linux命令速查
description: 一份常用Linux命令的快速参考指南，包含了日常运维和开发中最常用的命令
pubDate: 2024-01-15
category: 技术
tags: [Linux, 命令行, 运维]
draft: false
---

这是一份常用Linux命令的快速参考指南，包含了日常运维和开发中最常用的命令。

## 文件和目录操作

### 基本操作
```bash
# 查看当前目录
pwd

# 列出文件和目录
ls -la          # 详细列表，包含隐藏文件
ls -lh          # 人类可读的文件大小
ls -lt          # 按修改时间排序

# 切换目录
cd /path/to/dir # 切换到指定目录
cd ~            # 切换到用户主目录
cd -            # 切换到上一个目录

# 创建目录
mkdir dirname           # 创建单个目录
mkdir -p path/to/dir    # 递归创建目录
```

### 文件操作
```bash
# 复制文件
cp file1 file2          # 复制文件
cp -r dir1 dir2         # 递归复制目录
cp -p file1 file2       # 保持文件属性

# 移动/重命名
mv oldname newname      # 重命名文件
mv file /path/to/dest   # 移动文件

# 删除文件
rm file                 # 删除文件
rm -rf directory        # 强制递归删除目录
rm -i file              # 交互式删除
```

## 文件内容查看

```bash
# 查看文件内容
cat file                # 显示整个文件
less file               # 分页查看文件
head -n 20 file         # 查看前20行
tail -n 20 file         # 查看后20行
tail -f file            # 实时查看文件末尾

# 搜索文件内容
grep "pattern" file     # 在文件中搜索模式
grep -r "pattern" dir   # 递归搜索目录
grep -i "pattern" file  # 忽略大小写搜索
grep -n "pattern" file  # 显示行号
```

## 系统信息

```bash
# 系统信息
uname -a                # 系统信息
whoami                  # 当前用户
id                      # 用户ID和组ID
uptime                  # 系统运行时间

# 磁盘使用
df -h                   # 磁盘使用情况
du -sh *                # 当前目录下各文件夹大小
du -sh /path/to/dir     # 指定目录大小

# 内存使用
free -h                 # 内存使用情况
top                     # 实时进程监控
htop                    # 更友好的进程监控
```

## 进程管理

```bash
# 查看进程
ps aux                  # 查看所有进程
ps aux | grep nginx     # 查找特定进程
pgrep nginx             # 查找进程ID

# 杀死进程
kill PID                # 杀死指定进程
kill -9 PID             # 强制杀死进程
killall nginx           # 杀死所有nginx进程
pkill -f "pattern"      # 根据模式杀死进程
```

## 网络相关

```bash
# 网络连接
netstat -tulpn          # 查看端口监听情况
ss -tulpn               # 更现代的netstat替代
lsof -i :80             # 查看80端口使用情况

# 网络测试
ping google.com         # 测试网络连通性
curl -I website.com     # 获取HTTP头信息
wget file_url           # 下载文件
```

## 文件权限

```bash
# 修改权限
chmod 755 file          # 设置文件权限
chmod +x script.sh      # 添加执行权限
chmod -R 644 directory  # 递归设置目录权限

# 修改所有者
chown user:group file   # 修改文件所有者和组
chown -R user directory # 递归修改目录所有者
```

## 压缩和解压

```bash
# tar压缩
tar -czf archive.tar.gz directory/  # 压缩目录
tar -xzf archive.tar.gz             # 解压文件
tar -tzf archive.tar.gz             # 查看压缩包内容

# zip压缩
zip -r archive.zip directory/       # 压缩目录
unzip archive.zip                   # 解压zip文件
unzip -l archive.zip                # 查看zip内容
```

## 文本处理

```bash
# 文本操作
sort file               # 排序文件内容
uniq file               # 去除重复行
wc -l file              # 统计行数
cut -d',' -f1 file      # 提取CSV第一列
sed 's/old/new/g' file  # 替换文本
awk '{print $1}' file   # 打印第一列
```

## 实用技巧

```bash
# 历史命令
history                 # 查看命令历史
!!                      # 执行上一条命令
!n                      # 执行历史中第n条命令

# 后台运行
nohup command &         # 后台运行命令
screen -S session_name  # 创建screen会话
tmux new -s session     # 创建tmux会话

# 查找文件
find /path -name "*.txt"        # 按名称查找文件
find /path -type f -size +100M  # 查找大于100M的文件
find /path -mtime -7            # 查找7天内修改的文件
```

这些命令涵盖了Linux系统管理的大部分日常需求，建议收藏备用！
