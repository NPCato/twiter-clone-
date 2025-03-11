import express from "express";
import { prtRoute } from "../middleware/prtRoute.js";
import { followUnfollow, getUser, suggestedUser, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:username", prtRoute, getUser);
router.get("/suggested", prtRoute,suggestedUser);
router.post("/follow/:id", prtRoute, followUnfollow);
router.post("/update", prtRoute, updateUser);

export default router;