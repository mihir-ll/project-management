import { LegacyCommonEntityWithGeneratedId } from '@solidxai/core';
import { Entity, Column, PrimaryColumn, ManyToMany } from 'typeorm'
import { Project } from './project.entity';

@Entity('project_task_type')
export class ProjectTaskType extends LegacyCommonEntityWithGeneratedId {
    @Column({ name: "active", type: "boolean", nullable: true, default: false })
    active: boolean = false;

    @Column({ name: "auto_validation_state", type: "boolean", nullable: true, default: false })
    autoValidationState: boolean = false;

    @Column({ name: "create_date", type: "timestamp", nullable: true })
    createDate: Date;

    @Column({ name: "create_uid", type: "integer", nullable: true })
    createUid: number;

    @Column({ name: "description", type: "jsonb", nullable: true })
    description: any;

    @Column({ name: "fold", type: "boolean", nullable: true, default: false })
    fold: boolean = false;

    @PrimaryColumn({ name: "id", type: "integer" })
    legacyId: number;

    @Column({ name: "mail_template_id", type: "integer", nullable: true })
    mailTemplateId: number;

    @Column({ name: "name", type: "jsonb" })
    name: any;

    @Column({ name: "rating_template_id", type: "integer", nullable: true })
    ratingTemplateId: number;

    @Column({ name: "sequence", type: "integer", nullable: true })
    sequence: number;

    @Column({ name: "sms_template_id", type: "integer", nullable: true })
    smsTemplateId: number;

    @Column({ name: "user_id", type: "integer", nullable: true })
    userId: number;

    @Column({ name: "write_date", type: "timestamp", nullable: true })
    writeDate: Date;

    @Column({ name: "write_uid", type: "integer", nullable: true })
    writeUid: number;

    @ManyToMany(() => Project, (project) => project.taskTypes)
    projects: Project[];
}
