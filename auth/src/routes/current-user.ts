import express from "express";
import jwt from "jsonwebtoken";
import { currentUser } from "../middleware/current-user";

const router = express.Router();

router.get("/api/auth/currentuser", currentUser, (req, res) => {
    res.send({currentUser: req.currentUser})
});

export { router as currentUserRouter };