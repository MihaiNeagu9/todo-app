import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;

const { Pool } = pg;

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  max: 10,
  idleTimeoutMillis: 30_000,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

function normalizeTitle(value) {
  const title = String(value ?? "").trim();
  if (!title) return null;
  if (title.length > 200) return null;
  return title;
}

function parseId(value) {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) return null;
  return id;
}

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT id, title FROM items ORDER BY id DESC");
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: result.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong.");
  }
  
});

app.post("/add", async (req, res) => {
  try {
    const title = normalizeTitle(req.body.newItem);
    if (!title) return res.status(400).send("Invalid title.");

    await db.query("INSERT INTO items(title) VALUES($1)", [title]);
    res.redirect("/");
  } catch(err) {
    console.log(err);
    res.status(500).send("Something went wrong.");
  }
  
});

app.post("/edit", async (req, res) => {
  try {
    const title = normalizeTitle(req.body.updatedItemTitle);
    const id = parseId(req.body.updatedItemId);
    if (!title || !id) return res.status(400).send("Invalid date.");

    const result = await db.query("UPDATE items SET title = $1 WHERE id = $2 RETURNING id", [title, id]);
    if (result.rowCount === 0) return res.status(404).send("Item not found.");
    res.redirect("/");
  } catch(err) {
    console.log(err);
    res.status(500).send("Something went wrong.");
  }
});

app.post("/delete", async (req, res) => {
  try {
    const id = parseId(req.body.deleteItemId);
    if (!id) return res.status(400).send("Invalid ID.");

    const result = await db.query("DELETE FROM items WHERE id = $1 RETURNING id", [id]);
    res.redirect("/");
  } catch(err) {
    console.log(err);
    res.status(500).send("Something went wrong.");
  }
});

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Shutdown
async function shutdown(signal) {
  console.log(`\nReceived ${signal}. Shutting down...`);
  server.close(async () => {
    try {
      await db.end();
      console.log("DB pool closed. Bye!");
      process.exit(0);
    } catch (err) {
      console.error("Error closing pool:", err);
      process.exit(1);
    }
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
