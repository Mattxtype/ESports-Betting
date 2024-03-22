import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import { User } from "../models/user";
import { validateRequest } from "../middleware/validate-request";

const router = express.Router();

router.post(
  "/api/auth/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"), //If no email or wrong email then return this message
    body("password")
      .trim() //eliminate leading and trailing 0's
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be betwveen 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    //check if user is existing
    const existingUser = await User.findOne({email})

    if(existingUser) {
      throw new Error("email is already in use");
    }

    const user = User.build({ email, password });
    await user.save();

    //generate jwt
    const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    }, 
    process.env.JWT_KEY!);

    //store it on session object
    req.session = {
      jwt: userJwt
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
