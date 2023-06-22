import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Decimal128, HydratedDocument, SchemaType } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';

export type CatDocument = HydratedDocument<Product>;

@Schema()
export class Product {
    @Prop({ required: true })
    price: Number;

    @Prop({ required: true, default: 1 })
    quantity: number;

    @Prop({ required: true, default: 15 })
    stock: number;

    @Prop({ default: "01-01-01-01-01" })
    sku: string;

    @Prop({ default: "nvidia-geoforce-rtx-3060" })
    slug: string;

    @Prop({ default: {"size:":"0.8 Kg", "Medidas":["12", "17", "22"]} })
    specs: string[];

    @Prop({ type: [String], default: ['https://m.media-amazon.com/images/I/71CbE1sJu-L._AC_SX450_.jpg'] })
    images: string[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', autopopulate: true }] })
    category: Category[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', autopopulate: true }] })
    subcategory: Subcategory[];

    @Prop({ default: "NVIDIA® GeForce RTX™ 3060 / IntelCore i5-11400F / 16GB RAM / 480GB SSD M.2 NVMe/ DISIPADOR POR AIRE / 5 VENTILADORES ARGB / 650W 80+ BRONZE" })
    description: string;

    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ default: 0.0 })
    discount: Number;

    @Prop({ default: Date.now })
    date_start: Date;

    @Prop({ default: Date.now })
    date_end: Date;

    @Prop({ default: 0.0 })
    old_price: Number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.plugin(require('mongoose-autopopulate'));