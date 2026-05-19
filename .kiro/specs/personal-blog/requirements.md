# Requirements Document

## Introduction

用户希望从零搭建一个简洁的个人主页 / 博客（参考站点 https://miaodx.com/），最终交付一个公网可访问的网址，用于自我介绍与文章记录。用户当前是 0 基础起步，因此除了博客本体之外，还需要一份能照着做的「准备清单」交付物，覆盖从域名到上线的完整链路。

本需求文档基于对 AI / 技术圈知名个人博客的调研结论制定，作为后续 Design 与 Tasks 阶段的输入。

### 调研结论摘要

代表性博客与技术栈：

- Andrej Karpathy（karpathy.ai）— Jekyll
- Lilian Weng（lilianweng.github.io）— Hugo + GitHub Pages
- Simon Willison（simonwillison.net）— 自建 Django 动态站点
- Chip Huyen（huyenchip.com）— Hugo
- Jay Alammar（jalammar.github.io）— Jekyll
- Sebastian Raschka（sebastianraschka.com）— Hugo / Jekyll
- Lex Fridman（lexfridman.com）— WordPress（托管型）

主要技术决策维度：

1. 静态站点生成器（SSG）：Hugo / Jekyll / Astro / Next.js / Hexo / VitePress / Zola；AI 圈以 Hugo、Jekyll 最常见，前端开发者倾向 Astro、Next.js。
2. 主题风格：极简学术风（al-folio、academic-pages）、现代博客风（PaperMod、hugo-blog-awesome、Astro Paper）、卡片流风（Hexo Fluid、Stellar）。
3. 托管方案：GitHub Pages、Cloudflare Pages、Vercel、Netlify、自建 VPS；前四者均提供免费 HTTPS 与全球 CDN。
4. 域名注册商：Cloudflare Registrar（成本价续费）、Porkbun、Namecheap、GoDaddy、阿里云。
5. 评论系统：Giscus（基于 GitHub Discussions）、Utterances（基于 GitHub Issues）、Waline、Disqus。
6. 访问统计：Cloudflare Web Analytics、Umami、Plausible、Google Analytics。
7. 周边：HTTPS / CDN（托管平台默认提供）、SEO（sitemap、OG、robots）、RSS 订阅、站内搜索（Pagefind、Fuse.js）。

## Glossary

- **Blog_System**：部署在公网、可通过自定义域名访问的个人博客网站整体。
- **Author**：博客的拥有者与内容创作者，即用户本人。
- **Reader**：访问博客的公众访客。
- **Static_Site_Generator (SSG)**：将 Markdown 等源文件构建为静态 HTML 的工具，例如 Hugo、Jekyll、Astro、Next.js、Hexo、VitePress、Zola。
- **Source_Repository**：托管博客源代码与内容文件的 Git 仓库（GitHub 仓库）。
- **Hosting_Platform**：提供静态站点公网访问与 CDN 的服务，候选包括 GitHub Pages、Cloudflare Pages、Vercel、Netlify。
- **Domain_Registrar**：域名注册服务商，候选包括 Cloudflare Registrar、Porkbun、Namecheap、GoDaddy、阿里云。
- **Custom_Domain**：由 Author 注册并拥有的自定义域名（非 Hosting_Platform 默认子域名）。
- **Build_Pipeline**：将 Source_Repository 自动构建并发布到 Hosting_Platform 的 CI/CD 流水线（如 GitHub Actions、Hosting_Platform 内置构建器）。
- **Theme**：SSG 所使用的视觉与排版模板。
- **Content_Source**：博客文章源文件，约定为 Markdown（含 front matter）。
- **Comment_System**：文章评论组件，候选包括 Giscus、Utterances、Waline、Disqus。
- **Analytics_System**：访问统计组件，候选包括 Cloudflare Web Analytics、Umami、Plausible、Google Analytics。
- **Search_System**：站内搜索组件，候选包括 Pagefind、Fuse.js、lunr.js。
- **Consent_Banner**：在启用 Analytics_System 时向 Reader 展示同意 / 拒绝的提示横幅。
- **Git_Client**：本地 git 命令行工具或图形客户端。
- **Setup_Checklist**：面向 0 基础 Author 的交付文档，列出从域名到上线的全部操作步骤（账号、软件、命令、文件改动）。

## Requirements

### Requirement 1: 调研结论沉淀

**User Story:** 作为 0 基础的 Author，我希望拿到一份对 AI / 技术圈个人博客的调研总结，以便基于他人的最佳实践做出技术选型。

#### Acceptance Criteria

1. THE Setup_Checklist SHALL 列出至少 6 个属于 AI / 技术领域的个人博客案例，且每个案例须满足"博客作者在 GitHub、X/Twitter、知乎、掘金、Medium 等公开技术社区中至少一个平台拥有可验证的公开技术影响力（例如关注者数量 ≥ 1000，或 GitHub 个人 Star 数 ≥ 500）"，每个案例须包含：博客 URL、所用 SSG 名称、所用 Hosting_Platform 名称、信息核实日期。
2. THE Setup_Checklist SHALL 提供 Hugo、Jekyll、Astro、Next.js、Hexo、VitePress、Zola 中至少 5 个 SSG 的对比表，对比维度须包含：实现编程语言、构建 1000 篇 Markdown 文章的耗时（秒，注明数据来源）、GitHub Star 数（注明采集日期）、上手难度（按"低/中/高"三档标注，并给出判定依据如官方教程页数或所需前置知识）、推荐场景（用一句话描述目标用户类型）。
3. THE Setup_Checklist SHALL 提供 GitHub Pages、Cloudflare Pages、Vercel、Netlify 共 4 个 Hosting_Platform 的对比表，对比维度须包含：免费额度（带宽 GB/月、构建次数/月，标注具体数值）、自定义域名支持（是/否，并注明是否额外收费）、单次构建时长上限（分钟）、免费计划是否包含 HTTPS 与全球 CDN（是/否）、信息核实日期。
4. THE Setup_Checklist SHALL 提供 Cloudflare Registrar、Porkbun、Namecheap、阿里云、GoDaddy 中至少 4 个 Domain_Registrar 的对比表，对比维度须包含：.com 首年价格（标注币种与含税与否）、.com 第二年起续费价格（标注币种与含税与否）、WHOIS 隐私保护是否免费（是/否）、支持的支付方式（至少枚举：信用卡、PayPal、支付宝、微信支付中存在的项）、信息核实日期。
5. THE Setup_Checklist SHALL 给出极简学术风、现代博客风、卡片流风三种风格各至少 2 个 Theme 示例，每个示例须包含：Theme 名称、所属 SSG、可访问的效果预览链接（HTTP 200 可打开）、Theme 开源许可证或获取方式。
6. THE Setup_Checklist SHALL 在调研总结的开头标注本次调研的完成日期，并声明所有价格、额度、Star 数等时效性数据均以该日期为准。
7. IF 某个候选 SSG、Hosting_Platform 或 Domain_Registrar 的某项对比维度数据无法从公开渠道获取，THEN THE Setup_Checklist SHALL 在对应单元格中标注"未公开"并附上至少一条已尝试的信息来源 URL。
8. THE Setup_Checklist SHALL 在所有对比表之后给出一份针对 0 基础 Author 的推荐组合，至少指明：推荐的 1 个 SSG、1 个 Hosting_Platform、1 个 Domain_Registrar、1 个 Theme 风格，并对每项推荐给出不超过三条基于上述对比维度的选择理由。

### Requirement 2: 域名所有权

**User Story:** 作为 Author，我希望拥有一个独立的自定义域名，以便长期承载个人品牌。

#### Acceptance Criteria

1. THE Author SHALL 通过 Domain_Registrar 注册一个 Custom_Domain，其字符长度为 1 至 63 个字符（不含 TLD），仅包含字母、数字与连字符，且不以连字符开头或结尾。
2. WHEN Reader 在浏览器输入 Custom_Domain，THE Blog_System SHALL 在 3 秒内返回博客首页的首屏可见内容（首屏定义为视口内 DOM 节点完成渲染且主标题文本可见）。
3. IF Reader 输入 Custom_Domain 后 Blog_System 在 3 秒内未返回首屏可见内容，THEN THE Blog_System SHALL 在 10 秒内返回错误提示页面，指示加载失败原因（如 DNS 解析失败、服务器无响应、超时）。
4. THE Setup_Checklist SHALL 列出注册 Custom_Domain 的完整步骤，包含账号注册、支付方式准备、推荐 TLD（.com / .dev / .me / .ai 等）、年预算区间（USD 10 至 USD 100）。
5. WHERE Author 选择 Cloudflare Registrar，THE Setup_Checklist SHALL 说明其按成本价续费、隐私保护默认开启、不可主动注册（需从其他 Registrar 转入，且原域名注册满 60 天）的限制。
6. IF Author 期望的 Custom_Domain 已被占用，THEN THE Setup_Checklist SHALL 给出至少 3 个备选命名策略，每个策略包含名称、示例（基于原期望域名生成）和适用场景说明（替换 TLD、加前后缀、改用全名拼写等）。
7. IF Author 在 Setup_Checklist 中输入的 Custom_Domain 不符合格式要求（长度、字符集、连字符规则）或 TLD 不在推荐列表中，THEN THE Setup_Checklist SHALL 拒绝该输入并给出指示具体违规项的错误提示。

### Requirement 3: 静态站点框架选型与本地构建

**User Story:** 作为 Author，我希望选定一个 SSG 并能在本地生成博客网站，以便在发布前预览效果。

#### Acceptance Criteria

1. THE Setup_Checklist SHALL 给出一个默认推荐 SSG（Hugo），并以条目形式列出至少 3 条推荐理由（构建速度、单二进制免环境依赖、AI 圈采用率高），每条理由不超过 200 字。
2. THE Setup_Checklist SHALL 为该 SSG 在 macOS、Windows、Linux 三种操作系统上各提供至少 1 条可直接复制执行的安装命令，并为每条安装命令附带 1 条版本验证命令（用于在终端确认安装成功）。
3. WHEN Author 在本地执行该 SSG 的开发服务器命令，THE Blog_System SHALL 在 30 秒内启动开发服务器，并通过 localhost 提供可在浏览器中加载的预览页面，且首页 HTTP 响应在 5 秒内返回并至少包含站点标题与 1 篇示例文章链接。
4. IF 开发服务器启动失败（包括但不限于 SSG 未安装、默认端口被占用、配置文件解析错误），THEN THE Blog_System SHALL 在终端输出指示具体失败原因的错误信息，保留原工作目录文件不变，并不遗留后台进程。
5. THE Setup_Checklist SHALL 推荐至少 1 个默认 Theme（如 PaperMod），并提供其完整安装步骤以及必须修改的最少配置项清单，且该清单至少覆盖以下 6 项并为每项给出示例值：站点标题、站点描述、Author 名、社交链接、语言、时区。
6. WHEN Author 执行该 SSG 的生产构建命令，THE Blog_System SHALL 在本地输出目录中生成完整的静态站点文件，并在终端输出构建成功标志（含生成文件数量或耗时）或具体失败原因。
7. WHERE Author 倾向 React / JavaScript 生态，THE Setup_Checklist SHALL 给出 Astro 或 Next.js 的至少 1 个替代方案，并列出切换时需调整的项目目录结构、依赖安装命令、开发服务器命令与生产构建命令各 1 条。

### Requirement 4: 源代码仓库

**User Story:** 作为 Author，我希望博客源代码托管在 Git 仓库，以便版本管理与多设备协作。

#### Acceptance Criteria

1. THE Author SHALL 在 GitHub 上创建一个名为 Source_Repository 的仓库用于存放博客源文件，仓库可见性为 Public 或 Private 二选一，默认分支命名为 main。
2. THE Setup_Checklist SHALL 列出以下步骤及对应命令：GitHub 账号注册（含邮箱验证）、本地生成 SSH key（使用 ssh-keygen）、将公钥上传至 GitHub 账号设置、安装 git 客户端（覆盖 Windows、macOS、Linux 三种操作系统）、配置 git 全局用户名与邮箱。
3. THE Source_Repository SHALL 在根目录包含 README、.gitignore、LICENSE 三个文件，其中 README 至少包含项目名称与简介，.gitignore 至少忽略本地构建产物与依赖目录，LICENSE 为开源许可证文本。
4. WHEN Author 在本地执行 commit 并 push 到 Source_Repository 的默认分支 main，THE Source_Repository SHALL 在 60 秒内于远端默认分支显示该提交记录（含 commit hash、作者、提交信息）。
5. IF Author 执行 push 时认证失败或网络不可达，THEN THE Git_Client SHALL 终止本次推送，保留本地提交不变，并向 Author 输出指明失败原因（认证失败或网络错误）的错误信息。
6. IF Setup_Checklist 中任一步骤的命令执行返回非零退出码，THEN THE Setup_Checklist SHALL 标记该步骤为未完成，并提示 Author 检查前置依赖后重试，最大重试次数为 3 次。

### Requirement 5: 托管与 HTTPS

**User Story:** 作为 Reader，我希望通过 HTTPS 安全访问 Blog_System，以便信任内容来源。

#### Acceptance Criteria

1. THE Blog_System SHALL 由 Hosting_Platform 通过 HTTPS（TLS 1.2 及以上）对外提供服务，且对外暴露的所有公开页面与静态资源 URL 均以 https:// 开头。
2. THE Hosting_Platform SHALL 在 TLS 证书剩余有效期不足 30 天前自动完成续期，且整个生命周期（首次签发与续期）不要求 Author 执行任何手动操作。
3. IF TLS 证书自动续期失败，THEN THE Hosting_Platform SHALL 通过控制台或邮件向 Author 发出告警提示，并在原证书过期前继续使用现有有效证书提供服务。
4. WHEN Reader 通过 HTTP（含根路径与任意子路径）访问 Custom_Domain，THE Blog_System SHALL 以 301 或 308 重定向到协议为 HTTPS、主机名与原请求一致、且保留原始路径与查询字符串的等价地址。
5. THE Setup_Checklist SHALL 给出在所选 Hosting_Platform 上绑定 Custom_Domain 的步骤，包含需要添加的 DNS 记录类型（A / AAAA / CNAME）、对应记录值的获取方式、TTL 建议值（以秒为单位，建议范围 300 至 3600）以及生效验证方法。
6. THE Setup_Checklist SHALL 提供 GitHub Pages、Cloudflare Pages、Vercel、Netlify 四个平台的对比表格，每行至少包含以下五项：免费额度的月度构建次数、月度带宽上限、自定义域名是否免费支持 HTTPS、是否支持自动 HTTPS 重定向、是否对商业用途收费；并明确标注默认推荐 Cloudflare Pages，且在表格下方以不少于 50 字、不多于 300 字的篇幅给出推荐理由。

### Requirement 6: 自动化部署

**User Story:** 作为 Author，我希望推送代码后博客自动更新上线，以便专注于写作。

#### Acceptance Criteria

1. WHEN Author 向 Source_Repository 默认分支推送提交，THE Build_Pipeline SHALL 在 60 秒内自动触发对应的构建任务。
2. WHEN Build_Pipeline 构建成功，THE Hosting_Platform SHALL 在 5 分钟内将新版本发布到 Custom_Domain，并保留至少前 1 次成功构建的版本以便回滚。
3. IF Build_Pipeline 构建失败，或单次构建运行时长超过 15 分钟仍未完成，THEN THE Build_Pipeline SHALL 在失败判定后 5 分钟内通过邮件或 Source_Repository 通知向 Author 报告失败原因，并附带可访问的构建日志链接。
4. THE Setup_Checklist SHALL 提供针对默认 Hosting_Platform 的 CI 配置示例（GitHub Actions workflow 文件，或 Cloudflare Pages 的构建命令、构建输出目录、Node / Hugo 版本等设置截图说明），并对每项配置标注必填或可选状态。
5. WHILE Build_Pipeline 构建进行中，THE Hosting_Platform SHALL 继续提供前一次构建成功的版本供 Reader 访问，且对该版本的请求响应不因新构建任务的执行而中断或降级。
6. IF Hosting_Platform 在构建成功后 5 分钟内未完成发布，或发布过程出现错误，THEN THE Hosting_Platform SHALL 保持 Custom_Domain 指向上一次成功发布的版本，并在 5 分钟内向 Author 发送发布失败通知。

### Requirement 7: 站点信息架构

**User Story:** 作为 Reader，我希望快速了解 Author 是谁、写过哪些文章、按主题筛选阅读，以便高效消费内容。

#### Acceptance Criteria

1. WHEN Reader 访问「关于我」页面，THE Blog_System SHALL 展示 Author 的简介（纯文本或 Markdown，1 到 2000 字符）、研究 / 技能方向（以列表形式展示，至少 1 项，最多 30 项）、以及至少包含 GitHub 链接与邮箱地址两项的社交链接区块。
2. WHEN Reader 访问文章列表页，THE Blog_System SHALL 按文章发布日期倒序展示所有已发布文章，每条记录至少包含标题、摘要（截取自正文或 Author 指定，纯文本，最多 300 字符）、以及发布日期（YYYY-MM-DD 格式）。
3. WHILE 文章列表页中文章总数超过 10 篇，THE Blog_System SHALL 提供分页或「加载更多」机制，单页最多展示 10 篇文章，并保证每篇文章在分页中只出现一次。
4. THE Blog_System SHALL 为每篇已发布文章生成一个由 Author 指定 slug 的独立详情页，slug 仅允许小写字母、数字与连字符（长度 1 到 100 字符），且在站点构建后该 URL 路径保持稳定不变。
5. IF 两篇文章被指定了相同的 slug，或 slug 不符合允许的字符与长度规则，THEN THE Blog_System SHALL 在构建阶段终止构建并输出错误信息指明冲突或非法的 slug 来源文章。
6. IF Reader 访问了不存在或未发布的文章 URL，THEN THE Blog_System SHALL 返回 404 页面并提供返回首页与文章列表的链接。
7. WHEN Author 为文章添加一个或多个标签 / 分类（每篇文章最多 10 个，每个标签长度 1 到 30 字符），THE Blog_System SHALL 为每个被使用过至少一次的标签 / 分类生成一个聚合列表页，按发布日期倒序列出所有归属该标签 / 分类的文章。
8. THE Blog_System SHALL 在所有页面（首页、关于、文章列表、文章详情、标签 / 分类聚合页、404 页面）展示一个统一的导航区块，导航中至少包含指向「首页、文章、关于」三个目标的可点击链接，且当前页面所属导航项以视觉上可区分的状态（例如高亮或下划线）呈现。

### Requirement 8: 内容写作流程

**User Story:** 作为 Author，我希望使用 Markdown 编写文章，以便专注于内容本身。

#### Acceptance Criteria

1. THE Content_Source SHALL 以 UTF-8 编码的 Markdown 文件（扩展名 .md 或 .markdown）形式存储于约定的内容目录。
2. WHEN Author 在 Content_Source 目录新增一篇 Markdown 文件并填写约定的 front matter（title 字符串最长 200 字符、date 采用 ISO 8601 格式 YYYY-MM-DD、tags 为字符串数组且最多 10 个标签、summary 字符串最长 300 字符、draft 为布尔值），THE Blog_System SHALL 在下一次成功构建后将该文章作为已发布内容展示。
3. IF 新增的 Markdown 文件 front matter 缺少必填字段（title、date、draft）或字段类型/格式不符合约定，THEN THE Blog_System SHALL 终止该文章的构建发布流程，并输出指明文件路径与具体校验失败字段的错误信息。
4. WHILE Markdown 文件 front matter 中 draft 字段为 true，THE Blog_System SHALL 在生产构建产物中排除该文章，使其不可通过任何公开页面或链接访问。
5. THE Setup_Checklist SHALL 提供 front matter 全部字段（title、date、tags、summary、draft）的字段说明（含类型、是否必填、取值范围或格式约束）以及一份字段完整、可直接复制使用的示范 Markdown 文件。
6. THE Blog_System SHALL 支持代码块语法高亮、图片嵌入、数学公式（LaTeX 语法，KaTeX 或 MathJax 二选一）三类排版元素的渲染。
7. THE Setup_Checklist SHALL 给出至少 2 篇示范文章主题建议（如「自我介绍 / About Me」、「为什么开始写博客」），并为每个主题附建议字数范围（例如 500–1500 字）与至少包含 3 个层级的结构提纲。

### Requirement 9: 响应式与暗黑模式

**User Story:** 作为 Reader，我希望在手机和电脑上都能舒适阅读，并能切换暗黑模式，以便适配不同设备与环境。

#### Acceptance Criteria

1. WHILE 浏览器视口宽度在 320px 至 1920px 范围内，THE Blog_System SHALL 在所有页面渲染时不出现横向滚动条，且所有文本内容（包括标题、正文、按钮文字）SHALL 完整显示在视口范围内不发生截断或溢出。
2. IF Reader 的本地未保存主题偏好且操作系统主题为暗色，THEN THE Blog_System SHALL 在首次加载时默认应用深色配色。
3. IF Reader 的本地未保存主题偏好且操作系统主题为亮色或未声明偏好，THEN THE Blog_System SHALL 在首次加载时默认应用浅色配色。
4. THE Blog_System SHALL 在导航栏提供一个可见且可点击的明 / 暗主题切换入口。
5. WHEN Reader 点击主题切换入口，THE Blog_System SHALL 在 500ms 内完成全站配色切换，并将所选主题写入 localStorage。
6. WHEN Reader 重新加载页面或打开新页面，THE Blog_System SHALL 优先读取 localStorage 中保存的主题偏好并应用，覆盖操作系统默认主题。
7. WHILE 在 iOS Safari 与 Android Chrome 最近 2 个稳定大版本上访问，THE Blog_System SHALL 保持页面布局完整，不出现元素相互遮挡、横向滚动条或文字溢出容器边界。

### Requirement 10: SEO 与 RSS

**User Story:** 作为 Author，我希望文章能被搜索引擎收录、被订阅器订阅，以便扩大触达。

#### Acceptance Criteria

1. THE Blog_System SHALL 在每个 HTML 页面（首页、文章详情页、归档页、标签/分类页、关于页）的 head 中输出非空的 title（不超过 70 个字符）、meta description（不超过 160 个字符）以及 Open Graph 元数据（og:title、og:description、og:image、og:url、og:type），其中文章详情页的 og:type 为 article、其他页面为 website。
2. IF 当前页面对应的文章未显式提供 description 或封面图，THEN THE Blog_System SHALL 使用文章正文前不超过 160 个字符的纯文本摘要作为 meta description 与 og:description，并使用站点默认封面图作为 og:image。
3. THE Blog_System SHALL 在站点根路径提供 sitemap.xml，列出全部已发布且未标记为 draft/private 的页面（含首页、文章详情页、归档页、标签/分类页），每条记录包含 loc 与 lastmod 字段，且当文章发布、更新或删除后，sitemap.xml 在下一次站点构建产物中同步反映该变更。
4. THE Blog_System SHALL 在站点根路径提供 RSS 或 Atom 订阅源（默认 /index.xml 或 /rss.xml），订阅源按发布时间倒序包含最新的至少 10 篇已发布文章，每条目包含标题、唯一链接、发布时间与正文或不少于 200 字的摘要，且当文章发布或更新后，订阅源在下一次站点构建产物中同步反映该变更。
5. THE Blog_System SHALL 在站点根路径提供 robots.txt，默认允许全部主流搜索引擎爬虫抓取全部公开页面，且包含指向 sitemap.xml 绝对 URL 的 Sitemap 指令。
6. IF 访问者请求的 sitemap.xml、RSS/Atom 订阅源或 robots.txt 路径，THEN THE Blog_System SHALL 返回成功响应并使用对应的标准 MIME 类型（XML 类内容为 application/xml 或 application/rss+xml/application/atom+xml，robots.txt 为 text/plain）。
7. THE Setup_Checklist SHALL 提供可独立执行的分步指引，覆盖向 Google Search Console 验证站点所有权（含 HTML 文件或 meta 标签验证方式中的至少一种）以及提交 sitemap.xml URL 的完整步骤，且每个步骤包含明确的操作动作与可观察的完成判据。

### Requirement 11: 评论系统（可选）

**User Story:** 作为 Reader，我希望在文章下与 Author 交流，以便给出反馈。

#### Acceptance Criteria

1. WHERE Author 启用评论功能，WHEN Reader 打开文章详情页且文章正文渲染完成，THE Blog_System SHALL 在文章正文末尾下方嵌入 Comment_System。
2. WHERE Author 未启用评论功能，THE Blog_System SHALL 不在文章详情页渲染评论区域，且不向第三方评论服务发起任何请求。
3. WHERE Author 启用评论功能，THE Setup_Checklist SHALL 推荐 Giscus 作为默认方案，并按顺序提供以下配置步骤：在 Source_Repository 启用 Discussions、安装 Giscus GitHub App、获取 repo id 与 category id、填入主题配置。
4. WHERE Author 启用评论功能，IF 未通过身份认证（GitHub OAuth 或邮箱验证）的用户尝试提交评论，THEN THE Comment_System SHALL 拒绝该提交、不保存任何评论内容，并向用户展示要求先登录认证的提示。
5. WHERE Author 启用评论功能，IF Comment_System 在 10 秒内未能成功加载，THEN THE Blog_System SHALL 在评论区位置显示加载失败提示，且 SHALL 保持文章正文及其他页面内容正常显示。

### Requirement 12: 访问统计（可选）

**User Story:** 作为 Author，我希望了解访问量与来源，以便评估写作影响。

#### Acceptance Criteria

1. WHERE Author 启用访问统计，THE Blog_System SHALL 集成一个 Analytics_System 并采集以下页面浏览数据：页面浏览量（PV）、独立访客数（UV）、来源页面（Referrer）、设备类型（桌面/平板/移动），且采集的数据不得包含完整 IP 地址、邮箱或可直接识别个人身份的字段。
2. WHERE Author 启用访问统计，THE Setup_Checklist SHALL 提供 Cloudflare Web Analytics、Umami、Plausible 三个隐私友好方案的对比表，对比项至少包含：是否需自托管、是否使用 Cookie、是否符合 GDPR、月度免费额度上限、对应配置步骤数量，并为每个方案提供从注册到嵌入站点的端到端配置步骤。
3. WHERE Author 启用访问统计，WHEN Reader 首次访问任意页面，THE Blog_System SHALL 显示一个包含"同意"和"拒绝"两个明确选项的 Consent_Banner，且在 Reader 做出选择前不得写入任何识别性 Cookie，仅采集不含 Cookie 的匿名聚合数据。
4. WHERE Author 启用访问统计，IF Reader 在 Consent_Banner 中选择"拒绝"或后续通过页面提供的入口撤回同意，THEN THE Analytics_System SHALL 立即停止写入识别性 Cookie 并清除已写入的识别性 Cookie，同时保留匿名聚合采集行为。
5. WHERE Author 启用访问统计，IF Analytics_System 的脚本在 3 秒内未能加载或返回错误，THEN THE Blog_System SHALL 继续完成页面渲染、不阻塞任何用户可见内容，且在浏览器控制台输出一条指示 Analytics 加载失败的错误信息。

### Requirement 13: 站内搜索（可选）

**User Story:** 作为 Reader，我希望按关键字检索文章，以便快速定位内容。

#### Acceptance Criteria

1. WHERE Author 启用站内搜索，THE Blog_System SHALL 在站点所有页面的导航栏提供 Search_System 的搜索入口。
2. WHERE Author 启用站内搜索 AND 文章总数 ≤ 500，WHEN Reader 在搜索框输入长度为 1 至 100 个字符的关键字并提交，THE Search_System SHALL 在 1 秒内返回标题或正文匹配该关键字的文章列表，且单次最多返回 50 条结果。
3. WHERE Author 启用站内搜索，THE Setup_Checklist SHALL 推荐至少 1 个客户端搜索方案（默认 Pagefind），并提供构建集成步骤。
4. WHERE Author 启用站内搜索，IF Reader 提交的关键字为空或仅包含空白字符，THEN THE Search_System SHALL 不执行检索，并在搜索框附近显示提示信息要求输入有效关键字。
5. WHERE Author 启用站内搜索，IF Reader 提交的关键字在文章标题与正文中均无匹配项，THEN THE Search_System SHALL 在 1 秒内显示无结果提示信息，并保留原关键字供 Reader 修改后重试。
6. WHERE Author 启用站内搜索，IF Search_System 的搜索索引加载失败，THEN THE Search_System SHALL 显示加载失败的错误提示信息，并保留搜索框可用以供 Reader 重试。

### Requirement 14: 准备清单交付物

**User Story:** 作为 0 基础的 Author，我希望拿到一份能照着做的「准备清单」文档，以便明确每一步要做什么、买什么、装什么、写什么。

#### Acceptance Criteria

1. THE Setup_Checklist SHALL 以 Markdown 文档形式交付，并按「域名 → 托管 → SSG 与 Theme → Source_Repository 与 Build_Pipeline → 内容与风格 → 可选增强 → 上线后维护」顺序组织为 7 个一级章节，每个章节使用唯一的二级标题标识。
2. THE Setup_Checklist SHALL 在每个章节内显式列出「所需账号」、「所需安装的软件」、「需要执行的命令」、「需要新建或修改的文件」四类条目，每类以独立小标题呈现，且当某类条目在该章节不适用时，必须显式标注为「无」或「不适用」，不得省略小标题。
3. THE Setup_Checklist SHALL 给出从 0 到第一次上线的端到端有序操作步骤，步骤数量介于 10 至 30 之间，且每个步骤必须包含：连续递增的编号、操作目的描述、可直接复制执行的命令或要修改的文件名、用于判定该步骤完成的可观察验证方法。
4. THE Setup_Checklist SHALL 提供预算估算表，覆盖域名、Hosting_Platform、Comment_System、Analytics_System、Search_System 共 5 个项目，每行必须包含「项目名称」、「年成本下限（USD，保留 2 位小数）」、「年成本上限（USD，保留 2 位小数）」、「计费说明」、「估算更新日期（YYYY-MM-DD）」5 列，且年成本下限不得大于上限。
5. THE Setup_Checklist SHALL 提供常见问题排查清单，至少覆盖以下 5 个场景：DNS 未生效、HTTPS 证书未签发、CI 构建失败、Custom_Domain 访问 404、文章未在线上展示，且每个场景条目必须包含「可观察症状」、「可能原因（至少 1 条）」、「检查步骤（至少 1 条可执行命令或操作）」、「解决动作（至少 1 条可执行命令或操作）」4 个字段。
6. IF 任一章节缺少四类条目中任一小标题，或预算估算表缺少任一规定列，或排查清单条目缺少任一规定字段，THEN THE Setup_Checklist SHALL 被视为不满足交付标准，并在文档开头的「完整性检查」小节中以未完成项的形式标记。
