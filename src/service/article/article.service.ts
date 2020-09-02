import {getRepository} from "typeorm";
import {Article} from "../../entity/article/Article";
import {ArticleDto} from "../../controller/article/dto/ArticleDto";
import {EntityNotFound} from "../../controller/error/EntityNotFound";

export class ArticleService {

	private repository = getRepository(Article);

	public findByArtno(aNr: string): Promise<Article> {
		return this.repository.findOneOrFail({articleNumber: aNr})
	}

	public findAll(filter: any): Promise<Article[]> {
		return this.repository.find(filter);
	}

	public save(article: ArticleDto): Promise<Article> {
		const entity: Article = article.toEntity();
		return this.repository.save(entity);
	}

	public deleteByArtno(aNr: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.findByArtno(aNr).then((article: Article) => {
				this.repository.delete({articleNumber: article.articleNumber}).then(() => {
					resolve();
				}, reject);
			}, (e) => {
				reject(new EntityNotFound(e));
			})
		})
	}

	// public create(article: Article): Promise<void> {
	// 	return new Promise(async (resolve, reject) => {
	// 		let user: User = new User(username, password);
	//
	// 		user.role = UserRole.DEFAULT;
	//
	// 		// Validate if the parameters are ok
	// 		const errors = await validate(user);
	// 		if (errors.length > 0) {
	// 			reject(new EntityValidationError(errors));
	// 		}
	//
	// 		//Hash the password, to securely store on DB
	// 		user.hashPassword();
	//
	// 		//Try to save. If fails, the username is already in use
	// 		try {
	// 			await this.repository.save(user);
	// 			resolve();
	// 		} catch (e) {
	// 			reject(new UsernameAlreadyInUseError())
	// 		}
	// 	})
	// }
}
