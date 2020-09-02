import {BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";
import {Length, Min, validateOrReject} from "class-validator";

@Entity()
@Unique(["articleNumber"])
export class Article {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@Length(3, 20)
	articleNumber: string;

	@Column()
	@Length(1, 100)
	name: string;

	@Column()
	@Length(0, 10000)
	description: string;

	@Column()
	@Min(0)
	price: number;

	@Column()
	@Length(1, 100)
	propertyOne: string;

	@Column()
	@Length(1, 100)
	propertyTwo: string;

	@Column()
	@Length(0)
	propertyThree: string;

	@Column()
	@Length(0)
	propertyFour: string;

	@Column()
	@Length(0)
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

	@BeforeInsert()
	@BeforeUpdate()
	public isValid(): Promise<void> {
		return validateOrReject(this);
	}
}
