import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsNotEmpty, IsDate, IsOptional, IsInt, IsBoolean } from 'class-validator';

export class CreateProjectShareWizardDto {
    @IsNotEmpty()
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
    displayAccessMode: boolean = false;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    legacyId: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    note: string;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    resId: number;
}