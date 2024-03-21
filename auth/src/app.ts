import express from "express";
import { json } from "body-parser";
import { signupRouter } from "./routes/signup";
import cookieSession from "cookie-session";

const app = express();
app.set("trust proxy", true); //needed to ensure that express is aware that nginx is proxying our traffic and trusts the https connection
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: true
}));

app.use(signupRouter);

export { app };