# Vaultwarden 中文界面配置指南

## 启用中文界面

Vaultwarden 现在支持中文界面。要启用中文界面，请按照以下步骤操作：

### 1. 设置环境变量

在启动 Vaultwarden 时，添加以下环境变量：

```bash
# Docker CLI 方式
docker run -d --name vaultwarden \
  -e DOMAIN="https://your-domain.com" \
  -e LANGUAGE="zh-CN" \
  -v /your/data/path:/data \
  vaultwarden/server:latest

# Docker Compose 方式
# 在 compose.yaml 中添加：
environment:
  DOMAIN: "https://your-domain.com"
  LANGUAGE: "zh-CN"
```

### 2. 浏览器语言设置

确保您的浏览器首选语言设置为中文（简体中文 - zh-CN）。

### 3. 访问管理面板

访问管理面板时，界面将自动显示为中文：
- http://localhost:8000/admin

### 已翻译的内容

目前以下内容已翻译为中文：

#### 管理员面板
- ✅ 导航栏菜单（设置、用户、组织、诊断、保险库、退出登录）
- ✅ 主题切换（浅色、深色、自动）
- ✅ 配置页面标题和说明
- ✅ 安全警告信息
- ✅ 按钮文本（保存、恢复默认设置、测试SMTP等）

#### 邮件模板
- ✅ 欢迎邮件
- ✅ 邮箱验证邮件
- ✅ 邮件页眉和页脚

#### 文档
- ✅ README.md 完整中文版本

### 技术实现

中文界面通过 Handlebars 模板中的条件语句实现：

```handlebars
{{#if lang_zh}}
中文文本
{{else}}
English text
{{/if}}
```

### 贡献翻译

如果您想帮助改进翻译或添加新的翻译内容：

1. 修改 `src/static/locales/zh-CN.json` 文件
2. 更新相应的 `.hbs` 模板文件
3. 提交 Pull Request

### 注意事项

- 中文翻译不影响原有英文功能
- 所有翻译都是可选的，未翻译的内容会保持原样
- 可以随时通过环境变量切换语言

## 故障排除

如果中文界面没有正确显示：

1. 检查环境变量是否正确设置
2. 清除浏览器缓存
3. 确认浏览器语言设置
4. 查看服务器日志是否有相关错误信息

## 反馈和支持

如有任何问题或建议，请通过以下方式联系我们：
- GitHub Issues: https://github.com/dani-garcia/vaultwarden/issues
- Matrix: #vaultwarden:matrix.org