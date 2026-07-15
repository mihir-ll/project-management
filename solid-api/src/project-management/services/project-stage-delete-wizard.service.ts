import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ModuleRef  } from "@nestjs/core";
import { EntityManager } from 'typeorm';
import { CRUDService } from '@solidxai/core';
import { ProjectStageDeleteWizard } from '../entities/project-stage-delete-wizard.entity';
import { ProjectStageDeleteWizardRepository } from '../repositories/project-stage-delete-wizard.repository';

@Injectable()
export class ProjectStageDeleteWizardService extends CRUDService<ProjectStageDeleteWizard>{
  constructor(
    @InjectEntityManager("default")
    readonly entityManager: EntityManager,
    readonly repo: ProjectStageDeleteWizardRepository,
    readonly moduleRef: ModuleRef,
      
 ) {
   super(entityManager, repo, 'projectStageDeleteWizard', 'project-management', moduleRef);
 }
}