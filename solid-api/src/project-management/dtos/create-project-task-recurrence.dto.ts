import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';
import { IsOptional, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectTaskRecurrenceDto {
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