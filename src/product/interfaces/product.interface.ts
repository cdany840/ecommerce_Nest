import { Document } from "mongoose";
import { Category } from "src/category/entities/category.entity";
import { Subcategory } from "src/subcategory/entities/subcategory.entity";

export interface Product extends Document {
    readonly name: string;

    readonly price: number;

    readonly description: string;

    readonly quantity: number;

    readonly sku: string;

    readonly slug: string;

    readonly specs: string[];

    readonly images: string[];

    /*
    readonly category: Category[];

    readonly subcategory: Subcategory[];
    */
}