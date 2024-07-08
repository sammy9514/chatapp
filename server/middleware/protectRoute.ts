import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel";

export const protectRoute = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwToken;

    if (!token) {
      return res.status(401).json({
        message: "token not found",
      });
    }

    const decode: any = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decode) {
      return res.status(401).json({
        message: "unauthorized token",
      });
    }

    const user = await userModel.findById(decode.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "user not found",
      });
    }
    // console.log("user", user);

    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({
      error: "error in protect route",
    });
  }
};
