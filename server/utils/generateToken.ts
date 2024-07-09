import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = (userId: any, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "15d",
  });

  res.cookie("jwToken", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    // secure: process.env.SECURE !== "production",
    maxAge: 1000 * 60 * 60 * 24 * 15,
  });
};
