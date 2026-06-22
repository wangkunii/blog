﻿﻿﻿# 林前先生的博客

> 以基督为中心的思考与分享  基督教门徒训练资源平台

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## 项目简介

这是一个纯静态的个人博客/资源站，无需后端数据库即可运行。内容涵盖信仰文章、每日灵修、圣经研读、电子书库、门徒训练资料、闯关游戏及教会工具。

## 访问地址

- **Netlify**: https://linqian-blog.netlify.app
- **GitHub**: https://github.com/wangkunii/blog

---

## 功能特性

### blog 博客文章（posts/）
- 45+ 篇信仰主题文章，涵盖神学、灵修、书评、教会历史等
- 时间跨度从古代教父著作到当代基督教经典
- 入口: `index.html` -> 文章列表

### prayer 每日灵修（daily-devotion/）
- 基于 SQLite 的灵修书籍数据库：20+ 本灵修经典
- 按日期自动显示当日经文
- 支持书籍切换
- 入口: `daily-devotion/daily-devotion.html`

### book 每日研经（daily-bible-study/）
- 三种圣经译本对照阅读：和合本 (CUV) / 吕振中译本 (LZZ) / KJV
- 旧约 / 新约按书卷选择
- 词典 / 注释 / 原文对照辅助阅读
- JSON 格式圣经数据，快速检索
- 入口: `daily-bible-study/daily-bible-study.html`

### book 电子书阅读（E-book/）
- EPUB 在线阅读器（通过 CDN 加载 epub.js）
- PDF 浏览器原生查看
- 推荐书库：经典基督信仰 EPUB
- 个人书库：辅导类 PDF 书籍
- 书籍封面展示与管理
- 入口: `E-book/books.html`、`E-book/epub-reader.html`

### graduation-cap 门徒训练（discipleship/）
- 7 本门徒训练书籍在线阅读（HTML 格式）
- PDF 原版书籍下载
- 内容涵盖：生命影响、初信栽培、信徒培训、教会观、查经法、讲道学、祷告服侍
- 入口: `discipleship/01-以生命影响生命.html` ~ `discipleship/07-祷告服侍的培训课程.html`

### game-controller 闯关游戏（games/）
- 对应 7 本门徒训练书籍的知识闯关游戏
- 单选/多选题支持，即时答案解析与分数统计
- 每个游戏独立配色方案（深蓝/紫色/橙色/绿色/青色/红色/粉色主题）
- 姓名输入、每题计分、80分以上荣誉证书功能
- 入口: `games/game1/index1.html` ~ `games/game7/index7.html`（`index.html` 自动重定向）

### tools 教会工具（tools/）
- **点名系统**（`attendance.html`）：倒计时点名功能
- **听道笔记**（`bible-notes.html`）：结构化听道记录模板
- **灵修笔记**（`devotion-notes.html`）：每日灵修反思记录
- **数字孪生教堂**（`church-3d.html`）：3D 教堂虚拟体验

---

## 项目结构

`
linqian-blog/
 index.html                    # 首页（博客文章列表 + 每日经文）
 package.json                  # 项目配置（npm start 启动本地服务）
 netlify.toml                  # Netlify 部署配置
 vercel.json                   # Vercel 部署配置
 _redirects                    # Netlify 重定向规则
 LICENSE                       # MIT 许可证
 README.md                     # 项目说明

 css/
    style.css                 # 全局样式（粉色系，响应式）

 js/
    epub.min.js               # EPUB.js CDN 加载器（自动回退多个 CDN）

 posts/                        # 博客文章 (49 篇 HTML)
    *.html

 discipleship/                 # 门徒训练资料
    01-以生命影响生命.html ~ 07-祷告服侍的培训课程.html  # 在线阅读版
    *.pdf                     # PDF 原版 (7 本)

 games/                        # 闯关游戏 (7 个)
    game1/ ~ game7/
       indexN.html            # 游戏主页面（N=1~7）
       index.html             # 重定向到 indexN.html
       styleN.css             # 独立样式（N=1~7，深色主题配色）
       gameN.js               # 游戏逻辑（N=1~7，含计分与证书系统）
       questionsN.js          # 题库数据（N=1~7）
    README.md

 tools/                        # 教会工具
    attendance.html           # 点名系统
    bible-notes.html          # 听道笔记
    devotion-notes.html       # 灵修笔记
    church-3d.html            # 数字孪生教堂

 daily-devotion/               # 每日灵修数据与页面
    daily-devotion.html       # 灵修主页面
    devotion.json             # 灵修书籍配置索引（命名为 devotion_*，避免与电子书 E-book/ 目录混淆）
    *.db                      # SQLite 数据库 (20 本灵修书)

 daily-bible-study/            # 每日研经数据与页面
    daily-bible-study.html    # 研经主页面
    bibles_info.json          # 66 卷书卷信息（命名为 bibles_*，避免与电子书 book 混淆）
    bible/                    # 圣经经文 (JSON)
       cuv.json              # 和合本
       lzz.json              # 吕振中译本
       kjv.json              # KJV 英文
    annotation/               # 注释数据 (commentary.json)
    dictionary/               # 词典数据 (encyclopedia.json, word_dictionary.json)
    original/                 # 原文数据 (original.json)

 E-book/                        # 电子书资源
     books.html                # 书库主页面
     epub-reader.html          # EPUB 阅读器
     covers/                   # 书籍封面图片
     my-library/               # 个人书库 (PDF)
     recommended-E-book/        # 推荐书库 (EPUB)
`

---

## 技术栈

- **前端**: 纯静态 HTML5 + CSS3 + Vanilla JavaScript（零依赖）
- **EPUB 阅读**: epub.js（通过 CDN 动态加载，见 `js/epub.min.js`）
- **PDF 阅读**: 浏览器原生 PDF 查看（`<embed>`）
- **数据存储**: JSON + SQLite（通过 sql.js CDN 加载）
- **字体**: Noto Serif SC（中文衬线字体）
- **主题色**: 柔粉 `#FFB7B2` 暖色调设计

### 设计特点

- **响应式设计**: 适配桌面 / 平板 / 手机（断点：1200px / 992px / 768px / 576px）
- **苹果设备兼容**: Safari 适配、`viewport-fit=cover`、`-webkit-` 前缀、安全区域适配
- **性能优化**: 静态资源缓存（Netlify/Vercel 配置安全头 + Cache-Control）、Gzip 压缩
- **CDN 回退**: `js/epub.min.js` 依次尝试 jsDelivr -> unpkg -> cdnjs，自动降级

---

## 本地运行

`ash
# 克隆仓库
git clone https://github.com/wangkunii/blog.git
cd blog

# 方式一：npm (已配置 package.json)
npm start
# 访问 http://localhost:3000

# 方式二：Python 3 HTTP 服务器
python -m http.server 8000
# 访问 http://localhost:8000

# 方式三：VS Code Live Server 插件
# 右键 index.html -> "Open with Live Server"

# 方式四：直接双击 index.html
# 注意：由于 fetch 读取本地 JSON 可能受 CORS 限制，
# 建议用方式一/二/三启动本地服务器。
`

---

## 部署指南

### Netlify 部署（推荐）

项目已配置 `netlify.toml` 和 `_redirects`，开箱即用：

1. 访问 Netlify，点击 **Add new site** -> **Import an existing project**
2. 连接 GitHub 仓库 `wangkunii/blog`
3. Netlify 自动读取 `netlify.toml` 配置，无需手动设置
4. 部署完成后可在 **Domain settings** 中绑定自定义域名

### Vercel 部署

项目已配置 `vercel.json`：

1. 访问 Vercel，点击 **New Project** 导入 GitHub 仓库
2. Framework Preset 选择 **Other**，Build Command 留空
3. Output Directory 设置为 `.`
4. 点击 **Deploy**

### GitHub Pages

任何静态站点托管服务（GitHub Pages、Cloudflare Pages、Surge 等）均可直接使用。

---

## 浏览器支持

| 浏览器 | 支持情况 |
|--------|---------|
| Chrome | 推荐 |
| Firefox | 支持 |
| Safari | 支持（含 iOS） |
| Edge | 支持 |
| 移动端浏览器 | 支持 |

---

## 更新日志

### v1.2.0 (2026-06-17)

- 游戏文件重命名：将 game1-7 的 game.js、index.html、style.css、questions.js 重命名为带编号的文件名（如 game1.js、index1.html）
- 修复游戏功能：为每个游戏添加姓名输入、每题计分、80分以上荣誉证书功能
- 修复配色方案：将所有游戏背景改为深色主题，提高文字可读性
  - game1：深蓝/紫色主题
  - game2：紫色主题
  - game3：橙色/金色主题
  - game4：绿色主题
  - game5：青色主题
  - game6：红色主题
  - game7：粉色主题
- 修复链接问题：创建 index.html 重定向文件，自动跳转到对应的编号文件
- 修复 game5 题目加载问题：更正 questions 文件引用
- 修复游戏标题显示错误：更新各游戏页面标题
- 更新 README：反映最新游戏结构与功能

### v1.1.0 (2026-06-16)

- 梳理项目结构：将功能页面按实际目录组织，修正 `index.html` 中的导航链接
- 重命名文件以避免与电子书 E-book/ 目录混淆：
  - `daily-bible-study/books_info.json` → `bibles_info.json`
  - `daily-devotion/books.json` → `devotion.json`
- 补全缺失文件：
  - `daily-bible-study/bibles_info.json`：66 卷书卷信息（名称、简称、章节数，命名为 bibles_* 避免与电子书 book 冲突）
  - `js/epub.min.js`：EPUB.js CDN 加载器（多重 CDN 回退）
  - `netlify.toml`、`_redirects`、`vercel.json`：部署配置（含安全头 & 缓存策略）
  - `package.json`：npm 项目配置
  - `LICENSE`：MIT 许可证
- 更新 README：按最新目录结构重写功能说明、部署指南与技术栈

### v1.0.0 (2026-05-28)

- 项目架构初版：统一页面存放路径
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

MIT License  仅供个人学习使用。详见 LICENSE 文件。

---

## 联系方式

如有问题或建议，欢迎在 GitHub Issues (https://github.com/wangkunii/blog/issues) 提出。
