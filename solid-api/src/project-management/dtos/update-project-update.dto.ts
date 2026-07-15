import { IsInt,IsOptional, IsDate, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectUpdateDto {
    @IsOptional()
    @IsInt()
    id: number;

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
    @IsOptional()
    @IsInt()
    @ApiProperty()
    legacyId: number;

    @IsNotEmpty()
    @IsOptional()
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
    @IsOptional()
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
}