import { CacheInterceptor, CacheModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { PrismaService } from '~/common/service';
import { CacheService } from '~/config';
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
      imports: [
        CacheModule.registerAsync({
          useClass: CacheService
        })
      ],
      providers: [
        {
          provide: APP_INTERCEPTOR,
          useClass: CacheInterceptor
        },
        ProductsService,
        PrismaService
      ]
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
    prisma.product.count = jest.fn().mockReturnValueOnce(0);
    prisma.product.findMany = jest.fn().mockReturnValueOnce([]);
    const response = await service.getAll({});
    expect(response.count).toBe(0);
    expect(response.products.length).toBe(0);
  });

  it('should return not empty list', async () => {
    prisma.product.count = jest.fn().mockReturnValueOnce(1);
    prisma.product.findMany = jest.fn().mockReturnValueOnce([{}]);
    const response = await service.getAll({});
    expect(response.count).toBe(1);
    expect(response.products.length).toBe(1);
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
