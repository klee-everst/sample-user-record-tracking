import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class AppService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: any): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ "username": username });
  }

  async findAll(): Promise<User[] | undefined> {
    return this.userModel.find();
  }

  async delete(username: string, userId: string): Promise<any> {
    return this.userModel.deleteOne({ "username": username, _id: userId });
  }

  async update(userId: string, updateUserDto: any): Promise<User> {
    const existingUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true });
   if (!existingUser) {
     throw new NotFoundException(`User ID ${userId} not found`);
   }
   return existingUser;
}
}
