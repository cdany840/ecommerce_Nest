import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel( Product.name ) 
    private productModel: Model<Product>,
   ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = new this.productModel(createProductDto);
      const newProduct = product.save();
      return "Producto guardado";
    } catch (error) {
      return error;
    }

  }

  async findAll() {
    try {
      const products = await this.productModel.find();
      return products;
    } catch (err) {
      console.log(err);
    }
  }

  async findOne(slug: string) {
    const slugProduct = await this.productModel.findOne({slug});
    return slugProduct;
  }

  async findId(_id: string) {
    const slugProduct = await this.productModel.findOne({_id});
    return slugProduct;
  }

  async findCategory(category: string) {
    const slugProduct = await this.productModel.find({"category": category});
    return slugProduct;
  }

  async findSubcategory(subcategory: string) {
    const slugProduct = await this.productModel.find({"subcategory": subcategory});
    return slugProduct;
  }

  async update(_id: string, updateProductDto: UpdateProductDto) {
    const updateProduct = await this.productModel.findOneAndUpdate(
      {_id}, 
      updateProductDto, 
      { new: true });
    return updateProduct;
  }

  async remove(_id: string) {
    const removeProduct = await this.productModel.deleteOne({_id});
    return removeProduct;
  }
}
