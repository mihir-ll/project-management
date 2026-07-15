import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ModuleRef  } from "@nestjs/core";
import { EntityManager } from 'typeorm';
import { CRUDService } from '@solidxai/core';
import { ProjectTaskUserRel } from '../entities/project-task-user-rel.entity';
import { ProjectTaskUserRelRepository } from '../repositories/project-task-user-rel.repository';

@Injectable()
export class ProjectTaskUserRelService extends CRUDService<ProjectTaskUserRel>{
  constructor(
    @InjectEntityManager("default")
    readonly entityManager: EntityManager,
    readonly repo: ProjectTaskUserRelRepository,
    readonly moduleRef: ModuleRef,
      
 ) {
   super(entityManager, repo, 'projectTaskUserRel', 'project-management', moduleRef);
 }
}