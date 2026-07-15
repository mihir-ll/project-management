import { Injectable } from '@nestjs/common';
import { SecurityRuleRepository } from '@solidxai/core';
import { SolidBaseRepository } from '@solidxai/core' ;
import { RequestContextService } from '@solidxai/core';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { ProjectStageDeleteWizard } from '../entities/project-stage-delete-wizard.entity';

@Injectable()
export class ProjectStageDeleteWizardRepository extends SolidBaseRepository<ProjectStageDeleteWizard> {
    constructor(
        @InjectDataSource("default")
        readonly dataSource: DataSource,
        readonly requestContextService: RequestContextService,
        readonly securityRuleRepository: SecurityRuleRepository,
    ) {
        super(ProjectStageDeleteWizard, dataSource, requestContextService, securityRuleRepository);
    }
}