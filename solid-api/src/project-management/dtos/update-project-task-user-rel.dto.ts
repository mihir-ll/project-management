import { IsInt,IsOptional, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectTaskUserRelDto {
    @IsOptional()
    @IsInt()
    id: number;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    createDate: Date;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    createUid: number;

    @IsNotEmpty()
    @IsOptional()
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