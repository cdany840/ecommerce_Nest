
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Address } from 'src/address/entities/address.entity';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/profile/entities/user.schema';

export type AddressDocument = HydratedDocument<Sale>;

@Schema()
export class Sale {
    _id?: string;

    @Prop({ required: true, default: 100 })
    send: number;

    @Prop({ required: true, default: "Paypal" })
    payment_method: string;

    @Prop({ default: Date.now })
    date: Date;

    @Prop({ required: true })
    total: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product', autopopulate: true }] })
    productId: Product[];

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Address', autopopulate: true })
    address: Address;

   /*  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Cupon', autopopulate: true }], default: "646e11b25a598505b118be2c" })
    cupon: ObjectId; */
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
SaleSchema.plugin(require('mongoose-autopopulate'));