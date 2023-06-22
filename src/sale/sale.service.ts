import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Sale } from './entities/sale.entity';
import { Model } from 'mongoose';

@Injectable()
export class SaleService {
  constructor(
    @InjectModel( Sale.name ) private saleModel: Model<Sale>,
   ) {}

  create(createSaleDto: CreateSaleDto) {
    const newSale = new this.saleModel(createSaleDto).save();
    return newSale;
  }

  findAll() {
    return `This action returns all sale`;
  }

  async findOne(_id: string) {
    const sales = await this.saleModel.find({_id});
    return sales;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
