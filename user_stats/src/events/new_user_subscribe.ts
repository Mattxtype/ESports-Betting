import { JSONCodec } from "nats";
import { natsWrapper } from "../../nats-wrapper";
import { UserStats } from "../models/user_stats";

export async function newUserEvent() {
    const jc = JSONCodec();
    const subscription = natsWrapper.client.subscribe('new_user_event');

    (async (sub) => {

        console.log(`listening for ${sub.getSubject()} requests...`);

        for await (const m of sub) {
            const { email } = jc.decode(m.data) as {
                email: string,
                id: number
            }

            const userStats = UserStats.build({ userEmail: email });
            await userStats.save();
            console.log(userStats);
        }
        
        console.log(`subscription ${sub.getSubject()} drained.`);
    })(subscription);
};


