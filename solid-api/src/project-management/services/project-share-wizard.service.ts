import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ModuleRef  } from "@nestjs/core";
import { EntityManager } from 'typeorm';
import { CRUDService } from '@solidxai/core';
import { ProjectShareWizard } from '../entities/project-share-wizard.entity';
import { ProjectShareWizardRepository } from '../repositories/project-share-wizard.repository';

@Injectable()
export class ProjectShareWizardService extends CRUDService<ProjectShareWizard>{
  constructor(
    @InjectEntityManager("default")
    readonly entityManager: EntityManager,
    readonly repo: ProjectShareWizardRepository,
    readonly moduleRef: ModuleRef,
      
 ) {
   super(entityManager, repo, 'projectShareWizard', 'project-management', moduleRef);
 }
}