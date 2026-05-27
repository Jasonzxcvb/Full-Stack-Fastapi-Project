# Full-Stack-Project — 入职学习项目

> 跟教程手写代码，AI 只帮改 bug 和解释，不写业务代码。

Leader 要求：**Git**（1-2 周 quiz）、**FastAPI**、**React**、**Docker**、**SQL**、**Redis**。  
最终交付：简易**订单系统**（Todo 教程 → Docker → PostgreSQL Order → Redis）。

## 学习路线

| 阶段 | 做什么 |
|------|--------|
| **1** | [TestDriven.io 教程](https://testdriven.io/blog/fastapi-react/#setting-up-fastapi)：本地 Todo CRUD，内存假数据 |
| **2** | 后端单容器 Docker：Dockerfile、build、run、端口映射、`docker logs` |
| **3** | PostgreSQL：SQL / 表结构 / CRUD；Todo 改 Order（`/orders`） |
| **4** | Redis：列表缓存（TTL + 写后删）、访问计数等临时状态 |

## AI 协作

| 你做 | AI 帮 |
|------|-------|
| 手写全部代码 | 解释代码、定位 bug |
| 读官方文档 | 概念问题（CORS、useEffect 等） |
| Git commit | **不**写 CRUD、**不**搭 docker-compose |

## 当前进度

### 技术掌握状态（截至目前）

- [x] FastAPI：已用于项目后端（路由、分层结构、接口调试）
- [x] React：已用于项目前端（组件、状态、调用后端接口）
- [x] Docker：已完成后端镜像化与容器运行排错
- [x] SQL / PostgreSQL：已完成建表与基础 CRUD 验证，并接入后端
- [ ] Redis：尚未开始（下一阶段）
- [~] Git：持续练习中，预计 1-2 周后准备 quiz

### Phase 1（Todo CRUD）已完成

- [x] 后端：`main.py`、`api.py`、CORS、`GET /`、`GET /todo`
- [x] 前端：Vite 脚手架、`Header`、Chakra UI、`index.css`
- [x] `Todos.tsx` + fetch 列表
- [x] `POST / PUT / DELETE` 前后端

### Phase 2（Docker）已完成

- [x] 写 `backend/Dockerfile`（先只容器化后端）
- [x] `docker build -t todo-api ./backend`
- [x] `docker run -p 8000:8000 todo-api`
- [x] 用 `docker logs -f <container_id>` 看日志
- [x] 前端继续本地 `npm run dev`，验证能访问容器里的后端

### Phase 3（PostgreSQL）进度（推荐顺序）

- [x] 1) 先把 PostgreSQL 跑起来（本机或容器）
- [x] 2) SQL 层完成：建表 + 手动验证 `SELECT/INSERT/UPDATE/DELETE`
- [x] 3) 后端接数据库（`/orders` 路由可用）
- [x] 4) 前端改为 `/orders` 和订单字段（`product_name`、`quantity`、`status`）
- [x] 5) 拆后端结构：`routers/`、`models/`、`db/`

### 下一步（Phase 4：Redis）

- [ ] 先做 `GET /orders` 缓存（TTL 60s）
- [ ] 写操作后清理缓存 key（POST/PATCH/DELETE）
- [ ] 增加一个简单访问计数（`INCR`）

源码参考：[fastapi-react repo](https://github.com/testdrivenio/fastapi-react)（只看结构）

## 后续阶段要点

**Phase 2** — 写 `backend/Dockerfile`，`docker build -t todo-api .`，`docker run -p 8000:8000`；前端仍 `npm run dev`。不做 compose / DB / Redis。

**Phase 3** — `/orders` CRUD + SQLAlchemy；拆 `routers/`、`models/`、`db/`；此处加 PostgreSQL 容器。字段：`product_name`、`quantity`、`status`。

**Phase 4** — `GET /orders` Redis 缓存；`INCR` 访问计数；`docker-compose` 编排 backend + postgres + redis。

## 启动（Phase 1）

```bash
# 终端 1 — 后端
cd backend && source .venv/bin/activate && python3 main.py
# → http://localhost:8000/docs

# 终端 2 — 前端
cd frontend && npm run dev
# → http://localhost:5173
```

## 启动（Phase 2：Docker 后端单容器）

> `docker build` 建议在项目根目录执行；其余命令在任意目录都可以执行。

```bash
# 1) 构建镜像（把 backend 打包成镜像）
docker build -t todo-api ./backend

# 2) 运行容器（把容器的 8000 端口映射到宿主机 8000）
docker run -d --name todo-api-dev -p 8000:8000 todo-api

# 3) 查看正在运行的容器（确认容器状态）
docker ps

# 4) 查看容器日志（排查报错/确认服务启动）
docker logs -f todo-api-dev

# 5) 停止容器（结束运行）
docker stop todo-api-dev

# 6) 删除容器（清理环境，方便重跑）
docker rm todo-api-dev

# 7) 查看本机镜像（确认 todo-api 是否存在）
docker images

# 8) 删除镜像（需要从零重建时使用）
docker rmi todo-api

# 9) 从已有容器重新启动并附着日志
docker start -a todo-api-dev
```

## 启动（Phase 3：PostgreSQL，使用 Docker）

```bash
# 1) 启动 PostgreSQL 容器（创建数据库 order_app）
docker run --name order-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=order_app \
  -p 5432:5432 \
  -d postgres:16

# 2) 检查容器是否在运行
docker ps

# 3) 进入 PostgreSQL 命令行（psql）
docker exec -it order-postgres psql -U postgres -d order_app
```

常用维护命令：

```bash
# 停止/启动/删除 PostgreSQL 容器
docker stop order-postgres
docker start order-postgres
docker rm -f order-postgres
```