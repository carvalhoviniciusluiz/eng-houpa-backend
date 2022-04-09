import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { UsersController } from '~/users/users.controller';
import { UsersModule } from '~/users/users.module';
import { UsersService } from '~/users/users.service';

const userMock = {
  name: faker.commerce.productName(),
  email: faker.internet.email()
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule]
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return empty list', async () => {
    jest.spyOn(service, 'getAll').mockImplementationOnce(async () => []);
    const response = await controller.getAll({});
    expect(response.length).toBe(0);
  });

  it('should return not empty list', async () => {
    jest.spyOn(service, 'getAll').mockImplementationOnce(async () => [{} as any]);
    const response = await controller.getAll({});
    expect(response.length).toBe(1);
  });

  it('should return one record', async () => {
    jest.spyOn(service, 'getUser').mockImplementationOnce(async () => ({} as any));
    const response = await controller.getUser(faker.datatype.uuid());
    expect(response).toEqual({});
  });

  it('should create new record', async () => {
    jest.spyOn(service, 'create').mockImplementationOnce(async () => ({} as any));
    const response = await controller.createUser(userMock);
    expect(response).toEqual({});
  });

  it('should update record', async () => {
    jest.spyOn(service, 'update').mockImplementationOnce(async () => ({} as any));
    const response = await controller.updateUser(faker.datatype.uuid(), userMock);
    expect(response).toEqual({});
  });

  it('should delete record', async () => {
    jest.spyOn(service, 'delete').mockImplementationOnce(async () => ({} as any));
    const response = await controller.deleteUser(faker.datatype.uuid());
    expect(response).toEqual({});
  });
});
