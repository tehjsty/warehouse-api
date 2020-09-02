import {Article} from "../../../entity/article/Article";

export class ArticleDto {
	id: number;

	articleNumber: string;

	name: string;

	description: string;

	price: number;

	propertyOne: string;

	propertyTwo: string;

	propertyThree: string;

	propertyFour: string;

	propertyFive: string;

	constructor(id: number, articleNumber: string, name: string, description: string, price: number,
	            propertyOne: string, propertyTwo: string, propertyThree: string, propertyFour: string, propertyFive: string) {
		this.id = id;
		this.articleNumber = articleNumber;
		this.name = name;
		this.description = description;
		this.price = price;
		this.propertyOne = propertyOne;
		this.propertyTwo = propertyTwo;
		this.propertyThree = propertyThree;
		this.propertyFour = propertyFour;
		this.propertyFive = propertyFive;
	}

	public toEntity(): Article {
		return new Article(this.id, this.articleNumber, this.name, this.description,
			this.price, this.propertyOne, this.propertyTwo, this.propertyThree, this.propertyFour, this.propertyFive);
	}
}
