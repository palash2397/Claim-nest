import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CaseDocument = Case & Document;

@Schema({ timestamps: true })
export class Case {
  /* ===================== OVERVIEW ===================== */

  @Prop()
  caseTitle: string;

  @Prop({ unique: true })
  caseId: string;
  /* ===================== CLIENT INFO ===================== */

  @Prop()
  clientName: string;

  @Prop()
  clientPhone: string;

  @Prop()
  clientAddress: string;

  @Prop()
  clientWork: string;

  @Prop({ type: Date })
  clientDob: Date;

  @Prop()
  emergencyContact: string;

  /* ===================== CLAIM INFO ===================== */

  @Prop()
  claimNo: string;

  @Prop({ type: Date })
  doi: Date;

  @Prop()
  cm: string;

  @Prop()
  cmPhone: string;

  @Prop()
  supervisor: string;

  @Prop()
  supervisorPhone: string;

  @Prop()
  employer: string;

  @Prop()
  tpa: string;

  @Prop()
  tpaPhone: string;

  @Prop()
  si: string;

  @Prop()
  siPhone: string;

  @Prop()
  provider: string;

  @Prop()
  providerPhone: string;

  @Prop()
  vrc: string;

  @Prop()
  vrcPhone: string;

  @Prop()
  vocationalStatus: string;

  @Prop()
  roa: string;

  @Prop()
  allowedConditions: string;

  @Prop({ enum: ['Yes', 'No'], default: 'No' })
  tl: 'Yes' | 'No';

  @Prop({ type: Date })
  lastApf: Date;

  @Prop({ type: Date })
  lastWsf: Date;

  @Prop({ enum: ['Active', 'Intake', 'Closed'], default: 'Active' })
  status: 'Active' | 'Intake' | 'Closed';

  @Prop({ type: Types.ObjectId, ref: 'User' })
  assignedManager: Types.ObjectId;

  @Prop()
  lastActivity: string;

  // /* ===================== ACTIVITY ===================== */

  // @Prop({
  //   type: [
  //     {
  //       activity: String,
  //       createdBy: String,
  //       createdAt: Date,
  //     },
  //   ],
  //   default: [],
  // })
  // activityLogs: {
  //   activity: string;
  //   createdBy: string;
  //   createdAt: Date;
  // }[];

  // /* ===================== NOTES ===================== */

  // @Prop({
  //   type: [
  //     {
  //       note: String,
  //       createdBy: String,
  //       createdAt: Date,
  //     },
  //   ],
  //   default: [],
  // })
  // notes: {
  //   note: string;
  //   createdBy: string;
  //   createdAt: Date;
  // }[];

  // /* ===================== MESSAGES / CALLS ===================== */

  // @Prop({
  //   type: [
  //     {
  //       from: { type: String }, // Admin / Staff name or role
  //       regarding: { type: String }, // Client / Staff
  //       status: { type: String }, // Resolved, Pending, etc.
  //       message: { type: String }, // short message
  //       action: { type: String }, // Call Back, Follow Up
  //       note: { type: String }, // long note
  //       createdBy: { type: Types.ObjectId, ref: 'User' },
  //       createdAt: { type: Date },
  //     },
  //   ],
  //   default: [],
  // })
  // messagesAndCalls: {
  //   from: string;
  //   regarding: string;
  //   status: string;
  //   message: string;
  //   action: string;
  //   note?: string;
  //   createdBy: Types.ObjectId;
  //   createdAt: Date;
  // }[];

  // /* ===================== EMAILS ===================== */

  // @Prop({
  //   type: [
  //     {
  //       subject: String,
  //       sender: String,
  //       receivedAt: Date,
  //       externalId: String,
  //     },
  //   ],
  //   default: [],
  // })
  // emails: {
  //   subject: string;
  //   sender: string;
  //   receivedAt: Date;
  //   externalId?: string;
  // }[];

  // /* ===================== TIME LOSS ===================== */

  // @Prop({
  //   type: [
  //     {
  //       fromDate: { type: Date },
  //       toDate: { type: Date },
  //       payPeriod: { type: String }, // Weekly, Bi-Weekly, Monthly
  //       description: { type: String },
  //       createdBy: { type: Types.ObjectId, ref: 'User' },
  //       createdAt: { type: Date },
  //     },
  //   ],
  //   default: [],
  // })
  // timeLosses: {
  //   fromDate: Date;
  //   toDate: Date;
  //   payPeriod: string;
  //   description?: string;
  //   createdBy: Types.ObjectId;
  //   createdAt: Date;
  // }[];

  // /* ===================== DOCUMENTS ===================== */

  // @Prop({
  //   type: [
  //     {
  //       fileName: String,
  //       originalName: String,
  //       category: {
  //         type: String,
  //         enum: [
  //           'IWJ Documents',
  //           'Dept Letters',
  //           'Draft Copies',
  //           'Medical',
  //           'Vocational',
  //           'WSF',
  //           'SI CFU',
  //         ],
  //       },
  //       mimeType: String,
  //       size: Number,

  //       // 🔜 future S3 fields
  //       fileUrl: String, // nullable for now
  //       s3Key: String, // nullable for now
  //       signedUrl: String, // for temporary access

  //       uploadedBy: { type: Types.ObjectId, ref: 'User' },
  //       uploadedAt: Date,
  //     },
  //   ],
  //   default: [],
  // })
  // documents: {
  //   fileName: string;
  //   originalName: string;
  //   category: string;
  //   mimeType: string;
  //   size: number;
  //   fileUrl?: string;
  //   s3Key?: string;
  //   signedUrl?: string;
  //   uploadedBy: Types.ObjectId;
  //   uploadedAt: Date;
  // }[];

  // /* ===================== PROTESTS & APPEALS ===================== */

  // @Prop({
  //   type: {
  //     doDate: { type: Date },
  //     description: { type: String },
  //     deadline: { type: Date },
  //     status: {
  //       type: String,
  //       enum: ['Protested', 'Appealed', 'No Action'],
  //     },
  //     outcome: { type: String },
  //     notes: { type: String },
  //     createdBy: { type: Types.ObjectId, ref: 'User' },
  //     createdAt: { type: Date },
  //   },
  //   default: null,
  // })
  // protestsAndAppeals: {
  //   doDate: Date;
  //   description: string;
  //   deadline: Date;
  //   status: string;
  //   outcome: string;
  //   notes?: string;
  //   createdBy: Types.ObjectId;
  //   createdAt: Date;
  // };

  // /* ===================== AUDIT LOG ===================== */

  // @Prop({
  //   type: [
  //     {
  //       action: String, // created | updated | deleted
  //       field: String,
  //       oldValue: String,
  //       newValue: String,
  //       performedBy: { type: Types.ObjectId, ref: 'User' },
  //       performedAt: Date,
  //     },
  //   ],
  //   default: [],
  // })
  // auditLogs: {
  //   action: string;
  //   field?: string;
  //   oldValue?: string;
  //   newValue?: string;
  //   performedBy: Types.ObjectId;
  //   performedAt: Date;
  // }[];
}

export const CaseSchema = SchemaFactory.createForClass(Case);
