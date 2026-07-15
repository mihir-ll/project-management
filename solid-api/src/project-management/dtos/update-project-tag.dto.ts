import { IsInt,IsOptional, IsDate, IsNotEmpty, IsJSON } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectTagDto {
    @IsOptional()
    @IsInt()
    id: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    color: number;

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

    @IsNotEmpty()
    @IsOptional()
    @IsJSON()
    @ApiProperty()
    name: any;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    writeDate: Date;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    writeUid: number;
}