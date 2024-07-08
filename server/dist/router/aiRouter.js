"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const protectRoute_1 = require("../middleware/protectRoute");
const aiController_1 = require("../controller/aiController");
const router = (0, express_1.Router)();
router.route("/createAiChat").post(protectRoute_1.protectRoute, aiController_1.createAiChat);
exports.default = router;
