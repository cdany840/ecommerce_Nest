import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';

@Schema()
export class Subcategory extends Document {

    _id: string;

    @Prop({ required: true })
    subcategory: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    category: Category;

}

export const SubcategorySchema = SchemaFactory.createForClass( Subcategory );
//SubcategorySchema.plugin(require('mongoose-autopopulate'));