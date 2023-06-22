import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', null, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = extname(file.originalname);
          cb(null, `${uniqueSuffix}${extension}`);
        },
      }),
    }),
  )
  async postAdd(
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res,
    @Body() createProductDto: CreateProductDto,
  ): Promise<object> {
    createProductDto.images = [];

    for (const file of files) {
      const imagePath = `http://localhost:3000/uploads/${file.filename}`;
      createProductDto.images.push(imagePath);
    }

    const product = await this.productService.create(createProductDto);
    return res.json(product);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get('/id/:id')
  findByID(@Param('id') id: string) {
    return this.productService.findId(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Get('/category/:category')
  findCategory(@Param('category') category: string) {
    return this.productService.findCategory(category);
  }

  @Get('/subcategory/:subcategory')
  findSubcategory(@Param('subcategory') subcategory: string) {
    return this.productService.findSubcategory(subcategory);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
