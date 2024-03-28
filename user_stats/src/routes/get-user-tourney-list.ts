import express from 'express'
import { UserStats } from '../models/user_stats';

const router = express.Router();

router.get("/api/userstats/getusertourneylist", async (req, res) => {
    const {email} = req.body;
    const tournaments  = await UserStats.findOne({userEmail: email}, 'tournaments')

    res.status(200).send(tournaments);
})

export { router as getUserTourneyListRouter}