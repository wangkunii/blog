# 林前先生的博客

> 以基督为中心的思考与分享 — 基督教门徒训练资源平台

[![Netlify Status](https://api.netlify.com/api/v1/badges/placeholder/deploy-status)](https://linqian-blog.netlify.app)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 访问地址

- **Netlify**: https://linqian-blog.netlify.app
- **GitHub**: https://github.com/wangkunii/blog

---

## 功能特性

### 📖 博客文章
- 45+ 篇信仰主题文章，涵盖神学、灵修、书评、教会历史等
- 时间跨度从古代教父著作到当代基督教经典
- 路径: `/posts/`

### 🙏 每日灵修
- 365 天每日经文自动显示
- 50-100 字灵修心得内容
- 支持 18+ 本灵修书籍选择（SQLite 数据库存储）
- 日期导航功能，可查看任意日期的灵修内容
- 路径: `/pages/daily-devotion.html`

### 📚 每日研经
- 三种圣经译本对照：和合本 (CUV)、吕振中译本 (LZZ)、KJV
- 旧约/新约切换，按书卷选择章节
- 词典、注释、原文对照功能
- JSON 格式圣经数据，快速检索
- 路径: `/pages/daily-bible-study.html`

### 📕 电子书阅读
- EPUB 在线阅读器，支持目录导航、字体缩放
- PDF 阅读器内嵌支持
- 推荐书籍库：100 本基督教经典著作（奥古斯丁、加尔文、C.S.路易斯、巴刻等）
- 个人书库：10 本辅导类书籍 (PDF)
- 书籍封面展示与管理
- 路径: `/pages/books.html`、`/pages/epub-reader.html`

### 🎓 门徒训练
- 7 本门徒训练书籍在线阅读（HTML 格式）
- PDF 原版书籍下载
- 内容涵盖：生命影响、初信栽培、信徒培训、教会观、查经法、讲道学、祷告服侍
- 路径: `/discipleship/book1.html` ~ `/discipleship/book7.html`

### 🎮 闯关游戏
- 对应 7 本门徒训练书籍的知识闯关游戏
- 每本书 200 道题库，随机抽取 30 道作答
- 支持单选题、多选题、填空题
- 即时答案解析与分数统计
- 每个游戏独立配色方案
- 路径: `/games/game1/index.html` ~ `/games/game7/index.html`

### 🛠 教会工具
- **点名系统**：倒计时点名功能
- **听道笔记**：结构化听道记录模板
- **灵修笔记**：每日灵修反思记录
- **数字孪生教堂**：3D 教堂虚拟体验
- 路径: `/tools/`

---

## 项目结构

```
linqian-blog/
├── index.html                    # 首页（博客文章列表 + 每日经文）
├── package.json                  # 项目配置
├── netlify.toml                  # Netlify 部署配置
├── vercel.json                   # Vercel 部署配置
├── _redirects                    # Netlify 重定向规则
├── README.md                     # 项目说明
│
├── pages/                        # 核心功能页面
│   ├── daily-devotion.html       # 每日灵修
│   ├── daily-bible-study.html    # 每日研经
│   ├── books.html                # 电子书馆
│   └── epub-reader.html          # EPUB 阅读器
│
├── posts/                        # 博客文章 (49 篇 HTML)
│   └── *.html
│
├── discipleship/                 # 门徒训练资料
│   ├── book1.html ~ book7.html   # 在线阅读版
│   └── *.pdf                     # PDF 原版 (7 本)
│
├── games/                        # 闯关游戏 (7 个)
│   ├── game1/ ~ game7/
│   │   ├── index.html            # 游戏主页面
│   │   ├── style.css             # 独立样式
│   │   ├── game.js               # 游戏逻辑
│   │   └── questions.js          # 题库数据
│   └── README.md
│
├── tools/                        # 教会工具
│   ├── attendance.html           # 点名系统
│   ├── bible-notes.html          # 听道笔记
│   ├── devotion-notes.html       # 灵修笔记
│   └── church-3d.html            # 数字孪生教堂
│
├── css/
│   └── style.css                 # 全局样式
│
├── js/
│   └── epub.min.js               # EPUB.js 阅读器库
│
├── daily-bible-study/            # 每日研经数据
│   ├── bible/                    # 圣经经文 (JSON)
│   │   ├── cuv.json              # 和合本
│   │   ├── lzz.json              # 吕振中译本
│   │   └── kjv.json              # KJV 英文
│   ├── annotation/               # 注释数据
│   ├── dictionary/               # 词典数据
│   ├── original/                 # 原文数据
│   └── books_info.json           # 书卷信息
│
├── daily-devotion/               # 每日灵修数据
│   ├── books.json                # 书籍配置
│   └── *.db                      # SQLite 数据库 (20 本灵修书)
│
├── books/                        # 电子书资源
│   ├── covers/                   # 书籍封面图片
│   ├── my-library/               # 个人书库 (PDF)
│   └── recommended-books/        # 推荐书库 (EPUB)
│
└── books.js                      # 书籍索引数据 (100 本)
```

---

## 技术栈

- **前端**: 纯静态 HTML5 + CSS3 + Vanilla JavaScript
- **EPUB 阅读**: EPUB.js
- **PDF 阅读**: 浏览器原生 PDF 查看
- **数据存储**: JSON + SQLite (通过 sql.js)
- **字体**: Noto Serif SC（中文衬线字体）
- **主题色**: 柔粉 `#FFB7B2` 暖色调设计

### 设计特点
- **响应式设计**: 适配桌面 / 平板 / 手机（1200px / 992px / 768px / 576px 断点）
- **苹果设备兼容**: Safari 适配、`viewport-fit=cover`、`-webkit-` 前缀、安全区域适配
- **性能优化**: 静态资源缓存、安全头配置、Gzip 压缩

---

## 部署指南

### Netlify 部署（推荐）

项目已配置 `netlify.toml` 和 `_redirects`，开箱即用：

1. 访问 [Netlify](https://app.netlify.com)，点击 "Add new site" → "Import an existing project"
2. 连接 GitHub 仓库 `wangkunii/blog`
3. Netlify 自动读取 `netlify.toml` 配置，无需手动设置
4. 部署完成后可在 Domain settings 中绑定自定义域名

### Vercel 部署

项目已配置 `vercel.json`：

1. 访问 [Vercel](https://vercel.com)，导入 GitHub 仓库
2. 框架预设选择 "Other"，构建命令留空
3. 输出目录设置为 `.`
4. 点击 Deploy

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/wangkunii/blog.git
cd blog

# 方式一：VS Code Live Server 插件
# 右键 index.html → "Open with Live Server"

# 方式二：Python HTTP 服务器
python -m http.server 8000
# 访问 http://localhost:8000

# 方式三：npm
npm run dev
```

---

## 浏览器支持

| 浏览器 | 支持情况 |
|--------|---------|
| Chrome | ✅ 推荐 |
| Firefox | ✅ |
| Safari | ✅ (含 iOS) |
| Edge | ✅ |
| 移动端浏览器 | ✅ |

---

## 更新日志

### v1.0.0 (2026-05-28)

- 项目架构优化，统一页面存放路径
- 每日灵修功能：365 天经文 + 18+ 本书籍支持
- 每日研经功能：三种译本对照 + 词典注释
- 电子书阅读器：EPUB/PDF 在线阅读
- 门徒训练：7 本书籍在线阅读
- 闯关游戏：7 个主题知识问答
- 教会工具：点名系统、笔记模板、3D 教堂
- Netlify / Vercel 部署配置
- 苹果设备全面兼容
- 响应式布局优化

---

## 许可证

MIT License — 仅供个人学习使用。

---

## 联系方式

如有问题或建议，欢迎在 [GitHub Issues](https://github.com/wangkunii/blog/issues) 提出。
