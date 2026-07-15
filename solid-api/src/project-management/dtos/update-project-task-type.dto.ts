import { IsInt,IsOptional, IsBoolean, IsDate, IsJSON, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectTaskTypeDto {
    @IsOptional()
    @IsInt()
    id: number;

    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    active: boolean;

    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    autoValidationState: boolean;

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
    fold: boolean;

    @IsNotEmpty()
    @IsOptional()
    @IsInt()
    @ApiProperty()
    legacyId: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    mailTemplateId: number;

    @IsNotEmpty()
    @IsOptional()
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