import { Router } from "express";
import {
  registerUser,
  loginUser,
  refreshTokenHandler,
  logoutUser,
} from "../controllers/auth.controller";
import { registerValidation, loginValidation } from "../utils/validation";

const router = Router();

router.post("/register", registerValidation, registerUser);
router.post("/login", loginValidation, loginUser);
router.post("/refresh", refreshTokenHandler);
router.post("/logout", logoutUser);

export default router;
