import pg from "pg";

// Shared Postgres connection pool. docker-compose sets DATABASE_URL; the
// fallback matches the compose `db` service when the backend runs outside Docker.
export const pool = new pg.Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://postgres:postgres@localhost:5432/tasks",
});

// Without a listener, an idle connection dropping (e.g. the db restarting)
// crashes the whole Node process.
pool.on("error", (err) => console.error("Postgres pool error:", err.message));
