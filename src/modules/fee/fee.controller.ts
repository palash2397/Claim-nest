import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Patch,
  Get,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { FeeService } from './fee.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { RoleGuard } from '../auth/roles/roles.guard';

import { Roles } from '../auth/roles/roles.decorator';
import { UserRole } from '../user/schemas/user.schema';

import { CreateFeeDto } from './dto/create-fee.dto';
import { UpdateFeeDto } from './dto/update-fee.dto';
import { FilterFeeDto } from './dto/filter-fee.dto';

@UseGuards(JwtAuthGuard, RoleGuard)
// @Roles(UserRole.Admin, UserRole.Manager)
@Controller('fee')
export class FeeController {
  constructor(private readonly feeService: FeeService) {}

  @Post('/create')
  create(@Body() dto: CreateFeeDto, @Req() req: any) {
    return this.feeService.create(dto, req.user.id);
  }

  @Patch('/update')
  update(@Body() dto: UpdateFeeDto) {
    return this.feeService.update(dto);
  }

  @Get('/all')
  findAll(@Query() filter: FilterFeeDto) {
    return this.feeService.findAll(filter);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.feeService.remove(id);
  }

  @Get('/find/:id')
  findOne(@Param('id') id: string) {
    return this.feeService.findOne(id);
  }

  @Get('/calendar')
  calendarData(@Query('start') start: string, @Query('end') end: string) {
    return this.feeService.calendarData(new Date(start), new Date(end));
  }
}
