import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ModuleRef  } from "@nestjs/core";
import { EntityManager } from 'typeorm';
import { CRUDService } from '@solidxai/core';
import { HrApplicant } from '../entities/hr-applicant.entity';
import { HrApplicantRepository } from '../repositories/hr-applicant.repository';

@Injectable()
export class HrApplicantService extends CRUDService<HrApplicant>{
  constructor(
    @InjectEntityManager("default")
    readonly entityManager: EntityManager,
    readonly repo: HrApplicantRepository,
    readonly moduleRef: ModuleRef,
      
 ) {
   super(entityManager, repo, 'hrApplicant', 'project-management', moduleRef);
 }
}