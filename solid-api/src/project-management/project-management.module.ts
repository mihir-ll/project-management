import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectService } from './services/project.service';
import { ProjectController } from './controllers/project.controller';
import { ProjectRepository } from './repositories/project.repository';
import { ProjectTask } from './entities/project-task.entity';
import { ProjectTaskService } from './services/project-task.service';
import { ProjectTaskController } from './controllers/project-task.controller';
import { ProjectTaskRepository } from './repositories/project-task.repository';
import { ProjectUpdate } from './entities/project-update.entity';
import { ProjectUpdateService } from './services/project-update.service';
import { ProjectUpdateController } from './controllers/project-update.controller';
import { ProjectUpdateRepository } from './repositories/project-update.repository';
import { ProjectTag } from './entities/project-tag.entity';
import { ProjectTagService } from './services/project-tag.service';
import { ProjectTagController } from './controllers/project-tag.controller';
import { ProjectTagRepository } from './repositories/project-tag.repository';
import { ProjectTaskType } from './entities/project-task-type.entity';
import { ProjectTaskTypeService } from './services/project-task-type.service';
import { ProjectTaskTypeController } from './controllers/project-task-type.controller';
import { ProjectTaskTypeRepository } from './repositories/project-task-type.repository';
import { ProjectProjectStage } from './entities/project-project-stage.entity';
import { ProjectProjectStageService } from './services/project-project-stage.service';
import { ProjectProjectStageController } from './controllers/project-project-stage.controller';
import { ProjectProjectStageRepository } from './repositories/project-project-stage.repository';
import { ProjectMilestone } from './entities/project-milestone.entity';
import { ProjectMilestoneService } from './services/project-milestone.service';
import { ProjectMilestoneController } from './controllers/project-milestone.controller';
import { ProjectMilestoneRepository } from './repositories/project-milestone.repository';
import { ProjectTaskRecurrence } from './entities/project-task-recurrence.entity';
import { ProjectTaskRecurrenceService } from './services/project-task-recurrence.service';
import { ProjectTaskRecurrenceController } from './controllers/project-task-recurrence.controller';
import { ProjectTaskRecurrenceRepository } from './repositories/project-task-recurrence.repository';
import { ProjectTaskUserRel } from './entities/project-task-user-rel.entity';
import { ProjectTaskUserRelService } from './services/project-task-user-rel.service';
import { ProjectTaskUserRelController } from './controllers/project-task-user-rel.controller';
import { ProjectTaskUserRelRepository } from './repositories/project-task-user-rel.repository';
import { ProjectStageDeleteWizard } from './entities/project-stage-delete-wizard.entity';
import { ProjectStageDeleteWizardService } from './services/project-stage-delete-wizard.service';
import { ProjectStageDeleteWizardController } from './controllers/project-stage-delete-wizard.controller';
import { ProjectStageDeleteWizardRepository } from './repositories/project-stage-delete-wizard.repository';
import { ProjectShareWizard } from './entities/project-share-wizard.entity';
import { ProjectShareWizardService } from './services/project-share-wizard.service';
import { ProjectShareWizardController } from './controllers/project-share-wizard.controller';
import { ProjectShareWizardRepository } from './repositories/project-share-wizard.repository';
import { ProjectTaskTypeDeleteWizard } from './entities/project-task-type-delete-wizard.entity';
import { ProjectTaskTypeDeleteWizardService } from './services/project-task-type-delete-wizard.service';
import { ProjectTaskTypeDeleteWizardController } from './controllers/project-task-type-delete-wizard.controller';
import { ProjectTaskTypeDeleteWizardRepository } from './repositories/project-task-type-delete-wizard.repository';
import { HrEmployee } from './entities/hr-employee.entity';
import { HrEmployeeService } from './services/hr-employee.service';
import { HrEmployeeController } from './controllers/hr-employee.controller';
import { HrEmployeeRepository } from './repositories/hr-employee.repository';
import { HrApplicant } from './entities/hr-applicant.entity';
import { HrApplicantService } from './services/hr-applicant.service';
import { HrApplicantController } from './controllers/hr-applicant.controller';
import { HrApplicantRepository } from './repositories/hr-applicant.repository';
import { ProjectCollaborator } from './entities/project-collaborator.entity';
import { ProjectCollaboratorService } from './services/project-collaborator.service';
import { ProjectCollaboratorController } from './controllers/project-collaborator.controller';
import { ProjectCollaboratorRepository } from './repositories/project-collaborator.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    TypeOrmModule.forFeature([ProjectTask]),
    TypeOrmModule.forFeature([ProjectUpdate]),
    TypeOrmModule.forFeature([ProjectTag]),
    TypeOrmModule.forFeature([ProjectTaskType]),
    TypeOrmModule.forFeature([ProjectProjectStage]),
    TypeOrmModule.forFeature([ProjectMilestone]),
    TypeOrmModule.forFeature([ProjectTaskRecurrence]),
    TypeOrmModule.forFeature([ProjectTaskUserRel]),
    TypeOrmModule.forFeature([ProjectStageDeleteWizard]),
    TypeOrmModule.forFeature([ProjectShareWizard]),
    TypeOrmModule.forFeature([ProjectTaskTypeDeleteWizard]),
    TypeOrmModule.forFeature([HrEmployee]),
    TypeOrmModule.forFeature([HrApplicant]),
    TypeOrmModule.forFeature([ProjectCollaborator]),
  ],
  controllers: [
    ProjectController,
    ProjectTaskController,
    ProjectUpdateController,
    ProjectTagController,
    ProjectTaskTypeController,
    ProjectProjectStageController,
    ProjectMilestoneController,
    ProjectTaskRecurrenceController,
    ProjectTaskUserRelController,
    ProjectStageDeleteWizardController,
    ProjectShareWizardController,
    ProjectTaskTypeDeleteWizardController,
    HrEmployeeController,
    HrApplicantController,
    ProjectCollaboratorController,
  ],
  providers: [
    ProjectService,
    ProjectRepository,
    ProjectTaskService,
    ProjectTaskRepository,
    ProjectUpdateService,
    ProjectUpdateRepository,
    ProjectTagService,
    ProjectTagRepository,
    ProjectTaskTypeService,
    ProjectTaskTypeRepository,
    ProjectProjectStageService,
    ProjectProjectStageRepository,
    ProjectMilestoneService,
    ProjectMilestoneRepository,
    ProjectTaskRecurrenceService,
    ProjectTaskRecurrenceRepository,
    ProjectTaskUserRelService,
    ProjectTaskUserRelRepository,
    ProjectStageDeleteWizardService,
    ProjectStageDeleteWizardRepository,
    ProjectShareWizardService,
    ProjectShareWizardRepository,
    ProjectTaskTypeDeleteWizardService,
    ProjectTaskTypeDeleteWizardRepository,
    HrEmployeeService,
    HrEmployeeRepository,
    HrApplicantService,
    HrApplicantRepository,
    ProjectCollaboratorService,
    ProjectCollaboratorRepository,
  ],
})
export class ProjectManagementModule {}
