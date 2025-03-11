import express from "express";
import { prtRoute } from "../middleware/prtRoute.js";
import { login,getMe,signup,logout } from "../controllers/auth.controller.js";




const router = express.Router();

router.get("/me", prtRoute, getMe);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;