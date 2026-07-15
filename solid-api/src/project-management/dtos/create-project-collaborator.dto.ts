import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';
import { IsOptional, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectCollaboratorDto {
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

    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    partnerId: number;

    @IsOptional()
    @IsInt()
    @ApiProperty({ description: "Project Id" })
    projectIdId: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: "Project Id" })
    projectIdUserKey: string;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    writeDate: Date;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    writeUid: number;
}