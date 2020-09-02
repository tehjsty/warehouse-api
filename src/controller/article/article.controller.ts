import {Request, Response} from "express";
import {ErrorResponse} from "../error/ErrorResponse";
import {ArticleService} from "../../service/article/article.service";
import {ArticleDto} from "./dto/ArticleDto";
import {Like} from "typeorm";

export class ArticleController {

	static getAll = async (req: Request, res: Response) => {
		//Get parameters from the body
		const filter: any = {};
		if(req.query.articleNumber){
			filter.articleNumber = Like(`%${req.query.articleNumber}%`)
		}
		if(req.query.name){
			filter.name = Like(`%${req.query.name}%`)
		}
		if(req.query.description){
			filter.name = Like(`%${req.query.description}%`)
		}
		const service: ArticleService = new ArticleService();
		service.findAll(filter).then((articles) => {
			res.status(200).send(articles);
		}, e => {
			const err = new ErrorResponse(e);
			res.status(err.status).send(err.message);
		});
	};

	static getByArticleNumber = async (req: Request, res: Response) => {
		//Get parameters from the body
		if(req.params.artno){
			const service: ArticleService = new ArticleService();
			service.findByArtno(req.params.artno).then((articles) => {
				res.status(200).send(articles);
			}).catch(e => {
				const err = new ErrorResponse(e);
				res.status(err.status).send(e);
			});
		} else {
			res.status(400).send({
				error: 'Article number missing'
			});
		}
	};

	static save = async (req: Request, res: Response) => {
		//Get parameters from the body
		if(req.body){
			const article: ArticleDto = new ArticleDto(req.body.id, req.body.articleNumber, req.body.name, req.body.description,
				req.body.price, req.body.propertyOne, req.body.propertyTwo, req.body.propertyThree, req.body.propertyFour, req.body.propertyFive);
			const service: ArticleService = new ArticleService();
			service.save(article).then((newArticle) => {
				res.status(200).send(newArticle);
			}).catch(e => {
				const err = new ErrorResponse(e);
				res.status(err.status).send(e);
			});
		} else {
			res.status(400).send({
				error: 'post data missing'
			});
		}
	};

	static delete = async (req: Request, res: Response) => {
		//Get parameters from the body
		if(req.params.artno){
			const service: ArticleService = new ArticleService();
			service.deleteByArtno(req.params.artno).then(() => {
				res.status(200).send();
			}).catch(e => {
				const err = new ErrorResponse(e);
				res.status(err.status).send(e);
			});
		} else {
			res.status(400).send({
				error: 'Article number missing'
			});
		}
	};

}
