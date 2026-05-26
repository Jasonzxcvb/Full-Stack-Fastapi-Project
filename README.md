# Full-Stack-Project — 入职学习项目

> 重装系统后从零开始。跟教程手写代码，AI 只帮改 bug 和解释，不写业务代码。

## 目标

Leader 要求掌握：**Git**（1-2 周后有 quiz）、**FastAPI**（后端）、**React**（前端）、**Redis**、**Docker**、**SQL**。

最终交付：一个简易**订单系统**，在 TestDriven.io Todo CRUD 教程基础上扩展 PostgreSQL + Redis + Docker。

---

## 与 AI 的协作约定

| 你做 | AI 帮 |
|------|-------|
| 跟教程手写全部代码 | 解释某段代码在干什么 |
| 自己加 SQL / Redis / Docker | 定位 bug、看报错、给修改方向 |
| 读官方文档 | 回答概念问题（CORS、useEffect 等） |
| Git commit / push / 分支 | **不**生成骨架、**不**写 CRUD、**不**替你搭 docker-compose |

**卡住时**：贴完整报错 + 你写的相关代码片段来问。

---

## Phase 1：跟 TestDriven.io 教程（Day 3-5）

**教程**：[Developing a Single Page App with FastAPI and React](https://testdriven.io/blog/fastapi-react/)

- [x] Day 3：后端 setup（`main.py`、`api.py`、CORS、`GET /`）
- [ ] Day 3：后端 `GET /todo`
- [x] Day 4：前端 Vite + React 脚手架（`npm run dev` 可跑）
- [ ] Day 4：`Header` 组件 + `useEffect` 拉列表 + `POST /todo`
- [ ] Day 5：完成 `PUT` / `DELETE` + 前端 Update/Delete 组件

每完成一个路由就 `git commit` 一次。

教程源码参考：[fastapi-react repo](https://github.com/testdrivenio/fastapi-react)（只看结构，代码自己写）

---

## Phase 2：扩展为订单系统（Day 6-11）

教程跑通后，**在同一个项目上改**，不要另起项目：

| 任务 | 说明 |
|------|------|
| Todo → Order | `/todo` 改 `/orders`；字段：`product_name`、`quantity`、`status` |
| PostgreSQL | 内存 list 换成 SQLAlchemy；`dict` 换成 Pydantic model |
| Redis | `GET /orders` 加缓存（TTL 60s）；写操作后删缓存 |
| Docker | `docker-compose.yml`：postgres + redis + backend |
| 项目结构 | 拆 `routers/`、`models/`、`db/`（见 FastAPI Bigger Applications） |

### 目标 API

| 方法 | 路径 | 作用 |
|------|------|------|
| GET | `/orders` | 列表（Redis 缓存） |
| GET | `/orders/{id}` | 详情 |
| POST | `/orders` | 创建 |
| PATCH | `/orders/{id}/status` | 更新状态 |

### 建表示例

```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  quantity INT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

- [ ] Day 6：Todo → Order + PostgreSQL
- [ ] Day 7：拆项目结构 + 前端字段对齐
- [ ] Day 8：Redis 缓存
- [ ] Day 9：Docker Compose
- [ ] Day 10：前端 loading/error + 状态展示
- [ ] Day 11：全流程自测 + **在下方「项目启动」区自己写启动命令**

---

## Git 学习（Day 1-2，quiz 重点）

- 资源：[Pro Git 中文版](https://git-scm.com/book/zh/v2) 第 1-3 章
- [ ] Day 1：`git init` → `add` → `commit` → `push` 到 GitHub
- [ ] Day 2：分支、merge、冲突解决

### Git Quiz 自测清单

- [ ] `git init` / `clone` / `remote -v`
- [ ] 工作区 vs 暂存区 vs 仓库（`status` 看懂每一行）
- [ ] `add`、`commit`、`log`、`diff`、`show`
- [ ] `.gitignore` 忽略 `node_modules/`、`__pycache__/`、`.env`
- [ ] 创建分支、切换分支、merge、删除分支
- [ ] 解决 merge conflict
- [ ] `pull` vs `fetch` 区别
- [ ] 撤销：`checkout -- file`、`reset --soft`
- [ ] 读懂 `git log --oneline --graph --all`

---

## 官方文档（Leader 要求必读）

### FastAPI

- [Tutorial - User Guide](https://fastapi.tiangolo.com/tutorial/)
- 重点：Request Body、SQL Databases、Bigger Applications、CORS

### React

- [React Learn](https://react.dev/learn)
- 重点：UI、Interactivity、Managing State、Synchronizing with Effects

### 其他

| 技术 | 资源 |
|------|------|
| SQL | [SQLBolt](https://sqlbolt.com/) 或 [PostgreSQL Tutorial](https://www.postgresqltutorial.com/) |
| Redis | [Redis Get Started](https://redis.io/docs/latest/develop/get-started/) |
| Docker | [Docker Get Started](https://docs.docker.com/get-started/) |
| Git | [Pro Git 中文版](https://git-scm.com/book/zh/v2) |

---

## 两周日程（每天 5h+）

| 天 | 内容 |
|----|------|
| 1 | Git 基础 + 初始化仓库 |
| 2 | Git 分支 + merge |
| 3-5 | TestDriven.io 教程 Todo CRUD |
| 6 | Order + PostgreSQL |
| 7 | 项目结构 + Git quiz 模拟 |
| 8 | Redis 缓存 |
| 9 | Docker Compose |
| 10 | 前端完善 |
| 11 | 全栈联调 + 更新本 README 启动说明 |
| 12 | Git 进阶（fetch/rebase） |
| 13 | 查漏补缺 + 重读文档 |
| 14 | Git Quiz 冲刺 + 5 分钟 demo 准备 |

---

## MERN → 本栈对照

| MERN | 本项目 |
|------|--------|
| Express 路由 | FastAPI `@app.get/post` + `APIRouter` |
| Mongoose Model | SQLAlchemy ORM + Pydantic Schema |
| MongoDB | PostgreSQL |
| axios/fetch | React 里 `fetch` |
| npm / CRA | npm / Vite |
| — | Redis（缓存） |
| — | Docker Compose |

---

## 参考项目（只看架构，不复制）

- [niki-warehouse-app](https://github.com/johnnyflores/niki-warehouse-app) — 有 orders API
- [microservices-fastapi-fullStack-app](https://github.com/yanliu1111/microservices-fastapi-fullStack-app) — 电商结构

---

## 项目结构

```
Full-Stack-Project/
├── backend/
│   ├── main.py              # 启动 uvicorn
│   ├── app/
│   │   └── api.py           # FastAPI 路由
│   └── .venv/               # Python 虚拟环境（不提交）
├── frontend/
│   ├── src/                 # React 源码
│   ├── package.json
│   └── vite.config.ts
├── .gitignore
├── pyrightconfig.json
└── README.md
```

## 项目启动（当前 Phase 1）

**终端 1 — 后端**

```bash
cd backend
source .venv/bin/activate
python3 main.py
```

- API：http://localhost:8000
- 文档：http://localhost:8000/docs

**终端 2 — 前端**

```bash
cd frontend
npm run dev
```

- 页面：http://localhost:5173

> Phase 2 接入 Docker 后，在这里补充 `docker compose up` 说明。

---

## Git 提交说明

**应提交：** 源码、`package.json`、`package-lock.json`、配置文件  
**不提交：** `node_modules/`、`backend/.venv/`、`frontend/dist/`、`.env`（已在根目录 `.gitignore` 配置）

---

## 进度追踪

- [x] 后端初始 commit（FastAPI + CORS + `/`）
- [x] 前端 Vite 脚手架可运行
- [ ] Phase 1 教程全部跑通
- [ ] Phase 2 PostgreSQL 接入
- [ ] Phase 2 Redis 缓存
- [ ] Phase 2 Docker Compose
- [ ] Git quiz 自测通过
- [ ] 能给 leader 做 5 分钟 demo
