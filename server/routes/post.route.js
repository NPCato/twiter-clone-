import express from "express";
import {
	commentOnPost,
	createPost,
	deletePost,
	getAllPosts,
	getFollowingPosts,
	getLikedPosts,
	getUserPosts,
	likeUnlikePost,
} from "../controllers/post.controller.js";
import { prtRoute } from "../middleware/prtRoute.js";




const router = express.Router();

router.get("/all", prtRoute, getAllPosts);
router.get("/following", prtRoute, getFollowingPosts);
router.get("/likes/:id", prtRoute, getLikedPosts);
router.get("/user/:username", prtRoute, getUserPosts);
router.post("/create", prtRoute, createPost);
router.post("/like/:id", prtRoute, likeUnlikePost);
router.post("/comment/:id", prtRoute, commentOnPost);
router.delete("/:id", prtRoute, deletePost);

export default router;