import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { validateRequest } from "../middleware/validate-request";
import { User } from "../models/user";

const router = express.Router();

router.post("/api/auth/signin",[
    body('email')
    .isEmail()
    .withMessage('Email must be valid'),
    body('password')
    .trim()
    .notEmpty()
    .withMessage('You must supply a password')
],
validateRequest, 
async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({email});
    if(!existingUser) {
        throw new Error("Login request failed");
    }
});

export { router as signinRouter };
