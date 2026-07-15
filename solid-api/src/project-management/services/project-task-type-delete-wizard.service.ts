import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ModuleRef  } from "@nestjs/core";
import { EntityManager } from 'typeorm';
import { CRUDService } from '@solidxai/core';
import { ProjectTaskTypeDeleteWizard } from '../entities/project-task-type-delete-wizard.entity';
import { ProjectTaskTypeDeleteWizardRepository } from '../repositories/project-task-type-delete-wizard.repository';

@Injectable()
export class ProjectTaskTypeDeleteWizardService extends CRUDService<ProjectTaskTypeDeleteWizard>{
  constructor(
    @InjectEntityManager("default")
    readonly entityManager: EntityManager,
    readonly repo: ProjectTaskTypeDeleteWizardRepository,
    readonly moduleRef: ModuleRef,
      
 ) {
   super(entityManager, repo, 'projectTaskTypeDeleteWizard', 'project-management', moduleRef);
 }
}