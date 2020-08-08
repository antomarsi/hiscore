import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedNullableContraints1596909633284 implements MigrationInterface {
    name = 'AddedNullableContraints1596909633284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leaderboard" DROP CONSTRAINT "FK_6ddb3f4d75c4a14a48be7aeca0d"`);
        await queryRunner.query(`ALTER TABLE "leaderboard" ALTER COLUMN "gameId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_a8106c0a84d70ecfc3358301c54"`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "UQ_1d287bb22e92c5ee5c084ab6cb7"`);
        await queryRunner.query(`ALTER TABLE "game" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "UQ_1d287bb22e92c5ee5c084ab6cb7" UNIQUE ("userId", "name")`);
        await queryRunner.query(`ALTER TABLE "leaderboard" ADD CONSTRAINT "FK_6ddb3f4d75c4a14a48be7aeca0d" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_a8106c0a84d70ecfc3358301c54" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_a8106c0a84d70ecfc3358301c54"`);
        await queryRunner.query(`ALTER TABLE "leaderboard" DROP CONSTRAINT "FK_6ddb3f4d75c4a14a48be7aeca0d"`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "UQ_1d287bb22e92c5ee5c084ab6cb7"`);
        await queryRunner.query(`ALTER TABLE "game" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "UQ_1d287bb22e92c5ee5c084ab6cb7" UNIQUE ("name", "userId")`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_a8106c0a84d70ecfc3358301c54" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "leaderboard" ALTER COLUMN "gameId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "leaderboard" ADD CONSTRAINT "FK_6ddb3f4d75c4a14a48be7aeca0d" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
