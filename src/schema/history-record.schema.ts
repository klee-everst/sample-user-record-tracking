// history-record.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

@Schema()
export class HistoryRecord extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  fieldChanged: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  oldValue: any;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  newValue: any;

  @Prop({ default: Date.now })
  changedAt: Date;
}

export const HistoryRecordSchema = SchemaFactory.createForClass(HistoryRecord);
export type HistoryRecordDocument = HistoryRecord;