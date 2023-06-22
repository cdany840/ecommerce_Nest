import { Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from './entities/provider.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProviderService {
  constructor(
    @InjectModel( Provider.name ) 
    private providerModel: Model<Provider>,
   ) {}

  async create(createProviderDto: CreateProviderDto) {
    const newProvider = new this.providerModel(createProviderDto);
    return newProvider.save();
  }

  async findAll() {
    const providers = await this.providerModel.find()
    return providers;
  }

  async findOne(_id: string) {
    const providerId = await this.providerModel.findOne({_id});
    return providerId;
  }

  async update(_id: string, updateProviderDto: UpdateProviderDto) {
    const updateProvider = await this.providerModel.findOneAndUpdate(
      {_id}, 
      updateProviderDto, 
      { new: true });
    return updateProvider;
  }

  async remove(_id: string) {
    const removeProvider = await this.providerModel.deleteOne({_id});
    return removeProvider;
  }
}
