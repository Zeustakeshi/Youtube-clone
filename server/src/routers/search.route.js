import express from "express";
import { searchVideo } from "../controllers/search.controller.js";
import searchService from "../services/search.service.js";
import { nonAccentVietnamese } from "../utils/nonAccentVietnamese.js";
const router = express.Router();

router.get("/video", searchVideo);

export default router;
