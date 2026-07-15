import { LegacyCommonEntityWithGeneratedId } from '@solidxai/core';
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Project } from './project.entity';
import { ProjectTaskUserRel } from './project-task-user-rel.entity';
import { ProjectMilestone } from './project-milestone.entity';
import { ProjectTaskType } from './project-task-type.entity';
import { ProjectTag } from './project-tag.entity';

@Entity('project_task')
export class ProjectTask extends LegacyCommonEntityWithGeneratedId {
    @Column({ name: "access_token", type: "varchar", nullable: true })
    accessToken: string;

    @Column({ name: "active", type: "boolean", nullable: true, default: false })
    active: boolean = false;

    @Column({ name: "allocated_hours", type: "decimal", nullable: true })
    allocatedHours: number;

    @Column({ name: "analytic_account_id", type: "integer", nullable: true })
    analyticAccountId: number;

    @Column({ name: "color", type: "integer", nullable: true })
    color: number;

    @Column({ name: "company_id", type: "integer", nullable: true })
    companyId: number;

    @Column({ name: "create_date", type: "timestamp", nullable: true })
    createDate: Date;

    @Column({ name: "create_uid", type: "integer", nullable: true })
    createUid: number;

    @Column({ name: "date_assign", type: "timestamp", nullable: true })
    dateAssign: Date;

    @Column({ name: "date_deadline", type: "timestamp", nullable: true })
    dateDeadline: Date;

    @Column({ name: "date_end", type: "timestamp", nullable: true })
    dateEnd: Date;

    @Column({ name: "date_last_stage_update", type: "timestamp", nullable: true })
    dateLastStageUpdate: Date;

    @Column({ name: "description", type: "text", nullable: true })
    description: string;

    @Column({ name: "displayed_image_id", type: "integer", nullable: true })
    displayedImageId: number;

    @Column({ name: "display_in_project", type: "boolean", nullable: true, default: false })
    displayInProject: boolean = false;

    @Column({ name: "effective_hours", type: "decimal", nullable: true })
    effectiveHours: number;

    @Column({ name: "email_cc", type: "varchar", nullable: true })
    emailCc: string;

    @PrimaryColumn({ name: "id", type: "integer" })
    legacyId: number;

    @ManyToOne(() => ProjectMilestone, { nullable: true })
    @JoinColumn({ name: "milestone_id" })
    milestoneId: ProjectMilestone;

    @Column({ name: "name", type: "varchar" })
    name: string;

    @Column({ name: "overtime", type: "decimal", nullable: true })
    overtime: number;

    @Column({ name: "parent_id", type: "integer", nullable: true })
    parentId: number;

    @Column({ name: "partner_id", type: "integer", nullable: true })
    partnerId: number;

    @Column({ name: "priority", type: "varchar", nullable: true })
    priority: string;

    @Column({ name: "progress", type: "decimal", nullable: true })
    progress: number;

    @ManyToOne(() => Project, { nullable: true })
    @JoinColumn({ name: "project_id" })
    projectId: Project;

    @Column({ name: "rating_last_value", type: "decimal", nullable: true })
    ratingLastValue: number;

    @Column({ name: "recurrence_id", type: "integer", nullable: true })
    recurrenceId: number;

    @Column({ name: "recurring_task", type: "boolean", nullable: true, default: false })
    recurringTask: boolean = false;

    @Column({ name: "remaining_hours", type: "decimal", nullable: true })
    remainingHours: number;

    @Column({ name: "sequence", type: "integer", nullable: true })
    sequence: number;

    @ManyToOne(() => ProjectTaskType, { nullable: true })
    @JoinColumn({ name: "stage_id" })
    stageId: ProjectTaskType;

    @Column({ name: "state", type: "varchar" })
    state: string;

    @Column({ name: "subtask_effective_hours", type: "decimal", nullable: true })
    subtaskEffectiveHours: number;

    @Column({ name: "task_properties", type: "jsonb", nullable: true })
    taskProperties: any;

    @Column({ name: "total_hours_spent", type: "decimal", nullable: true })
    totalHoursSpent: number;

    @Column({ name: "working_days_close", type: "decimal", nullable: true })
    workingDaysClose: number;

    @Column({ name: "working_days_open", type: "decimal", nullable: true })
    workingDaysOpen: number;

    @Column({ name: "working_hours_close", type: "decimal", nullable: true })
    workingHoursClose: number;

    @Column({ name: "working_hours_open", type: "decimal", nullable: true })
    workingHoursOpen: number;

    @Column({ name: "write_date", type: "timestamp", nullable: true })
    writeDate: Date;

    @Column({ name: "write_uid", type: "integer", nullable: true })
    writeUid: number;

    @Column({ name: "x_complexity", type: "varchar", nullable: true })
    xComplexity: string;

    @OneToMany(() => ProjectTaskUserRel, projectTaskUserRel => projectTaskUserRel.taskId, { cascade: true })
    projectTaskUserRels: ProjectTaskUserRel[];

    @ManyToMany(() => ProjectTag, (projectTag) => projectTag.tasks, {
        cascade: true,
    })
    @JoinTable({
        name: 'project_tags_project_task_rel',
        joinColumn: { name: 'project_task_id' },
        inverseJoinColumn: { name: 'project_tags_id' },
    })
    tags: ProjectTag[];
}
