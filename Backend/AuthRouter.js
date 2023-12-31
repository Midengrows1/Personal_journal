import { Router } from "express";

import {
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
} from "./AuthControler.js";

const router = new Router();

router.post("/registration", registration);
router.post("/login", login);
router.get("/protected", verifyToken);
router.post("/create", verifyToken, upload.single("image"), createMemory);
router.get("/home", verifyToken, getMemories);
router.get("/api/userInfo", verifyToken, getUser);
router.delete("/delete/:memoryId", verifyToken, deleteMemory);
router.patch("/edit/:memoryId", verifyToken, editMemory);
router.get("/memories", verifyToken, searchMemories);
router.post("/forgot-password", forgetPassword);
router.get("/reset-password/:token", resetPasswordFunc);
router.post("/reset-password", resetPassword);
export default router;
