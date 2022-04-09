import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class UserRequestDTO {
  @Expose()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    description: 'Value for name.',
    example: 'Vinicius Carvalho'
  })
  name?: string;

  @Expose()
  @IsEmail()
  @MaxLength(200)
  @ApiProperty({
    type: String,
    description: 'Value for email',
    example: 'carvalho.viniciusluiz@gmail.com'
  })
  email: string;

  @Expose()
  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    type: Boolean,
    description: 'Value for accept terms',
    example: true,
    default: false
  })
  acceptTerms?: boolean;
}
