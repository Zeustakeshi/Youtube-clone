import express from "express";
import {
    login,
    register,
    subscribe,
    unSubscribe,
    update,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Update
router.patch("/update", authMiddleware, update);

// Subscribe a Channel
router.patch("/sub/:id", authMiddleware, subscribe);

// Unsubscribe a Channel
router.patch("/unsub/:id", authMiddleware, unSubscribe);

export default router;
