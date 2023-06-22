import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class WishService {

  constructor(
    @InjectModel( Wish.name ) 
    private wishModel: Model<Wish>,
   ) {}

  async create(createWishDto: CreateWishDto) {
    try {

      const wish = new this.wishModel(createWishDto);
      const newWish = wish.save();
      return newWish;

    } catch (error) {

      return error;

    }
  }

  async findAll(userId: string) {
    const wishUser = await this.wishModel.find({userId});
    return wishUser;
  }

  findOne(id: number) {
    return `This action returns a #${id} wish`;
  }

  async update(_id: string, updateWishDto: UpdateWishDto) {
    const updateProduct = await this.wishModel.findOneAndUpdate(
      {_id}, 
      updateWishDto, 
      { new: true });
    return updateProduct;
  }

  async remove(_id: string) {
    const removeProduct = await this.wishModel.deleteOne({_id});
    return removeProduct;
  }
}
