import express from "express";
import { json } from "body-parser";
import { signupRouter } from "./routes/signup";
import cookieSession from "cookie-session";
import { signinRouter } from "./routes/signin";
import { currentUserRouter } from "./routes/current-user";

const app = express();
app.set("trust proxy", true); //needed to ensure that express is aware that nginx is proxying our traffic and trusts the https connection
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: true
}));

app.use(signupRouter);
app.use(signinRouter);
app.use(currentUserRouter);

export { app };