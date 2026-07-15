import { LegacyCommonEntityWithGeneratedId } from '@solidxai/core';
import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity('project_share_wizard')
export class ProjectShareWizard extends LegacyCommonEntityWithGeneratedId {
    @Column({ name: "res_model", type: "varchar" })
    resModel: string;

    @Column({ name: "write_date", type: "timestamp", nullable: true })
    writeDate: Date;

    @Column({ name: "write_uid", type: "integer", nullable: true })
    writeUid: number;

    @Column({ name: "access_mode", type: "varchar", nullable: true })
    accessMode: string;

    @Column({ name: "create_date", type: "timestamp", nullable: true })
    createDate: Date;

    @Column({ name: "create_uid", type: "integer", nullable: true })
    createUid: number;

    @Column({ name: "display_access_mode", type: "boolean", nullable: true, default: false })
    displayAccessMode: boolean = false;

    @PrimaryColumn({ name: "id", type: "integer" })
    legacyId: number;

    @Column({ name: "note", type: "text", nullable: true })
    note: string;

    @Column({ name: "res_id", type: "integer" })
    resId: number;
}
