import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductRequestDTO {
  @Expose()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Value for name.',
    example: 'Short'
  })
  name: string;

  @Expose()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    description: 'Value for name.',
    example: 'Lorem ipsum'
  })
  description?: string;

  @Expose()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Value for ref.',
    example: 'REF-123'
  })
  ref: string;

  @Expose()
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Value for price.',
    example: 49.9
  })
  price: number;
}
