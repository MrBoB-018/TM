import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../config/prisma";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Register request body:", req.body);
    const { email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      console.warn("Attempt to register existing user", email);
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({ accessToken });
  } catch (error) {
    next(error);
  }
};

export const refreshTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token)
      return res.status(401).json({ message: "Refresh token required" });

    const payload = verifyRefreshToken(token);
    if (!payload)
      return res.status(403).json({ message: "Invalid refresh token" });

    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user || user.refreshToken !== token)
      return res.status(403).json({ message: "Invalid refresh token" });

    const newAccessToken = generateAccessToken(user.id);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.body.userId;
    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });

    res
      .clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};
