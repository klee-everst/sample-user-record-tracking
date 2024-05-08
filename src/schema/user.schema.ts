// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {

  @Prop({ required: true })
  username: string;

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  age: number;

  @Prop()
  dateOfBirth: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User;