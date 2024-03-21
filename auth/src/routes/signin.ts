import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { validateRequest } from "../middleware/validate-request";

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
});

export { router as signinRouter };
