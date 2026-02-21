import { body, query } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const handleErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.warn("Validation failed for", req.path, req.body, errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const registerValidation = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  handleErrors,
];

export const loginValidation = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").exists().withMessage("Password required"),
  handleErrors,
];

export const taskValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").optional().isString(),
  body("status").optional().isIn(["PENDING", "COMPLETED"]),
  handleErrors,
];

export const paginateValidation = [
  query("page").optional().isInt({ min: 1 }).toInt(),
  query("limit").optional().isInt({ min: 1 }).toInt(),
  query("status").optional().isIn(["PENDING", "COMPLETED"]),
  query("search").optional().isString(),
  handleErrors,
];
