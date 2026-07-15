import { LegacyCommonEntityWithGeneratedId } from '@solidxai/core';
import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { ProjectTaskType } from './project-task-type.entity';
import { ProjectTaskTypeDeleteWizard } from './project-task-type-delete-wizard.entity';

@Entity('project_task_type_project_task_type_delete_wizard_rel')
export class ProjectTaskTypeProjectTaskTypeDeleteWizardRel extends LegacyCommonEntityWithGeneratedId {
  @PrimaryColumn({ name: 'project_task_type_id', type: 'integer' })
  projectTaskTypeIdValue: number;

  @PrimaryColumn({ name: 'project_task_type_delete_wizard_id', type: 'integer' })
  projectTaskTypeDeleteWizardIdValue: number;

  @ManyToOne(() => ProjectTaskType, { nullable: false })
  @JoinColumn({ name: 'project_task_type_id' })
  projectTaskTypeId: ProjectTaskType;

  @ManyToOne(() => ProjectTaskTypeDeleteWizard, { nullable: false })
  @JoinColumn({ name: 'project_task_type_delete_wizard_id' })
  projectTaskTypeDeleteWizardId: ProjectTaskTypeDeleteWizard;
}
