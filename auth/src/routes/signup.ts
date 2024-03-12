import express from "express";

const router = express.Router();

router.post("/api/auth/signup", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  res.status(201).send({ email, password });
});

export { router as signupRouter };
