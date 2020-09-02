import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import {User} from "../entity/user/User";
import {UserRole} from "../service/user/util/UserRole";
import {Article} from "../entity/article/Article";

export class CreateAdminUser1592945004954 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        let articles = [
            new Article(0, 'T145', 'Gehäuse', 'Ein PC Gehäuse', 200.99, 'Aus Metall', 'leise', '', '', ''),
            new Article(0, 'T146', 'Grafikkarte', 'Tolle Grafikkarte', 799.99, 'Leiser Lüfter', 'Super schnell', 'Mit allen Mainboards kompatibel', '', ''),
            new Article(0, 'T147', 'RAM', '16gb', 70.50, '3600 MHz', 'schnell', '', '', ''),
            new Article(0, 'T148', 'Monitor', 'Großer Monitor', 456.69, '27 Zoll', 'G-Sync', '144Hz', 'Mattes Display', '40cm Höhe'),
            new Article(0, 'T149', 'Maus', 'Gamer Maus', 69.99, 'Einstellbare DPI Zahl', 'Schwarz', '', '', ''),
            new Article(0, 'T150', 'Mauspad', 'Gamer Mauspad', 19.99, '20cmx30cm', 'für Gamer', '', '', ''),
        ];
        for(let article of articles){
            const repository = getRepository(Article);
            await repository.save(article);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
