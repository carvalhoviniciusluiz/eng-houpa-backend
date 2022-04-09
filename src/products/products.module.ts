import { Module } from '@nestjs/common';
import { PrismaService } from '~/common/service';
import { ProductsController } from '~/products/products.controller';
import { ProductsService } from '~/products/products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService]
})
export class ProductsModule {}
