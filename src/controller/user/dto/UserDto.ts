import {User} from "../../../entity/user/User";

export class UserDto {
    username: string;

    constructor(entity: User) {
        this.username = entity.username;
    }
}
