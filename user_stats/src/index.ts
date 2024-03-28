import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import { natsWrapper } from "../nats-wrapper";
import { newUserEvent } from "./events/new_user_subscribe";
import { joinTourneyRouter } from "./routes/join-tourney";
import { getUserTourneyListRouter } from "./routes/get-user-tourney-list";
import { removeTourneyRouter } from "./routes/remove-tourney";

const app = express();
app.set("trust proxy", true); //needed to ensure that express is aware that nginx is proxying our traffic and trusts the https connection
app.use(json());

app.use(joinTourneyRouter);
app.use(getUserTourneyListRouter);
app.use(removeTourneyRouter);

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
