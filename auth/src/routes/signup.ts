import express, { Request, Response, json } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { JSONCodec } from "nats";

import { User } from "../models/user";
import { natsWrapper } from "../nats-wrapper";

import { validateRequest, BadRequestError } from '@mkrbetting/common';

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
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("email is already in use");
    }

    const user = User.build({ email, password });
    await user.save();

    // create a codec
    const jc = JSONCodec();
    //send encoded message to nats as event
    natsWrapper.client.publish("new_user_event", jc.encode(user));

    //generate jwt
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    //store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
