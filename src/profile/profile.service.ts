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

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  async update(id: string, updateProfileDto: UpdateProfileDto): Promise<User> {
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

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
