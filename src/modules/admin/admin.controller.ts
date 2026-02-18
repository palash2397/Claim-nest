import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';

import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { RoleGuard } from '../auth/roles/roles.guard';
import { AssignRoleDto } from './dto/assign-role.dto';



@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}


  @Get('/users/all')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Patch('/users/assign-role')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async assignRole(@Body() dto: AssignRoleDto) {
    return this.adminService.assignRole(dto);
  }

}
