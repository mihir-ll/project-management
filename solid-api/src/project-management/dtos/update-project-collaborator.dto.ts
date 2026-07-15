import { IsInt,IsOptional, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectCollaboratorDto {
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

    @IsNotEmpty()
    @IsOptional()
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