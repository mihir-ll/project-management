import { LegacyCommonEntityWithGeneratedId } from '@solidxai/core';
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Project } from './project.entity'

@Entity('project_milestone')
export class ProjectMilestone extends LegacyCommonEntityWithGeneratedId {
    @Column({ name: "create_date", type: "timestamp", nullable: true })
    createDate: Date;

    @Column({ name: "create_uid", type: "integer", nullable: true })
    createUid: number;

    @Column({ name: "deadline", type: "date", nullable: true })
    deadline: Date;

    @Column({ name: "is_reached", type: "boolean", nullable: true, default: false })
    isReached: boolean = false;

    @PrimaryColumn({ name: "id", type: "integer" })
    legacyId: number;

    @Column({ name: "name", type: "varchar" })
    name: string;

    @ManyToOne(() => Project, { nullable: false })
    @JoinColumn({ name: "project_id" })
    projectId: Project;

    @Column({ name: "reached_date", type: "date", nullable: true })
    reachedDate: Date;

    @Column({ name: "write_date", type: "timestamp", nullable: true })
    writeDate: Date;

    @Column({ name: "write_uid", type: "integer", nullable: true })
    writeUid: number;
}
