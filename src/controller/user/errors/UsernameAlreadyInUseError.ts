import {BaseError} from "../../error/BaseError";

export class UsernameAlreadyInUseError extends BaseError {

    constructor() {
        super('username already in use', 409);
    }
}
