import { ApiProperty } from '@nestjs/swagger';
import { Product as ProductModel } from '@prisma/client';
import { PaginatedResultDTO } from '~/common/dtos';

type ProductRow = {
  id: string;
  name: string;
  description: string;
  ref: string;
  price: number;
  updatedAt: Date;
  user: {
    id: string;
    email: string;
    name: string;
    updatedAt: Date;
  };
};

export class ProductPaginateResponseDto extends PaginatedResultDTO {
  @ApiProperty({
    example: []
  })
  data: any;

  constructor(rows: ProductModel[], count: number, page: number, pageSize: number) {
    super(rows, count, page, pageSize);
    this.data = rows.map(product => {
      const productRow = product as unknown as ProductRow;
      return {
        id: productRow.id,
        name: productRow.name,
        description: productRow.description,
        ref: productRow.ref,
        price: productRow.price,
        updatedAt: productRow.updatedAt,
        user: {
          id: productRow.user.id,
          email: productRow.user.email,
          name: productRow.user.name,
          updatedAt: productRow.user.updatedAt
        }
      };
    });
  }
}
