import { LegacyCommonEntityWithGeneratedId } from '@solidxai/core';
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Project } from './project.entity'

@Entity('project_update')
export class ProjectUpdate extends LegacyCommonEntityWithGeneratedId {
    @Column({ name: "allocated_time", type: "integer", nullable: true })
    allocatedTime: number;

    @Column({ name: "closed_task_count", type: "integer", nullable: true })
    closedTaskCount: number;

    @Column({ name: "create_date", type: "timestamp", nullable: true })
    createDate: Date;

    @Column({ name: "create_uid", type: "integer", nullable: true })
    createUid: number;

    @Column({ name: "date", type: "date", nullable: true })
    date: Date;

    @Column({ name: "description", type: "text", nullable: true })
    description: string;

    @Column({ name: "email_cc", type: "varchar", nullable: true })
    emailCc: string;

    @PrimaryColumn({ name: "id", type: "integer" })
    legacyId: number;

    @Column({ name: "name", type: "varchar" })
    name: string;

    @Column({ name: "progress", type: "integer", nullable: true })
    progress: number;

    @ManyToOne(() => Project, { nullable: true })
    @JoinColumn({ name: "project_id" })
    projectId: Project;

    @Column({ name: "status", type: "varchar" })
    status: string;

    @Column({ name: "task_count", type: "integer", nullable: true })
    taskCount: number;

    @Column({ name: "timesheet_time", type: "integer", nullable: true })
    timesheetTime: number;

    @Column({ name: "uom_id", type: "integer", nullable: true })
    uomId: number;

    @Column({ name: "user_id", type: "integer" })
    userId: number;

    @Column({ name: "write_date", type: "timestamp", nullable: true })
    writeDate: Date;

    @Column({ name: "write_uid", type: "integer", nullable: true })
    writeUid: number;
}
