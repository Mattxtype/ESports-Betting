import express, { Request, Response } from "express";
import { User } from "../models/user";

const router = express.Router();

router.post("/api/auth/signup", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  //(TODO) check if error with fields

  //(TODO) check if email is already registered

  const user = User.build({email, password});
  await user.save();

  console.log(User.find());

  res.status(201).send({ email, password });
});

export { router as signupRouter };
