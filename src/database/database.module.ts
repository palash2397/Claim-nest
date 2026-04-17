import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI!, {
    ssl: true,
    tlsAllowInvalidCertificates: true
  })],
})
export class DatabaseModule {}

// nest g module database
