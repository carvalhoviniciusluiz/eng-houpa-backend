import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { UsersService } from '~/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAll(): Promise<UserModel[]> {
    return this.userService.getAll({
      skip: 1, // page
      take: 20, // limit,
      orderBy: { name: 'asc' }
    });
  }

  @Get('/:id')
  async getUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.getUser({
      id
    });
  }

  @Post()
  async createUser(@Body() userData: { name?: string; email: string }): Promise<UserModel> {
    return this.userService.create(userData);
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() userData: { name?: string; email: string }): Promise<UserModel> {
    return this.userService.update({
      where: {
        id
      },
      data: userData
    });
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.delete({ id });
  }
}
