import { Module } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { ExcelController } from './excel.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { Excel, ExcelSchema } from './schemas/excel.schema';

import { AwsModule } from '../aws/aws.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Excel.name, schema: ExcelSchema }]), AwsModule],
  controllers: [ExcelController],
  providers: [ExcelService],
  exports: [ExcelService, MongooseModule.forFeature([{ name: Excel.name, schema: ExcelSchema }])],
})
export class ExcelModule {}
