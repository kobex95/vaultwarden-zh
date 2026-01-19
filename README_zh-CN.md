# Vaultwarden

![Vaultwarden Logo](./resources/vaultwarden-logo-auto.svg)

一个用 Rust 编写的 Bitwarden 客户端 API 替代服务器实现，与[官方 Bitwarden 客户端](https://bitwarden.com/download/)兼容[[免责声明](#免责声明)]，非常适合自托管部署，在运行官方资源密集型服务可能不太理想的情况下使用。

---

[![GitHub Release](https://img.shields.io/github/release/dani-garcia/vaultwarden.svg?style=for-the-badge&logo=vaultwarden&color=005AA4)](https://github.com/dani-garcia/vaultwarden/releases/latest)
[![ghcr.io Pulls](https://img.shields.io/badge/dynamic/json?style=for-the-badge&logo=github&logoColor=fff&color=005AA4&url=https%3A%2F%2Fipitio.github.io%2Fbackage%2Fdani-garcia%2Fvaultwarden%2Fvaultwarden.json&query=%24.downloads&label=ghcr.io%20pulls&cacheSeconds=14400)](https://github.com/dani-garcia/vaultwarden/pkgs/container/vaultwarden)
[![Docker Pulls](https://img.shields.io/docker/pulls/vaultwarden/server.svg?style=for-the-badge&logo=docker&logoColor=fff&color=005AA4&label=docker.io%20pulls)](https://hub.docker.com/r/vaultwarden/server)
[![Quay.io](https://img.shields.io/badge/quay.io-download-005AA4?style=for-the-badge&logo=redhat&cacheSeconds=14400)](https://quay.io/repository/vaultwarden/server) <br>
[![Contributors](https://img.shields.io/github/contributors-anon/dani-garcia/vaultwarden.svg?style=flat-square&logo=vaultwarden&color=005AA4)](https://github.com/dani-garcia/vaultwarden/graphs/contributors)
[![Forks](https://img.shields.io/github/forks/dani-garcia/vaultwarden.svg?style=flat-square&logo=github&logoColor=fff&color=005AA4)](https://github.com/dani-garcia/vaultwarden/network/members)
[![Stars](https://img.shields.io/github/stars/dani-garcia/vaultwarden.svg?style=flat-square&logo=github&logoColor=fff&color=005AA4)](https://github.com/dani-garcia/vaultwarden/stargazers)
[![Issues Open](https://img.shields.io/github/issues/dani-garcia/vaultwarden.svg?style=flat-square&logo=github&logoColor=fff&color=005AA4&cacheSeconds=300)](https://github.com/dani-garcia/vaultwarden/issues)
[![Issues Closed](https://img.shields.io/github/issues-closed/dani-garcia/vaultwarden.svg?style=flat-square&logo=github&logoColor=fff&color=005AA4&cacheSeconds=300)](https://github.com/dani-garcia/vaultwarden/issues?q=is%3Aissue+is%3Aclosed)
[![AGPL-3.0 Licensed](https://img.shields.io/github/license/dani-garcia/vaultwarden.svg?style=flat-square&logo=vaultwarden&color=944000&cacheSeconds=14400)](https://github.com/dani-garcia/vaultwarden/blob/main/LICENSE.txt) <br>
[![Dependency Status](https://img.shields.io/badge/dynamic/xml?url=https%3A%2F%2Fdeps.rs%2Frepo%2Fgithub%2Fdani-garcia%2Fvaultwarden%2Fstatus.svg&query=%2F*%5Blocal-name()%3D'svg'%5D%2F*%5Blocal-name()%3D'g'%5D%5B2%5D%2F*%5Blocal-name()%3D'text'%5D%5B4%5D&style=flat-square&logo=rust&label=dependencies&color=005AA4)](https://deps.rs/repo/github/dani-garcia/vaultwarden)
[![GHA Release](https://img.shields.io/github/actions/workflow/status/dani-garcia/vaultwarden/release.yml?style=flat-square&logo=github&logoColor=fff&label=Release%20Workflow)](https://github.com/dani-garcia/vaultwarden/actions/workflows/release.yml)
[![GHA Build](https://img.shields.io/github/actions/workflow/status/dani-garcia/vaultwarden/build.yml?style=flat-square&logo=github&logoColor=fff&label=Build%20Workflow)](https://github.com/dani-garcia/vaultwarden/actions/workflows/build.yml) <br>
[![Matrix Chat](https://img.shields.io/matrix/vaultwarden:matrix.org.svg?style=flat-square&logo=matrix&logoColor=fff&color=953B00&cacheSeconds=14400)](https://matrix.to/#/#vaultwarden:matrix.org)
[![GitHub Discussions](https://img.shields.io/github/discussions/dani-garcia/vaultwarden?style=flat-square&logo=github&logoColor=fff&color=953B00&cacheSeconds=300)](https://github.com/dani-garcia/vaultwarden/discussions)
[![Discourse Discussions](https://img.shields.io/discourse/topics?server=https%3A%2F%2Fvaultwarden.discourse.group%2F&style=flat-square&logo=discourse&color=953B00)](https://vaultwarden.discourse.group/)

> [!重要]
> **使用此服务器时，请直接向我们报告任何错误或建议（参见[联系我们](#联系我们)），无论您使用什么客户端（移动设备、桌面、浏览器等）。请勿使用官方 Bitwarden 支持渠道。**

<br>

## 功能特性

提供了几乎完整的 Bitwarden 客户端 API 实现，包括：

 * [个人保险库](https://bitwarden.com/help/managing-items/)
 * [发送功能](https://bitwarden.com/help/about-send/)
 * [附件](https://bitwarden.com/help/attachments/)
 * [网站图标](https://bitwarden.com/help/website-icons/)
 * [个人 API 密钥](https://bitwarden.com/help/personal-api-key/)
 * [组织](https://bitwarden.com/help/getting-started-organizations/)
   - [集合](https://bitwarden.com/help/about-collections/)、
     [密码共享](https://bitwarden.com/help/sharing/)、
     [成员角色](https://bitwarden.com/help/user-types-access-control/)、
     [群组](https://bitwarden.com/help/about-groups/)、
     [事件日志](https://bitwarden.com/help/event-logs/)、
     [管理员密码重置](https://bitwarden.com/help/admin-reset/)、
     [目录连接器](https://bitwarden.com/help/directory-sync/)、
     [策略](https://bitwarden.com/help/policies/)
 * [多重/双因素认证](https://bitwarden.com/help/bitwarden-field-guide-two-step-login/)
   - [身份验证器](https://bitwarden.com/help/setup-two-step-login-authenticator/)、
     [邮箱](https://bitwarden.com/help/setup-two-step-login-email/)、
     [FIDO2 WebAuthn](https://bitwarden.com/help/setup-two-step-login-fido/)、
     [YubiKey](https://bitwarden.com/help/setup-two-step-login-yubikey/)、
     [Duo](https://bitwarden.com/help/setup-two-step-login-duo/)
 * [紧急访问](https://bitwarden.com/help/emergency-access/)
 * [Vaultwarden 管理后台](https://github.com/dani-garcia/vaultwarden/wiki/Enabling-admin-page)
 * [修改版 Web Vault 客户端](https://github.com/dani-garcia/bw_web_builds)（打包在我们的容器中）

<br>

## 使用方法

> [!重要]
> web-vault 需要使用安全上下文来使用 [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)。
> 这意味着它只能通过 `http://localhost:8000`（使用下面示例中的端口）工作，或者如果您[启用 HTTPS](https://github.com/dani-garcia/vaultwarden/wiki/Enabling-HTTPS)。

安装和使用 Vaultwarden 的推荐方式是通过我们的容器镜像，这些镜像发布到 [ghcr.io](https://github.com/dani-garcia/vaultwarden/pkgs/container/vaultwarden)、[docker.io](https://hub.docker.com/r/vaultwarden/server) 和 [quay.io](https://quay.io/repository/vaultwarden/server)。
请参见[使用哪个容器镜像](https://github.com/dani-garcia/vaultwarden/wiki/Which-container-image-to-use)了解提供的标签说明。

还有[社区驱动的软件包](https://github.com/dani-garcia/vaultwarden/wiki/Third-party-packages)可以使用，但这些软件包可能落后于最新版本，或者在配置 Vaultwarden 的方式上可能偏离我们的[维基](https://github.com/dani-garcia/vaultwarden/wiki)中描述的方式。

或者，您也可以[自己构建 Vaultwarden](https://github.com/dani-garcia/vaultwarden/wiki/Building-binary)。

虽然 Vaultwarden 基于 [Rocket web 框架](https://rocket.rs)，该框架内置了 TLS 支持，但我们建议您设置反向代理（参见[代理示例](https://github.com/dani-garcia/vaultwarden/wiki/Proxy-examples)）。

> [!提示]
>**有关如何安装、使用和配置 Vaultwarden 的更多详细示例，您可以查看我们的[维基](https://github.com/dani-garcia/vaultwarden/wiki)。**

### Docker/Podman CLI

拉取容器镜像并将卷从主机挂载以进行持久存储。<br>
如果愿意，您可以将 `docker` 替换为 `podman`。

```shell
docker pull vaultwarden/server:latest
docker run --detach --name vaultwarden \
  --env DOMAIN="https://vw.domain.tld" \
  --volume /vw-data/:/data/ \
  --restart unless-stopped \
  --publish 127.0.0.1:8000:80 \
  vaultwarden/server:latest
```

这将在 `/vw-data/` 下保留任何持久数据，您可以根据需要调整路径。

### Docker Compose

要使用 Docker compose，您需要创建一个 `compose.yaml` 文件来保存运行 Vaultwarden 容器的配置。

```yaml
services:
  vaultwarden:
    image: vaultwarden/server:latest
    container_name: vaultwarden
    restart: unless-stopped
    environment:
      DOMAIN: "https://vw.domain.tld"
    volumes:
      - ./vw-data/:/data/
    ports:
      - 127.0.0.1:8000:80
```

<br>

## 联系我们

有问题、建议或需要帮助吗？加入我们在 [Matrix](https://matrix.to/#/#vaultwarden:matrix.org)、[GitHub Discussions](https://github.com/dani-garcia/vaultwarden/discussions) 或 [Discourse Forums](https://vaultwarden.discourse.group/) 上的社区。

遇到错误或崩溃了吗？请搜索我们的问题跟踪器和讨论区，看看是否已经有人报告过了。如果没有，请[开始新的讨论](https://github.com/dani-garcia/vaultwarden/discussions)或[创建新问题](https://github.com/dani-garcia/vaultwarden/issues)。确保您使用的是最新版本的 Vaultwarden，并且没有类似的问题处于开放或已关闭状态！

<br>

## 贡献者

感谢您对项目的贡献！

[![Contributors Count](https://img.shields.io/github/contributors-anon/dani-garcia/vaultwarden?style=for-the-badge&logo=vaultwarden&color=005AA4)](https://github.com/dani-garcia/vaultwarden/graphs/contributors)<br>
[![Contributors Avatars](https://contributors-img.web.app/image?repo=dani-garcia/vaultwarden)](https://github.com/dani-garcia/vaultwarden/graphs/contributors)

<br>

## 免责声明

**此项目与 [Bitwarden](https://bitwarden.com/) 或 Bitwarden, Inc. 无关。**

然而，Vaultwarden 的一位活跃维护者受雇于 Bitwarden，并被允许在自己的时间里为该项目做出贡献。这些贡献独立于 Bitwarden，并由其他维护者审查。

维护者们共同努力为项目设定方向，专注于为自托管社区服务，包括个人、家庭和小型组织，同时确保项目的可持续性。

**请注意：** 我们不对使用 Vaultwarden 时可能发生的任何数据丢失承担责任。这包括密码、附件和应用程序处理的其他信息。我们强烈建议定期备份您的文件和数据库。但是，如果您遇到数据丢失，请立即联系我们。

<br>

## Bitwarden_RS

此项目以前称为 Bitwarden_RS，现已更名为 Vaultwarden，以将其与官方 Bitwarden 服务器分开，希望避免混淆和商标/品牌问题。<br>
请参见 [#1642 - v1.21.0 发布和项目更名为 Vaultwarden](https://github.com/dani-garcia/vaultwarden/discussions/1642) 了解更多解释。