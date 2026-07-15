import { MigrationInterface, QueryRunner, TableColumn, TableIndex } from "typeorm";
export class SyncProjectTagSolidxSystemFields1783505075763 implements MigrationInterface {
    name = 'SyncProjectTagSolidxSystemFields1783505075763'
    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableName = "public.project_tags";
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
            if (table && !table.indices.some((index) => index.name === "IDX_9c3efcee8a873381805e08f2"))
                await queryRunner.createIndex(tableName, new TableIndex({ name: "IDX_9c3efcee8a873381805e08f2", columnNames: ["ss_deleted_at"], }));
        }

        {
            const table = await queryRunner.getTable(tableName);
            if (table && !table.indices.some((index) => index.name === "UQ_10c94fa9acda6aa4e65dff61"))
                await queryRunner.createIndex(tableName, new TableIndex({ name: "UQ_10c94fa9acda6aa4e65dff61", columnNames: ["ss_id"], isUnique: true, }));
        }
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        const tableName = "public.project_tags";
        {
            const table = await queryRunner.getTable(tableName);
            const index = table?.indices.find((entry) => entry.name === "UQ_10c94fa9acda6aa4e65dff61");
            if (index)
                await queryRunner.dropIndex(tableName, index);
        }

        {
            const table = await queryRunner.getTable(tableName);
            const index = table?.indices.find((entry) => entry.name === "IDX_9c3efcee8a873381805e08f2");
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