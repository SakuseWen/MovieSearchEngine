# 🎬 电影搜索引擎

一个基于 Elasticsearch 的电影搜索引擎，提供强大的全文搜索功能和现代化的 Web 界面。

[English](README.md) | 简体中文

## ✨ 功能特性

- 🔍 **全文搜索**：支持电影标题、原标题和简介的多字段搜索
- 🎯 **智能过滤**：按类型、年份、评分等条件筛选
- 📊 **多种排序**：支持按评分、年份、标题排序
- 🎨 **现代化 UI**：使用 React + TypeScript + Tailwind CSS 构建
- ⚡ **高性能**：基于 Elasticsearch 的快速搜索引擎
- 🌐 **RESTful API**：Flask 后端提供标准 API 接口

## 🏗️ 技术栈

### 后端
- **Python 3.x** - 编程语言
- **Flask** - Web 框架
- **Elasticsearch 9.x** - 搜索引擎
- **TMDB API** - 电影数据源

### 前端
- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Tailwind CSS** - 样式框架
- **Radix UI** - UI 组件库
- **Lucide React** - 图标库

## 📋 前置要求

在开始之前，请确保你的系统已安装：

- Python 3.8 或更高版本
- Node.js 16 或更高版本
- Elasticsearch 9.x
- TMDB API Key（从 [TMDB 官网](https://www.themoviedb.org/settings/api) 获取）

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/SakuseWen/MovieSearchEngine.git
cd MovieSearchEngine
```

### 2. 配置环境变量

#### 后端配置

复制环境变量模板：

```bash
cp .env.example .env
```

编辑 `.env` 文件，填入你的配置信息：

```env
# Elasticsearch 配置
ES_HOST=https://localhost:9200
ES_USER=elastic
ES_PASSWORD=你的elasticsearch密码
ES_CA_CERT_PATH=你的http_ca.crt证书路径

# TMDB API 密钥
TMDB_API_KEY=你的tmdb_api_key

# Flask 配置
FLASK_DEBUG=True
FLASK_PORT=5000
```

#### 前端配置

```bash
cd "电影搜索引擎网页 (1)"
cp .env.example .env
```

编辑前端 `.env` 文件：

```env
VITE_API_URL=http://localhost:5000
```

### 3. 安装后端依赖

返回项目根目录：

```bash
cd ..
pip install -r requirements.txt
```

### 4. 启动 Elasticsearch

确保 Elasticsearch 已安装并运行在 `https://localhost:9200`

**Windows 用户：**
```bash
start_elasticsearch.bat
```

**手动启动：**
```bash
cd path/to/elasticsearch
bin/elasticsearch.bat  # Windows
# 或
bin/elasticsearch      # Linux/Mac
```

### 5. 获取并索引电影数据

```bash
# 从 TMDB 获取电影数据
python fetch_movies.py

# 将数据索引到 Elasticsearch
python index_movies.py
```

这将获取约 1000+ 部电影的数据并索引到 Elasticsearch。

### 6. 启动后端 API

```bash
python app.py
```

或使用批处理文件（Windows）：
```bash
start_flask.bat
```

API 服务将运行在 `http://localhost:5000`

### 7. 安装并启动前端

打开新的终端窗口：

```bash
cd "电影搜索引擎网页 (1)"
npm install
npm run dev
```

前端应用将运行在 `http://localhost:3000`

## 📡 API 接口文档

### 搜索电影

```http
GET /search?q=<query>
```

**参数：**
- `q` (可选): 搜索关键词，支持中英文

**响应示例：**
```json
{
  "total": 100,
  "results": [
    {
      "id": 550,
      "title": "Fight Club",
      "original_title": "Fight Club",
      "overview": "A ticking-time-bomb insomniac...",
      "original_language": "en",
      "release_date": "1999-10-15",
      "rating": 8.4,
      "popularity": 61.416,
      "genre_ids": [18, 53, 35],
      "poster": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
      "score": 12.5
    }
  ]
}
```

### 健康检查

```http
GET /
```

返回 API 运行状态。

## 📁 项目结构

```
MovieSearchEngine/
├── app.py                      # Flask API 服务器
├── fetch_movies.py             # 从 TMDB 获取电影数据
├── index_movies.py             # 将数据索引到 Elasticsearch
├── config.py                   # 配置管理（从 .env 读取）
├── requirements.txt            # Python 依赖
├── .env.example               # 环境变量模板
├── .gitignore                 # Git 忽略文件
├── movies.json                # 电影数据文件
├── start_flask.bat            # 启动 Flask 脚本（Windows）
├── start_elasticsearch.bat    # 启动 Elasticsearch 脚本（Windows）
├── start_kibana.bat          # 启动 Kibana 脚本（Windows）
└── 电影搜索引擎网页 (1)/      # 前端项目
    ├── src/
    │   ├── App.tsx            # 主应用组件
    │   ├── components/        # React 组件
    │   │   ├── SearchBar.tsx  # 搜索栏
    │   │   ├── MovieCard.tsx  # 电影卡片
    │   │   ├── MovieDetail.tsx # 电影详情
    │   │   ├── FilterSection.tsx # 过滤器
    │   │   └── ui/           # UI 组件库
    │   ├── services/         # API 服务
    │   │   └── api.ts        # API 调用
    │   └── styles/           # 样式文件
    ├── package.json
    ├── vite.config.ts
    └── .env.example
```

## 🔧 配置说明

### Elasticsearch 配置

1. **安装 Elasticsearch**
   - 下载：https://www.elastic.co/downloads/elasticsearch
   - 解压并运行

2. **启用 HTTPS**
   - Elasticsearch 9.x 默认启用 HTTPS

3. **获取密码和证书**
   - 首次启动时会生成 `elastic` 用户密码
   - CA 证书位于：`config/certs/http_ca.crt`

4. **配置 .env**
   - 将密码和证书路径填入 `.env` 文件

### TMDB API 配置

1. 访问 [TMDB 官网](https://www.themoviedb.org/)
2. 注册账号
3. 进入 **设置 → API** 申请 API Key
4. 将 API Key 添加到 `.env` 文件的 `TMDB_API_KEY`

## 🎯 使用说明

### 搜索电影

1. 在搜索框输入关键词（支持中英文）
2. 系统会自动搜索标题、原标题和简介
3. 结果会实时更新（300ms 防抖）

### 筛选结果

1. **按类型筛选**：在左侧选择一个或多个类型
2. **按年份筛选**：拖动年份滑块
3. **排序**：选择按评分、年份或标题排序

### 查看详情

点击任意电影卡片查看详细信息，包括：
- 电影海报
- 标题和原标题
- 上映年份
- 评分
- 类型
- 简介

## 🛠️ 开发指南

### 添加更多电影数据

修改 `fetch_movies.py` 中的页数参数：

```python
# 增加每个端点的页数
all_movies += fetch_movies("/movie/popular", pages=10)      # 热门电影
all_movies += fetch_movies("/movie/top_rated", pages=10)    # 高分电影
all_movies += fetch_movies("/trending/movie/week", pages=5) # 本周趋势
```

### 自定义搜索字段权重

修改 `app.py` 中的搜索配置：

```python
query = {
    "multi_match": {
        "query": q,
        "fields": [
            "title^5",           # 标题权重 5
            "original_title^4",  # 原标题权重 4
            "overview^2"         # 简介权重 2
        ]
    }
}
```

### 修改前端样式

前端使用 Tailwind CSS，可以直接在组件中修改类名：

```tsx
// 修改主题色
<div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
```

### 添加新的 API 端点

在 `app.py` 中添加新路由：

```python
@app.route("/movies/<int:movie_id>")
def get_movie(movie_id):
    # 实现获取单个电影详情
    pass
```

## 🐛 常见问题

### Elasticsearch 连接失败

**问题**：`ConnectionError: Connection refused`

**解决方案**：
1. 检查 Elasticsearch 是否正在运行
2. 验证 `.env` 中的 `ES_HOST` 是否正确
3. 确认 `ES_CA_CERT_PATH` 证书路径正确
4. 检查防火墙设置

### TMDB API 请求失败

**问题**：`HTTP 401 Unauthorized`

**解决方案**：
1. 检查 `TMDB_API_KEY` 是否有效
2. 确认 API Key 已激活
3. 注意 API 请求频率限制（每秒最多 4 次）

### 前端无法连接后端

**问题**：`Failed to fetch movies`

**解决方案**：
1. 确认 Flask 服务器正在运行（`http://localhost:5000`）
2. 检查前端 `.env` 中的 `VITE_API_URL`
3. 验证 CORS 配置（已在 `app.py` 中配置）
4. 检查浏览器控制台错误信息

### 端口被占用

**问题**：`Address already in use`

**解决方案**：
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <进程ID> /F

# Linux/Mac
lsof -i :5000
kill -9 <进程ID>
```

或修改 `.env` 中的 `FLASK_PORT`

## 📝 待办事项

- [ ] 添加用户认证和授权
- [ ] 实现电影收藏功能
- [ ] 添加高级搜索选项（演员、导演等）
- [ ] 支持多语言界面切换
- [ ] 添加基于内容的电影推荐
- [ ] 优化移动端响应式设计
- [ ] 添加电影评论功能
- [ ] 实现分页加载
- [ ] 添加搜索历史记录
- [ ] 支持导出搜索结果

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 👨‍💻 作者

**SakuseWen**

- GitHub: [@SakuseWen](https://github.com/SakuseWen)

## 🙏 致谢

- [TMDB](https://www.themoviedb.org/) - 提供丰富的电影数据 API
- [Elasticsearch](https://www.elastic.co/) - 强大的搜索引擎
- [Flask](https://flask.palletsprojects.com/) - 轻量级 Web 框架
- [React](https://react.dev/) - 现代化前端框架
- [Radix UI](https://www.radix-ui.com/) - 无障碍 UI 组件库
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 [Issue](https://github.com/SakuseWen/MovieSearchEngine/issues)
- 发起 [Discussion](https://github.com/SakuseWen/MovieSearchEngine/discussions)

---

⭐ 如果这个项目对你有帮助，请给个 Star！
