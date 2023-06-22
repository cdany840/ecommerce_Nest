import { ObjectId } from "mongoose";
import { Product } from "src/product/entities/product.entity";
import { User } from "src/profile/entities/user.schema";

export class CreateSaleDto {
    send: number;

    payment_method: string;

    date: Date;

    total: number;

    userId: User;

    productId: Product[];

    /* cupon: ObjectId; */
}
