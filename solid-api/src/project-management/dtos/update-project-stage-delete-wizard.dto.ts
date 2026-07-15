import { IsInt,IsOptional, IsDate, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectStageDeleteWizardDto {
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
    @IsDate()
    @ApiProperty()
    writeDate: Date;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    writeUid: number;
}