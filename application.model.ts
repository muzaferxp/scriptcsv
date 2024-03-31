import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { GlobalScopes } from "typeorm-global-scopes";
import { Role } from "../enums";
import {
  Citizen,
  User,
  Address,
  Beneficiary,
  ServiceCategory,
  Slot,
} from "./index";
import { BaseEntity } from "./base.model";
import { ApplicationStatus } from "../enums";
import { RequestType } from "../enums/requestType.enum";
import { PaymentMode } from "../enums/payment-mode.enum";

@GlobalScopes<Application>([
  (qb, alias) => qb.andWhere(`${alias}.isActive = 1`),
])
@Entity("application")
export class Application extends BaseEntity {
  @Column({ name: "ticket_number", nullable: false, unique: true })
  ticketNumber!: string;

  @Column({
    name: "invoice_number",
    nullable: false,
    unique: true,
  })
  invoiceNumber!: string;

  @Index()
  @ManyToOne(() => ServiceCategory, { nullable: false, eager: true })
  @JoinColumn()
  serviceCategory!: ServiceCategory;

  @Column({ nullable: false })
  status: ApplicationStatus = ApplicationStatus.AWAITING_FIELD_AGENT_ALLOCATION;

  @ManyToOne(() => Slot, { nullable: true, eager: true })
  @JoinColumn()
  slot!: Slot | null;

  @ManyToOne(() => User, { nullable: true, eager: true })
  @JoinColumn()
  callCenterAgent!: User;

  @ManyToOne(() => User, { nullable: true, eager: true })
  @JoinColumn()
  eDistrictSubmissionAgent!: User;

  @Column({ name: "e_district_application_id", nullable: true, unique: true })
  eDistrictApplicationId?: string;

  @Index()
  @ManyToOne(() => Citizen, { nullable: false, eager: true })
  @JoinColumn()
  citizen!: Citizen;

  @Index()
  @ManyToOne(() => Beneficiary, { nullable: true, eager: true })
  @JoinColumn()
  beneficiary!: Beneficiary;

  @ManyToOne(() => Address, { nullable: true, eager: true })
  @JoinColumn()
  address!: Address;

  @Column({
    name: "e_district_application_status",
    nullable: true,
  })
  eDistrictStatus!: string;

  @Column({ default: false, name: "payment_received" })
  paymentReceived: boolean = false;

  @Column({ nullable: true, name: "proof_of_delivery" })
  proofOfDelivery!: string;

  @Column({ nullable: true, name: "proof_of_unavailable_delivery" })
  proofOfUnavailableDelivery!: string;

  @Column({ nullable: true, name: "fees" })
  fees!: number;

  @Column({ nullable: true, name: "mitaan_fees" })
  mitaanFees!: number;

  @Column({ nullable: true, name: "field_agent_notes" })
  fieldAgentNotes!: string;

  @Column({
    nullable: true,
    name: "field_agent_notes__links",
    type: "longtext",
  })
  fieldAgentNotesLinks!: string;

  @Column({ nullable: true, name: "checked_documents", type: "longtext" })
  checkedDocuments!: string;

  @Column({ nullable: true, name: "consent_link", default: "" })
  consentLink!: string;

  @Column({ name: "signature", default: "", nullable: true })
  signature!: string;

  @Column({ type: "enum", enum: Role, default: Role.CA })
  requested_by: Role = Role.CA;

  @Column({
    type: "enum",
    name: "request_type",
    enum: RequestType,
    default: RequestType.CRM_APPOINTMENT,
  })
  requestType: RequestType = RequestType.CRM_APPOINTMENT;

  @Column({
    type: "enum",
    name: "payment_mode",
    enum: PaymentMode,
    default: PaymentMode.CASH,
  })
  paymentMode: PaymentMode = PaymentMode.CASH;

  @Column({ name: "payment_split_complete", default: false, nullable: true })
  paymentSplitComplete: boolean = false;

  @Column({ name: "certificate_generation_date", nullable: true })
  certificateGenerationDate!: string;

  @Column({ name: "certificate_number", nullable: true })
  certificateNumber!: string;
}
