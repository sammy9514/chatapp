import { Router } from "express";
import { getMessage, sendMessage } from "../controller/conversationController";
import { protectRoute } from "../middleware/protectRoute";

const router: Router = Router();

router.route("/send-message/:id").post(protectRoute, sendMessage);
router.route("/get-message/:id").get(protectRoute, getMessage);

export default router;
