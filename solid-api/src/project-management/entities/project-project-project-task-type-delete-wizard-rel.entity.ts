import { LegacyCommonEntityWithGeneratedId } from '@solidxai/core';
import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Project } from './project.entity';
import { ProjectTaskTypeDeleteWizard } from './project-task-type-delete-wizard.entity';

@Entity('project_project_project_task_type_delete_wizard_rel')
export class ProjectProjectProjectTaskTypeDeleteWizardRel extends LegacyCommonEntityWithGeneratedId {
  @PrimaryColumn({ name: 'project_project_id', type: 'integer' })
  projectProjectIdValue: number;

  @PrimaryColumn({ name: 'project_task_type_delete_wizard_id', type: 'integer' })
  projectTaskTypeDeleteWizardIdValue: number;

  @ManyToOne(() => Project, { nullable: false })
  @JoinColumn({ name: 'project_project_id' })
  projectProjectId: Project;

  @ManyToOne(() => ProjectTaskTypeDeleteWizard, { nullable: false })
  @JoinColumn({ name: 'project_task_type_delete_wizard_id' })
  projectTaskTypeDeleteWizardId: ProjectTaskTypeDeleteWizard;
}
