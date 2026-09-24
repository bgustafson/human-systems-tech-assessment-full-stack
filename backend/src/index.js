import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// TODO(candidate): This is a placeholder. Replace/extend with real
// task routes: create, list, get one, update, delete, search.
// Tasks must be stored in Postgres via `pool` (see db.js) — no tables
// exist yet; designing the schema is part of the task.
app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok" });
  } catch (err) {
    res.status(503).json({ status: "database unavailable", error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
