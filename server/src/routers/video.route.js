import express from "express";
import {
    addNew,
    like,
    unlike,
    update,
    getVideo,
    getVideoByID,
    getTrendVideo,
    getSubscribedVideo,
    getVideoByChannelID,
    deleteVideo,
} from "../controllers/video.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

/** PUBLIC */
// get video
router.get("/", getVideo);
// get trending video
router.get("/trend", getTrendVideo);
// get video detail by video id
router.get("/details:id", getVideoByID);
// get all video from channel id
router.get("/channel/:id", getVideoByChannelID);

/** PRIVITE */
router.use(authMiddleware);
// get subscribed video
router.get("/subscibed", getSubscribedVideo);

// new video
router.post("/", addNew);

// update video
router.patch("/:id/update", update);

// delete video
router.delete("/:id", deleteVideo);

// Like a video
router.patch("/:id/like", like);

// Dislike a video
router.patch("/:id/unlike", unlike);

export default router;
