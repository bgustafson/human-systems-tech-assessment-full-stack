# Task Manager — Assessment Scaffold

This is a starting point for the live technical assessment. It's intentionally minimal — a
placeholder backend, frontend, and Postgres database that run and talk to each other, but
with no real task-management functionality yet. Build on top of it however makes sense to you.

## What's here

```
.
├── backend/         Node.js + Express API (placeholder /api/health route, connected to Postgres)
├── frontend/        React + Vite + TypeScript app (placeholder page, calls backend health check)
└── docker-compose.yml   Postgres + backend + frontend
```

Feel free to restructure, swap dependencies, or change languages/frameworks entirely if
you'd rather work in something else — just be ready to explain your choices. The one
requirement: **tasks must be stored in a real database, not in memory.** A Postgres
database is provided (see [The database](#the-database)).

## Option: Run in GitHub Codespaces (no local setup needed)

If your machine isn't set up for local development (Node, Docker, etc.), you
can open this repo directly in a browser-based dev environment instead:

1. On the repo's GitHub page, click **Code → Codespaces → Create codespace on main**
2. Wait for it to build (installs dependencies automatically — usually 1-2 minutes)
3. Open a terminal in the Codespace and run the backend/frontend commands below,
   or `docker compose up --build` — both work the same as they would locally
4. Forwarded ports (4000 for backend, 5173 for frontend) will pop up automatically
   with a preview link

GitHub Copilot is available out of the box in Codespaces. If you use Claude or
ChatGPT via the browser, just open them in a separate tab alongside your
Codespace — works exactly like using them alongside a local editor. If you use
Claude Code, it can be installed directly in the Codespace terminal:
```bash
npm install -g @anthropic-ai/claude-code
```
If you rely on Cursor specifically as your primary editor, let us know ahead
of time so we can figure out the best setup with you.

## The database

`docker-compose.yml` runs Postgres 16:

| | |
|--|--|
| Host / port | `localhost:5432` (`db:5432` from inside the backend container) |
| User / password | `postgres` / `postgres` |
| Database | `tasks` |

The backend reads `DATABASE_URL` and falls back to the values above. The shared connection
pool is in `backend/src/db.js`, and `/api/health` only reports `ok` when the database is
reachable. **No tables are created for you** — designing the schema is part of the task.

Data persists in a Docker volume across restarts. To wipe it and start fresh, run
`docker compose down -v`. To query it directly:
```bash
docker compose exec db psql -U postgres -d tasks
```

## Running it locally (database in Docker)

**Database:**
```bash
docker compose up -d db
```
If you already run Postgres on port 5432, stop it or point `DATABASE_URL` at your own instance.

**Backend:**
```bash
cd backend
npm install
npm run dev
```
Runs on http://localhost:4000

**Frontend (in a separate terminal):**
```bash
cd frontend
npm install
npm run dev
```
Runs on http://localhost:5173 and proxies `/api` calls to the backend.

## Running it with Docker

```bash
docker compose up --build
```
This builds and runs all three services. Frontend on `localhost:5173`, backend on
`localhost:4000`, Postgres on `localhost:5432`.

## The task

Build a small full-stack application that allows users to **create, view, update, delete,
and search tasks**, stored in the database. See the assessment instructions you were given for full details on
format, time limits, and what we're looking for.
