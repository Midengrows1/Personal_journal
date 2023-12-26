import express from "express";
import mongoose from "mongoose";
import { log } from "console";
import cors from "cors";
import AuthRouter from "./AuthRouter.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 5001;
const mongoUrl = `mongodb+srv://amirm1dengrows777:KLC16qSj0Y264CFM@cluster0.xwp6sil.mongodb.net/Myjournal?retryWrites=true&w=majority`;
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Conection to Db is ok");
  })
  .catch(() => {
    console.log("Connection to Db is failed");
  });
app.use(
  cors({
    origin: "*",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], // Добавляем 'Authorization' в список разрешенных заголовков
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/auth", AuthRouter);
app.use(AuthRouter);
app.use("/uploads", express.static("uploads"));
app.listen(port, () => {
  console.log(`server started in http://localhost:${port} `);
});
