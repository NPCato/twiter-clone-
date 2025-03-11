import express from "express";
import { deleteNotifications, getNotifications } from "../controllers/notif.controller.js";
import { prtRoute } from "../middleware/prtRoute.js";






const router = express.Router();

router.get("/", prtRoute, getNotifications);
router.delete("/",prtRoute, deleteNotifications);

export default router;