import { Router } from "express";
import {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  toggleTask,
} from "../controllers/task.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { taskValidation, paginateValidation } from "../utils/validation";

const router = Router();

router.use(authenticate);

router.get("/", paginateValidation, getTasks);
router.post("/", taskValidation, createTask);
router.get("/:id", getTaskById);
router.patch("/:id", taskValidation, updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/toggle", toggleTask);

export default router;
