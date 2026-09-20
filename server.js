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

app.listen(3001, () => {
  console.log("サーバー起動: http://localhost:3001");
});