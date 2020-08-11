import {MigrationInterface, QueryRunner} from "typeorm";

export class RemovedAccessKey1597188260193 implements MigrationInterface {
    name = 'RemovedAccessKey1597188260193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "social_provider" DROP CONSTRAINT "UQ_daea7dda28630efc23153691abb"`);
        await queryRunner.query(`ALTER TABLE "social_provider" DROP COLUMN "accessKey"`);
        await queryRunner.query(`ALTER TABLE "social_provider" ADD CONSTRAINT "UQ_39dd49d1d89ddc54cd212c59b12" UNIQUE ("provider", "providerId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "social_provider" DROP CONSTRAINT "UQ_39dd49d1d89ddc54cd212c59b12"`);
        await queryRunner.query(`ALTER TABLE "social_provider" ADD "accessKey" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "social_provider" ADD CONSTRAINT "UQ_daea7dda28630efc23153691abb" UNIQUE ("accessKey", "provider")`);
    }

}
