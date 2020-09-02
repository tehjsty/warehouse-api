import {UserDto} from "../../controller/user/dto/UserDto";
import {getRepository} from "typeorm";
import {validate} from "class-validator";
import {UserRole} from "./util/UserRole";
import {EntityValidationError} from "../../controller/error/EntityValidationError";
import {UsernameAlreadyInUseError} from "../../controller/user/errors/UsernameAlreadyInUseError";
import {User} from "../../entity/user/User";

export class UserService {

    private repository = getRepository(User);

    public findById(id: number): Promise<UserDto> {
        return new Promise<UserDto>((resolve, reject) => {
            this.repository.findOneOrFail(id).then((user: User) => {
                resolve(new UserDto(user));
            }, reject)
        })
    }

    public create(username: string, password: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            let user: User = new User(username, password);

            user.role = UserRole.DEFAULT;

            // Validate if the parameters are ok
            const errors = await validate(user);
            if (errors.length > 0) {
                reject(new EntityValidationError(errors));
            }

            //Hash the password, to securely store on DB
            user.hashPassword();

            //Try to save. If fails, the username is already in use
            try {
                await this.repository.save(user);
                resolve();
            } catch (e) {
                reject(new UsernameAlreadyInUseError())
            }
        })
    }
}
