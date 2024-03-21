import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post("/api/auth/signin",[
    body('email')
    .isEmail()
    .withMessage('Email must be valid'),
    body('password')
    .trim()
    .notEmpty()
    .withMessage('You must supply a password')
], async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        throw new Error('error with email or password');
    }
});

export { router as signinRouter };
