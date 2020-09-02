import {Router} from "express";
import auth from "./auth";
import article from "./article";

const routes = Router();

routes.use("/auth", auth);
routes.use("/article", article);

export default routes;
