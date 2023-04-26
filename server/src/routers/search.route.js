import express from "express";
import { searchVideo } from "../controllers/search.controller.js";
const router = express.Router();

router.get("/video", searchVideo);

export default router;
