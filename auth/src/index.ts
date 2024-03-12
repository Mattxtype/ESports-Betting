import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import { signupRouter } from "./routes/signup";

const app = express();
app.use(json());

app.use(signupRouter);

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth"); //Auth is the database name
    console.log("connected to mongodb")
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
};

start();
