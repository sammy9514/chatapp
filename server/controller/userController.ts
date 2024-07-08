import { Request, Response } from "express";
import userModel from "../model/userModel";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, userName, password, gender } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const maleAvatar = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const femaleAvatar = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const user = await userModel.create({
      name,
      userName,
      password: hashedPassword,
      gender,
      avatar: gender === "male" ? maleAvatar : femaleAvatar,
    });

    generateToken(user._id, res);

    return res.status(201).json({
      message: "user created",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "error in signup",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;
    const findUser = await userModel.findOne({ userName });

    if (!findUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const comparePassword = await bcrypt.compare(password, findUser.password);
    if (!comparePassword) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    generateToken(findUser?._id, res);

    return res.status(200).json({
      message: "Logged in",
      data: findUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in login",
    });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.cookie("jwToken", "", {
      maxAge: 0,
    });

    return res.status(200).json({ message: "logged out" });
  } catch (error) {
    res.status(500).json({
      message: "failed to logout",
    });
  }
};

export const getAllUser = async (req: any, res: Response) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await userModel
      .find({
        _id: { $ne: loggedInUserId },
      })
      .select("-password");

    return res.status(200).json(filteredUsers);
  } catch (error: any) {
    //console.error("Error in getUsersForSidebar: ", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
