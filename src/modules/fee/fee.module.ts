import { Module } from '@nestjs/common';
import { FeeService } from './fee.service';
import { FeeController } from './fee.controller';
import { FeeSchema } from './schemas/fee.schema';
import { MongooseModule } from '@nestjs/mongoose';

import { Case, CaseSchema } from '../case/schemas/case.schema';

@Module({
  controllers: [FeeController],
  providers: [FeeService],
  imports: [MongooseModule.forFeature([{ name: 'Fee', schema: FeeSchema }]), MongooseModule.forFeature([{ name: Case.name, schema: CaseSchema }])],
  exports: [FeeService, MongooseModule.forFeature([{ name: 'Fee', schema: FeeSchema }])],
})
export class FeeModule {}
