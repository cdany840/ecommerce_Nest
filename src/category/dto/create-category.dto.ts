import { Subcategory } from "src/subcategory/entities/subcategory.entity";

export class CreateCategoryDto {
    
    category: string;

    subcategory: Subcategory[];

    toggle: string;

    front: string;

    icon: string;
    
}
