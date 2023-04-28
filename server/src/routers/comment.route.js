import express from "express";
import {
    addNew,
    deleteComment,
    getComment,
} from "../controllers/comment.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

// Get comment
router.get("/:videoID", getComment);

// apply middleware
router.use(authMiddleware);

// New comment
router.post("/", addNew);

// Delete comment
router.delete("/", deleteComment);

// Like comment

export default router;
