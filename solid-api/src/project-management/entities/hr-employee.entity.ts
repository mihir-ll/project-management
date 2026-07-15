import { LegacyCommonEntityWithGeneratedId } from '@solidxai/core';
import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity('hr_employee')
export class HrEmployee extends LegacyCommonEntityWithGeneratedId {
    @Column({ name: "active", type: "boolean", nullable: true, default: false })
    active: boolean = false;

    @Column({ name: "additional_note", type: "text", nullable: true })
    additionalNote: string;

    @Column({ name: "address_id", type: "integer", nullable: true })
    addressId: number;

    @Column({ name: "bank_account_id", type: "integer", nullable: true })
    bankAccountId: number;

    @Column({ name: "barcode", type: "varchar", nullable: true })
    barcode: string;

    @Column({ name: "birthday", type: "date", nullable: true })
    birthday: Date;

    @Column({ name: "certificate", type: "varchar", nullable: true })
    certificate: string;

    @Column({ name: "children", type: "integer", nullable: true })
    children: number;

    @Column({ name: "coach_id", type: "integer", nullable: true })
    coachId: number;

    @Column({ name: "color", type: "integer", nullable: true })
    color: number;

    @Column({ name: "company_id", type: "integer" })
    companyId: number;

    @Column({ name: "country_id", type: "integer", nullable: true })
    countryId: number;

    @Column({ name: "country_of_birth", type: "integer", nullable: true })
    countryOfBirth: number;

    @Column({ name: "create_date", type: "timestamp", nullable: true })
    createDate: Date;

    @Column({ name: "create_uid", type: "integer", nullable: true })
    createUid: number;

    @Column({ name: "department_id", type: "integer", nullable: true })
    departmentId: number;

    @Column({ name: "departure_date", type: "date", nullable: true })
    departureDate: Date;

    @Column({ name: "departure_description", type: "text", nullable: true })
    departureDescription: string;

    @Column({ name: "departure_reason_id", type: "integer", nullable: true })
    departureReasonId: number;

    @Column({ name: "emergency_contact", type: "varchar", nullable: true })
    emergencyContact: string;

    @Column({ name: "emergency_phone", type: "varchar", nullable: true })
    emergencyPhone: string;

    @Column({ name: "employee_properties", type: "jsonb", nullable: true })
    employeeProperties: any;

    @Column({ name: "employee_type", type: "varchar" })
    employeeType: string;

    @Column({ name: "gender", type: "varchar", nullable: true })
    gender: string;

    @Column({ name: "hourly_cost", type: "decimal", nullable: true })
    hourlyCost: number;

    @Column({ name: "identification_id", type: "varchar", nullable: true })
    identificationId: string;

    @Column({ name: "job_id", type: "integer", nullable: true })
    jobId: number;

    @Column({ name: "job_title", type: "varchar", nullable: true })
    jobTitle: string;

    @Column({ name: "km_home_work", type: "integer", nullable: true })
    kmHomeWork: number;

    @Column({ name: "lang", type: "varchar", nullable: true })
    lang: string;

    @PrimaryColumn({ name: "id", type: "integer" })
    legacyId: number;

    @Column({ name: "marital", type: "varchar", nullable: true })
    marital: string;

    @Column({ name: "message_main_attachment_id", type: "integer", nullable: true })
    messageMainAttachmentId: number;

    @Column({ name: "mobile_phone", type: "varchar", nullable: true })
    mobilePhone: string;

    @Column({ name: "name", type: "varchar", nullable: true })
    name: string;

    @Column({ name: "notes", type: "text", nullable: true })
    notes: string;

    @Column({ name: "parent_id", type: "integer", nullable: true })
    parentId: number;

    @Column({ name: "passport_id", type: "varchar", nullable: true })
    passportId: string;

    @Column({ name: "permit_no", type: "varchar", nullable: true })
    permitNo: string;

    @Column({ name: "pin", type: "varchar", nullable: true })
    pin: string;

    @Column({ name: "place_of_birth", type: "varchar", nullable: true })
    placeOfBirth: string;

    @Column({ name: "private_car_plate", type: "varchar", nullable: true })
    privateCarPlate: string;

    @Column({ name: "private_city", type: "varchar", nullable: true })
    privateCity: string;

    @Column({ name: "private_country_id", type: "integer", nullable: true })
    privateCountryId: number;

    @Column({ name: "private_email", type: "varchar", nullable: true })
    privateEmail: string;

    @Column({ name: "private_phone", type: "varchar", nullable: true })
    privatePhone: string;

    @Column({ name: "private_state_id", type: "integer", nullable: true })
    privateStateId: number;

    @Column({ name: "private_street", type: "varchar", nullable: true })
    privateStreet: string;

    @Column({ name: "private_street2", type: "varchar", nullable: true })
    privateStreet2: string;

    @Column({ name: "private_zip", type: "varchar", nullable: true })
    privateZip: string;

    @Column({ name: "resource_calendar_id", type: "integer", nullable: true })
    resourceCalendarId: number;

    @Column({ name: "resource_id", type: "integer" })
    resourceId: number;

    @Column({ name: "sinid", type: "varchar", nullable: true })
    sinid: string;

    @Column({ name: "spouse_birthdate", type: "date", nullable: true })
    spouseBirthdate: Date;

    @Column({ name: "spouse_complete_name", type: "varchar", nullable: true })
    spouseCompleteName: string;

    @Column({ name: "ssnid", type: "varchar", nullable: true })
    ssnid: string;

    @Column({ name: "study_field", type: "varchar", nullable: true })
    studyField: string;

    @Column({ name: "study_school", type: "varchar", nullable: true })
    studySchool: string;

    @Column({ name: "user_id", type: "integer", nullable: true })
    userId: number;

    @Column({ name: "visa_expire", type: "date", nullable: true })
    visaExpire: Date;

    @Column({ name: "visa_no", type: "varchar", nullable: true })
    visaNo: string;

    @Column({ name: "work_contact_id", type: "integer", nullable: true })
    workContactId: number;

    @Column({ name: "work_email", type: "varchar", nullable: true })
    workEmail: string;

    @Column({ name: "work_location_id", type: "integer", nullable: true })
    workLocationId: number;

    @Column({ name: "work_permit_expiration_date", type: "date", nullable: true })
    workPermitExpirationDate: Date;

    @Column({ name: "work_permit_scheduled_activity", type: "boolean", nullable: true, default: false })
    workPermitScheduledActivity: boolean = false;

    @Column({ name: "work_phone", type: "varchar", nullable: true })
    workPhone: string;

    @Column({ name: "write_date", type: "timestamp", nullable: true })
    writeDate: Date;

    @Column({ name: "write_uid", type: "integer", nullable: true })
    writeUid: number;
}
