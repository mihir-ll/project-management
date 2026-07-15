import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ModuleRef  } from "@nestjs/core";
import { EntityManager } from 'typeorm';
import { CRUDService } from '@solidxai/core';
import { ProjectTaskRecurrence } from '../entities/project-task-recurrence.entity';
import { ProjectTaskRecurrenceRepository } from '../repositories/project-task-recurrence.repository';

@Injectable()
export class ProjectTaskRecurrenceService extends CRUDService<ProjectTaskRecurrence>{
  constructor(
    @InjectEntityManager("default")
    readonly entityManager: EntityManager,
    readonly repo: ProjectTaskRecurrenceRepository,
    readonly moduleRef: ModuleRef,
      
 ) {
   super(entityManager, repo, 'projectTaskRecurrence', 'project-management', moduleRef);
 }
}