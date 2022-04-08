import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { UserPaginateDTO, UserRequestDTO } from '~/users/dtos';
import { UsersService } from '~/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAll(@Query() params: UserPaginateDTO): Promise<UserModel[]> {
    const { page: skip = 0, limit: take = 10, orderBy = { name: 'asc' } } = params;
    return this.userService.getAll({
      skip,
      take,
      orderBy
    });
  }

  @Get('/:id')
  async getUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.getUser({
      id
    });
  }

  @Post()
  async createUser(@Body() userData: UserRequestDTO): Promise<UserModel> {
    return this.userService.create(userData);
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() userData: UserRequestDTO): Promise<UserModel> {
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
