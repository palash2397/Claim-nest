import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

import { PassportModule } from '@nestjs/passport';
import { MicrosoftStrategy } from './strategies/microsoft.strategy';

@Module({
  controllers: [UserController],
  providers: [UserService, MicrosoftStrategy],
  imports: [
    PassportModule.register({ session: false }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [
    UserService,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class UserModule {}

// nest g module modules/user
// nest g resource user
