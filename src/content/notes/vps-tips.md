---
title: VPS服务器运维技巧
description: VPS服务器日常运维的实用技巧，帮助你更好地管理你的服务器
pubDate: 2024-01-20
category: 技术
tags: [VPS, 服务器, 运维, SSH]
draft: false
---

这里整理了一些VPS服务器日常运维的实用技巧，帮助你更好地管理你的服务器。

## SSH连接优化

### SSH密钥登录
```bash
# 生成SSH密钥对
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# 复制公钥到服务器
ssh-copy-id user@server_ip

# 或者手动复制
cat ~/.ssh/id_rsa.pub | ssh user@server_ip "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

### SSH配置优化
编辑 `~/.ssh/config` 文件：
```bash
Host myserver
    HostName 192.168.1.100
    User root
    Port 22
    IdentityFile ~/.ssh/id_rsa
    ServerAliveInterval 60
    ServerAliveCountMax 3
```

### 服务器SSH安全配置
编辑 `/etc/ssh/sshd_config`：
```bash
# 禁用密码登录
PasswordAuthentication no

# 禁用root登录
PermitRootLogin no

# 修改默认端口
Port 2222

# 限制登录用户
AllowUsers username

# 重启SSH服务
systemctl restart sshd
```

## 系统安全加固

### 防火墙配置
```bash
# UFW防火墙（Ubuntu/Debian）
ufw enable
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp

# iptables防火墙（CentOS/RHEL）
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT
iptables -A INPUT -j DROP
```

### Fail2Ban防暴力破解
```bash
# 安装Fail2Ban
apt install fail2ban  # Ubuntu/Debian
yum install fail2ban  # CentOS/RHEL

# 配置Fail2Ban
cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# 编辑配置文件
vim /etc/fail2ban/jail.local
```

## 系统监控

### 系统资源监控
```bash
# 实时监控
htop                    # 进程监控
iotop                   # IO监控
nethogs                 # 网络使用监控
iftop                   # 网络流量监控

# 系统负载
uptime                  # 系统负载
w                       # 当前登录用户
last                    # 登录历史
```

### 日志监控
```bash
# 系统日志
tail -f /var/log/syslog         # 系统日志
tail -f /var/log/auth.log       # 认证日志
tail -f /var/log/nginx/access.log  # Nginx访问日志

# 日志分析
grep "Failed password" /var/log/auth.log | tail -10
grep "404" /var/log/nginx/access.log | wc -l
```

## 服务管理

### Systemd服务管理
```bash
# 服务状态
systemctl status nginx
systemctl is-active nginx
systemctl is-enabled nginx

# 服务控制
systemctl start nginx
systemctl stop nginx
systemctl restart nginx
systemctl reload nginx

# 开机自启
systemctl enable nginx
systemctl disable nginx
```

### 进程管理
```bash
# 查看服务进程
ps aux | grep nginx
pgrep -f nginx

# 重启服务
systemctl restart nginx
# 或者
pkill -f nginx && nginx
```

## 磁盘管理

### 磁盘空间清理
```bash
# 查找大文件
find / -type f -size +100M -exec ls -lh {} \;
du -ah / | sort -rh | head -20

# 清理系统缓存
apt clean && apt autoremove  # Ubuntu/Debian
yum clean all               # CentOS/RHEL

# 清理日志文件
journalctl --vacuum-time=7d  # 清理7天前的日志
> /var/log/nginx/access.log  # 清空日志文件
```

### 磁盘挂载
```bash
# 查看磁盘
lsblk
fdisk -l

# 格式化磁盘
mkfs.ext4 /dev/sdb1

# 挂载磁盘
mount /dev/sdb1 /mnt/data

# 永久挂载（编辑/etc/fstab）
echo "/dev/sdb1 /mnt/data ext4 defaults 0 2" >> /etc/fstab
```

## 备份策略

### 数据库备份
```bash
# MySQL备份
mysqldump -u root -p database_name > backup.sql
mysqldump -u root -p --all-databases > all_databases.sql

# 恢复数据库
mysql -u root -p database_name < backup.sql
```

### 文件备份
```bash
# 使用rsync备份
rsync -avz /home/user/ user@backup-server:/backup/user/

# 使用tar备份
tar -czf backup_$(date +%Y%m%d).tar.gz /important/data/

# 自动备份脚本
#!/bin/bash
BACKUP_DIR="/backup"
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf $BACKUP_DIR/website_$DATE.tar.gz /var/www/html/
find $BACKUP_DIR -name "website_*.tar.gz" -mtime +7 -delete
```

## 性能优化

### 内存优化
```bash
# 查看内存使用
free -h
cat /proc/meminfo

# 清理缓存
sync && echo 3 > /proc/sys/vm/drop_caches

# 配置swap
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

### 网络优化
```bash
# 调整TCP参数
echo 'net.core.rmem_max = 16777216' >> /etc/sysctl.conf
echo 'net.core.wmem_max = 16777216' >> /etc/sysctl.conf
echo 'net.ipv4.tcp_rmem = 4096 87380 16777216' >> /etc/sysctl.conf
sysctl -p
```

## 常用脚本

### 系统信息脚本
```bash
#!/bin/bash
echo "=== 系统信息 ==="
echo "主机名: $(hostname)"
echo "系统: $(uname -a)"
echo "运行时间: $(uptime)"
echo "磁盘使用: $(df -h / | tail -1 | awk '{print $5}')"
echo "内存使用: $(free | grep Mem | awk '{printf "%.2f%%", $3/$2 * 100.0}')"
echo "CPU负载: $(cat /proc/loadavg | awk '{print $1, $2, $3}')"
```

### 自动更新脚本
```bash
#!/bin/bash
# 系统更新脚本
apt update && apt upgrade -y  # Ubuntu/Debian
# yum update -y               # CentOS/RHEL

# 重启服务
systemctl restart nginx
systemctl restart php7.4-fpm

echo "系统更新完成: $(date)"
```

这些技巧可以帮助你更好地管理VPS服务器，提高安全性和性能。记得定期备份重要数据！
