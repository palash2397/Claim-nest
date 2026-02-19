import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';

import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { RoleGuard } from '../auth/roles/roles.guard';
import { AssignRoleDto } from './dto/assign-role.dto';


import { Roles } from '../auth/roles/roles.decorator';
import { UserRole } from '../user/schemas/user.schema';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}


  @Get('/users/all')
  @Roles(UserRole.Admin)
  async getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Patch('/users/assign-role')
  @Roles(UserRole.Admin)
  async assignRole(@Body() dto: AssignRoleDto) {
    return this.adminService.assignRole(dto);
  }

}
