import { IsInt,IsOptional, IsString, IsNotEmpty, IsDate, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectShareWizardDto {
    @IsOptional()
    @IsInt()
    id: number;

    @IsNotEmpty()
    @IsOptional()
    @IsString()
    @ApiProperty()
    resModel: string;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    writeDate: Date;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    writeUid: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    accessMode: string;

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
    displayAccessMode: boolean;

    @IsNotEmpty()
    @IsOptional()
    @IsInt()
    @ApiProperty()
    legacyId: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    note: string;

    @IsNotEmpty()
    @IsOptional()
    @IsInt()
    @ApiProperty()
    resId: number;
}