import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ModuleRef  } from "@nestjs/core";
import { EntityManager } from 'typeorm';
import { CRUDService } from '@solidxai/core';
import { Project } from '../entities/project.entity';
import { ProjectRepository } from '../repositories/project.repository';

@Injectable()
export class ProjectService extends CRUDService<Project>{
  constructor(
    @InjectEntityManager("default")
    readonly entityManager: EntityManager,
    readonly repo: ProjectRepository,
    readonly moduleRef: ModuleRef,
      
 ) {
   super(entityManager, repo, 'project', 'project-management', moduleRef);
 }
}