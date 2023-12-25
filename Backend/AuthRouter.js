import { Router } from "express";

import {
  registration,
  login,
  verifyToken,
  createMemory,
  upload,
} from "./AuthControler.js";

const router = new Router();

router.post("/registration", registration);
router.post("/login", login);
router.get("/protected", verifyToken);
router.post("/create", upload.single("image"), createMemory);
export default router;
