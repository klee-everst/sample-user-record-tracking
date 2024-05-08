import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User, UserSchema } from './schema/user.schema';
import { HistoryRecord, HistoryRecordSchema } from './schema/history-record.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/test'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: HistoryRecord.name, schema: HistoryRecordSchema }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
