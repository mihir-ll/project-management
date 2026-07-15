import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { IsOptional, IsInt, IsDate, IsNotEmpty, IsJSON, ValidateNested, IsArray, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateProjectTaskUserRelDto } from './update-project-task-user-rel.dto';

export class CreateProjectProjectStageDto {
    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    active: boolean = false;

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
    @IsBoolean()
    @ApiProperty()
    fold: boolean = false;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    legacyId: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    mailTemplateId: number;

    @IsNotEmpty()
    @IsJSON()
    @ApiProperty()
    name: any;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    sequence: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    smsTemplateId: number;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    writeDate: Date;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    writeUid: number;

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