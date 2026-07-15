import { Injectable } from '@nestjs/common';
import { SecurityRuleRepository } from '@solidxai/core';
import { SolidBaseRepository } from '@solidxai/core' ;
import { RequestContextService } from '@solidxai/core';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { ProjectMilestone } from '../entities/project-milestone.entity';

@Injectable()
export class ProjectMilestoneRepository extends SolidBaseRepository<ProjectMilestone> {
    constructor(
        @InjectDataSource("default")
        readonly dataSource: DataSource,
        readonly requestContextService: RequestContextService,
        readonly securityRuleRepository: SecurityRuleRepository,
    ) {
        super(ProjectMilestone, dataSource, requestContextService, securityRuleRepository);
    }
}