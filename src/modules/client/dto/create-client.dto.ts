import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsEnum,
  IsDateString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { ClaimStatus, LegalDecision } from '../schemas/client.schema';

export class CreateClientDto {

  // ===============================
  // Client Information
  // ===============================

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  clientName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  birthdate?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  address?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty()
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  emergencyContact?: string;

  // ===============================
  // Accident Information
  // ===============================

  @IsOptional()
  @IsString()
  @ApiProperty()
  employer?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  position?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  dateOfAccident?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  lAndIClaimNo?: string;

  @IsOptional()
  @IsEnum(ClaimStatus)
  @ApiProperty()
  claimStatus?: ClaimStatus;

  @IsOptional()
  @IsString()
  @ApiProperty()
  reasonForSeekingLegalHelp?: string;

  // ===============================
  // Legal Decision
  // ===============================

  @IsOptional()
  @IsEnum(LegalDecision)
  @ApiProperty()
  decision?: LegalDecision;
}