import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.schema';

@Injectable()
export class ProfileService {

  constructor(
    @InjectModel( User.name ) 
    private userModel: Model<User>,
  ) {

  }

  findAll() {
    return `This action returns all profile`;
  }

  async findOne(_id: string): Promise<User> {
    try {
      const userId = await this.userModel.findOne({_id});
      return userId;
    } catch (err) {
      console.log(err);
    }
  }

  async update(id: string, updateProfileDto: UpdateProfileDto){
    try {
      const updateUser = await this.userModel.findByIdAndUpdate(
        id,
        updateProfileDto,
        { new: true },
      );

      return updateUser;
      
    } catch (error) {

      throw new InternalServerErrorException('Something terribe happen!!!');

    }
  }

  //-------------------------------------------------------------

  async remove(id: string) {
    try {
      const userId = await this.userModel.findByIdAndDelete(id);
      return userId;
    } catch (err) {
      console.log(err);
    }
  }
}
