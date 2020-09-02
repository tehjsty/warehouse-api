import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import {checkRole} from "../middlewares/checkRole";
import {ArticleController} from "../controller/article/article.controller";

const router = Router();
//Login route
router.get("/", [checkJwt, checkRole(["ADMIN"])], ArticleController.getAll);
router.post("/", [checkJwt, checkRole(["ADMIN"])], ArticleController.save);
router.get("/:artno", [checkJwt, checkRole(["ADMIN"])], ArticleController.getByArticleNumber);
router.delete("/:artno", [checkJwt, checkRole(["ADMIN"])], ArticleController.delete);

export default router;
