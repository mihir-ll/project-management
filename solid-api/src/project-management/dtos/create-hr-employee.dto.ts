import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { IsOptional, IsString, IsInt, IsDate, IsNotEmpty, IsJSON, IsNumber } from 'class-validator';

export class CreateHrEmployeeDto {
    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    active: boolean = false;

    @IsOptional()
    @IsString()
    @ApiProperty()
    additionalNote: string;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    addressId: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    bankAccountId: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    barcode: string;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    birthday: Date;

    @IsOptional()
    @IsString()
    @ApiProperty()
    certificate: string;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    children: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    coachId: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    color: number;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    companyId: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    countryId: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    countryOfBirth: number;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    createDate: Date;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    createUid: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    departmentId: number;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    departureDate: Date;

    @IsOptional()
    @IsString()
    @ApiProperty()
    departureDescription: string;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    departureReasonId: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    emergencyContact: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    emergencyPhone: string;

    @IsOptional()
    @IsJSON()
    @ApiProperty()
    employeeProperties: any;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    employeeType: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    gender: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    hourlyCost: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    identificationId: string;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    jobId: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    jobTitle: string;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    kmHomeWork: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    lang: string;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    legacyId: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    marital: string;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    messageMainAttachmentId: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    mobilePhone: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    name: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    notes: string;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    parentId: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    passportId: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    permitNo: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    pin: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    placeOfBirth: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    privateCarPlate: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    privateCity: string;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    privateCountryId: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    privateEmail: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    privatePhone: string;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    privateStateId: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    privateStreet: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    privateStreet2: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    privateZip: string;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    resourceCalendarId: number;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    resourceId: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    sinid: string;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    spouseBirthdate: Date;

    @IsOptional()
    @IsString()
    @ApiProperty()
    spouseCompleteName: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    ssnid: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    studyField: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    studySchool: string;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    userId: number;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    visaExpire: Date;

    @IsOptional()
    @IsString()
    @ApiProperty()
    visaNo: string;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    workContactId: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    workEmail: string;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    workLocationId: number;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    workPermitExpirationDate: Date;

    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    workPermitScheduledActivity: boolean = false;

    @IsOptional()
    @IsString()
    @ApiProperty()
    workPhone: string;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    writeDate: Date;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    writeUid: number;
}