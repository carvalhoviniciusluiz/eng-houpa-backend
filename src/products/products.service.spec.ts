import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { PrismaService } from '~/common/service';
import { ProductsModule } from '~/products/products.module';
import { ProductsService } from '~/products/products.service';

const productMock = {
  name: faker.commerce.productName(),
  ref: faker.commerce.productAdjective(),
  price: faker.commerce.price(),
  user: jest.fn() as any
};

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProductsModule]
    }).compile();
    service = module.get<ProductsService>(ProductsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get a record', async () => {
    prisma.product.findUnique = jest.fn().mockReturnValueOnce({});
    const response = await service.getProduct({
      id: faker.datatype.uuid()
    });
    expect(response).toEqual({});
  });

  it('should return empty list', async () => {
    prisma.product.findMany = jest.fn().mockReturnValueOnce([]);
    const response = await service.getAll({});
    expect(response.length).toBe(0);
  });

  it('should return not empty list', async () => {
    prisma.product.findMany = jest.fn().mockReturnValueOnce([{}]);
    const response = await service.getAll({});
    expect(response.length).toBe(1);
  });

  it('should create a new record', async () => {
    prisma.product.create = jest.fn().mockReturnValueOnce({});
    const response = await service.create(productMock);
    expect(response).not.toBeUndefined();
  });

  it('should update a record', async () => {
    prisma.product.update = jest.fn().mockReturnValueOnce({});
    const response = await service.update({
      where: {
        id: faker.datatype.uuid()
      },
      data: productMock
    });
    expect(response).not.toBeUndefined();
  });

  it('should delete a record', async () => {
    prisma.product.delete = jest.fn().mockReturnValueOnce(null);
    const response = await service.delete({
      id: faker.datatype.uuid()
    });
    expect(response).toBeNull();
  });
});
