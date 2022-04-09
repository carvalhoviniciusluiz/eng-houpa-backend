import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { ProductsController } from '~/products/products.controller';
import { ProductsModule } from '~/products/products.module';
import { ProductsService } from '~/products/products.service';

const userMock = jest.fn() as any;

const productMock = {
  name: faker.commerce.productName(),
  ref: faker.commerce.productAdjective(),
  price: faker.commerce.price()
} as any;

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProductsModule]
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
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
    jest.spyOn(service, 'getProduct').mockImplementationOnce(async () => ({} as any));
    const response = await controller.getProduct(faker.datatype.uuid());
    expect(response).toEqual({});
  });

  it('should create new record', async () => {
    jest.spyOn(service, 'create').mockImplementationOnce(async () => ({} as any));
    const response = await controller.createProduct(productMock, userMock);
    expect(response).toEqual({});
  });

  it('should update record', async () => {
    jest.spyOn(service, 'update').mockImplementationOnce(async () => ({} as any));
    const response = await controller.updateProduct(faker.datatype.uuid(), productMock, userMock);
    expect(response).toEqual({});
  });

  it('should delete record', async () => {
    jest.spyOn(service, 'delete').mockImplementationOnce(async () => ({} as any));
    const response = await controller.deleteProduct(faker.datatype.uuid());
    expect(response).toEqual({});
  });
});