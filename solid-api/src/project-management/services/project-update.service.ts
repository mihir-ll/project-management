import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ModuleRef  } from "@nestjs/core";
import { EntityManager } from 'typeorm';
import { CRUDService } from '@solidxai/core';
import { ProjectUpdate } from '../entities/project-update.entity';
import { ProjectUpdateRepository } from '../repositories/project-update.repository';

@Injectable()
export class ProjectUpdateService extends CRUDService<ProjectUpdate>{
  constructor(
    @InjectEntityManager("default")
    readonly entityManager: EntityManager,
    readonly repo: ProjectUpdateRepository,
    readonly moduleRef: ModuleRef,
      
 ) {
   super(entityManager, repo, 'projectUpdate', 'project-management', moduleRef);
 }
}