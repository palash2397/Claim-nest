import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { FeeService } from './fee.service';
import { CreateFeeDto } from './dto/create-fee.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { RoleGuard } from '../auth/roles/roles.guard';


import { Roles } from '../auth/roles/roles.decorator';
import { UserRole } from '../user/schemas/user.schema';


@UseGuards(JwtAuthGuard, RoleGuard)

// @Roles(UserRole.Admin, UserRole.Manager)
@Controller('fee')
export class FeeController {
  constructor(private readonly feeService: FeeService) {}

  @Post()
  create(@Body() dto: CreateFeeDto, @Req() req: any) {
    return this.feeService.create(dto, req.user.id);
  }
}
