import { Injectable } from '@nestjs/common';
import { SecurityRuleRepository } from '@solidxai/core';
import { SolidBaseRepository } from '@solidxai/core' ;
import { RequestContextService } from '@solidxai/core';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { ProjectTaskTypeDeleteWizard } from '../entities/project-task-type-delete-wizard.entity';

@Injectable()
export class ProjectTaskTypeDeleteWizardRepository extends SolidBaseRepository<ProjectTaskTypeDeleteWizard> {
    constructor(
        @InjectDataSource("default")
        readonly dataSource: DataSource,
        readonly requestContextService: RequestContextService,
        readonly securityRuleRepository: SecurityRuleRepository,
    ) {
        super(ProjectTaskTypeDeleteWizard, dataSource, requestContextService, securityRuleRepository);
    }
}