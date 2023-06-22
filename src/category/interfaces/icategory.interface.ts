import { Subcategory } from "src/subcategory/entities/subcategory.entity";


export interface ICategory extends Document {
    category: string;
    subcategory: Subcategory[];
}