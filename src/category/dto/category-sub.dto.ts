import { SubcategoryDto } from "src/subcategory/dto/subcategory.dto";

export class CategorySubDto {
  _id: string;
  category: string;
  subcategories: SubcategoryDto[];
}