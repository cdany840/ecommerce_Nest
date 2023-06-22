import { Category } from "src/category/entities/category.entity";
import { Subcategory } from "src/subcategory/entities/subcategory.entity";

export class CreateProductDto {
    readonly name: string;

    readonly price: Number;

    readonly description: string;

    readonly quantity: number;

    readonly sku: string;

    readonly slug: string;

    readonly specs: string[];

    images: string[];

    readonly category: Category[];

    readonly subcategory: Subcategory[];

    discount: Number;

    date_start: Date;

    date_end: Date;

    old_price: Number;
}