# Docker 镜像构建和推送配置指南

## 概述

这个 GitHub Actions 工作流 (`docker-build-push.yml`) 可以自动构建 Vaultwarden 中文版的 Docker 镜像并推送到 Docker Hub 和/或 GitHub Container Registry。

> **注意**: 构建的镜像名称为 `vaultwarden-zh`，区别于官方的 `vaultwarden` 镜像。

## 功能特点

- ✅ 支持多架构构建 (amd64, arm64, arm/v7, arm/v6)
- ✅ 构建 Debian 和 Alpine 两个版本
- ✅ 可选择推送到 Docker Hub 或 GitHub Container Registry
- ✅ 自动生成版本标签
- ✅ 添加 OCI 标准镜像标签
- ✅ 手动触发构建

## 配置要求

### 1. Docker Hub 配置 (如果要推送到 Docker Hub)

在 GitHub 仓库设置中添加以下 **Secrets**:

1. 进入仓库 Settings → Secrets and variables → Actions
2. 点击 "New repository secret"
3. 添加以下 secrets:

```
Name: DOCKERHUB_USERNAME
Value: 你的 Docker Hub 用户名

Name: DOCKERHUB_TOKEN
Value: 你的 Docker Hub 访问令牌
```

**获取 Docker Hub 访问令牌的方法：**
1. 登录 Docker Hub
2. 进入 Account Settings → Security
3. 点击 "New Access Token"
4. 选择权限并生成令牌

### 2. GitHub Container Registry 配置

推送到 GitHub Container Registry 不需要额外配置，使用内置的 `GITHUB_TOKEN` 即可。

## 使用方法

### 手动触发构建

1. 进入仓库的 Actions 页面
2. 选择 "Docker Build and Push" 工作流
3. 点击 "Run workflow"
4. 配置以下参数：
   - **version**: 镜像版本标签 (默认: latest)
   - **push_to_dockerhub**: 是否推送到 Docker Hub (默认: true)
   - **push_to_ghcr**: 是否推送到 GitHub Container Registry (默认: false)

### 参数说明

- **version**: 镜像标签名称
  - 如果当前提交有 Git 标签，则使用该标签作为版本
  - 如果没有标签，则使用 `{version}-{commit-hash}` 格式
  - 示例：`v1.0.0` 或 `latest-a1b2c3d`

- **push_to_dockerhub**: 推送开关
  - `true`: 推送到 Docker Hub
  - `false`: 仅构建，不推送

- **push_to_ghcr**: 推送开关
  - `true`: 推送到 GitHub Container Registry
  - `false`: 仅构建，不推送

## 构建的镜像标签

### Docker Hub 镜像 (如果启用推送)
```
your-username/vaultwarden-zh:{version}
your-username/vaultwarden-zh:latest
your-username/vaultwarden-zh:{version}-alpine
your-username/vaultwarden-zh:alpine
```

### GitHub Container Registry 镜像 (如果启用推送)
```
ghcr.io/your-username/vaultwarden-zh:{version}
ghcr.io/your-username/vaultwarden-zh:latest
ghcr.io/your-username/vaultwarden-zh:{version}-alpine
ghcr.io/your-username/vaultwarden-zh:alpine
```

## 使用示例

### 拉取和运行镜像

```bash
# 从 Docker Hub 拉取最新版本
docker pull your-username/vaultwarden-zh:latest

# 运行容器
docker run -d \
  --name vaultwarden \
  -e DOMAIN="https://your-domain.com" \
  -v /vw-data:/data \
  -p 8000:80 \
  your-username/vaultwarden-zh:latest
```

### Docker Compose 使用

```yaml
version: '3.8'
services:
  vaultwarden:
    image: your-username/vaultwarden-zh:latest
    container_name: vaultwarden
    restart: unless-stopped
    environment:
      DOMAIN: "https://your-domain.com"
    volumes:
      - ./vw-data:/data
    ports:
      - "8000:80"
```

## 注意事项

1. **权限要求**: 确保 GitHub Actions 有写入 packages 的权限
2. **存储空间**: 多架构构建会产生较大的镜像，注意 Docker Hub 存储限制
3. **构建时间**: 多架构构建可能需要较长时间 (15-30分钟)
4. **网络稳定性**: 建议在网络稳定的环境下运行，避免构建中断

## 故障排除

### 常见问题

1. **Docker Hub 登录失败**
   - 检查 `DOCKERHUB_USERNAME` 和 `DOCKERHUB_TOKEN` 是否正确设置
   - 确认 Docker Hub 令牌是否有 push 权限

2. **构建失败**
   - 查看 GitHub Actions 日志获取详细错误信息
   - 检查 Dockerfile 是否存在问题
   - 确认有足够的磁盘空间

3. **权限错误**
   - 确保仓库 Actions 设置中启用了 write 权限
   - 检查 `GITHUB_TOKEN` 权限配置

### 日志查看

在 GitHub Actions 运行过程中，可以通过以下方式查看进度：
- Actions 页面实时查看构建日志
- 构建完成后会在 Summary 中显示推送的镜像信息

## 自定义配置

如需修改构建配置，可以编辑 `.github/workflows/docker-build-push.yml` 文件：
- 添加更多平台支持
- 修改构建参数
- 调整镜像标签规则
- 更改推送目标