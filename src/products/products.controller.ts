import {
  BadRequestException,
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
import { ProductPaginateDTO, ProductPaginateResponseDto, ProductRequestDTO } from '~/products/dtos';
import { ProductsService } from '~/products/products.service';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseInterceptors(CacheInterceptor)
  @Get('/sales')
  async getAll(@Query() params: ProductPaginateDTO): Promise<ProductPaginateResponseDto> {
    const { page: skip = 0, limit: take = 10, orderBy = { name: 'asc' }, name } = params;
    const hasName = !!name;
    const options = hasName
      ? {
          where: {
            name: {
              startsWith: name
            }
          }
        }
      : {
          skip,
          take,
          orderBy
        };

    const { count, products } = await this.productsService.getAll(options);
    return new ProductPaginateResponseDto(products, take, skip, count);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(CacheInterceptor)
  @Get()
  async getProducts(
    @Query() params: ProductPaginateDTO,
    @GetUser() user: UserModel
  ): Promise<ProductPaginateResponseDto> {
    const { page: skip = 0, limit: take = 10, orderBy = { name: 'asc' }, name } = params;
    const hasName = !!name;
    const options = hasName
      ? {
          where: {
            name: {
              startsWith: name
            },
            userId: user.id
          }
        }
      : {
          skip,
          take,
          orderBy,
          where: {
            userId: user.id
          }
        };

    const { count, products } = await this.productsService.getAll(options);
    return new ProductPaginateResponseDto(products, take, skip, count);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async getProduct(@Param('id') id: string): Promise<ProductModel> {
    return this.productsService.getProduct({
      id
    });
  }

  @UseGuards(AuthGuard('jwt'))
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

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() productData: ProductRequestDTO,
    @GetUser() user: UserModel
  ): Promise<ProductModel> {
    const { name, description, ref, price } = productData;
    try {
      return await this.productsService.update({
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
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('A new product cannot be created with this Ref');
      }
      throw error;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteProduct(@Param('id') id: string): Promise<ProductModel> {
    return this.productsService.delete({ id });
  }
}
