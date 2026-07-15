import { IsInt,IsOptional, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectTaskRecurrenceDto {
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
    @ApiProperty()
    repeatInterval: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    repeatType: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    repeatUnit: string;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    repeatUntil: Date;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    writeDate: Date;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    writeUid: number;
}