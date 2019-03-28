import express from "express";
import createRouter from "./router";

var app = express();
app.use(express.json());
app.use(createRouter());
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Start on Port ${PORT}`);
});
module.exports = { server };
