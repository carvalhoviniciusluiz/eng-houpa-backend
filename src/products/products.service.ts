import { Injectable } from '@nestjs/common';
import { Prisma, Product as ProductModel } from '@prisma/client';
import { PrismaService } from '~/common/service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async getProduct(productWhereUniqueInput: Prisma.ProductWhereUniqueInput): Promise<ProductModel | null> {
    return this.prisma.product.findUnique({
      where: productWhereUniqueInput
    });
  }

  async getAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }): Promise<{ count: number; products: ProductModel[] }> {
    const { skip, take, where, orderBy } = params;
    const count = await this.prisma.product.count();
    const products = await this.prisma.product.findMany({
      skip,
      take,
      where,
      orderBy
    });

    return {
      count,
      products
    };
  }

  async create(data: Prisma.ProductCreateInput): Promise<ProductModel> {
    return this.prisma.product.create({
      data
    });
  }

  async update(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.ProductUpdateInput;
  }): Promise<ProductModel> {
    const { where, data } = params;
    return this.prisma.product.update({
      data,
      where
    });
  }

  async delete(where: Prisma.ProductWhereUniqueInput): Promise<ProductModel> {
    return this.prisma.product.delete({
      where
    });
  }
}
