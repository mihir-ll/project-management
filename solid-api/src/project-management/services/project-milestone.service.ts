import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ModuleRef  } from "@nestjs/core";
import { EntityManager } from 'typeorm';
import { CRUDService } from '@solidxai/core';
import { ProjectMilestone } from '../entities/project-milestone.entity';
import { ProjectMilestoneRepository } from '../repositories/project-milestone.repository';

@Injectable()
export class ProjectMilestoneService extends CRUDService<ProjectMilestone>{
  constructor(
    @InjectEntityManager("default")
    readonly entityManager: EntityManager,
    readonly repo: ProjectMilestoneRepository,
    readonly moduleRef: ModuleRef,
      
 ) {
   super(entityManager, repo, 'projectMilestone', 'project-management', moduleRef);
 }
}