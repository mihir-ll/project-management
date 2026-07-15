import { Injectable } from '@nestjs/common';
import { SecurityRuleRepository } from '@solidxai/core';
import { SolidBaseRepository } from '@solidxai/core' ;
import { RequestContextService } from '@solidxai/core';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { ProjectTaskUserRel } from '../entities/project-task-user-rel.entity';

@Injectable()
export class ProjectTaskUserRelRepository extends SolidBaseRepository<ProjectTaskUserRel> {
    constructor(
        @InjectDataSource("default")
        readonly dataSource: DataSource,
        readonly requestContextService: RequestContextService,
        readonly securityRuleRepository: SecurityRuleRepository,
    ) {
        super(ProjectTaskUserRel, dataSource, requestContextService, securityRuleRepository);
    }
}