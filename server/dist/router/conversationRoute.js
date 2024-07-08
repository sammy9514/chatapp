"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const conversationController_1 = require("../controller/conversationController");
const protectRoute_1 = require("../middleware/protectRoute");
const router = (0, express_1.Router)();
router.route("/send-message/:id").post(protectRoute_1.protectRoute, conversationController_1.sendMessage);
router.route("/get-message/:id").get(protectRoute_1.protectRoute, conversationController_1.getMessage);
exports.default = router;
