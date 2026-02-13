import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { CallLogModule } from './modules/call-log/call-log.module';
import { CaseModule } from './modules/case/case.module';
import { TaskModule } from './modules/task/task.module';
import { AwsModule } from './modules/aws/aws.module';
import { EventModule } from './modules/event/event.module';
import { ContactModule } from './modules/contact/contact.module';
import { ClientModule } from './modules/client/client.module';
import { MessageModule } from './modules/message/message.module';
import { ActivityLogModule } from './modules/activity-log/activity-log.module';
import { NotesModule } from './modules/notes/notes.module';
import { CaseMessageModule } from './modules/case-message/case-message.module';
import { CaseTimeLossModule } from './modules/case-time-loss/case-time-loss.module';
import { CaseProtestAppealModule } from './modules/case-protest-appeal/case-protest-appeal.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule,
    CallLogModule,
    CaseModule,
    TaskModule,
    AwsModule,
    EventModule,
    ContactModule,
    ClientModule,
    MessageModule,
    ActivityLogModule,
    NotesModule,
    CaseMessageModule,
    CaseTimeLossModule,
    CaseProtestAppealModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
