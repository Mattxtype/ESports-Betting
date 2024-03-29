import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import { DatabaseConnectionError } from "@mkrbetting/common";

const start = async () => {
  if(!process.env.JWT_KEY){
    throw new Error('JWT_KEY must be defined');
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth"); //Auth is the database name
    console.log("connected to mongodb")
  } catch (err) {
    throw new DatabaseConnectionError();
  }

  await natsWrapper.newConnection("nats://nats:4222");

  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
};

start();
