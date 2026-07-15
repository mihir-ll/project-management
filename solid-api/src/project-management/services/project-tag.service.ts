import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ModuleRef  } from "@nestjs/core";
import { EntityManager } from 'typeorm';
import { CRUDService } from '@solidxai/core';
import { ProjectTag } from '../entities/project-tag.entity';
import { ProjectTagRepository } from '../repositories/project-tag.repository';

@Injectable()
export class ProjectTagService extends CRUDService<ProjectTag>{
  constructor(
    @InjectEntityManager("default")
    readonly entityManager: EntityManager,
    readonly repo: ProjectTagRepository,
    readonly moduleRef: ModuleRef,
      
 ) {
   super(entityManager, repo, 'projectTag', 'project-management', moduleRef);
 }
}