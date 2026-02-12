import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';

import { ClientSchema } from './schemas/client.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Client', schema: ClientSchema }])],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService, MongooseModule.forFeature([{ name: 'Client', schema: ClientSchema }])],
})
export class ClientModule {}
