# 个人博客准备清单

> 本文档是 personal-blog spec 的 **Requirement 14 交付物**，把从 0 到上线的全部操作步骤、账号、软件、命令、文件改动收口在一处。
> 调研完成日期：**2026-05-19**。所有价格、免费额度、GitHub Stars 等时效性数据均以该日期为准。
> 当前博客已经部署到 <https://personal-blog-eqo.pages.dev/>（Cloudflare Pages 自动子域名）；Custom_Domain 待用户自行注册。

## 完整性检查

- ✅ AC 14.1 — 7 个一级章节按规定顺序组织：见下方「7 个章节」一节。
- ✅ AC 14.2 — 每个章节均含「所需账号 / 所需安装的软件 / 需要执行的命令 / 需要新建或修改的文件」4 类小标题，不适用时标注「无」。
- ✅ AC 14.3 — 端到端步骤共 18 步，每步含编号、目的、命令或文件、可观察验证。
- ✅ AC 14.4 — 「年成本预算」表覆盖 5 个项目 × 5 列。
- ✅ AC 14.5 — 「常见问题排查」覆盖 5 个场景 × 4 个字段。
- ✅ AC 14.6 — 完整性检查小节本身就在文档开头。

---

## 调研结论

### AI / 技术圈个人博客案例

| 博客 URL | SSG | Hosting | 信息核实日期 |
|---|---|---|---|
| <https://karpathy.ai/> | Jekyll | GitHub Pages | 2026-05-19 |
| <https://lilianweng.github.io/> | Hugo | GitHub Pages | 2026-05-19 |
| <https://huyenchip.com/> | Hugo | GitHub Pages | 2026-05-19 |
| <https://jalammar.github.io/> | Jekyll | GitHub Pages | 2026-05-19 |
| <https://sebastianraschka.com/> | Hugo | self-hosted | 2026-05-19 |
| <https://simonwillison.net/> | Django (self-built) | self-hosted | 2026-05-19 |
| <https://lexfridman.com/> | WordPress | managed | 2026-05-19 |

### SSG 对比

Star 数为公开估算（精确数值随时间变化，请以各仓库实时为准）。

| 名称 | 实现语言 | 构建速度（1000 篇估算） | GitHub Stars（估算，2026-05-19） | 上手难度 | 推荐场景 |
|---|---|---|---|---|---|
| [Hugo](https://github.com/gohugoio/hugo) | Go | 几秒（单二进制，无 IO 之外开销） | 约 7 万+ | 低（单二进制，配置 TOML/YAML） | AI / 技术圈博客；追求构建速度与免环境依赖 |
| [Jekyll](https://github.com/jekyll/jekyll) | Ruby | 数十秒（依赖 Ruby gem） | 约 4.9 万+ | 中（需 Ruby 工具链） | GitHub Pages 默认；学术博客 |
| [Astro](https://github.com/withastro/astro) | TypeScript | 十余秒（Node 构建） | 约 4.7 万+ | 中（前端开发者友好） | 现代静态/动态混合站；UI 框架混搭 |
| [Next.js](https://github.com/vercel/next.js) | TypeScript | 十余秒（Node 构建） | 约 12 万+ | 中-高（React 生态） | 偏应用形态、有动态需求 |
| [Hexo](https://github.com/hexojs/hexo) | JavaScript | 数十秒（Node 构建） | 约 4 万+ | 中（中文生态丰富） | 中文博客圈传统选择 |
| [VitePress](https://github.com/vuejs/vitepress) | TypeScript | 十秒级（Vite 构建） | 约 1.5 万+ | 中（Vue 用户友好） | 文档站、长 README 类博客 |
| [Zola](https://github.com/getzola/zola) | Rust | 数秒（单二进制） | 约 1.6 万+ | 中（模板语法 Tera） | 追求极简和性能，但生态较小 |

### Hosting 平台对比

| 名称 | 免费带宽/月 | 免费构建次数/月 | 自定义域名是否额外收费 | 单次构建上限 | 含 HTTPS + 全球 CDN | 信息核实日期 |
|---|---|---|---|---|---|---|
| GitHub Pages | 100 GB（软上限） | 10 builds/小时 | 否 | 10 分钟 | 是 | 2026-05-19 |
| Cloudflare Pages | 无量化带宽限制（Free 档） | 500 builds/月 | 否 | 20 分钟 | 是 | 2026-05-19 |
| Vercel | 100 GB（Hobby） | 100 builds/天（Hobby） | 否 | 45 分钟（Hobby） | 是 | 2026-05-19 |
| Netlify | 100 GB（Starter） | 300 build minutes/月（Starter） | 否 | 15 分钟（Starter） | 是 | 2026-05-19 |

### Domain Registrar 对比

| 名称 | .com 首年价 (USD) | .com 续费价 (USD) | WHOIS 隐私免费 | 支持支付方式 | 信息核实日期 |
|---|---|---|---|---|---|
| Cloudflare Registrar | 9.15 | 9.15 | 是 | 信用卡 / PayPal | 2026-05-19 |
| Porkbun | 9.13 | 11.06 | 是 | 信用卡 / PayPal / Crypto | 2026-05-19 |
| Namecheap | 5.98（首年优惠） | 14.58 | 是（永久免费） | 信用卡 / PayPal | 2026-05-19 |
| GoDaddy | 0.99–11.99（首年浮动） | 21.99 | 否（约 9.99/年） | 信用卡 / PayPal / 支付宝（部分地区） | 2026-05-19 |

### Theme 风格示例

| 风格 | Theme 名称 | SSG | 预览 / 源链接 | 许可证 |
|---|---|---|---|---|
| 极简学术风 | al-folio | Jekyll | <https://github.com/alshedivat/al-folio> | MIT |
| 极简学术风 | academic-pages | Jekyll | <https://github.com/academicpages/academicpages.github.io> | MIT |
| 现代博客风 | PaperMod | Hugo | <https://github.com/adityatelange/hugo-PaperMod> | MIT |
| 现代博客风 | Astro Paper | Astro | <https://github.com/satnaing/astro-paper> | MIT |
| 卡片流风 | Hexo Fluid | Hexo | <https://github.com/fluid-dev/hexo-theme-fluid> | MIT |
| 卡片流风 | hugo-theme-stack | Hugo | <https://github.com/CaiJimmy/hugo-theme-stack> | MIT |

---

## 推荐组合（针对 0 基础 Author）

- **SSG：Hugo** — 构建快（数秒级）、单二进制免环境依赖、AI 圈采用率高（Lilian Weng / Chip Huyen / Sebastian Raschka 均使用）。
- **Hosting：Cloudflare Pages** — 免费档构建次数充足（500/月）、含 HTTPS+全球 CDN、单次构建 20 分钟、与 Cloudflare Registrar 同账号管理便利。
- **Registrar：Cloudflare Registrar** — 按成本价续费（无品牌溢价）、WHOIS 隐私默认开启、与 Pages 同账号 DNS 自动接管。
- **Theme 风格：现代博客风（PaperMod）** — 内置暗黑模式、归档页、搜索集成；维护活跃；文档完整；Lilian Weng 同款。

---

## 7 个章节

### 1. 域名

#### 所需账号
- Cloudflare（已注册，用作 Domain Registrar 与 DNS 提供方）。如选 Porkbun / Namecheap 等其他 Registrar 则额外注册对应账号。

#### 所需安装的软件
- 不适用（Registrar 与 DNS 操作均在浏览器完成）。

#### 需要执行的命令
- 验证 NS 已切到 Cloudflare：`dig NS {YOUR_DOMAIN}` → 期望返回 `*.ns.cloudflare.com`。
- 验证 A/CNAME 解析：`dig +short {YOUR_DOMAIN}` → 期望返回 Cloudflare anycast IP 或 pages.dev CNAME。
- 验证 HTTPS 已生效：`curl -I https://{YOUR_DOMAIN}/` → 200 + `server: cloudflare`。
- 验证 HTTP→HTTPS：`curl -I http://{YOUR_DOMAIN}/` → 301/308 + `Location: https://...`。

#### 需要新建或修改的文件
- `hugo.toml` 中 `baseURL = "https://{YOUR_DOMAIN}/"`。
- `static/robots.txt` 中 `Sitemap: https://{YOUR_DOMAIN}/sitemap.xml`。

---

### 2. 托管

#### 所需账号
- Cloudflare（与第 1 节同一账号）。
- 已授权 Cloudflare Pages 访问目标 GitHub 仓库。

#### 所需安装的软件
- 不适用（构建在 Cloudflare Pages 远端运行；本地仅需 Hugo + git，由第 3、4 节安装）。

#### 需要执行的命令
- 浏览器：<https://dash.cloudflare.com/> → Workers & Pages → Create → **Pages** → Connect to Git。
- Production branch：`main`。
- Framework preset：**Hugo**。
- Build command：`hugo --minify --gc && npx -y pagefind@1.1.0 --site public`。
- Build output directory：`public`。
- Environment variables：`HUGO_VERSION = 0.161.1`。
- Build configurations：勾选 **Include submodules**。

#### 需要新建或修改的文件
- 不适用（Cloudflare Pages 设置项保存在控制台，不入仓库）。

---

### 3. SSG 与 Theme

#### 所需账号
- 无。

#### 所需安装的软件
- Homebrew（macOS 包管理器）：`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`。
- Hugo extended：`brew install hugo`。

#### 需要执行的命令
- 验证安装：`hugo version`，输出含 `extended` 字样且 ≥ `0.128.0`。
- 初始化骨架：`hugo new site . --force`（`--force` 让 `.kiro/` 已存在的目录可初始化）。
- 引入主题：`git submodule add --depth=1 https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod`。
- 本地预览：`hugo server -D` → 浏览器打开 <http://localhost:1313/>。
- 生产构建：`hugo --minify --gc`，产物在 `public/`。

#### 需要新建或修改的文件
- `hugo.toml`：主题名、菜单、社交图标、评论 / 分析 / 搜索开关、math 开关。详见仓库根 `hugo.toml`。
- `themes/PaperMod`：作为 git submodule 存在；不入仓库源代码。

---

### 4. Source_Repository 与 Build_Pipeline

#### 所需账号
- GitHub（已用 `kbfx1234`）。

#### 所需安装的软件
- git（macOS 自带 `git --version` 验证）。

#### 需要执行的命令
- 生成 SSH key：`ssh-keygen -t ed25519 -C "kbfx1234@gmail.com" -f ~/.ssh/id_ed25519 -N ""`。
- 加入 keychain agent：`eval "$(ssh-agent -s)" && ssh-add --apple-use-keychain ~/.ssh/id_ed25519`。
- 复制公钥：`pbcopy < ~/.ssh/id_ed25519.pub` → 打开 <https://github.com/settings/ssh/new> 粘贴并保存。
- 验证连通：`ssh -T git@github.com` → `Hi kbfx1234! You've successfully authenticated, ...`。
- 配置仓库 git 身份：`git config user.name "Karl"`、`git config user.email "kbfx1234@gmail.com"`。
- 关联远端：`git remote add origin git@github.com:kbfx1234/personal-blog.git`。
- 首次推送：`git push -u origin main`。

#### 需要新建或修改的文件
- `.gitignore`（含 `public/`、`resources/`、`node_modules/`、`tmp/`、`.DS_Store` 等）。
- `.gitmodules`（由 `git submodule add` 自动生成）。
- `README.md`（项目名 + 简介 + 本地预览/构建命令）。
- `LICENSE`（MIT，2025 Karl）。
- `~/.ssh/id_ed25519` 与 `~/.ssh/id_ed25519.pub`（系统密钥目录，不入仓库）。
- `~/.ssh/config`：补充 `Host github.com / IdentityFile ~/.ssh/id_ed25519 / UseKeychain yes / AddKeysToAgent yes`。

---

### 5. 内容与风格

#### 所需账号
- 无。

#### 所需安装的软件
- 任意 Markdown 编辑器（VS Code / Typora / Obsidian 等）。

#### 需要执行的命令
- 新建文章：`hugo new content/posts/<slug>.md`，编辑文件并把 `draft = true` 改成 `false`。
- 本地预览（含 draft）：`hugo server -D`。
- 列出全部文章：`hugo list all`。

#### 需要新建或修改的文件
- `archetypes/default.md`（front matter 模板，被 `hugo new` 套用）。
- `content/about.md`（关于页，front matter 含 `menu = "main"` 让其出现在导航）。
- `content/posts/*.md`（文章源文件，UTF-8、`.md` 扩展名）。
- `content/search.md`（空 front matter 入口，`layout = "search"` 触发搜索页模板）。
- `assets/css/extended/custom.css`（PaperMod 专属扩展样式钩子）。
- `layouts/_partials/extend_head.html`（注入 KaTeX、CF Web Analytics、Search Console 验证 meta）。
- `layouts/_partials/comments.html`（Giscus 嵌入；占位符未替换时不输出任何 script）。
- `layouts/search.html`（Pagefind UI 模板）。
- `static/og-default.png`（1200×630 PNG，OG 默认封面图）。
- `static/favicon.ico`、`static/favicon.svg`、`static/apple-touch-icon.png`。
- `static/robots.txt`（含 `Sitemap: https://{YOUR_DOMAIN}/sitemap.xml`）。

---

### 6. 可选增强

#### 所需账号
- GitHub（用于 Giscus，已与第 4 节复用）。
- Cloudflare（用于 Web Analytics，已与第 1、2 节复用）。

#### 所需安装的软件
- 无（Pagefind 通过 `npx -y pagefind@1.1.0` 在 CF Pages 远端执行，无需本地安装）。

#### 需要执行的命令
- **Giscus 评论**：
  1. 浏览器：GitHub 仓库 → Settings → Features → 勾选 Discussions。
  2. 在 Discussions 中创建一个 Category 名为 `Comments`、Type 选 Announcement。
  3. 浏览器打开 <https://github.com/apps/giscus> → Install → Only select repositories → 勾选 `personal-blog` → Install & Authorize。
  4. 浏览器打开 <https://giscus.app/zh-CN>，输入仓库 `kbfx1234/personal-blog`、Category 选 `Comments`、其他保持默认；页面下方生成的 `data-repo-id` / `data-category-id` 复制下来。
  5. 替换 `hugo.toml` 中 `[params.giscus]` 的 `repoId` 与 `categoryId`。
- **Cloudflare Web Analytics**：
  1. Dashboard → Analytics & Logs → Web Analytics → Add a site。
  2. Hostname 填真实 Custom_Domain（或当前 pages.dev 子域名）。
  3. 复制 `data-cf-beacon` 中的 `token` 值。
  4. 替换 `hugo.toml` 中 `[params.analytics.cloudflare] token`。
- **Pagefind 搜索**：CF Pages 的 Build command 已经是 `hugo --minify --gc && npx -y pagefind@1.1.0 --site public`，无需额外操作。
- 提交并推送：`git add hugo.toml && git commit -m "feat: enable giscus + cf analytics" && git push origin main`。

#### 需要新建或修改的文件
- `hugo.toml` 中 `[params.giscus] repoId / categoryId`、`[params.analytics.cloudflare] token` 三处由 `{PLACEHOLDER}` 替换为真实值。

---

### 7. 上线后维护

#### 所需账号
- Google（用于 Search Console）。

#### 所需安装的软件
- 无。

#### 需要执行的命令
- 浏览器：<https://search.google.com/search-console> → 添加资源 → URL 前缀 → 输入 `https://{YOUR_DOMAIN}/`。
- 选 HTML 标签验证方式，复制其中的 `<meta name="google-site-verification" content="...">` 中的 `content` 值。
- 编辑 `hugo.toml` 在 `[params]` 段下添加：`googleSiteVerification = "..."`。
- `git add hugo.toml && git commit -m "feat: GSC verification" && git push`。
- 等 CF Pages 部署完成后回 Search Console 点 Verify。
- Search Console → Sitemaps → 提交 `https://{YOUR_DOMAIN}/sitemap.xml`。
- 持续维护：每写一篇文章按第 5 节流程，`git push` 即自动部署。

#### 需要新建或修改的文件
- `hugo.toml` 中新增 `params.googleSiteVerification`。
- `.github/workflows/gh-pages-backup.yml`（可选，仅作 CF Pages 不可用时的应急备份；默认 `on: workflow_dispatch:` 不自动触发）。

---

## 端到端操作步骤

| # | 操作目的 | 命令或文件 | 验证方法 |
|---|---|---|---|
| 1 | 安装 Hugo extended | `brew install hugo` | `hugo version` 输出含 `extended` |
| 2 | 准备 GitHub 账号与 SSH | `ssh-keygen -t ed25519 -C kbfx1234@gmail.com` + 上传到 GitHub | `ssh -T git@github.com` 返回 `Hi kbfx1234!` |
| 3 | 初始化工程目录 + git | `hugo new site . --force` → `git init -b main` | `git status` 显示 `On branch main` |
| 4 | 引入 PaperMod 主题 | `git submodule add --depth=1 https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod` | `git submodule status` 含 commit hash |
| 5 | 写 .gitignore / LICENSE / README | 创建三个根级文件 | `wc -l .gitignore` ≥ 8 |
| 6 | 写 hugo.toml 主配置 | 编辑 `hugo.toml` | `hugo config` 不报错 |
| 7 | 准备 static 资源 | `static/og-default.png` 1200×630、favicon 集 | `file static/og-default.png` 显示 `1200 x 630` |
| 8 | 写 archetype 模板 | `archetypes/default.md` | `hugo new content/posts/test.md` 能复用模板 |
| 9 | 写示例内容 | `content/about.md` + 2 篇 `content/posts/*.md` | `hugo list all` 列出 4 篇 |
| 10 | 配 PaperMod 扩展 partials | `layouts/_partials/{extend_head,comments}.html` + `assets/css/extended/custom.css` | `hugo --minify --gc` 后 grep katex 仅在 math 文章 |
| 11 | 配 Pagefind 搜索 | `layouts/search.html` + `content/search.md` | `npm run build:full` 后 `public/pagefind/pagefind.js` 存在 |
| 12 | 加 robots.txt | `static/robots.txt` 域名与 baseURL 一致 | `bash scripts/preflight.sh` step 2 通过 |
| 13 | 创建 GitHub 仓库 | <https://github.com/new>（owner=kbfx1234, name=personal-blog） | 仓库主页返回 200 |
| 14 | 推送代码 | `git remote add origin git@github.com:kbfx1234/personal-blog.git` + `git push -u origin main` | 仓库网页可见 commit |
| 15 | 创建 Cloudflare Pages 项目 | 控制台 Connect to Git → 选 personal-blog → Hugo preset → Build cmd `hugo --minify --gc && npx -y pagefind@1.1.0 --site public` → HUGO_VERSION=0.161.1 → Include submodules | 构建成功，得到 `*.pages.dev` 域名 |
| 16 | 验证 push-to-deploy | 修改任意一行内容 + `git push` | 75 秒内 CF Pages 重新部署，新内容上线 |
| 17 | （可选）注册 Custom_Domain | Cloudflare Dashboard → Domain Registration → 注册 `{YOUR_DOMAIN}` | `dig NS {YOUR_DOMAIN}` 返回 Cloudflare NS |
| 18 | （可选）启用 Giscus / Analytics / GSC | 替换 hugo.toml 中三个 token + Search Console 验证 + 提交 sitemap | 文章页底部出现评论框；CF Web Analytics 几小时内有数据；GSC sitemap 状态 Success |

---

## 年成本预算

| 项目名称 | 年成本下限 (USD) | 年成本上限 (USD) | 计费说明 | 估算更新日期 |
|---|---|---|---|---|
| 域名 | 8.00 | 60.00 | Cloudflare Registrar 成本价 .com 约 9.15；.ai / .dev 等溢价 TLD 拉高上限 | 2026-05-19 |
| Hosting_Platform | 0.00 | 0.00 | Cloudflare Pages Free 档对个人博客足够（500 builds/月、含 HTTPS+CDN） | 2026-05-19 |
| Comment_System | 0.00 | 0.00 | Giscus 基于 GitHub Discussions，免费 | 2026-05-19 |
| Analytics_System | 0.00 | 0.00 | Cloudflare Web Analytics 免费、隐私友好、不写 Cookie | 2026-05-19 |
| Search_System | 0.00 | 0.00 | Pagefind 客户端搜索，索引文件随站点托管 | 2026-05-19 |

> 当前实付 = USD 0（域名暂未购买）。一旦购入 .com 域名，年支出约 USD 9。

---

## 常见问题排查

### DNS 未生效

- **可观察症状**：浏览器输入 `{YOUR_DOMAIN}` 长时间空白或显示「无法访问此网站 / DNS_PROBE_FINISHED_NXDOMAIN」；`dig` 返回旧 IP 或为空。
- **可能原因**：
  - Registrar NS 还未切到 Cloudflare（最长 24 小时）。
  - Cloudflare DNS 区域内尚无指向 Pages 的 CNAME / A 记录。
  - 本地 DNS 缓存或 ISP DNS 缓存。
- **检查步骤**：
  - `dig NS {YOUR_DOMAIN} @1.1.1.1` 是否返回 `*.ns.cloudflare.com`。
  - Cloudflare Dashboard → 你的域名 → DNS → 是否存在 `{YOUR_DOMAIN} CNAME personal-blog-eqo.pages.dev`（或 CF Pages 自动接管时的 Pages 内部记录）。
  - `dig +short {YOUR_DOMAIN} @8.8.8.8` 看是否拿到 Cloudflare IP。
- **解决动作**：
  - 在 Cloudflare Pages → Custom domains → Set up a custom domain，由 CF 自动创建 DNS 记录。
  - 若 NS 未切，回 Registrar 控制台把 NS 改成 Cloudflare 列出的 NS 然后等待生效。
  - 清本地 DNS 缓存：`sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`。

### HTTPS 证书未签发

- **可观察症状**：浏览器报 `NET::ERR_CERT_AUTHORITY_INVALID` 或「您的连接不是私密连接」；`curl -I https://{YOUR_DOMAIN}/` 显示 SSL handshake 失败。
- **可能原因**：
  - Cloudflare Pages 还未给该 Custom_Domain 签发 Universal SSL（首次绑定后通常 1–10 分钟，少数情况可能需要数十分钟）。
  - SSL/TLS 模式不对（Flexible 而不是 Full / Full strict）。
- **检查步骤**：
  - Cloudflare Dashboard → 你的域名 → SSL/TLS → Edge Certificates 是否处于 Active。
  - Cloudflare Pages → 项目 → Custom domains → 状态是否 Active。
  - `curl -vI https://{YOUR_DOMAIN}/` 看 TLS 握手错误细节。
- **解决动作**：
  - 等待 10 分钟后刷新 SSL 状态；如长时间不动，在 Custom domains 页面点 Refresh / Re-deploy。
  - SSL/TLS → Overview → 模式切到 **Full (strict)**。

### CI 构建失败

- **可观察症状**：Cloudflare Pages 项目 Deployments 列表中最新一次显示红色 `Failed`；可能收到失败邮件。
- **可能原因**：
  - `HUGO_VERSION` 与 `themes/PaperMod` 期望的 Hugo 不兼容。
  - 忘了勾选 Include submodules，导致 `themes/PaperMod` 为空。
  - Build command 输错（如缺少 `--minify --gc` 或 Pagefind 拼写错误）。
  - 内容有非法 front matter 或重复 slug，本地 `hugo` 也会失败。
- **检查步骤**：
  - 项目 → Deployments → 点失败那一次 → 阅读 Build Log。
  - 本地复现：`hugo --minify --gc && npx -y pagefind@1.1.0 --site public`。
  - 跑 preflight：`bash scripts/preflight.sh`。
- **解决动作**：
  - 按构建日志第一条错误修代码 → `git push` 重试。
  - 修正 `HUGO_VERSION`（与本地 `hugo version` 输出一致即可）。
  - Settings → Builds & deployments → Build configurations → 确认 `Include submodules` 已勾选。

### Custom_Domain 访问 404

- **可观察症状**：`https://{YOUR_DOMAIN}/` 返回 Cloudflare 404 页面（不是博客 404）；其他子路径也都 404。
- **可能原因**：
  - Custom_Domain 已绑定但未关联到具体 Pages 项目（CF 默认 404）。
  - DNS 记录指向了错误的 Pages 项目子域名。
  - Pages 项目 production deployment 失败导致没有可服务版本。
- **检查步骤**：
  - Cloudflare Pages → 项目 → Custom domains → 列表中是否包含该域名。
  - `curl -sI https://{YOUR_DOMAIN}/` 查看 `cf-ray` 是否带 Pages worker 信息。
  - 项目 → Deployments → 最新成功部署是否对应 production。
- **解决动作**：
  - 在 Pages 项目 → Custom domains → Set up a custom domain，重新绑定。
  - 确认 DNS CNAME 指向当前项目的 `{project}.pages.dev`。
  - 触发一次重新部署：`git commit --allow-empty -m "chore: redeploy" && git push`。

### 文章未在线上展示

- **可观察症状**：本地新建一篇文章 `git push` 后，线上 `/posts/` 列表里没看到。
- **可能原因**：
  - 文件 front matter `draft = true`，被生产构建排除。
  - `date` 字段是未来时间（`buildFuture = false` 默认排除）。
  - CF Pages 构建已成功但 CDN 缓存未刷新（一般 1–2 分钟内自动）。
  - `git push` 实际没推到 main（推到了别的分支）。
- **检查步骤**：
  - 本地：`hugo list all | grep <slug>`，看 `draft` 与 `date` 列。
  - GitHub 仓库网页确认 commit 已经在 `main`。
  - `curl -sI https://{YOUR_DOMAIN}/posts/<slug>/` 看是 200 还是 404。
- **解决动作**：
  - 把 front matter 的 `draft = true` 改成 `false`，把 `date` 改成不晚于当前时间。
  - 强刷 CDN 缓存：浏览器开 DevTools → Network → 勾选 Disable cache 后刷新；或 Cloudflare Dashboard → Caching → Configuration → Purge Everything。
  - 确认 `git branch -vv` 中 `main` 跟踪 `origin/main`，重新 `git push`。

---
