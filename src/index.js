import express from "express";
import app from "./app.js";

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Hello from Server");
});

app.listen(PORT, () => {
  console.log(`App Running on PORT:${PORT}`);
});
