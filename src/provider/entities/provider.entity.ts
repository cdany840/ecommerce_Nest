import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Address } from 'src/address/entities/address.entity';
import { Product } from 'src/product/entities/product.entity';

export type CatDocument = HydratedDocument<Provider>;

@Schema()
export class Provider {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ default: true })
    status: boolean;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address', autopopulate: true }] })
    address: Address;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', autopopulate: true }] })
    products: Product[];
}

export const ProviderSchema = SchemaFactory.createForClass(Provider);
ProviderSchema.plugin(require('mongoose-autopopulate'));