import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatedUserGameLeaderboardScore1596569762231 implements MigrationInterface {
    name = 'CreatedUserGameLeaderboardScore1596569762231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "googleId" character varying, "githubId" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_eba3385bd58e0755d15041c389f" UNIQUE ("googleId", "githubId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "player" ("id" SERIAL NOT NULL, "displayName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "data" text, CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "score" ("id" SERIAL NOT NULL, "player_name" character varying, "score" integer NOT NULL, "playerId" integer, "leaderboardId" integer, CONSTRAINT "PK_1770f42c61451103f5514134078" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "leaderboard_savemethod_enum" AS ENUM('LATEST', 'HIGHEST')`);
        await queryRunner.query(`CREATE TYPE "leaderboard_resetmethod_enum" AS ENUM('HOURLY', 'DAILY', 'WEEKLY')`);
        await queryRunner.query(`CREATE TABLE "leaderboard" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "saveMethod" "leaderboard_savemethod_enum" NOT NULL DEFAULT 'HIGHEST', "resetMethod" "leaderboard_resetmethod_enum", "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "gameId" integer, CONSTRAINT "PK_76fd1d52cf44d209920f73f4608" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "game" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "apiKey" uuid NOT NULL DEFAULT uuid_generate_v4(), "useAuthentication" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "score" ADD CONSTRAINT "FK_66f5fb8ee865712db248080d5ea" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "score" ADD CONSTRAINT "FK_60cc46dda7f68d487a3ad3c587a" FOREIGN KEY ("leaderboardId") REFERENCES "leaderboard"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "leaderboard" ADD CONSTRAINT "FK_6ddb3f4d75c4a14a48be7aeca0d" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_a8106c0a84d70ecfc3358301c54" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_a8106c0a84d70ecfc3358301c54"`);
        await queryRunner.query(`ALTER TABLE "leaderboard" DROP CONSTRAINT "FK_6ddb3f4d75c4a14a48be7aeca0d"`);
        await queryRunner.query(`ALTER TABLE "score" DROP CONSTRAINT "FK_60cc46dda7f68d487a3ad3c587a"`);
        await queryRunner.query(`ALTER TABLE "score" DROP CONSTRAINT "FK_66f5fb8ee865712db248080d5ea"`);
        await queryRunner.query(`DROP TABLE "game"`);
        await queryRunner.query(`DROP TABLE "leaderboard"`);
        await queryRunner.query(`DROP TYPE "leaderboard_resetmethod_enum"`);
        await queryRunner.query(`DROP TYPE "leaderboard_savemethod_enum"`);
        await queryRunner.query(`DROP TABLE "score"`);
        await queryRunner.query(`DROP TABLE "player"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
