import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { IsOptional, IsDate, IsInt, IsJSON, IsNotEmpty } from 'class-validator';

export class CreateProjectTaskTypeDto {
    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    active: boolean = false;

    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    autoValidationState: boolean = false;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    createDate: Date;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    createUid: number;

    @IsOptional()
    @IsJSON()
    @ApiProperty()
    description: any;

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
    ratingTemplateId: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    sequence: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    smsTemplateId: number;

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