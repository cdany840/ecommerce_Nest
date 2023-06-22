import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Address } from './entities/address.entity';
import { Model } from 'mongoose';
import { User } from 'src/profile/entities/user.schema';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel( Address.name ) private addressModel: Model<Address>,
    @InjectModel( User.name ) private userModel: Model<User>,
   ) {}

  async create(createAddressDto: CreateAddressDto, _id: string) {
    const newAddress = new this.addressModel(createAddressDto).save();

    const userAddress = await this.userModel.findByIdAndUpdate(
      _id,
      { $push: { address: (await newAddress)._id } },
      { new: true },
    );
    
    return userAddress;
  }

  async findAll(): Promise<Address[]> {
    const address = await this.addressModel.find()
    return address;
  }

  async findOne(user: string): Promise<Address[]> {
    const addressId = await this.addressModel.find({user});
    return addressId;
  }

  async update(_id: string, updateAddressDto: UpdateAddressDto): Promise<Address> {
    const updateAddress = await this.addressModel.findOneAndUpdate(
      {_id}, 
      updateAddressDto, 
      { new: true });
    return updateAddress;
  }

  async remove(_id: string) {
    const removeAddress = await this.addressModel.deleteOne({_id});
    return removeAddress;
  }
}
