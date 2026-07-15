import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';
import { IsOptional, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectTaskUserRelDto {
    @IsOptional()
    @IsDate()
    @ApiProperty()
    createDate: Date;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    createUid: number;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    legacyId: number;

    @IsOptional()
    @IsInt()
    @ApiProperty({ description: "Stage Id" })
    stageIdId: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: "Stage Id" })
    stageIdUserKey: string;

    @IsOptional()
    @IsInt()
    @ApiProperty({ description: "Task Id" })
    taskIdId: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: "Task Id" })
    taskIdUserKey: string;

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