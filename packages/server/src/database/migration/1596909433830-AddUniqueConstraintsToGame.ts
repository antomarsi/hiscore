import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUniqueConstraintsToGame1596909433830 implements MigrationInterface {
    name = 'AddUniqueConstraintsToGame1596909433830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "UQ_1d287bb22e92c5ee5c084ab6cb7" UNIQUE ("userId", "name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "UQ_1d287bb22e92c5ee5c084ab6cb7"`);
    }

}
