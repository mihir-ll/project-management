import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ModuleRef  } from "@nestjs/core";
import { EntityManager } from 'typeorm';
import { CRUDService } from '@solidxai/core';
import { ProjectCollaborator } from '../entities/project-collaborator.entity';
import { ProjectCollaboratorRepository } from '../repositories/project-collaborator.repository';

@Injectable()
export class ProjectCollaboratorService extends CRUDService<ProjectCollaborator>{
  constructor(
    @InjectEntityManager("default")
    readonly entityManager: EntityManager,
    readonly repo: ProjectCollaboratorRepository,
    readonly moduleRef: ModuleRef,
      
 ) {
   super(entityManager, repo, 'projectCollaborator', 'project-management', moduleRef);
 }
}