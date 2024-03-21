import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import { User } from "../models/user";

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
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      //(TODO) Print actually errors out in custom error class
      throw new Error();
    }
  
    const { email, password } = req.body;

    //(TODO) check if email is already registered

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
