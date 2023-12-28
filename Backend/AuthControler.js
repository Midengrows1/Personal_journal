import { model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Data from "./models/Data.js";
import multer from "multer";
import fs from "fs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import crypto from "crypto";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { Router } from "express";
import { error, log } from "console";
import { config } from "process";
dotenv.config();
// ------------Start of authorization---------------------------
async function registration(req, res) {
  const { password, email, username } = req.body;
  const existingUser = await User.findOne({ email });
  const existinguserName = await User.findOne({ username });
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: `пользователь ${email} уже зарегистрирован` });
    }
    if (existinguserName) {
      return res
        .status(400)
        .json({ error: `этот username ${username} уже занят` });
    }
    res.status(200).json({ message: `${email} добро пожаловать` });
    return newUser.save();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Введена неверная почта" });
    }
    try {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Введён неверный пароль" });
      }
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        "mysecret123",
        {
          expiresIn: "30d",
        }
      );
      await res.json({ token, userId: user._id });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ошибка при аутентификации: " + error.message });
  }
}
function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "токен не найден" });
  }
  try {
    jwt.verify(token, "mysecret123", (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Неверный токен" });
      }
      req.userId = decoded.userId;
      req.email = decoded.email;
      next();
    });
  } catch (error) {
    res.status(400).json({ error: "токен не верифицирован" });
  }
}
// ------------End of authorization-----------------------------------
const __dirname = dirname(fileURLToPath(import.meta.url));
const uploadDir = path.join(__dirname, "uploads");
try {
  fs.mkdirSync(uploadDir);
} catch (err) {
  if (err.code !== "EEXIST") {
    console.error("Ошибка при создании каталога загрузок:", err);
    // Добавьте логику для обработки ошибки создания каталога
    res.status(500).json({
      error: "Ошибка при создании каталога загрузок",
    });
  }
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
});

function createMemory(req, res) {
  const user = req.userId;
  const newMemory = new Data({
    ...req.body,
    user,
  });
  const relativePath = path.relative(__dirname, req.file.path);
  console.log(relativePath);
  if (req.file) {
    newMemory.image = relativePath;
  }
  newMemory.save();
  try {
    res.json({
      message: "Memory has successfuly created",
    });
  } catch (error) {
    res.json({
      error: "An error ocured" + error.message,
    });
  }
}
async function getMemories(req, res) {
  const user = req.userId;
  const email = req.email;
  const userMemory = await Data.find({ user });
  console.log(email);
  res.json({ memory: userMemory });
}
async function getUser(req, res) {
  const userID = req.userId;
  const foundedUser = await User.findOne({ _id: userID });
  res.json(foundedUser);
}
async function deleteMemory(req, res) {
  try {
    const userID = req.userId;
    const { memoryId } = req.params;
    await Data.findOneAndDelete({
      _id: memoryId,
      user: userID,
    });
    res.status(200).json({ message: "Воспоминание  успешно удалено" });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Ошибка при удалении Воспоминания ` + error.message });
  }
}
// оставим на потом
async function editMemory(req, res) {
  try {
    const userID = req.userId;
    const { memoryId } = req.params;
    const { text, title } = req.body;
    const memory = await Data.findOneAndUpdate(
      { user: userID, _id: memoryId },
      {
        title: title,
        text: text,
      },
      { new: true }
    );
    res.status(200).json({ message: "Memory updated successfully", memory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function searchMemories(req, res) {
  try {
    const userID = req.userId;
    console.log(userID);
    const { searchTerm } = req.query;
    const regex = new RegExp(searchTerm, "i");
    const result = await Data.find({ title: regex, user: userID });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
// востановление пароля
const passwordResetTokens = {};
function generateResetToken() {
  return crypto.randomBytes(20).toString("hex");
}
function forgetPassword(req, res) {
  const { email } = req.body;
  const user = User.find({ email });
  if (!user) {
    return res.status(404).json({ error: "Пользователь не найден" });
  }
  try {
    const resetToken = generateResetToken();
    passwordResetTokens.token = resetToken;
    passwordResetTokens.email = email;
    const transporter = nodemailer
      .createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      })
      .on("log", console.log);
    console.log(process.env.EMAIL_PASSWORD);
    console.log(process.env.EMAIL_USER);
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Сбросс пароля",
      text: `Click on the folfowing link to reset your password  http://localhost:5001/reset-password/${resetToken} `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json(error.message);
      }
      res.json({ message: "Ссылка скинута успешно" });
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
}
async function resetPasswordFunc(req, res) {
  const { token } = req.params;
  if (passwordResetTokens["token"] != token) {
    return res.status(400).json(error.message);
  }
  await res.send(
    ` <form method="post" action="/reset-password"  enctype="application/x-www-form-urlencoded" onsubmit="submitForm(event)">
  <input type="hidden" name="token" value="${token}">
  <label>New Password: <input type="password" name="newPassword"></label>
  <input type="submit" value="Reset Password">
</form>`
  );
  console.log();
}
async function resetPassword(req, res) {
  const { token, newPassword } = req.body;
  console.log(token, newPassword);
  if (!newPassword) {
    return res.status(400).json({ error: "Заполните поле" });
  }
  if (!passwordResetTokens["token"]) {
    return res.status(400).json(error.message);
  }
  const email = await passwordResetTokens["email"];
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.set({ password: hashedPassword });
    await user.save();
    delete passwordResetTokens["token"];
    res.send(`Пароль успешно сохранён`);
    // res.json({ message: "Password reset successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export {
  registration,
  login,
  verifyToken,
  createMemory,
  upload,
  getMemories,
  getUser,
  deleteMemory,
  editMemory,
  searchMemories,
  forgetPassword,
  resetPasswordFunc,
  resetPassword,
};
