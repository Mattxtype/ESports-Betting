import express from "express";
import { currentUser, requireAuth } from '@mkrbetting/common'
const router = express.Router();

router.patch("/api/userstats/jointourney", currentUser, requireAuth, (req, res) => {
    //Grab email and tourneyId from body
    //find email in mongoDB and update the tournaments array with a new entry {tourneyId, paid: false}
});

export { router as joinTourneyRouter };