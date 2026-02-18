import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
  Assistant = 'Assistant',
  Manager = 'Manager',
}

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: [true, 'Name is required'],
    maxlength: [50, 'Name cannot be more than 50 characters'],
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false,
  })
  password: string;

  @Prop({
    enum: UserRole,
    default: UserRole.User,
  })
  role: UserRole;


  @Prop({
    default: true,
  })
  isActive: boolean;

  // 👇 instance method typing
  //   isPasswordCorrect?: (
  //     candidatePassword: string,
  //   ) => Promise<boolean>;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre('save', async function (this: UserDocument) {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});
