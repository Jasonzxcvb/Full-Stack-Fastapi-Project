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

### Phase 1（Todo CRUD）已完成

- [x] 后端：`main.py`、`api.py`、CORS、`GET /`、`GET /todo`
- [x] 前端：Vite 脚手架、`Header`、Chakra UI、`index.css`
- [x] `Todos.tsx` + fetch 列表
- [x] `POST / PUT / DELETE` 前后端

### 下一步：Phase 2（Docker）

- [ ] 写 `backend/Dockerfile`（先只容器化后端）
- [ ] `docker build -t todo-api ./backend`
- [ ] `docker run -p 8000:8000 todo-api`
- [ ] 用 `docker logs -f <container_id>` 看日志
- [ ] 前端继续本地 `npm run dev`，验证能访问容器里的后端

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
docker run --name todo-api-dev -p 8000:8000 todo-api

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

验证地址：
- 后端文档：`http://localhost:8000/docs`
- Todo 接口：`http://localhost:8000/todo`

## 资源

| 技术 | 链接 |
|------|------|
| FastAPI | [Tutorial](https://fastapi.tiangolo.com/tutorial/) |
| React | [Learn](https://react.dev/learn) |
| Git | [Pro Git 中文版](https://git-scm.com/book/zh/v2) 第 1-3 章 |
| Docker | [Get Started](https://docs.docker.com/get-started/) |
| SQL | [SQLBolt](https://sqlbolt.com/) |
| Redis | [Get Started](https://redis.io/docs/latest/develop/get-started/) |

### Docker 教程（按顺序）

1. [Docker 官方 Get Started](https://docs.docker.com/get-started/)（先熟悉 image/container/build/run）
2. [Dockerfile reference](https://docs.docker.com/reference/dockerfile/)（写 `Dockerfile` 时查指令）
3. [Docker CLI reference](https://docs.docker.com/reference/cli/docker/)（查 `docker build/run/logs/ps` 参数）
4. （可选进阶）[Docker Compose getting started](https://docs.docker.com/compose/gettingstarted/)（Phase 3 再看）

## 日程（约两周，可弹性调整）

1-2 Git · 3-5 Phase 1 · 6-7 Phase 2 · 8-9 Phase 3 · 10 Phase 4 · 11 联调 · 12-14 Git quiz + demo

**不提交**：`node_modules/`、`.venv/`、`dist/`、`.env`
