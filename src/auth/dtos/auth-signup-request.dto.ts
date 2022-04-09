import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthSignUpRequestDTO {
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
    example: true
  })
  acceptTerms: boolean;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty({
    type: String,
    description: 'Value for password',
    example: '123Ch@nge'
  })
  password: string;
}
