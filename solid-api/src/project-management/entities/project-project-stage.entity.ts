import { LegacyCommonEntityWithGeneratedId } from '@solidxai/core';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { ProjectTaskUserRel } from './project-task-user-rel.entity'

@Entity('project_project_stage')
export class ProjectProjectStage extends LegacyCommonEntityWithGeneratedId {
    @Column({ name: "active", type: "boolean", nullable: true, default: false })
    active: boolean = false;

    @Column({ name: "company_id", type: "integer", nullable: true })
    companyId: number;

    @Column({ name: "create_date", type: "timestamp", nullable: true })
    createDate: Date;

    @Column({ name: "create_uid", type: "integer", nullable: true })
    createUid: number;

    @Column({ name: "fold", type: "boolean", nullable: true, default: false })
    fold: boolean = false;

    @PrimaryColumn({ name: "id", type: "integer" })
    legacyId: number;

    @Column({ name: "mail_template_id", type: "integer", nullable: true })
    mailTemplateId: number;

    @Column({ name: "name", type: "jsonb" })
    name: any;

    @Column({ name: "sequence", type: "integer", nullable: true })
    sequence: number;

    @Column({ name: "sms_template_id", type: "integer", nullable: true })
    smsTemplateId: number;

    @Column({ name: "write_date", type: "timestamp", nullable: true })
    writeDate: Date;

    @Column({ name: "write_uid", type: "integer", nullable: true })
    writeUid: number;

    @OneToMany(() => ProjectTaskUserRel, projectTaskUserRel => projectTaskUserRel.stageId, { cascade: true })
    projectTaskUserRels: ProjectTaskUserRel[];
}
