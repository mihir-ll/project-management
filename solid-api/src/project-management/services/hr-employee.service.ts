import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ModuleRef  } from "@nestjs/core";
import { EntityManager } from 'typeorm';
import { CRUDService } from '@solidxai/core';
import { HrEmployee } from '../entities/hr-employee.entity';
import { HrEmployeeRepository } from '../repositories/hr-employee.repository';

@Injectable()
export class HrEmployeeService extends CRUDService<HrEmployee>{
  constructor(
    @InjectEntityManager("default")
    readonly entityManager: EntityManager,
    readonly repo: HrEmployeeRepository,
    readonly moduleRef: ModuleRef,
      
 ) {
   super(entityManager, repo, 'hrEmployee', 'project-management', moduleRef);
 }
}