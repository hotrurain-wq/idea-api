const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let ideas = [];

// 一覧取得
app.get("/ideas", (req, res) => {
  res.json(ideas);
});

// 新規保存
app.post("/ideas", (req, res) => {
  const newIdea = {
    ...req.body,
    id: Date.now() + Math.random().toString(16).slice(2),
    createdAt: new Date(),
  };
  ideas = [newIdea, ...ideas];
  res.json(newIdea);
});

// 編集
app.put("/ideas/:id", (req, res) => {
  const index = ideas.findIndex((i) => i.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "not found" });
  }
  ideas[index] = {
    ...ideas[index],
    ...req.body,
    id: ideas[index].id,
    createdAt: ideas[index].createdAt,
  };
  res.json(ideas[index]);
});

// 削除
app.delete("/ideas/:id", (req, res) => {
  const before = ideas.length;
  ideas = ideas.filter((i) => i.id !== req.params.id);
  if (ideas.length === before) {
    return res.status(404).json({ error: "not found" });
  }
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`サーバー起動: ${PORT}`);
});