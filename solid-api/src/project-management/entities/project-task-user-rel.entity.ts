import { LegacyCommonEntityWithGeneratedId } from '@solidxai/core';
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import { ProjectProjectStage } from './project-project-stage.entity';
import { ProjectTask } from './project-task.entity'

@Entity('project_task_user_rel')
export class ProjectTaskUserRel extends LegacyCommonEntityWithGeneratedId {
    @Column({ name: "create_date", type: "timestamp", nullable: true })
    createDate: Date;

    @Column({ name: "create_uid", type: "integer", nullable: true })
    createUid: number;

    @PrimaryColumn({ name: "id", type: "integer" })
    legacyId: number;

    @ManyToOne(() => ProjectProjectStage, { nullable: true })
    @JoinColumn({ name: "stage_id" })
    stageId: ProjectProjectStage;

    @ManyToOne(() => ProjectTask, { nullable: false })
    @JoinColumn({ name: "task_id" })
    taskId: ProjectTask;

    @Column({ name: "user_id", type: "integer" })
    userId: number;

    @Column({ name: "write_date", type: "timestamp", nullable: true })
    writeDate: Date;

    @Column({ name: "write_uid", type: "integer", nullable: true })
    writeUid: number;
}
