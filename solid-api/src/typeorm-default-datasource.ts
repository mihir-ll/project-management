import * as SolidCoreModuleExports from '@solidxai/core';
import { getDynamicModuleNames, parseBooleanEnv } from '@solidxai/core';
import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';
import 'reflect-metadata';
import { DataSource, getMetadataArgsStorage } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { HrApplicant } from './project-management/entities/hr-applicant.entity';
import { HrEmployee } from './project-management/entities/hr-employee.entity';
import { ProjectCollaborator } from './project-management/entities/project-collaborator.entity';
import { ProjectMilestone } from './project-management/entities/project-milestone.entity';
import { ProjectProjectProjectTaskTypeDeleteWizardRel } from './project-management/entities/project-project-project-task-type-delete-wizard-rel.entity';
import { ProjectProjectStage } from './project-management/entities/project-project-stage.entity';
import { ProjectProjectStageProjectStageDeleteWizardRel } from './project-management/entities/project-project-stage-project-stage-delete-wizard-rel.entity';
import { ProjectShareWizard } from './project-management/entities/project-share-wizard.entity';
import { ProjectStageDeleteWizard } from './project-management/entities/project-stage-delete-wizard.entity';
import { ProjectTag } from './project-management/entities/project-tag.entity';
import { ProjectTaskRecurrence } from './project-management/entities/project-task-recurrence.entity';
import { ProjectTaskTypeDeleteWizard } from './project-management/entities/project-task-type-delete-wizard.entity';
import { ProjectTaskTypeProjectTaskTypeDeleteWizardRel } from './project-management/entities/project-task-type-project-task-type-delete-wizard-rel.entity';
import { ProjectTaskType } from './project-management/entities/project-task-type.entity';
import { ProjectTaskUserRel } from './project-management/entities/project-task-user-rel.entity';
import { ProjectTask } from './project-management/entities/project-task.entity';
import { ProjectUpdate } from './project-management/entities/project-update.entity';
import { Project } from './project-management/entities/project.entity';

dotenvConfig({ path: join(__dirname, '../.env') });

function getEntitiesFromExports(exports: Record<string, any>) {
    const metadataStorage = getMetadataArgsStorage();
    return Object.values(exports).filter((item) =>
        metadataStorage.tables.some((table) => table.target === item),
    );
}

const coreEntities = getEntitiesFromExports(SolidCoreModuleExports);
const dynamicModules = getDynamicModuleNames();
const entities = [
    ...coreEntities,
    Project,
    ProjectTask,
    ProjectUpdate,
    ProjectTag,
    ProjectTaskType,
    ProjectProjectProjectTaskTypeDeleteWizardRel,
    ProjectProjectStage,
    ProjectProjectStageProjectStageDeleteWizardRel,
    ProjectMilestone,
    ProjectTaskRecurrence,
    ProjectStageDeleteWizard,
    ProjectShareWizard,
    ProjectTaskTypeDeleteWizard,
    ProjectTaskTypeProjectTaskTypeDeleteWizardRel,
    ProjectTaskUserRel,
    HrEmployee,
    HrApplicant,
    ProjectCollaborator
];
const logging = parseBooleanEnv('DEFAULT_DATABASE_LOGGING');
// IMPORTANT: synchronize must be false when using migrations
export const DefaultDataSource = new DataSource({
    type: 'postgres',

    host: process.env.DEFAULT_DATABASE_HOST,
    port: +(process.env.DEFAULT_DATABASE_PORT || 5432),
    username: process.env.DEFAULT_DATABASE_USER,
    password: process.env.DEFAULT_DATABASE_PASSWORD,
    database: process.env.DEFAULT_DATABASE_NAME,

    entities,
    migrations: [
        join(__dirname, './project-management/migrations/default/*.{ts,js}'),
    ],
    synchronize: false,
    logging,
    namingStrategy: new SnakeNamingStrategy(),
});
