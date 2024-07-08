import { Router } from "express";
import {
  getAllUser,
  login,
  logout,
  signup,
} from "../controller/userController";
import { protectRoute } from "../middleware/protectRoute";

const router: Router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(protectRoute, logout);

router.route("/getUsers").get(protectRoute, getAllUser);

export default router;
