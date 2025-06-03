---
title: Docker常用命令和技巧
description: Docker是现代应用部署的重要工具，这里整理了常用的Docker命令和实用技巧
pubDate: 2024-01-25
category: 技术
tags: [Docker, 容器, 运维, DevOps]
draft: false
---

Docker是现代应用部署的重要工具，这里整理了常用的Docker命令和实用技巧。

## 基础命令

### 镜像管理
```bash
# 搜索镜像
docker search nginx

# 拉取镜像
docker pull nginx:latest
docker pull nginx:1.20

# 查看本地镜像
docker images
docker images -a        # 显示所有镜像（包括中间层）

# 删除镜像
docker rmi nginx:latest
docker rmi $(docker images -q)  # 删除所有镜像
```

### 容器管理
```bash
# 运行容器
docker run -d --name mynginx -p 80:80 nginx
docker run -it ubuntu:20.04 /bin/bash  # 交互式运行

# 查看容器
docker ps           # 运行中的容器
docker ps -a        # 所有容器
docker ps -q        # 只显示容器ID

# 容器操作
docker start container_name
docker stop container_name
docker restart container_name
docker pause container_name
docker unpause container_name

# 删除容器
docker rm container_name
docker rm $(docker ps -aq)  # 删除所有容器
```

## 容器交互

### 进入容器
```bash
# 执行命令
docker exec -it container_name /bin/bash
docker exec -it container_name sh

# 查看容器日志
docker logs container_name
docker logs -f container_name       # 实时查看日志
docker logs --tail 100 container_name  # 查看最后100行
```

### 文件操作
```bash
# 复制文件
docker cp file.txt container_name:/path/to/destination
docker cp container_name:/path/to/file.txt ./local_file.txt

# 查看容器信息
docker inspect container_name
docker stats container_name     # 实时资源使用情况
```

## Docker Compose

### 基本使用
```yaml
# docker-compose.yml 示例
version: '3.8'
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html
    restart: unless-stopped
  
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: myapp
    volumes:
      - db_data:/var/lib/mysql
    restart: unless-stopped

volumes:
  db_data:
```

### Compose命令
```bash
# 启动服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs
docker-compose logs web

# 停止服务
docker-compose stop
docker-compose down         # 停止并删除容器
docker-compose down -v      # 同时删除数据卷
```

## 实用技巧

### 数据持久化
```bash
# 数据卷
docker volume create mydata
docker run -v mydata:/data nginx

# 绑定挂载
docker run -v /host/path:/container/path nginx
docker run -v $(pwd):/app nginx  # 挂载当前目录
```

### 网络管理
```bash
# 创建网络
docker network create mynetwork

# 查看网络
docker network ls
docker network inspect mynetwork

# 连接容器到网络
docker run --network mynetwork nginx
```

### 镜像构建
```dockerfile
# Dockerfile 示例
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
# 构建镜像
docker build -t myapp:latest .
docker build -t myapp:v1.0 --no-cache .

# 多阶段构建
docker build --target production -t myapp:prod .
```

## 监控和调试

### 容器监控
```bash
# 资源使用情况
docker stats
docker stats --no-stream   # 显示一次性统计

# 容器进程
docker top container_name

# 容器端口映射
docker port container_name
```

### 故障排查
```bash
# 查看容器详细信息
docker inspect container_name | jq '.[0].State'

# 查看容器文件系统变化
docker diff container_name

# 导出容器为镜像
docker commit container_name new_image:tag

# 保存和加载镜像
docker save -o myimage.tar myimage:tag
docker load -i myimage.tar
```

## 清理和维护

### 系统清理
```bash
# 清理未使用的资源
docker system prune         # 清理停止的容器、未使用的网络等
docker system prune -a      # 清理所有未使用的资源
docker system prune --volumes  # 包括数据卷

# 单独清理
docker container prune      # 清理停止的容器
docker image prune          # 清理悬空镜像
docker volume prune         # 清理未使用的数据卷
docker network prune        # 清理未使用的网络
```

### 磁盘空间管理
```bash
# 查看Docker磁盘使用
docker system df
docker system df -v         # 详细信息

# 限制日志大小
docker run --log-opt max-size=10m --log-opt max-file=3 nginx
```

## 安全最佳实践

### 用户权限
```dockerfile
# 创建非root用户
FROM ubuntu:20.04
RUN groupadd -r appuser && useradd -r -g appuser appuser
USER appuser
```

### 镜像安全
```bash
# 扫描镜像漏洞
docker scan myimage:tag

# 使用官方镜像
docker pull nginx:1.20-alpine  # 使用Alpine版本，更小更安全
```

## 常用组合命令

### 批量操作
```bash
# 停止所有容器
docker stop $(docker ps -q)

# 删除所有停止的容器
docker rm $(docker ps -aq --filter status=exited)

# 删除所有悬空镜像
docker rmi $(docker images -f "dangling=true" -q)

# 强制删除所有镜像
docker rmi -f $(docker images -q)
```

### 一键部署脚本
```bash
#!/bin/bash
# 部署Web应用脚本

# 停止旧容器
docker stop myapp 2>/dev/null || true
docker rm myapp 2>/dev/null || true

# 拉取最新镜像
docker pull myapp:latest

# 启动新容器
docker run -d \
  --name myapp \
  --restart unless-stopped \
  -p 80:3000 \
  -v /data/app:/app/data \
  myapp:latest

echo "应用部署完成"
```

## 开发环境配置

### 热重载开发
```bash
# Node.js开发环境
docker run -it --rm \
  -v $(pwd):/app \
  -w /app \
  -p 3000:3000 \
  node:16 \
  npm run dev
```

### 数据库开发
```bash
# 快速启动MySQL
docker run -d \
  --name dev-mysql \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=devdb \
  -p 3306:3306 \
  mysql:8.0

# 快速启动Redis
docker run -d \
  --name dev-redis \
  -p 6379:6379 \
  redis:alpine
```

这些Docker命令和技巧可以大大提高你的开发和部署效率！
