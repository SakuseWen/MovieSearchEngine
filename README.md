# 🎬 Movie Search Engine

一个基于 Elasticsearch 的电影搜索引擎，提供强大的全文搜索功能和现代化的 Web 界面。

## ✨ 功能特性

- 🔍 全文搜索：支持电影标题、原标题和简介的多字段搜索
- 🎯 智能过滤：按类型、年份、评分等条件筛选
- 📊 多种排序：支持按评分、年份、标题排序
- 🎨 现代化 UI：使用 React + TypeScript + Tailwind CSS 构建
- ⚡ 高性能：基于 Elasticsearch 的快速搜索引擎
- 🌐 RESTful API：Flask 后端提供标准 API 接口

## 🏗️ 技术栈

### 后端
- Python 3.x
- Flask - Web 框架
- Elasticsearch 9.x - 搜索引擎
- TMDB API - 电影数据源

### 前端
- React 18
- TypeScript
- Vite - 构建工具
- Tailwind CSS - 样式框架
- Radix UI - UI 组件库
- Lucide React - 图标库

## 📋 前置要求

- Python 3.8+
- Node.js 16+
- Elasticsearch 9.x
- TMDB API Key（从 [TMDB](https://www.themoviedb.org/settings/api) 获取）

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/SakuseWen/MovieSearchEngine.git
cd MovieSearchEngine
```

### 2. 配置环境变量

复制环境变量模板并填入你的配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件，填入以下信息：

```env
# Elasticsearch 配置
ES_HOST=https://localhost:9200
ES_USER=elastic
ES_PASSWORD=your_elasticsearch_password
ES_CA_CERT_PATH=path/to/your/http_ca.crt

# TMDB API 密钥
TMDB_API_KEY=your_tmdb_api_key

# Flask 配置
FLASK_DEBUG=True
FLASK_PORT=5000
```

### 3. 安装后端依赖

```bash
pip install -r requirements.txt
```

### 4. 启动 Elasticsearch

确保 Elasticsearch 已安装并运行在 `https://localhost:9200`

Windows 用户可以使用：
```bash
start_elasticsearch.bat
```

或手动启动：
```bash
cd path/to/elasticsearch
bin/elasticsearch.bat
```

### 5. 获取并索引电影数据

```bash
# 从 TMDB 获取电影数据
python fetch_movies.py

# 将数据索引到 Elasticsearch
python index_movies.py
```

### 6. 启动后端 API

```bash
python app.py
```

或使用批处理文件：
```bash
start_flask.bat
```

API 将运行在 `http://localhost:5000`

### 7. 安装并启动前端

```bash
cd "电影搜索引擎网页 (1)"
npm install
npm run dev
```

前端将运行在 `http://localhost:3000`

## 📡 API 接口

### 搜索电影

```http
GET /search?q=<query>
```

**参数：**
- `q` (可选): 搜索关键词

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

## 📁 项目结构

```
MovieSearchEngine/
├── app.py                      # Flask API 服务器
├── fetch_movies.py             # 从 TMDB 获取电影数据
├── index_movies.py             # 将数据索引到 Elasticsearch
├── config.py                   # 配置文件
├── requirements.txt            # Python 依赖
├── .env.example               # 环境变量模板
├── movies.json                # 电影数据文件
├── start_flask.bat            # 启动 Flask 脚本
├── start_elasticsearch.bat    # 启动 Elasticsearch 脚本
├── start_kibana.bat          # 启动 Kibana 脚本
└── 电影搜索引擎网页 (1)/      # 前端项目
    ├── src/
    │   ├── App.tsx            # 主应用组件
    │   ├── components/        # React 组件
    │   └── styles/           # 样式文件
    ├── package.json
    └── vite.config.ts
```

## 🔧 配置说明

### Elasticsearch 配置

确保 Elasticsearch 配置了以下设置：

1. 启用 HTTPS
2. 配置用户认证
3. 生成 CA 证书（`http_ca.crt`）

### TMDB API

1. 访问 [TMDB](https://www.themoviedb.org/)
2. 注册账号
3. 在设置中申请 API Key
4. 将 API Key 添加到 `.env` 文件

## 🎯 使用说明

1. **搜索电影**：在搜索框输入关键词，支持中英文
2. **筛选结果**：使用左侧过滤器按类型、年份筛选
3. **排序**：选择按评分、年份或标题排序
4. **查看详情**：点击电影卡片查看详细信息

## 🛠️ 开发

### 添加更多电影数据

修改 `fetch_movies.py` 中的页数参数：

```python
all_movies += fetch_movies("/movie/popular", pages=10)  # 增加页数
```

### 自定义搜索字段

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

## 🐛 常见问题

### Elasticsearch 连接失败

- 检查 Elasticsearch 是否正在运行
- 验证 `.env` 中的连接信息是否正确
- 确认 CA 证书路径正确

### TMDB API 请求失败

- 检查 API Key 是否有效
- 确认网络连接正常
- 注意 API 请求频率限制

### 前端无法连接后端

- 确认 Flask 服务器正在运行
- 检查 CORS 配置
- 验证端口是否被占用

## 📝 待办事项

- [ ] 添加用户认证功能
- [ ] 实现电影收藏功能
- [ ] 添加高级搜索选项
- [ ] 支持多语言界面
- [ ] 添加电影推荐功能
- [ ] 优化移动端体验

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 👨‍💻 作者

SakuseWen

## 🙏 致谢

- [TMDB](https://www.themoviedb.org/) - 提供电影数据
- [Elasticsearch](https://www.elastic.co/) - 搜索引擎
- [Radix UI](https://www.radix-ui.com/) - UI 组件库
