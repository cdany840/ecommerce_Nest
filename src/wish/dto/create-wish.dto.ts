import { Product } from "src/product/entities/product.entity";
import { User } from "src/profile/entities/user.schema";

export class CreateWishDto {

    userId: User;

    productId: Product;
    
}
