import { ApiProperty } from '@nestjs/swagger';
import { Product as ProductModel } from '@prisma/client';
import { PaginatedResultDTO } from '~/common/dtos';

export class ProductPaginateResponseDto extends PaginatedResultDTO {
  @ApiProperty({
    example: []
  })
  data: any;

  constructor(rows: ProductModel[], count: number, page: number, pageSize: number) {
    super(rows, count, page, pageSize);
    this.data = rows.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      ref: product.ref,
      price: product.price,
      updatedAt: product.updatedAt
    }));
  }
}
