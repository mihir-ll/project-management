import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';
import { IsOptional, IsInt, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectMilestoneDto {
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
    deadline: Date;

    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    isReached: boolean = false;

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
    @ApiProperty({ description: "Project Id" })
    projectIdId: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: "Project Id" })
    projectIdUserKey: string;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    reachedDate: Date;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    writeDate: Date;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    writeUid: number;
}