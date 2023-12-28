import express from "express";
import mongoose from "mongoose";
import { log } from "console";
import cors from "cors";
import AuthRouter from "./AuthRouter.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 5001;
const mongoUrl = process.env.MONGO_DB;
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
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], // Добавляем 'Authorization' в список разрешенных заголовков
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
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
