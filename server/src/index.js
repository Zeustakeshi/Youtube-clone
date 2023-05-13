import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import connectDB from "./configs/db.config.js";
import userRouter from "./routers/user.route.js";
import videoRouter from "./routers/video.route.js";
import commentRouter from "./routers/comment.route.js";
import searchRouter from "./routers/search.route.js";

const app = express();
dotenv.config();
connectDB();

// middleware
app.use(cookieParser());
app.use(helmet());
app.use(cors({ credentials: true, origin: process.env.ORIGIN_URL }));
// app.use(cors());
app.use(express.json());

// routes
app.use("/api/user", userRouter);
app.use("/api/video", videoRouter);
app.use("/api/comment", commentRouter);
app.use("/api/search", searchRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Server youtube-clone is runing is port " + PORT);
});
