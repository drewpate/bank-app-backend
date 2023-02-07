const express = require("express");
const router = express.queryRouter();
const dotenv = require("dotenv");
import { authMiddleWare } from "../../middleware/auth-middleware";

import {
  userLogin,
  getAllUsers,
  getOneUser,
  updateUserBalance,
  createUser,
} from "../../controllers/users-controller";

dotenv.config();

//create user
router.post("/", createUser);

router.post("/login", userLogin);

//get all users
router.get("/", authMiddleWare, getAllUsers);

router.get("/account/:username", authMiddleWare, getOneUser);

//update checking/savings
router.put("/transactions", authMiddleWare, updateUserBalance);

export default router;
