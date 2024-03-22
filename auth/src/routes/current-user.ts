import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();

router.get("/api/auth/currentuser", currentUser, requireAuth, (req, res) => {
    res.send({currentUser: req.currentUser})
});

export { router as currentUserRouter };