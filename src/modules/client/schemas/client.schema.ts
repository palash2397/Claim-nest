import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDocument = Client & Document;

export enum ClaimStatus {
  OPEN = 'Open',
  CLOSED = 'Closed',
  PENDING = 'Pending',
}

export enum LegalDecision {
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected',
  UNDER_REVIEW = 'Under Review',
}

@Schema({ timestamps: true })
export class Client {
  // ===============================
  // Client Information
  // ===============================

  @Prop({ required: true, trim: true })
  clientName: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  birthdate: Date;

  @Prop()
  address: string;

  @Prop({ lowercase: true })
  email: string;

  @Prop()
  emergencyContact: string;

  // ===============================
  // Accident Information
  // ===============================

  @Prop()
  employer: string;

  @Prop()
  position: string;

  @Prop()
  dateOfAccident: Date;

  @Prop()
  lAndIClaimNo: string;

  @Prop({
    type: String,
    enum: ClaimStatus,
    default: ClaimStatus.OPEN,
  })
  claimStatus: ClaimStatus;

  @Prop()
  reasonForSeekingLegalHelp: string;

  // ===============================
  // Legal Decision
  // ===============================

  @Prop({
    type: String,
    enum: LegalDecision,
  })
  decision: LegalDecision;
}

export const ClientSchema = SchemaFactory.createForClass(Client);