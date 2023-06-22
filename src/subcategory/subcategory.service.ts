import { Injectable } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { Subcategory } from './entities/subcategory.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class SubcategoryService {

  constructor(
    @InjectModel( Subcategory.name ) private subcategoryModel: Model<Subcategory>,
    @InjectModel( Category.name ) private categoryModel: Model<Category>,
  ) {

  }

  async create(_id: string, createSubcategoryDto: CreateSubcategoryDto) {
    const newSubcategory = new this.subcategoryModel(createSubcategoryDto).save();

    const categorySub = await this.categoryModel.findByIdAndUpdate(
      _id,
      { $push: { subcategory: (await newSubcategory)._id } },
      { new: true },
    );
    
    return categorySub;
  }

  async findAll() {
    try {
      const subcategories = await this.subcategoryModel.find();
      return subcategories;
    } catch (err) {
      console.log(err);
    }
  }

  async findOne(category: string) {
    try {
      const subcategories = await this.subcategoryModel.find({category});
      return subcategories;
    } catch (err) {
      console.log(err);
    }
  }

  async update(_id: string, updateSubcategoryDto: UpdateSubcategoryDto) {
    const updateSub = await this.subcategoryModel.findByIdAndUpdate(
      _id,
      updateSubcategoryDto,
      { new: true },
    );
    
    return updateSub;
  }

  async remove(_id: string) {
    const subcategoryId = await this.subcategoryModel.findOne({_id})
    const removeSub = await this.subcategoryModel.deleteOne({_id});
    return subcategoryId;
  }

  async findSub(_id: string) {
    try {
      const subcategories = await this.subcategoryModel.findOne({_id});
      return subcategories;
    } catch (err) {
      console.log(err);
    }
  }
}
