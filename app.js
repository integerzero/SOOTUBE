import express from "express";
import logger from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
// import하는 쪽이 default가 아니기 때문에 이렇게 import해야함.
import {userRouter} from "./router";
const app = express();

const handleHome = (req, res) => res.send('hello from home');

const handleProfile = (req, res) => res.send("You are on profile");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(logger("dev"));

app.get("/", handleHome);

app.get("/profile", handleProfile);

// use는 userRouter안에 있는 것들을 사용하겠다.
app.use("/user", userRouter);

// import하는 곳에 app object를 주겠다
export default app;