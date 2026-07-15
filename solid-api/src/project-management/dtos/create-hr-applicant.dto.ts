import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { IsOptional, IsJSON, IsDate, IsInt, IsNumber, IsString, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateHrApplicantDto {
    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    active: boolean = false;

    @IsOptional()
    @IsJSON()
    @ApiProperty()
    applicantProperties: any;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    availability: Date;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    campaignId: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    color: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    companyId: number;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    createDate: Date;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    createUid: number;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    dateClosed: Date;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    dateLastStageUpdate: Date;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    dateOpen: Date;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    delayClose: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    departmentId: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    description: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    emailCc: string;

    @MaxLength(128)
    @IsOptional()
    @IsString()
    @ApiProperty()
    emailFrom: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    emailNormalized: string;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    empId: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    jobId: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    kanbanState: string;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    lastStageId: number;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    legacyId: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    linkedinProfile: string;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    mediumId: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    messageBounce: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    messageMainAttachmentId: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    partnerId: number;

    @MaxLength(32)
    @IsOptional()
    @IsString()
    @ApiProperty()
    partnerMobile: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    partnerMobileSanitized: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    partnerName: string;

    @MaxLength(32)
    @IsOptional()
    @IsString()
    @ApiProperty()
    partnerPhone: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    partnerPhoneSanitized: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    phoneSanitized: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    preferredLocation: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    priority: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    probability: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    refuseReasonId: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    releventYearsExp: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    salaryExpected: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    salaryExpectedExtra: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    salaryProposed: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    salaryProposedExtra: string;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    sourceId: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    stageId: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    totalYearsExp: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    typeId: number;

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

    @MaxLength(256)
    @IsOptional()
    @IsString()
    @ApiProperty()
    xCurrentLocationCity: string;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    xCurrentSalary: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    xNoticePeriodMonths: string;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    xNoYearsExp: number;
}