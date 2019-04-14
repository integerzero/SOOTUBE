import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import { join, login, logout, postJoin, postLogin } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get(routes.join, join);
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, login);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);

export default globalRouter;