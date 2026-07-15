import { LegacyCommonEntityWithGeneratedId } from '@solidxai/core';
import { Entity, Column, PrimaryColumn, ManyToMany } from 'typeorm';
import { Project } from './project.entity';
import { ProjectTask } from './project-task.entity';

@Entity('project_tags')
export class ProjectTag extends LegacyCommonEntityWithGeneratedId {
  @Column({ name: 'color', type: 'integer', nullable: true })
  color: number;

  @Column({ name: 'create_date', type: 'timestamp', nullable: true })
  createDate: Date;

  @Column({ name: 'create_uid', type: 'integer', nullable: true })
  createUid: number;

  @PrimaryColumn({ name: 'id', type: 'integer' })
  legacyId: number;

  @Column({ name: 'name', type: 'jsonb' })
  name: any;

  @Column({ name: 'write_date', type: 'timestamp', nullable: true })
  writeDate: Date;

  @Column({ name: 'write_uid', type: 'integer', nullable: true })
  writeUid: number;

  @ManyToMany(() => Project, (project) => project.tags)
  projects: Project[];

  @ManyToMany(() => ProjectTask, (projectTask) => projectTask.tags)
  tasks: ProjectTask[];
}
