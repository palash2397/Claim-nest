import { Module } from '@nestjs/common';
import { CaseDocumentsService } from './case-documents.service';
import { CaseDocumentsController } from './case-documents.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { DocumentFile, DocumentFileSchema } from './schemas/create-document.schema';
import { Case, CaseSchema } from '../case/schemas/case.schema';
import { AwsModule } from '../aws/aws.module';

@Module({
  controllers: [CaseDocumentsController],
  providers: [CaseDocumentsService],
  imports: [
    MongooseModule.forFeature([
      { name: DocumentFile.name, schema: DocumentFileSchema },
      { name: Case.name, schema: CaseSchema },
    ]),
    AwsModule,
  ],
})
export class CaseDocumentsModule {}
