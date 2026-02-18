import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { CaseContactService } from './case-contact.service';


import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schemas/user.schema';
import { Contact, ContactSchema } from './schemas/contact.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Contact.name, schema: ContactSchema },
    ]),
  ],
  controllers: [ContactController],
  providers: [ContactService, CaseContactService],
  exports: [
    ContactService,
    CaseContactService,
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
  ],
})
export class ContactModule {}
