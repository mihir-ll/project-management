import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { IsOptional, IsDate, IsString, IsNotEmpty } from 'class-validator';

export class CreateProjectUpdateDto {
    @IsOptional()
    @IsInt()
    @ApiProperty()
    allocatedTime: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    closedTaskCount: number;

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
    @IsString()
    @ApiProperty()
    description: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    emailCc: string;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    legacyId: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;

    @IsOptional()
    @IsInt()
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

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    status: string;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    taskCount: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    timesheetTime: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    uomId: number;

    @IsNotEmpty()
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
}