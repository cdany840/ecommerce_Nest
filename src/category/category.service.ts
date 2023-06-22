import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';
import { SubcategoryDto } from 'src/subcategory/dto/subcategory.dto';
import { CategorySubDto } from './dto/category-sub.dto';

@Injectable()
export class CategoryService {
  
  constructor(
    @InjectModel( Category.name ) 
    private categoryModel: Model<Category>,
  ) {

  }

  async create(createCategoryDto: CreateCategoryDto){
    try {
      const category = new this.categoryModel(createCategoryDto);
      const newCategory = category.save();
      return newCategory;
    } catch (error) {
      return error;
    }
  }

  async findAll(){
    try {
      const categories = await this.categoryModel.find().populate('subcategory');
      return categories.map(user => user.toJSON());
    } catch (err) {
      console.log(err);   
    }
  }


  async findOne(id: string) {
    try {
      const categoryId = await this.categoryModel.findById(id).populate('subcategory');
      return categoryId;
    } catch (err) {
      console.log(err);
    }
  }

  async update(_id: string, updateCategoryDto: UpdateCategoryDto) {
    const updateCategory = await this.categoryModel.findByIdAndUpdate(
      _id,
      updateCategoryDto,
      { new: true },
    );
    
    return updateCategory;
  }

  async remove(_id: string) {
    const categoryId = await this.categoryModel.findOne({_id})
    const removeCategory = await this.categoryModel.deleteOne({_id});
    return categoryId;
  }
}
