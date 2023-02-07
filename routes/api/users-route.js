import { Router } from "express";
const router = Router();
import { config } from "dotenv";
import { authMiddleWare } from "../../middleware/auth-middleware";

import {
  userLogin,
  getAllUsers,
  getOneUser,
  updateUserBalance,
  createUser,
} from "../../controllers/users-controller";

config();

//create user
router.post("/", createUser);

router.post("/login", userLogin);

//get all users
router.get("/", authMiddleWare, getAllUsers);

router.get("/account/:username", authMiddleWare, getOneUser);

//update checking/savings
router.put("/transactions", authMiddleWare, updateUserBalance);

export default router;
