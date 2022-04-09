import * as faker from 'faker';

type UserItem = {
  id: string;
};

export const generateProductList = (users: UserItem[], count = 100) =>
  [...Array(count).keys()].map((_, index) => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    ref: `${faker.commerce.productAdjective()}-${index}`,
    price: faker.commerce.price(),
    userId: users[index].id
  }));
