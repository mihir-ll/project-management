import { LegacyCommonEntityWithGeneratedId } from '@solidxai/core';
import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { ProjectProjectStage } from './project-project-stage.entity';
import { ProjectStageDeleteWizard } from './project-stage-delete-wizard.entity';

@Entity('project_project_stage_project_project_stage_delete_wizard_rel')
export class ProjectProjectStageProjectStageDeleteWizardRel extends LegacyCommonEntityWithGeneratedId {
  @PrimaryColumn({ name: 'project_project_stage_id', type: 'integer' })
  projectProjectStageIdValue: number;

  @PrimaryColumn({ name: 'project_project_stage_delete_wizard_id', type: 'integer' })
  projectProjectStageDeleteWizardIdValue: number;

  @ManyToOne(() => ProjectProjectStage, { nullable: false })
  @JoinColumn({ name: 'project_project_stage_id' })
  projectProjectStageId: ProjectProjectStage;

  @ManyToOne(() => ProjectStageDeleteWizard, { nullable: false })
  @JoinColumn({ name: 'project_project_stage_delete_wizard_id' })
  projectProjectStageDeleteWizardId: ProjectStageDeleteWizard;
}
