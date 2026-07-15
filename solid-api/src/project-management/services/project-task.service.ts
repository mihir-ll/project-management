import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ModuleRef  } from "@nestjs/core";
import { EntityManager } from 'typeorm';
import { CRUDService } from '@solidxai/core';
import { ProjectTask } from '../entities/project-task.entity';
import { ProjectTaskRepository } from '../repositories/project-task.repository';

@Injectable()
export class ProjectTaskService extends CRUDService<ProjectTask>{
  constructor(
    @InjectEntityManager("default")
    readonly entityManager: EntityManager,
    readonly repo: ProjectTaskRepository,
    readonly moduleRef: ModuleRef,
      
 ) {
   super(entityManager, repo, 'projectTask', 'project-management', moduleRef);
 }
}