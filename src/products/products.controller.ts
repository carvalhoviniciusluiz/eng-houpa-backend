import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Product as ProductModel, User as UserModel } from '@prisma/client';
import { GetUser } from '~/common/decorators';
import { ProductPaginateDTO, ProductRequestDTO } from '~/products/dtos';
import { ProductsService } from '~/products/products.service';

@ApiTags('Products')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseInterceptors(CacheInterceptor)
  @Get()
  async getAll(@Query() params: ProductPaginateDTO): Promise<ProductModel[]> {
    const { page: skip = 0, limit: take = 10, orderBy = { name: 'asc' } } = params;
    return this.productsService.getAll({
      skip,
      take,
      orderBy
    });
  }

  @Get('/:id')
  async getProduct(@Param('id') id: string): Promise<ProductModel> {
    return this.productsService.getProduct({
      id
    });
  }

  @Post()
  async createProduct(@Body() productData: ProductRequestDTO, @GetUser() user: UserModel): Promise<ProductModel> {
    const { name, description, ref, price } = productData;
    return this.productsService.create({
      name,
      description,
      ref,
      price,
      user: {
        connect: {
          id: user.id
        }
      }
    });
  }

  @Patch('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() productData: ProductRequestDTO,
    @GetUser() user: UserModel
  ): Promise<ProductModel> {
    const { name, description, ref, price } = productData;
    return this.productsService.update({
      where: {
        id
      },
      data: {
        name,
        description,
        ref,
        price,
        user: {
          connect: {
            id: user.id
          }
        }
      }
    });
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string): Promise<ProductModel> {
    return this.productsService.delete({ id });
  }
}
