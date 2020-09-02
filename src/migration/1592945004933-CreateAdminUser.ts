import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import {User} from "../entity/user/User";
import {UserRole} from "../service/user/util/UserRole";

export class CreateAdminUser1592945004933 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const username = "admin";
        const password = "admin";
        let user = new User(username, password);
        user.hashPassword();
        user.role = UserRole.ADMIN;
        const userRepository = getRepository(User);
        await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
