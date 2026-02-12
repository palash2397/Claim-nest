import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsEnum,
  IsDateString,
} from 'class-validator';

import { ClaimStatus, LegalDecision } from '../schemas/client.schema';

export class CreateClientDto {

  // ===============================
  // Client Information
  // ===============================

  @IsString()
  @IsNotEmpty()
  clientName: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsDateString()
  birthdate?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  emergencyContact?: string;

  // ===============================
  // Accident Information
  // ===============================

  @IsOptional()
  @IsString()
  employer?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsDateString()
  dateOfAccident?: string;

  @IsOptional()
  @IsString()
  lAndIClaimNo?: string;

  @IsOptional()
  @IsEnum(ClaimStatus)
  claimStatus?: ClaimStatus;

  @IsOptional()
  @IsString()
  reasonForSeekingLegalHelp?: string;

  // ===============================
  // Legal Decision
  // ===============================

  @IsOptional()
  @IsEnum(LegalDecision)
  decision?: LegalDecision;
}