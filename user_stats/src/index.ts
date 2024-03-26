import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import { natsWrapper } from "../nats-wrapper";
import { newUserEvent } from "./events/new_user_subscribe";

const app = express();
app.use(json());

const start = async () => {
  try {
    await mongoose.connect("mongodb://user-stats-mongo-srv:27017/user-stats"); 
    console.log("connected to mongodb")
  } catch (err) {
    console.log(err);
  }

  await natsWrapper.newConnection("nats://nats:4222")

  await newUserEvent();

  app.listen(3001, () => {
    console.log("listening on port 3001");
  });
};

start();
