import { LegacyCommonEntityWithGeneratedId } from '@solidxai/core';
import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity('hr_applicant')
export class HrApplicant extends LegacyCommonEntityWithGeneratedId {
    @Column({ name: "active", type: "boolean", nullable: true, default: false })
    active: boolean = false;

    @Column({ name: "applicant_properties", type: "jsonb", nullable: true })
    applicantProperties: any;

    @Column({ name: "availability", type: "date", nullable: true })
    availability: Date;

    @Column({ name: "campaign_id", type: "integer", nullable: true })
    campaignId: number;

    @Column({ name: "color", type: "integer", nullable: true })
    color: number;

    @Column({ name: "company_id", type: "integer", nullable: true })
    companyId: number;

    @Column({ name: "create_date", type: "timestamp", nullable: true })
    createDate: Date;

    @Column({ name: "create_uid", type: "integer", nullable: true })
    createUid: number;

    @Column({ name: "date_closed", type: "timestamp", nullable: true })
    dateClosed: Date;

    @Column({ name: "date_last_stage_update", type: "timestamp", nullable: true })
    dateLastStageUpdate: Date;

    @Column({ name: "date_open", type: "timestamp", nullable: true })
    dateOpen: Date;

    @Column({ name: "delay_close", type: "decimal", nullable: true })
    delayClose: number;

    @Column({ name: "department_id", type: "integer", nullable: true })
    departmentId: number;

    @Column({ name: "description", type: "text", nullable: true })
    description: string;

    @Column({ name: "email_cc", type: "varchar", nullable: true })
    emailCc: string;

    @Column({ name: "email_from", type: "varchar", nullable: true, length: 128 })
    emailFrom: string;

    @Column({ name: "email_normalized", type: "varchar", nullable: true })
    emailNormalized: string;

    @Column({ name: "emp_id", type: "integer", nullable: true })
    empId: number;

    @Column({ name: "job_id", type: "integer", nullable: true })
    jobId: number;

    @Column({ name: "kanban_state", type: "varchar" })
    kanbanState: string;

    @Column({ name: "last_stage_id", type: "integer", nullable: true })
    lastStageId: number;

    @PrimaryColumn({ name: "id", type: "integer" })
    legacyId: number;

    @Column({ name: "linkedin_profile", type: "varchar", nullable: true })
    linkedinProfile: string;

    @Column({ name: "medium_id", type: "integer", nullable: true })
    mediumId: number;

    @Column({ name: "message_bounce", type: "integer", nullable: true })
    messageBounce: number;

    @Column({ name: "message_main_attachment_id", type: "integer", nullable: true })
    messageMainAttachmentId: number;

    @Column({ name: "name", type: "varchar" })
    name: string;

    @Column({ name: "partner_id", type: "integer", nullable: true })
    partnerId: number;

    @Column({ name: "partner_mobile", type: "varchar", nullable: true, length: 32 })
    partnerMobile: string;

    @Column({ name: "partner_mobile_sanitized", type: "varchar", nullable: true })
    partnerMobileSanitized: string;

    @Column({ name: "partner_name", type: "varchar", nullable: true })
    partnerName: string;

    @Column({ name: "partner_phone", type: "varchar", nullable: true, length: 32 })
    partnerPhone: string;

    @Column({ name: "partner_phone_sanitized", type: "varchar", nullable: true })
    partnerPhoneSanitized: string;

    @Column({ name: "phone_sanitized", type: "varchar", nullable: true })
    phoneSanitized: string;

    @Column({ name: "preferred_location", type: "varchar", nullable: true })
    preferredLocation: string;

    @Column({ name: "priority", type: "varchar", nullable: true })
    priority: string;

    @Column({ name: "probability", type: "decimal", nullable: true })
    probability: number;

    @Column({ name: "refuse_reason_id", type: "integer", nullable: true })
    refuseReasonId: number;

    @Column({ name: "relevent_years_exp", type: "decimal", nullable: true })
    releventYearsExp: number;

    @Column({ name: "salary_expected", type: "decimal", nullable: true })
    salaryExpected: number;

    @Column({ name: "salary_expected_extra", type: "varchar", nullable: true })
    salaryExpectedExtra: string;

    @Column({ name: "salary_proposed", type: "decimal", nullable: true })
    salaryProposed: number;

    @Column({ name: "salary_proposed_extra", type: "varchar", nullable: true })
    salaryProposedExtra: string;

    @Column({ name: "source_id", type: "integer", nullable: true })
    sourceId: number;

    @Column({ name: "stage_id", type: "integer", nullable: true })
    stageId: number;

    @Column({ name: "total_years_exp", type: "decimal", nullable: true })
    totalYearsExp: number;

    @Column({ name: "type_id", type: "integer", nullable: true })
    typeId: number;

    @Column({ name: "user_id", type: "integer", nullable: true })
    userId: number;

    @Column({ name: "write_date", type: "timestamp", nullable: true })
    writeDate: Date;

    @Column({ name: "write_uid", type: "integer", nullable: true })
    writeUid: number;

    @Column({ name: "x_current_location_city", type: "varchar", nullable: true, length: 256 })
    xCurrentLocationCity: string;

    @Column({ name: "x_current_salary", type: "integer", nullable: true })
    xCurrentSalary: number;

    @Column({ name: "x_notice_period_months", type: "varchar", nullable: true })
    xNoticePeriodMonths: string;

    @Column({ name: "x_no_years_exp", type: "integer", nullable: true })
    xNoYearsExp: number;
}
