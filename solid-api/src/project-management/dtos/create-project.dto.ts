import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import {
  IsOptional,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsJSON,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateProjectTaskDto } from './update-project-task.dto';
import { UpdateProjectMilestoneDto } from './update-project-milestone.dto';
import { UpdateProjectCollaboratorDto } from './update-project-collaborator.dto';
import { UpdateProjectTagDto } from './update-project-tag.dto';

export class CreateProjectDto {
    @IsOptional()
    @IsString()
    @ApiProperty()
    accessToken: string;

    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    active: boolean = false;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    aliasId: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    allocatedHours: number;

    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    allowMilestones: boolean = false;

    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    allowTaskDependencies: boolean = false;

    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    allowTimesheets: boolean = false;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    analyticAccountId: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    color: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    companyId: number;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    createDate: Date;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    createUid: number;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    date: Date;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    dateStart: Date;

    @IsOptional()
    @IsString()
    @ApiProperty()
    description: string;

    @IsOptional()
    @IsJSON()
    @ApiProperty()
    labelTasks: any;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    lastUpdateId: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    lastUpdateStatus: string;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    legacyId: number;

    @IsNotEmpty()
    @IsJSON()
    @ApiProperty()
    name: any;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    partnerId: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    privacyVisibility: string;

    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    ratingActive: boolean = false;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    ratingRequestDeadline: Date;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    ratingStatus: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    ratingStatusPeriod: string;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    sequence: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    stageId: number;

    @IsOptional()
    @IsJSON()
    @ApiProperty()
    taskPropertiesDefinition: any;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    userId: number;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    writeDate: Date;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    writeUid: number;

    @IsOptional()
    @ApiProperty({ description: "Tasks" })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateProjectTaskDto)
    tasks: UpdateProjectTaskDto[];

    @IsOptional()
    @IsArray()
    @ApiProperty({ description: "Tasks" })
    tasksIds: number[];

    @IsString()
    @IsOptional()
    @ApiProperty({ description: "Tasks" })
    tasksCommand: string;

    @IsOptional()
    @IsArray()
    @ApiProperty({ description: "Collaborators" })
    collaboratorsIds: number[];

    @IsString()
    @IsOptional()
    @ApiProperty({ description: "Collaborators" })
    collaboratorsCommand: string;

    @IsOptional()
    @ApiProperty({ description: "Milestones" })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateProjectMilestoneDto)
    milestones: UpdateProjectMilestoneDto[];

    @IsOptional()
    @IsArray()
    @ApiProperty({ description: "Milestones" })
    milestonesIds: number[];

    @IsString()
    @IsOptional()
    @ApiProperty({ description: "Milestones" })
    milestonesCommand: string;

    @IsOptional()
    @ApiProperty({ description: "Collaborators" })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateProjectCollaboratorDto)
    collaborators: UpdateProjectCollaboratorDto[];

    @IsOptional()
    @IsArray()
    @ApiProperty({ description: "Tags of this project" })
    tagsIds: number[];

    @IsString()
    @IsOptional()
    @ApiProperty({ description: "Tags of this project" })
    tagsCommand: string;

    @IsOptional()
    @ApiProperty({ description: "Tags of this project" })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateProjectTagDto)
    tags: UpdateProjectTagDto[];
}
