import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";

const app = express();
app.use(json());

const start = async () => {
  try {
    await mongoose.connect("mongodb://user-stats-mongo-srv:27017/user-stats"); 
    console.log("connected to mongodb")
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log("listening on port 3001");
  });
};

start();
