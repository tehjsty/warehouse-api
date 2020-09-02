import {ValidationError} from "class-validator/types/validation/ValidationError";
import {BaseError} from "./BaseError";

export class EntityNotFound extends BaseError {
	private error: Error;

	constructor(error: Error) {
		super('Entity not Found.', 404);
		this.error = error;
	}
}
