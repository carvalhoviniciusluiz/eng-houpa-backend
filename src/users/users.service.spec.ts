import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { PrismaService } from '~/common/service';
import { UsersService } from '~/users/users.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService]
    }).compile();
    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get a record', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValueOnce({});
    const response = await service.getUser({
      id: faker.datatype.uuid()
    });
    expect(response).toEqual({});
  });

  it('should return empty list', async () => {
    prisma.user.findMany = jest.fn().mockReturnValueOnce([]);
    const response = await service.getAll({});
    expect(response.length).toBe(0);
  });

  it('should return not empty list', async () => {
    prisma.user.findMany = jest.fn().mockReturnValueOnce([{}]);
    const response = await service.getAll({});
    expect(response.length).toBe(1);
  });

  it('should create a new record', async () => {
    prisma.user.create = jest.fn().mockReturnValueOnce({});
    const response = await service.create({
      email: faker.internet.email()
    });
    expect(response).not.toBeUndefined();
  });

  it('should update a record', async () => {
    prisma.user.update = jest.fn().mockReturnValueOnce({});
    const response = await service.update({
      where: {
        id: faker.datatype.uuid()
      },
      data: {
        email: faker.internet.email()
      }
    });
    expect(response).not.toBeUndefined();
  });

  it('should delete a record', async () => {
    prisma.user.delete = jest.fn().mockReturnValueOnce(null);
    const response = await service.delete({
      id: faker.datatype.uuid()
    });
    expect(response).toBeNull();
  });
});
