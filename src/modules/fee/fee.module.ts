import { Module } from '@nestjs/common';
import { FeeService } from './fee.service';
import { FeeController } from './fee.controller';
import { FeeSchema } from './schemas/fee.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [FeeController],
  providers: [FeeService],
  imports: [MongooseModule.forFeature([{ name: 'Fee', schema: FeeSchema }])],
  exports: [FeeService, MongooseModule.forFeature([{ name: 'Fee', schema: FeeSchema }])],
})
export class FeeModule {}
