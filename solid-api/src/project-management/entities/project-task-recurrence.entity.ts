import { LegacyCommonEntityWithGeneratedId } from '@solidxai/core';
import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity('project_task_recurrence')
export class ProjectTaskRecurrence extends LegacyCommonEntityWithGeneratedId {
    @Column({ name: "create_date", type: "timestamp", nullable: true })
    createDate: Date;

    @Column({ name: "create_uid", type: "integer", nullable: true })
    createUid: number;

    @PrimaryColumn({ name: "id", type: "integer" })
    legacyId: number;

    @Column({ name: "repeat_interval", type: "integer", nullable: true })
    repeatInterval: number;

    @Column({ name: "repeat_type", type: "varchar", nullable: true })
    repeatType: string;

    @Column({ name: "repeat_unit", type: "varchar", nullable: true })
    repeatUnit: string;

    @Column({ name: "repeat_until", type: "date", nullable: true })
    repeatUntil: Date;

    @Column({ name: "write_date", type: "timestamp", nullable: true })
    writeDate: Date;

    @Column({ name: "write_uid", type: "integer", nullable: true })
    writeUid: number;
}
