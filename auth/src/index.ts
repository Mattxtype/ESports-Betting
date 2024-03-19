import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth"); //Auth is the database name
    console.log("connected to mongodb")
  } catch (err) {
    console.log(err);
  }

  await natsWrapper.newConnection("nats://nats:4222");

  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
};

start();
