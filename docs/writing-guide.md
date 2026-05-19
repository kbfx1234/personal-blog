# 博客写作指南

> 这份文档教你如何写一篇新文章、本地预览、推送上线。
> 博客地址：https://personal-blog-eqo.pages.dev/

---

## 写一篇新文章（5 分钟上手）

### 第 1 步：打开终端，进入博客目录

```bash
cd ~/code/personal_blog
```

### 第 2 步：创建新文章

```bash
hugo new content/posts/my-first-real-post.md
```

这会在 `content/posts/` 下生成一个新文件，自动填好 front matter 模板。

> 💡 文件名就是 URL slug：`my-first-real-post.md` → 网址是 `/posts/my-first-real-post/`
> 所以文件名用**小写英文 + 连字符**，不要用中文或空格。

### 第 3 步：编辑文章

用任何编辑器打开这个文件（VS Code / Cursor / Typora / 记事本都行）：

```bash
code content/posts/my-first-real-post.md
# 或者
open content/posts/my-first-real-post.md
```

文件顶部是 front matter（文章元数据），长这样：

```toml
+++
title = 'My First Real Post'
date = 2026-05-19T16:30:00+08:00
draft = true                    ← 改成 false 才会发布！
slug = 'my-first-real-post'
tags = []                       ← 加标签，如 ['学习笔记', 'AI']
categories = []                 ← 加分类，如 ['技术']
summary = ''                    ← 文章列表里显示的摘要（≤300字）
description = ''                ← SEO 描述（≤160字）
images = ['/og-default.png']    ← 分享到社交媒体时的封面图
math = false                    ← 如果文章有数学公式，改成 true
+++
```

**你需要改的：**
1. `title`：改成你的文章标题（中英文都行）
2. `draft = true` → **`draft = false`**（最重要！不改这个文章不会发布）
3. `tags`：加 1-3 个标签
4. `summary`：写一句话摘要

然后在 `+++` 下面写正文，用 Markdown 语法：

```markdown
+++
title = '我的第一篇学习笔记'
date = 2026-05-19T16:30:00+08:00
draft = false
slug = 'my-first-real-post'
tags = ['学习笔记']
categories = ['技术']
summary = '记录我学习 XXX 的过程和收获。'
description = '一篇关于 XXX 的学习笔记。'
images = ['/og-default.png']
math = false
+++

## 背景

写一下为什么要学这个东西...

## 过程

### 第一步：XXX

具体做了什么...

### 第二步：YYY

代码示例：

```python
print("hello world")
```

## 收获

总结一下学到了什么...

## 参考

- [链接文字](https://example.com)
```

### 第 4 步：本地预览

```bash
hugo server -D
```

打开浏览器访问 http://localhost:1313/，实时看到你的文章效果。

> `-D` 表示也显示 draft 文章。每次保存文件，浏览器会自动刷新。

看完效果后按 `Ctrl+C` 停止预览。

### 第 5 步：推送上线（3 条命令）

```bash
git add content/posts/my-first-real-post.md
git commit -m "post: 我的第一篇学习笔记"
git push
```

**就这样！** 推送后等 1-2 分钟，Cloudflare Pages 自动构建并发布。刷新 https://personal-blog-eqo.pages.dev/posts/ 就能看到新文章。

---

## 修改已有文章

直接编辑对应的 `.md` 文件，然后：

```bash
git add content/posts/要改的文件.md
git commit -m "update: 修改了XXX"
git push
```

---

## 修改首页自我介绍

编辑这个文件：

```bash
code content/_index.md
```

改完同样 `git add` → `git commit` → `git push`。

---

## 删除文章

```bash
rm content/posts/不要的文章.md
git add -A
git commit -m "remove: 删除了XXX"
git push
```

---

## Markdown 常用语法速查

```markdown
# 一级标题
## 二级标题
### 三级标题

**加粗** *斜体* ~~删除线~~

- 无序列表
- 第二项

1. 有序列表
2. 第二项

[链接文字](https://example.com)

![图片描述](图片URL)

> 引用块

`行内代码`

代码块（三个反引号 + 语言名）：
```

---

## 插入图片

### 方法 1：用外部图床（推荐新手）

把图片上传到 https://imgur.com 或 https://sm.ms，拿到链接后：

```markdown
![图片描述](https://i.imgur.com/xxxxx.png)
```

### 方法 2：放在仓库里

把图片放到 `static/images/` 目录：

```bash
mkdir -p static/images
cp ~/Downloads/my-photo.png static/images/
```

然后在文章里引用：

```markdown
![图片描述](/images/my-photo.png)
```

> ⚠️ 图片会占仓库空间。如果图片很多（>50张），建议用外部图床。

---

## 插入数学公式

在 front matter 里设 `math = true`，然后：

行内公式：`$E = mc^2$`

独立公式：
```
$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$
```

---

## 常见问题

### Q: 推送后网站没更新？
- 等 1-2 分钟（Cloudflare 构建需要时间）
- 检查 `draft = false`（draft=true 的文章不会发布）
- 检查 `date` 不是未来时间（未来日期的文章也不会发布）

### Q: 本地预览正常但线上看不到？
- 本地用了 `-D` 参数会显示 draft，线上不会
- 确认 `git push` 成功了（看终端输出有没有报错）

### Q: 想改文章 URL？
- 修改 front matter 里的 `slug` 字段
- 注意：改了 slug 意味着旧链接会 404，如果已经分享过旧链接要谨慎

### Q: 标签/分类页面没出现我的标签？
- 确认 `tags = ['标签名']` 格式正确（方括号 + 引号）
- 确认文章 `draft = false`

---

## 日常工作流总结

```
写文章 → 本地预览 → 推送上线
  │          │          │
  ▼          ▼          ▼
hugo new   hugo server  git add + commit + push
```

就这三步，循环往复。祝写作愉快！
