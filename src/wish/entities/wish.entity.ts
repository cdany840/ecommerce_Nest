import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Product } from "src/product/entities/product.entity";
import { User } from "src/profile/entities/user.schema";

export type WishDocument = HydratedDocument<Wish>;

@Schema()
export class Wish {
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product', autopopulate: true })
    productId: Product;

}

export const WishSchema = SchemaFactory.createForClass(Wish);
WishSchema.plugin(require('mongoose-autopopulate'));