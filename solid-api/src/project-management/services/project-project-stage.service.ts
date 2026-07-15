import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ModuleRef  } from "@nestjs/core";
import { EntityManager } from 'typeorm';
import { CRUDService } from '@solidxai/core';
import { ProjectProjectStage } from '../entities/project-project-stage.entity';
import { ProjectProjectStageRepository } from '../repositories/project-project-stage.repository';

@Injectable()
export class ProjectProjectStageService extends CRUDService<ProjectProjectStage>{
  constructor(
    @InjectEntityManager("default")
    readonly entityManager: EntityManager,
    readonly repo: ProjectProjectStageRepository,
    readonly moduleRef: ModuleRef,
      
 ) {
   super(entityManager, repo, 'projectProjectStage', 'project-management', moduleRef);
 }
}