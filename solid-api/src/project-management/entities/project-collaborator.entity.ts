import { LegacyCommonEntityWithGeneratedId } from '@solidxai/core';
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Project } from './project.entity'

@Entity('project_collaborator')
export class ProjectCollaborator extends LegacyCommonEntityWithGeneratedId {
    @Column({ name: "create_date", type: "timestamp", nullable: true })
    createDate: Date;

    @Column({ name: "create_uid", type: "integer", nullable: true })
    createUid: number;

    @PrimaryColumn({ name: "id", type: "integer" })
    legacyId: number;

    @Column({ name: "partner_id", type: "integer" })
    partnerId: number;

    @ManyToOne(() => Project, { nullable: false })
    @JoinColumn({ name: "project_id" })
    projectId: Project;

    @Column({ name: "write_date", type: "timestamp", nullable: true })
    writeDate: Date;

    @Column({ name: "write_uid", type: "integer", nullable: true })
    writeUid: number;
}
