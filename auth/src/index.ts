import express from "express";
import { json } from "body-parser";
import { signupRouter } from "./routes/signup";

const app = express();
app.use(json());

app.use(signupRouter);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
