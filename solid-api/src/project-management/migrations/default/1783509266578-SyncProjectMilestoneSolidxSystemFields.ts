import { MigrationInterface, QueryRunner, TableColumn, TableIndex } from "typeorm";
export class SyncProjectMilestoneSolidxSystemFields1783509266578 implements MigrationInterface {
    name = 'SyncProjectMilestoneSolidxSystemFields1783509266578'
    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableName = "public.project_milestone";
        if (!(await queryRunner.hasColumn(tableName, "ss_id")))
            await queryRunner.addColumn(tableName, new TableColumn({ name: "ss_id", type: "integer", isNullable: false, isGenerated: true, generationStrategy: "increment", isUnique: true, }));

        if (!(await queryRunner.hasColumn(tableName, "ss_created_at")))
            await queryRunner.addColumn(tableName, new TableColumn({ name: "ss_created_at", type: "timestamp", isNullable: false, default: "now()", }));

        if (!(await queryRunner.hasColumn(tableName, "ss_updated_at")))
            await queryRunner.addColumn(tableName, new TableColumn({ name: "ss_updated_at", type: "timestamp", isNullable: false, default: "now()", }));

        if (!(await queryRunner.hasColumn(tableName, "ss_deleted_at")))
            await queryRunner.addColumn(tableName, new TableColumn({ name: "ss_deleted_at", type: "timestamp", isNullable: true, }));

        if (!(await queryRunner.hasColumn(tableName, "ss_deleted_tracker")))
            await queryRunner.addColumn(tableName, new TableColumn({ name: "ss_deleted_tracker", type: "varchar", length: "255", isNullable: false, default: "'not-deleted'", }));

        if (!(await queryRunner.hasColumn(tableName, "ss_published_at")))
            await queryRunner.addColumn(tableName, new TableColumn({ name: "ss_published_at", type: "timestamp", isNullable: true, }));

        if (!(await queryRunner.hasColumn(tableName, "ss_locale_name")))
            await queryRunner.addColumn(tableName, new TableColumn({ name: "ss_locale_name", type: "varchar", length: "255", isNullable: true, }));

        if (!(await queryRunner.hasColumn(tableName, "ss_default_entity_locale_id")))
            await queryRunner.addColumn(tableName, new TableColumn({ name: "ss_default_entity_locale_id", type: "integer", isNullable: true, }));

        if (!(await queryRunner.hasColumn(tableName, "ss_created_by_id")))
            await queryRunner.addColumn(tableName, new TableColumn({ name: "ss_created_by_id", type: "integer", isNullable: true, }));

        if (!(await queryRunner.hasColumn(tableName, "ss_updated_by_id")))
            await queryRunner.addColumn(tableName, new TableColumn({ name: "ss_updated_by_id", type: "integer", isNullable: true, }));

        {
            const table = await queryRunner.getTable(tableName);
            if (table && !table.indices.some((index) => index.name === "IDX_670d1d3e8baac03e806a02ab"))
                await queryRunner.createIndex(tableName, new TableIndex({ name: "IDX_670d1d3e8baac03e806a02ab", columnNames: ["ss_deleted_at"], }));
        }

        {
            const table = await queryRunner.getTable(tableName);
            if (table && !table.indices.some((index) => index.name === "UQ_e396e10568cfb67aa3555b7e"))
                await queryRunner.createIndex(tableName, new TableIndex({ name: "UQ_e396e10568cfb67aa3555b7e", columnNames: ["ss_id"], isUnique: true, }));
        }
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        const tableName = "public.project_milestone";
        {
            const table = await queryRunner.getTable(tableName);
            const index = table?.indices.find((entry) => entry.name === "UQ_e396e10568cfb67aa3555b7e");
            if (index)
                await queryRunner.dropIndex(tableName, index);
        }

        {
            const table = await queryRunner.getTable(tableName);
            const index = table?.indices.find((entry) => entry.name === "IDX_670d1d3e8baac03e806a02ab");
            if (index)
                await queryRunner.dropIndex(tableName, index);
        }

        if (await queryRunner.hasColumn(tableName, "ss_updated_by_id"))
            await queryRunner.dropColumn(tableName, "ss_updated_by_id");

        if (await queryRunner.hasColumn(tableName, "ss_created_by_id"))
            await queryRunner.dropColumn(tableName, "ss_created_by_id");

        if (await queryRunner.hasColumn(tableName, "ss_default_entity_locale_id"))
            await queryRunner.dropColumn(tableName, "ss_default_entity_locale_id");

        if (await queryRunner.hasColumn(tableName, "ss_locale_name"))
            await queryRunner.dropColumn(tableName, "ss_locale_name");

        if (await queryRunner.hasColumn(tableName, "ss_published_at"))
            await queryRunner.dropColumn(tableName, "ss_published_at");

        if (await queryRunner.hasColumn(tableName, "ss_deleted_tracker"))
            await queryRunner.dropColumn(tableName, "ss_deleted_tracker");

        if (await queryRunner.hasColumn(tableName, "ss_deleted_at"))
            await queryRunner.dropColumn(tableName, "ss_deleted_at");

        if (await queryRunner.hasColumn(tableName, "ss_updated_at"))
            await queryRunner.dropColumn(tableName, "ss_updated_at");

        if (await queryRunner.hasColumn(tableName, "ss_created_at"))
            await queryRunner.dropColumn(tableName, "ss_created_at");

        if (await queryRunner.hasColumn(tableName, "ss_id"))
            await queryRunner.dropColumn(tableName, "ss_id");
    }
}