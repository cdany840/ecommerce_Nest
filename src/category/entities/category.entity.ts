import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';

@Schema()
export class Category extends Document{

    _id?: string;

    @Prop({ required: true, unique: true })
    category: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' }] })
    subcategory: Subcategory[];

    @Prop({ default: false })
    toggle: boolean;

    @Prop({ required: true })
    front: string;

    @Prop({ required: true })
    icon: string;

}

export const CategorySchema = SchemaFactory.createForClass( Category );
//CategorySchema.plugin(require('mongoose-autopopulate'));