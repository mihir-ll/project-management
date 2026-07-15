import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ModuleRef  } from "@nestjs/core";
import { EntityManager } from 'typeorm';
import { CRUDService } from '@solidxai/core';
import { ProjectTaskType } from '../entities/project-task-type.entity';
import { ProjectTaskTypeRepository } from '../repositories/project-task-type.repository';

@Injectable()
export class ProjectTaskTypeService extends CRUDService<ProjectTaskType>{
  constructor(
    @InjectEntityManager("default")
    readonly entityManager: EntityManager,
    readonly repo: ProjectTaskTypeRepository,
    readonly moduleRef: ModuleRef,
      
 ) {
   super(entityManager, repo, 'projectTaskType', 'project-management', moduleRef);
 }
}