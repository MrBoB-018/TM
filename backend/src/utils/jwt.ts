import jwt from "jsonwebtoken";

export const generateAccessToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  });
};

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as any;
  } catch {
    return null;
  }
};
