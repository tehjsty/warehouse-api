import {ValidationError} from "class-validator/types/validation/ValidationError";
import {BaseError} from "./BaseError";

export class EntityValidationError extends BaseError {
    errors: ValidationError[];

    constructor(errors: ValidationError[]) {
        super('Entity constraints violated.', 400);
        this.errors = errors;
    }
}
