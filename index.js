import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

const app = express();
const port = 3000;

dotenv.config();

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM items");
    items = result.rows;
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: items,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong.");
  }
  
});

app.post("/add", async (req, res) => {
  try {
    const item = req.body.newItem;
    await db.query("INSERT INTO items(title) VALUES($1)", [item]);
    res.redirect("/");
  } catch(err) {
    console.log(err);
    res.status(500).send("Something went wrong.");
  }
  
});

app.post("/edit", async (req, res) => {
  try {
    const title = req.body.updatedItemTitle;
    const id = req.body.updatedItemId;
    await db.query("UPDATE items SET title = $1 WHERE id = $2", [title, id]);
    res.redirect("/");
  } catch(err) {
    console.log(err);
    res.status(500).send("Something went wrong.");
  }
});

app.post("/delete", async (req, res) => {
  try {
    const id = req.body.deleteItemId;
    await db.query("DELETE FROM items WHERE id = $1", [id]);
    res.redirect("/");
  } catch(err) {
    console.log(err);
    res.status(500).send("Something went wrong.");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
