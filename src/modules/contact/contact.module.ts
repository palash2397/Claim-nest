import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';


import { CaseContactService } from './case-contact.service';
import { CaseContactController } from './case-contact.controller';


import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schemas/user.schema';
import { Contact, ContactSchema } from './schemas/contact.schema';
import { CaseContact, CaseContactSchema } from './schemas/case-contact.schema';
import { Case, CaseSchema } from '../case/schemas/case.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Contact.name, schema: ContactSchema },
      { name: CaseContact.name, schema: CaseContactSchema },
      { name: Case.name, schema: CaseSchema },
    ]),
  ],
  controllers: [ContactController, CaseContactController],
  providers: [ContactService, CaseContactService],
  exports: [
    ContactService,
    CaseContactService,
    MongooseModule.forFeature([
      { name: Contact.name, schema: ContactSchema },
      { name: CaseContact.name, schema: CaseContactSchema },
      ]),
  ],
})
export class ContactModule {}
