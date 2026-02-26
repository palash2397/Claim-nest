import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
  Patch,
  Get,
  UseInterceptors,
  UploadedFile,
  Delete,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import type { Request } from 'express';

import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { RoleGuard } from '../auth/roles/roles.guard';

import { Roles } from '../auth/roles/roles.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';

import { CaseService } from './case.service';

import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';

// import { FileInterceptor } from '@nestjs/platform-express';
// import { multerConfig } from '../../common/middleware/multer';


@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('case')
export class CaseController {
  constructor(private readonly caseService: CaseService) {}

  @Post('/create')
  @Roles(UserRole.Admin)
  create(@Body() createCaseDto: CreateCaseDto, @Req() req: Request) {

    return this.caseService.create(createCaseDto, req.user!.id);
  }

  @Patch('/update/:id')
  @UseGuards(JwtAuthGuard)
  update(
    @Body() updateCaseDto: UpdateCaseDto,
    @Req() req: Request,
    @Param('id') caseId: string,
  ) {

    return this.caseService.update(updateCaseDto, req.user!.id, caseId);
  }

  // @Post('/:id/activity')
  // @UseGuards(JwtAuthGuard)
  // addActivity(
  //   @Param('id') caseId: string,
  //   @Body() dto: AddActivityDto,
  //   @Req() req: Request,
  // ) {

  //   return this.caseService.addActivity(caseId, dto, req.user.id);
  // }

  // @Post('/:id/note')
  // @UseGuards(JwtAuthGuard)
  // addNote(
  //   @Param('id') caseId: string,
  //   @Body() dto: AddNoteDto,
  //   @Req() req: Request,
  // ) {
  //   if (!req.user) {
  //     return new ApiResponse(401, {}, Msg.UNAUTHORIZED);
  //   }
  //   return this.caseService.addNote(caseId, dto, req.user.id);
  // }

  // @Post('/:id/messages')
  // @UseGuards(JwtAuthGuard)
  // addMessageCall(
  //   @Param('id') caseId: string,
  //   @Body() dto: AddMessageCallDto,
  //   @Req() req: any,
  // ) {
  //   return this.caseService.addMessageCall(caseId, dto, req.user.id);
  // }

  // @Post('/:id/time-loss')
  // @UseGuards(JwtAuthGuard)
  // addTimeLoss(
  //   @Param('id') caseId: string,
  //   @Body() dto: AddTimeLossDto,
  //   @Req() req: any,
  // ) {
  //   return this.caseService.addTimeLoss(caseId, dto, req.user.id);
  // }


  // @Post('/:id/protest-appeal')
  // @UseGuards(JwtAuthGuard)
  // addProtestAppeal(
  //   @Param('id') caseId: string,
  //   @Body() dto: AddProtestAppealDto,
  //   @Req() req: any,
  // ) {
  //   return this.caseService.addProtestAppeal(caseId, dto, req.user.id);
  // }

  @Get('/:id/name')
  @UseGuards(JwtAuthGuard)
  caseByCaseId(@Param('id') caseId: string) {
    return this.caseService.caseByCaseId(caseId);
  }


  // @Post("/document")
  // @UseGuards(JwtAuthGuard)
  // @UseInterceptors(FileInterceptor('file'))
  // addDoucment(
  //   @Body() body: any,
  //   @Req() req: any,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   return this.caseService.addDocument(body, req.user.id, file);
  // }


  @Get('/caseId/id')
  @UseGuards(JwtAuthGuard)
  caseIdAndId() {
    return this.caseService.caseIdAndId();
  }

  @Get('/all')
  @UseGuards(JwtAuthGuard)
  allCases() {
    return this.caseService.allCases();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  caseById(@Param('id') caseId: string) {
    return this.caseService.caseById(caseId);
  }


  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') caseId: string) {
    return this.caseService.remove(caseId);
  }

}
