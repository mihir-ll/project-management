import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsOptional, IsBoolean, IsNumber, IsInt, IsDate, IsNotEmpty, IsJSON, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateProjectTaskUserRelDto } from './update-project-task-user-rel.dto';

export class CreateProjectTaskDto {
    @IsOptional()
    @IsString()
    @ApiProperty()
    accessToken: string;

    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    active: boolean = false;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    allocatedHours: number;

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
    dateAssign: Date;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    dateDeadline: Date;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    dateEnd: Date;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    dateLastStageUpdate: Date;

    @IsOptional()
    @IsString()
    @ApiProperty()
    description: string;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    displayedImageId: number;

    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    displayInProject: boolean = false;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    effectiveHours: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    emailCc: string;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    legacyId: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    milestoneId: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    overtime: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    parentId: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    partnerId: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    priority: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    progress: number;

    @IsOptional()
    @IsInt()
    @ApiProperty({ description: "Project Id" })
    projectIdId: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: "Project Id" })
    projectIdUserKey: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    ratingLastValue: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    recurrenceId: number;

    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    recurringTask: boolean = false;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    remainingHours: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    sequence: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    stageId: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    state: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    subtaskEffectiveHours: number;

    @IsOptional()
    @IsJSON()
    @ApiProperty()
    taskProperties: any;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    totalHoursSpent: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    workingDaysClose: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    workingDaysOpen: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    workingHoursClose: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    workingHoursOpen: number;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    writeDate: Date;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    writeUid: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    xComplexity: string;

    @IsOptional()
    @ApiProperty({ description: "ProjectTaskUserRels" })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateProjectTaskUserRelDto)
    projectTaskUserRels: UpdateProjectTaskUserRelDto[];

    @IsOptional()
    @IsArray()
    @ApiProperty({ description: "ProjectTaskUserRels" })
    projectTaskUserRelsIds: number[];

    @IsString()
    @IsOptional()
    @ApiProperty({ description: "ProjectTaskUserRels" })
    projectTaskUserRelsCommand: string;
}