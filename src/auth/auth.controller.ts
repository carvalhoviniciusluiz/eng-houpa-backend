import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from '~/auth/auth.service';
import { AuthCredentialsRequestDTO, AuthSignUpRequestDTO } from '~/auth/dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signIn(@Body() params: AuthCredentialsRequestDTO) {
    return this.authService.signIn(params);
  }

  @Post('/signup')
  async signUp(@Body() params: AuthSignUpRequestDTO) {
    try {
      await this.authService.signUp(params);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('A new user cannot be created with this email');
        }
      }
      throw error;
    }
  }
}
