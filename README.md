# personal-blog

karl 的博客 — 记录学习、生活与思考。

基于 [Hugo](https://gohugo.io/) + [PaperMod](https://github.com/adityatelange/hugo-PaperMod) 主题构建，部署在 Cloudflare Pages 上。

## 本地预览

```bash
hugo server -D
# 浏览器访问 http://localhost:1313/
```

## 生产构建

```bash
hugo --minify --gc
# 产物输出到 public/
```

## 内容写作

```bash
hugo new content/posts/<slug>.md
# 编辑文件，把 draft 改为 false
git add content/posts/<slug>.md
git commit -m "post: <slug>"
git push
# Cloudflare Pages 自动构建并发布
```

## License

[MIT](./LICENSE) © 2025 Karl
