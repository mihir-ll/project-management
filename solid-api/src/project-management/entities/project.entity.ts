import { LegacyCommonEntityWithGeneratedId } from '@solidxai/core';
import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { ProjectTask } from './project-task.entity';
import { ProjectMilestone } from './project-milestone.entity';
import { ProjectCollaborator } from './project-collaborator.entity';
import { ProjectTag } from './project-tag.entity';
import { ProjectTaskType } from './project-task-type.entity';

@Entity('project_project')
export class Project extends LegacyCommonEntityWithGeneratedId {
  @Column({ name: 'access_token', type: 'varchar', nullable: true })
  accessToken: string;

  @Column({ name: 'active', type: 'boolean', nullable: true, default: false })
  active: boolean = false;

  @Column({ name: 'alias_id', type: 'integer' })
  aliasId: number;

  @Column({ name: 'allocated_hours', type: 'decimal', nullable: true })
  allocatedHours: number;

  @Column({
    name: 'allow_milestones',
    type: 'boolean',
    nullable: true,
    default: false,
  })
  allowMilestones: boolean = false;

  @Column({
    name: 'allow_task_dependencies',
    type: 'boolean',
    nullable: true,
    default: false,
  })
  allowTaskDependencies: boolean = false;

  @Column({
    name: 'allow_timesheets',
    type: 'boolean',
    nullable: true,
    default: false,
  })
  allowTimesheets: boolean = false;

  @Column({ name: 'analytic_account_id', type: 'integer', nullable: true })
  analyticAccountId: number;

  @Column({ name: 'color', type: 'integer', nullable: true })
  color: number;

  @Column({ name: 'company_id', type: 'integer', nullable: true })
  companyId: number;

  @Column({ name: 'create_date', type: 'timestamp', nullable: true })
  createDate: Date;

  @Column({ name: 'create_uid', type: 'integer', nullable: true })
  createUid: number;

  @Column({ name: 'date', type: 'date', nullable: true })
  date: Date;

  @Column({ name: 'date_start', type: 'date', nullable: true })
  dateStart: Date;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @Column({ name: 'label_tasks', type: 'jsonb', nullable: true })
  labelTasks: any;

  @Column({ name: 'last_update_id', type: 'integer', nullable: true })
  lastUpdateId: number;

  @Column({ name: 'last_update_status', type: 'varchar' })
  lastUpdateStatus: string;

  @PrimaryColumn({ name: 'id', type: 'integer' })
  legacyId: number;

  @Column({ name: 'name', type: 'jsonb' })
  name: any;

  @Column({ name: 'partner_id', type: 'integer', nullable: true })
  partnerId: number;

  @Column({ name: 'privacy_visibility', type: 'varchar' })
  privacyVisibility: string;

  @Column({
    name: 'rating_active',
    type: 'boolean',
    nullable: true,
    default: false,
  })
  ratingActive: boolean = false;

  @Column({
    name: 'rating_request_deadline',
    type: 'timestamp',
    nullable: true,
  })
  ratingRequestDeadline: Date;

  @Column({ name: 'rating_status', type: 'varchar' })
  ratingStatus: string;

  @Column({ name: 'rating_status_period', type: 'varchar' })
  ratingStatusPeriod: string;

  @Column({ name: 'sequence', type: 'integer', nullable: true })
  sequence: number;

  @Column({ name: 'stage_id', type: 'integer', nullable: true })
  stageId: number;

  @Column({ name: 'task_properties_definition', type: 'jsonb', nullable: true })
  taskPropertiesDefinition: any;

  @Column({ name: 'user_id', type: 'integer', nullable: true })
  userId: number;

  @Column({ name: 'write_date', type: 'timestamp', nullable: true })
  writeDate: Date;

  @Column({ name: 'write_uid', type: 'integer', nullable: true })
  writeUid: number;

  @OneToMany(() => ProjectTask, (projectTask) => projectTask.projectId, {
    cascade: true,
  })
  tasks: ProjectTask[];

  @OneToMany(
    () => ProjectMilestone,
    (projectMilestone) => projectMilestone.projectId,
    { cascade: true },
  )
  milestones: ProjectMilestone[];

  @OneToMany(
    () => ProjectCollaborator,
    (projectCollaborator) => projectCollaborator.projectId,
    { cascade: true },
  )
  collaborators: ProjectCollaborator[];

  @ManyToMany(() => ProjectTag, (projectTag) => projectTag.projects, {
    cascade: true,
  })
  @JoinTable({
    name: 'project_project_project_tags_rel',
    joinColumn: { name: 'project_project_id' },
    inverseJoinColumn: { name: 'project_tags_id' },
  })
  tags: ProjectTag[];

  @ManyToMany(() => ProjectTaskType, (projectTaskType) => projectTaskType.projects, {
    cascade: true,
  })
  @JoinTable({
    name: 'project_task_type_rel',
    joinColumn: { name: 'project_id' },
    inverseJoinColumn: { name: 'type_id' },
  })
  taskTypes: ProjectTaskType[];
}
