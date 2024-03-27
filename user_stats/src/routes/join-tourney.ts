import express from "express";
import { UserStats } from "../models/user_stats";

const router = express.Router();

router.patch("/api/userstats/jointourney", async (req, res) => {
    //Grab email and tourneyId from body
    const { email, tourneyId } = req.body;

    //find email in mongoDB and update the tournaments array with a new entry {tourneyId, paid: false}
    await UserStats.updateOne({userEmail: email}, {
        "$push": {
            "tournaments": {tourney_id: tourneyId, paid: false}
        }
    })

    res.status(200).send({});
});

export { router as joinTourneyRouter };