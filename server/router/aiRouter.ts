import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute";
import { createAiChat } from "../controller/aiController";

const router: Router = Router();

router.route("/createAiChat").post(protectRoute, createAiChat);

export default router;
